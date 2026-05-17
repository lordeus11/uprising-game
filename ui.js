/* ===== RESET & BASE ===== */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { font-size: 16px; scroll-behavior: smooth; }
body {
  font-family: 'DM Sans', sans-serif;
  background: #0b0b10;
  color: #f0ede8;
  min-height: 100vh;
  overflow-x: hidden;
}

/* ===== VARIABLES ===== */
:root {
  --bg:       #0b0b10;
  --bg2:      #13131c;
  --bg3:      #1c1c28;
  --card:     #17171f;
  --border:   rgba(255,255,255,0.07);
  --border2:  rgba(255,255,255,0.14);
  --accent:   #e8b84b;
  --accent2:  #f5d080;
  --text:     #f0ede8;
  --muted:    #7a7889;
  --gold:     #e8b84b;
  --xp:       #4caf6e;
  --energy:   #e8624b;
  --info:     #5b8dee;
  --danger:   #e05252;
  --success:  #4caf6e;
  --radius:   14px;
  --radius-sm: 8px;
}

/* ===== UTILITIES ===== */
.hidden { display: none !important; }
.screen { min-height: 100vh; }

/* ===== AUTH SCREEN ===== */
#auth-screen {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 1.5rem;
}

.auth-bg {
  position: fixed;
  inset: 0;
  background:
    radial-gradient(ellipse 60% 50% at 20% 30%, rgba(232,184,75,0.08) 0%, transparent 70%),
    radial-gradient(ellipse 50% 40% at 80% 70%, rgba(91,141,238,0.07) 0%, transparent 70%),
    #0b0b10;
  z-index: 0;
}

.auth-center {
  position: relative;
  z-index: 1;
  text-align: center;
  width: 100%;
  max-width: 400px;
}

.auth-logo {
  font-family: 'Bebas Neue', cursive;
  font-size: 3.5rem;
  color: var(--accent);
  letter-spacing: 3px;
  line-height: 1;
  margin-bottom: 0.2rem;
}

.auth-tagline {
  color: var(--muted);
  font-size: 0.8rem;
  letter-spacing: 4px;
  text-transform: uppercase;
  margin-bottom: 2rem;
}

.auth-card {
  background: var(--card);
  border: 0.5px solid var(--border2);
  border-radius: var(--radius);
  padding: 2rem;
  text-align: left;
}

.auth-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 1.5rem;
}

.auth-tab {
  flex: 1;
  padding: 9px;
  border-radius: var(--radius-sm);
  border: 0.5px solid var(--border2);
  background: transparent;
  color: var(--muted);
  font-family: 'DM Sans', sans-serif;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.auth-tab.active {
  background: var(--accent);
  color: #0b0b10;
  border-color: var(--accent);
  font-weight: 700;
}

.auth-form { display: flex; flex-direction: column; gap: 0; }

.field { margin-bottom: 1rem; }

.field label {
  display: block;
  font-size: 0.72rem;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 1.5px;
  margin-bottom: 6px;
  font-weight: 500;
}

.field input {
  width: 100%;
  padding: 11px 14px;
  background: var(--bg2);
  border: 0.5px solid var(--border2);
  border-radius: var(--radius-sm);
  color: var(--text);
  font-family: 'DM Sans', sans-serif;
  font-size: 0.9rem;
  outline: none;
  transition: border-color 0.2s;
}

.field input:focus { border-color: var(--accent); }

.btn-main {
  width: 100%;
  padding: 12px;
  background: var(--accent);
  color: #0b0b10;
  border: none;
  border-radius: var(--radius-sm);
  font-family: 'DM Sans', sans-serif;
  font-weight: 800;
  font-size: 0.95rem;
  cursor: pointer;
  letter-spacing: 0.5px;
  transition: opacity 0.2s, transform 0.1s;
  margin-top: 0.25rem;
}
.btn-main:hover { opacity: 0.88; }
.btn-main:active { transform: scale(0.98); }

.auth-error {
  color: var(--danger);
  font-size: 0.82rem;
  text-align: center;
  margin-top: 0.75rem;
  padding: 8px;
  background: rgba(224,82,82,0.1);
  border-radius: var(--radius-sm);
  border: 0.5px solid rgba(224,82,82,0.3);
}

/* ===== GAME SCREEN ===== */
#game-screen {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
#game-screen.hidden { display: none !important; }

/* TOPBAR */
.topbar {
  background: var(--card);
  border-bottom: 0.5px solid var(--border);
  padding: 0.65rem 1rem;
  display: flex;
  align-items: center;
  gap: 10px;
  position: sticky;
  top: 0;
  z-index: 100;
}

.topbar-logo {
  font-family: 'Bebas Neue', cursive;
  font-size: 1.3rem;
  color: var(--accent);
  letter-spacing: 2px;
  flex-shrink: 0;
}

.topbar-stats {
  display: flex;
  gap: 6px;
  flex: 1;
  flex-wrap: wrap;
}

.stat-pill {
  display: flex;
  align-items: center;
  gap: 4px;
  background: var(--bg2);
  border: 0.5px solid var(--border);
  border-radius: 20px;
  padding: 4px 10px;
  font-size: 0.78rem;
  font-weight: 600;
}
.stat-pill.gold { color: var(--gold); border-color: rgba(232,184,75,0.25); }
.stat-pill.energy { color: var(--energy); border-color: rgba(232,98,75,0.25); }
.stat-pill.level { color: var(--info); border-color: rgba(91,141,238,0.25); }

.topbar-right {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

.avatar-sm {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--accent);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 0.75rem;
  color: #0b0b10;
  cursor: pointer;
}

.btn-logout {
  background: transparent;
  border: 0.5px solid var(--border2);
  color: var(--muted);
  border-radius: 6px;
  padding: 4px 10px;
  font-size: 0.75rem;
  font-family: 'DM Sans', sans-serif;
  cursor: pointer;
  transition: all 0.2s;
}
.btn-logout:hover { border-color: var(--danger); color: var(--danger); }

/* NAV TABS */
.game-nav {
  background: var(--bg2);
  border-bottom: 0.5px solid var(--border);
  display: flex;
  overflow-x: auto;
  scrollbar-width: none;
}
.game-nav::-webkit-scrollbar { display: none; }

.nav-tab {
  flex-shrink: 0;
  padding: 12px 18px;
  background: transparent;
  border: none;
  border-bottom: 2px solid transparent;
  color: var(--muted);
  font-family: 'DM Sans', sans-serif;
  font-size: 0.82rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}
.nav-tab:hover { color: var(--text); }
.nav-tab.active {
  color: var(--accent);
  border-bottom-color: var(--accent);
  font-weight: 700;
}

/* MAIN CONTENT */
.game-main {
  flex: 1;
  padding: 1rem;
  max-width: 720px;
  margin: 0 auto;
  width: 100%;
}

.panel { display: none; }
.panel.active { display: block; }

/* SECTION TITLE */
.section-title {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 2.5px;
  color: var(--muted);
  margin: 1.25rem 0 0.75rem;
  padding-left: 10px;
  border-left: 3px solid var(--accent);
  font-weight: 600;
}

/* WELCOME BANNER */
.welcome-banner {
  background: linear-gradient(135deg, var(--bg3) 0%, var(--card) 100%);
  border: 0.5px solid var(--border2);
  border-radius: var(--radius);
  padding: 1.25rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}
.welcome-banner h2 { font-size: 1.2rem; font-weight: 700; }
.welcome-banner p { color: var(--muted); font-size: 0.82rem; margin-top: 3px; }
.welcome-level {
  text-align: center;
  background: var(--accent);
  color: #0b0b10;
  border-radius: 10px;
  padding: 8px 14px;
  flex-shrink: 0;
}
.welcome-level span { display: block; font-family: 'Bebas Neue', cursive; font-size: 2rem; line-height: 1; }
.welcome-level small { font-size: 0.6rem; font-weight: 700; letter-spacing: 2px; }

/* DASH GRID */
.dash-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin-bottom: 0.5rem;
}

.dash-card {
  background: var(--card);
  border: 0.5px solid var(--border);
  border-radius: var(--radius);
  padding: 1.1rem;
  text-align: center;
  transition: border-color 0.2s;
}
.dash-card:hover { border-color: var(--border2); }

.dash-icon { font-size: 1.5rem; margin-bottom: 6px; }
.dash-val { font-family: 'Bebas Neue', cursive; font-size: 1.8rem; line-height: 1; }
.dash-lbl { font-size: 0.7rem; color: var(--muted); text-transform: uppercase; letter-spacing: 1px; margin-top: 3px; }
.energy-regen { font-size: 0.68rem; color: var(--energy); margin-top: 4px; }

.gold-card .dash-val { color: var(--gold); }
.energy-card .dash-val { color: var(--energy); }
.xp-card .dash-val { color: var(--xp); }
.quest-card-mini .dash-val { color: var(--info); }

/* QUICK QUESTS */
.quick-quests {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

/* QUEST LIST */
.quest-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.quest-card {
  background: var(--card);
  border: 0.5px solid var(--border);
  border-radius: var(--radius);
  padding: 1rem 1.1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: border-color 0.2s, opacity 0.2s;
}
.quest-card:hover { border-color: var(--border2); }
.quest-card.on-cooldown { opacity: 0.5; }
.quest-card.no-energy { opacity: 0.6; }

.quest-icon {
  width: 46px;
  height: 46px;
  border-radius: 10px;
  background: var(--bg3);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  flex-shrink: 0;
}

.quest-info { flex: 1; min-width: 0; }
.quest-name { font-weight: 700; font-size: 0.9rem; }
.quest-desc { font-size: 0.76rem; color: var(--muted); margin-top: 2px; }

.quest-rewards {
  display: flex;
  gap: 5px;
  margin-top: 6px;
  flex-wrap: wrap;
}

.badge {
  font-size: 0.68rem;
  padding: 2px 8px;
  border-radius: 20px;
  font-weight: 700;
}
.badge-gold { background: rgba(232,184,75,0.15); color: var(--gold); }
.badge-xp   { background: rgba(76,175,110,0.15); color: var(--xp); }
.badge-en   { background: rgba(232,98,75,0.15);  color: var(--energy); }

.btn-quest {
  padding: 8px 16px;
  border-radius: var(--radius-sm);
  font-family: 'DM Sans', sans-serif;
  font-weight: 700;
  font-size: 0.8rem;
  cursor: pointer;
  border: none;
  background: var(--accent);
  color: #0b0b10;
  white-space: nowrap;
  flex-shrink: 0;
  transition: opacity 0.2s, transform 0.1s;
}
.btn-quest:hover:not(:disabled) { opacity: 0.85; }
.btn-quest:active:not(:disabled) { transform: scale(0.97); }
.btn-quest:disabled {
  background: var(--bg3);
  color: var(--muted);
  cursor: not-allowed;
}

/* PROFILE */
.profile-hero {
  background: var(--card);
  border: 0.5px solid var(--border2);
  border-radius: var(--radius);
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1.25rem;
}

.avatar-lg {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: var(--accent);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 1.6rem;
  color: #0b0b10;
  flex-shrink: 0;
  border: 3px solid var(--bg3);
}

.profile-info { flex: 1; min-width: 0; }
.profile-name { font-weight: 700; font-size: 1.15rem; }
.profile-title { color: var(--accent); font-size: 0.8rem; font-weight: 600; margin-top: 2px; }

.xp-bar-wrap { margin-top: 10px; }
.xp-label {
  display: flex;
  justify-content: space-between;
  font-size: 0.72rem;
  color: var(--muted);
  margin-bottom: 5px;
}
.xp-bar {
  height: 7px;
  background: var(--bg3);
  border-radius: 4px;
  overflow: hidden;
}
.xp-fill {
  height: 100%;
  background: var(--xp);
  border-radius: 4px;
  transition: width 0.5s ease;
}

.stats-full {
  margin-top: 1rem;
  background: var(--card);
  border: 0.5px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
}

.stat-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.85rem 1.1rem;
  font-size: 0.88rem;
  border-bottom: 0.5px solid var(--border);
}
.stat-row:last-child { border-bottom: none; }
.stat-row span { color: var(--muted); }
.stat-row strong { font-weight: 700; color: var(--text); }

/* SHOP */
.shop-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 10px;
}

.shop-card {
  background: var(--card);
  border: 0.5px solid var(--border);
  border-radius: var(--radius);
  padding: 1.1rem;
  display: flex;
  flex-direction: column;
  gap: 6px;
  transition: border-color 0.2s;
}
.shop-card:hover { border-color: var(--border2); }
.shop-card.owned { opacity: 0.5; }

.shop-icon { font-size: 2rem; }
.shop-name { font-weight: 700; font-size: 0.9rem; }
.shop-desc { font-size: 0.75rem; color: var(--muted); }
.shop-price { color: var(--gold); font-weight: 700; font-size: 0.85rem; margin-top: 2px; }

.btn-buy {
  padding: 7px;
  border-radius: var(--radius-sm);
  font-family: 'DM Sans', sans-serif;
  font-weight: 700;
  font-size: 0.8rem;
  cursor: pointer;
  border: none;
  background: var(--accent);
  color: #0b0b10;
  transition: opacity 0.2s;
  margin-top: 4px;
}
.btn-buy:hover:not(:disabled) { opacity: 0.85; }
.btn-buy:disabled { background: var(--bg3); color: var(--muted); cursor: not-allowed; }

.owned-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 0.75rem 0;
}

.owned-badge {
  background: var(--bg3);
  border: 0.5px solid var(--border2);
  border-radius: 20px;
  padding: 5px 12px;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  gap: 6px;
}

/* OVERLAY */
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.8);
  z-index: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.overlay-box {
  background: var(--card);
  border: 2px solid var(--accent);
  border-radius: 20px;
  padding: 2.5rem 2rem;
  text-align: center;
  max-width: 300px;
  width: 100%;
}

.overlay-emoji { font-size: 3.5rem; margin-bottom: 0.5rem; }
.overlay-title {
  font-family: 'Bebas Neue', cursive;
  font-size: 2rem;
  color: var(--accent);
  letter-spacing: 2px;
}
.overlay-sub { color: var(--muted); font-size: 0.85rem; margin: 8px 0 1.5rem; }

/* TOAST */
.toast {
  position: fixed;
  bottom: 1.5rem;
  left: 50%;
  transform: translateX(-50%) translateY(0);
  background: var(--card);
  border: 0.5px solid var(--accent);
  color: var(--text);
  padding: 10px 22px;
  border-radius: 30px;
  font-size: 0.85rem;
  font-weight: 600;
  z-index: 999;
  white-space: nowrap;
  animation: toastIn 0.3s ease;
  pointer-events: none;
}
.toast.hidden { display: none !important; }

@keyframes toastIn {
  from { opacity: 0; transform: translateX(-50%) translateY(20px); }
  to   { opacity: 1; transform: translateX(-50%) translateY(0); }
}

/* RESPONSIVE */
@media (max-width: 480px) {
  .topbar-logo { font-size: 1.1rem; }
  .stat-pill { font-size: 0.72rem; padding: 3px 8px; }
  .game-main { padding: 0.75rem; }
  .dash-grid { grid-template-columns: repeat(2, 1fr); gap: 8px; }
  .quest-card { flex-wrap: wrap; }
  .shop-list { grid-template-columns: 1fr 1fr; }
  .profile-hero { flex-direction: column; text-align: center; }
}
