// js/ui.js — Arayüz render işlemleri

let toastTimer = null;

const UI = {

  showToast(msg, duration = 2500) {
    clearTimeout(toastTimer);
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.remove('hidden');
    toastTimer = setTimeout(() => t.classList.add('hidden'), duration);
  },

  showLevelUp(level) {
    const title = getTitle(level);
    document.getElementById('lu-title').textContent = `SEVİYE ${level}!`;
    document.getElementById('lu-sub').textContent = `"${title}" unvanını kazandın. Şehir senin!`;
    document.getElementById('levelup-overlay').classList.remove('hidden');
  },

  closeLevelUp() {
    document.getElementById('levelup-overlay').classList.add('hidden');
  },

  renderStats() {
    const p = Game.player;
    if (!p) return;
    const initials = (Game.username || '?').slice(0, 2).toUpperCase();
    document.getElementById('topbar-avatar').textContent = initials;
    document.getElementById('bar-gold').textContent = p.gold;
    document.getElementById('bar-energy').textContent = p.energy;
    document.getElementById('bar-level').textContent = p.level;
  },

  renderDashboard() {
    const p = Game.player;
    if (!p) return;
    document.getElementById('welcome-name').textContent = `Hoş geldin, ${Game.username}!`;
    document.getElementById('welcome-sub').textContent = getTitle(p.level) + ' — Seviye ' + p.level;
    document.getElementById('welcome-lvl').textContent = p.level;
    document.getElementById('dash-gold').textContent = p.gold;
    document.getElementById('dash-energy').textContent = `${p.energy}/${MAX_ENERGY}`;
    document.getElementById('dash-xp').textContent = p.totalXp || 0;
    document.getElementById('dash-quests').textContent = p.questsDone || 0;

    const container = document.getElementById('quick-quests');
    container.innerHTML = '';
    QUESTS.slice(0, 3).forEach(q => {
      container.appendChild(this._buildQuestCard(q, true));
    });
  },

  renderProfile() {
    const p = Game.player;
    if (!p) return;
    const initials = (Game.username || '?').slice(0, 2).toUpperCase();
    const lvl = p.level;
    const xp = p.xp;
    const needed = xpForLevel(lvl);
    const pct = Math.min(100, Math.round((xp / needed) * 100));

    document.getElementById('profile-avatar').textContent = initials;
    document.getElementById('profile-name').textContent = Game.username;
    document.getElementById('profile-title').textContent = getTitle(lvl);
    document.getElementById('xp-text').textContent = `${xp} / ${needed}`;
    document.getElementById('xp-fill').style.width = pct + '%';
    document.getElementById('stat-level').textContent = lvl;
    document.getElementById('stat-gold-total').textContent = p.totalGold || 0;
    document.getElementById('stat-energy').textContent = `${p.energy}/${MAX_ENERGY}`;
    document.getElementById('stat-quests-done').textContent = p.questsDone || 0;
    document.getElementById('stat-total-xp').textContent = p.totalXp || 0;
    document.getElementById('stat-title').textContent = getTitle(lvl);
  },

  renderQuests() {
    const container = document.getElementById('quest-list');
    container.innerHTML = '';
    QUESTS.forEach(q => {
      container.appendChild(this._buildQuestCard(q, false));
    });
  },

  _buildQuestCard(q, compact) {
    const p = Game.player;
    const now = Date.now();
    const cooldownEnd = (p.questCooldowns || {})[q.id] || 0;
    const onCooldown = now < cooldownEnd;
    const hasEnergy = p.energy >= q.energy;
    const minLeft = onCooldown ? Math.ceil((cooldownEnd - now) / 60000) : 0;

    const card = document.createElement('div');
    card.className = 'quest-card' + (onCooldown ? ' on-cooldown' : (!hasEnergy ? ' no-energy' : ''));

    let btnLabel = 'Başlat';
    if (onCooldown) btnLabel = `⏳ ${minLeft}dk`;
    else if (!hasEnergy) btnLabel = '⚡ Az';

    card.innerHTML = `
      <div class="quest-icon">${q.icon}</div>
      <div class="quest-info">
        <div class="quest-name">${q.name}</div>
        ${!compact ? `<div class="quest-desc">${q.desc}</div>` : ''}
        <div class="quest-rewards">
          <span class="badge badge-gold">+${q.gold} 💰</span>
          <span class="badge badge-xp">+${q.xp} XP</span>
          <span class="badge badge-en">-${q.energy} ⚡</span>
        </div>
      </div>
      <button class="btn-quest" ${(onCooldown || !hasEnergy) ? 'disabled' : ''} data-quest="${q.id}">
        ${btnLabel}
      </button>
    `;

    card.querySelector('.btn-quest').addEventListener('click', () => {
      const result = Game.doQuest(q.id);
      if (!result.ok) { this.showToast(result.msg); return; }
      this.renderStats();
      this.renderDashboard();
      this.renderQuests();
      this.renderProfile();
      if (result.leveled) this.showLevelUp(result.newLevel);
      else this.showToast(result.msg);
    });

    return card;
  },

  renderShop() {
    const p = Game.player;
    if (!p) return;
    if (!p.inventory) p.inventory = [];

    const container = document.getElementById('shop-list');
    const ownedContainer = document.getElementById('owned-list');
    if (!container || !ownedContainer) return;

    container.innerHTML = '';
    ownedContainer.innerHTML = '';

    SHOP_ITEMS.forEach(item => {
      const owned = !item.consumable && p.inventory.includes(item.id);
      const canAfford = p.gold >= item.price;

      const card = document.createElement('div');
      card.className = 'shop-card' + (owned ? ' owned' : '');
      card.innerHTML = `
        <div class="shop-icon">${item.icon}</div>
        <div class="shop-name">${item.name}</div>
        <div class="shop-desc">${item.desc}</div>
        <div class="shop-price">💰 ${item.price} Altın</div>
        <button class="btn-buy" ${(owned || !canAfford) ? 'disabled' : ''}>
          ${owned ? 'Sahipsin ✓' : (!canAfford ? 'Yetersiz 💰' : 'Satın Al')}
        </button>
      `;

      card.querySelector('.btn-buy').addEventListener('click', () => {
        const result = Game.buyItem(item.id);
        this.showToast(result.msg);
        this.renderStats();
        this.renderDashboard();
        this.renderShop();
      });

      container.appendChild(card);
    });

    if (p.inventory.length === 0) {
      ownedContainer.innerHTML = '<p style="color:var(--muted);font-size:0.82rem;padding:0.5rem 0;">Henüz hiçbir şeye sahip değilsin.</p>';
    } else {
      p.inventory.forEach(id => {
        const item = SHOP_ITEMS.find(x => x.id === id);
        if (!item) return;
        const badge = document.createElement('div');
        badge.className = 'owned-badge';
        badge.textContent = `${item.icon} ${item.name}`;
        ownedContainer.appendChild(badge);
      });
    }
  },

  switchPanel(panelId) {
    document.querySelectorAll('.panel').forEach(p => {
      p.style.display = 'none';
    });
    document.querySelectorAll('.nav-tab').forEach(t => {
      t.classList.remove('active');
    });

    const panel = document.getElementById(panelId);
    if (panel) panel.style.display = 'block';

    const tab = document.querySelector(`[data-panel="${panelId}"]`);
    if (tab) tab.classList.add('active');

    if (panelId === 'panel-dashboard') this.renderDashboard();
    if (panelId === 'panel-quests')    this.renderQuests();
    if (panelId === 'panel-profile')   this.renderProfile();
    if (panelId === 'panel-shop')      this.renderShop();
  }
};
