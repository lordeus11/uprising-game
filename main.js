// js/storage.js — localStorage yönetimi

const Storage = {
  USERS_KEY: 'uprising_users',
  SESSION_KEY: 'uprising_session',

  getUsers() {
    try { return JSON.parse(localStorage.getItem(this.USERS_KEY) || '{}'); }
    catch { return {}; }
  },

  saveUsers(users) {
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
  },

  getSession() {
    try { return JSON.parse(localStorage.getItem(this.SESSION_KEY) || 'null'); }
    catch { return null; }
  },

  saveSession(username) {
    localStorage.setItem(this.SESSION_KEY, JSON.stringify(username));
  },

  clearSession() {
    localStorage.removeItem(this.SESSION_KEY);
  },

  getPlayer(username) {
    const users = this.getUsers();
    return users[username] || null;
  },

  savePlayer(username, data) {
    const users = this.getUsers();
    users[username] = data;
    this.saveUsers(users);
  },

  register(username, password) {
    const users = this.getUsers();
    if (users[username]) return { ok: false, error: 'Bu kullanıcı adı zaten alınmış.' };
    if (username.length < 3) return { ok: false, error: 'Kullanıcı adı en az 3 karakter olmalı.' };
    if (password.length < 4) return { ok: false, error: 'Şifre en az 4 karakter olmalı.' };

    users[username] = {
      password,
      gold: 0,
      xp: 0,
      level: 1,
      totalXp: 0,
      totalGold: 0,
      energy: MAX_ENERGY,
      lastEnergyTime: Date.now(),
      questCooldowns: {},
      questsDone: 0,
      inventory: []
    };
    this.saveUsers(users);
    return { ok: true };
  },

  login(username, password) {
    const users = this.getUsers();
    if (!users[username]) return { ok: false, error: 'Böyle bir hesap bulunamadı.' };
    if (users[username].password !== password) return { ok: false, error: 'Şifre yanlış.' };
    return { ok: true };
  }
};
