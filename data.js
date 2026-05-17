// js/game.js — Oyun mantığı

const Game = {
  username: null,
  player: null,
  energyInterval: null,
  passiveInterval: null,

  load(username) {
    this.username = username;
    this.player = Storage.getPlayer(username);
    this.regenerateEnergy();
    this.startEnergyRegen();
    this.startPassiveIncome();
  },

  save() {
    Storage.savePlayer(this.username, this.player);
  },

  regenerateEnergy() {
    const p = this.player;
    const now = Date.now();
    const elapsed = Math.floor((now - (p.lastEnergyTime || now)) / 1000);
    const gained = Math.floor(elapsed / ENERGY_REGEN_SEC);
    if (gained > 0) {
      p.energy = Math.min(MAX_ENERGY, p.energy + gained);
      p.lastEnergyTime = now - ((elapsed % ENERGY_REGEN_SEC) * 1000);
    }
  },

  startEnergyRegen() {
    clearInterval(this.energyInterval);
    this.energyInterval = setInterval(() => {
      const p = this.player;
      if (p.energy < MAX_ENERGY) {
        const now = Date.now();
        const elapsed = Math.floor((now - p.lastEnergyTime) / 1000);
        if (elapsed >= ENERGY_REGEN_SEC) {
          p.energy = Math.min(MAX_ENERGY, p.energy + 1);
          p.lastEnergyTime = now;
          this.save();
          UI.renderStats();
          UI.renderQuests();
          UI.renderDashboard();
        }
        const secLeft = ENERGY_REGEN_SEC - (elapsed % ENERGY_REGEN_SEC);
        const el = document.getElementById('energy-regen');
        if (el) el.textContent = '+1 enerji → ' + secLeft + 's';
      } else {
        const el = document.getElementById('energy-regen');
        if (el) el.textContent = 'Dolu ✓';
      }
    }, 1000);
  },

  startPassiveIncome() {
    clearInterval(this.passiveInterval);
    this.passiveInterval = setInterval(() => {
      const p = this.player;
      if (p.inventory && p.inventory.includes('office')) {
        p.gold += 20;
        p.totalGold += 20;
        this.save();
        UI.renderStats();
        UI.renderDashboard();
        UI.showToast('+20 💰 Ofis geliri!');
      }
    }, 60000);
  },

  stopIntervals() {
    clearInterval(this.energyInterval);
    clearInterval(this.passiveInterval);
  },

  doQuest(questId) {
    const q = QUESTS.find(x => x.id === questId);
    if (!q) return { ok: false, msg: 'Görev bulunamadı.' };

    const p = this.player;
    const now = Date.now();
    const cooldownEnd = (p.questCooldowns || {})[questId] || 0;

    if (now < cooldownEnd) {
      const min = Math.ceil((cooldownEnd - now) / 60000);
      return { ok: false, msg: `Görev bekleme süresinde. (${min} dk)` };
    }
    if (p.energy < q.energy) {
      return { ok: false, msg: 'Yeterli enerji yok!' };
    }

    // Bonus hesapla
    let goldBonus = 1;
    if (p.inventory && p.inventory.includes('phone')) goldBonus = 1.1;

    let cooldownMult = 1;
    if (p.inventory && p.inventory.includes('bike') && questId === 'delivery') cooldownMult = 0.5;

    p.energy -= q.energy;
    const earned = Math.floor(q.gold * goldBonus);
    p.gold += earned;
    p.totalGold += earned;
    p.questsDone = (p.questsDone || 0) + 1;
    if (!p.questCooldowns) p.questCooldowns = {};
    p.questCooldowns[questId] = now + Math.floor(q.cooldown * cooldownMult) * 1000;

    // XP & Level
    const oldLevel = p.level;
    p.xp += q.xp;
    p.totalXp += q.xp;

    let leveled = false;
    while (p.xp >= xpForLevel(p.level)) {
      p.xp -= xpForLevel(p.level);
      p.level++;
      leveled = true;
    }

    this.save();

    return {
      ok: true,
      earned,
      xp: q.xp,
      leveled,
      newLevel: p.level,
      msg: `+${earned} 💰  +${q.xp} XP kazandın!`
    };
  },

  buyItem(itemId) {
    const item = SHOP_ITEMS.find(x => x.id === itemId);
    if (!item) return { ok: false, msg: 'Ürün bulunamadı.' };

    const p = this.player;
    if (p.gold < item.price) return { ok: false, msg: 'Yeterli altın yok!' };

    if (!item.consumable && p.inventory && p.inventory.includes(itemId)) {
      return { ok: false, msg: 'Bu ürüne zaten sahipsin.' };
    }

    p.gold -= item.price;

    if (item.consumable) {
      if (item.effect.energy) {
        p.energy = Math.min(MAX_ENERGY, p.energy + item.effect.energy);
      }
    } else {
      if (!p.inventory) p.inventory = [];
      if (!p.inventory.includes(itemId)) p.inventory.push(itemId);
    }

    this.save();
    return { ok: true, msg: `${item.name} satın alındı!` };
  },

  getEnergyRegenSeconds() {
    const p = this.player;
    if (p.energy >= MAX_ENERGY) return null;
    const elapsed = Math.floor((Date.now() - p.lastEnergyTime) / 1000);
    return ENERGY_REGEN_SEC - (elapsed % ENERGY_REGEN_SEC);
  }
};
