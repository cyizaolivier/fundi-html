

const SESSION_KEY = 'fundilink_session';
const LOCAL = { users: 'fundilink_local_users', bookings: 'fundilink_local_bookings', profiles: 'fundilink_local_profiles' };

const lsGet = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } };
const lsSet = (k, v) => localStorage.setItem(k, JSON.stringify(v));

// Returns parsed JSON from an API call, or null if PHP isn't available.
async function callApi(path, body) {
  try {
    const res = await fetch(path, body === undefined ? {} : {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),
    });
    const data = await res.json();
    return data && typeof data.ok === 'boolean' ? data : null;
  } catch { return null; }
}

/* ---------------- session (who is logged in on this device) ---------------- */
function saveSession(u) { lsSet(SESSION_KEY, { username: u.username, role: u.role, name: u.name }); }
function getSession() { return lsGet(SESSION_KEY, null); }
function clearSession() { localStorage.removeItem(SESSION_KEY); }
function requireRole(role) {
  const s = getSession();
  if (!s || s.role !== role) { window.location.href = 'login.html'; return null; }
  return s;
}
function logout() { clearSession(); window.location.href = 'index.html'; }

/* ---------------- accounts ---------------- */
async function handleLogin(username, password, role) {
  const api = await callApi('api/login.php', { username, password, role });
  if (api) {
    if (!api.ok) return { ok: false, message: api.message };
    saveSession(api.user); return { ok: true, user: api.user };
  }
  const all = [...SEED.users, ...lsGet(LOCAL.users, [])];
  const u = all.find((x) => x.username.toLowerCase() === username.toLowerCase() && x.password === password && x.role === role);
  if (!u) return { ok: false, message: 'Incorrect username, password, or account type.' };
  saveSession(u); return { ok: true, user: u };
}

async function handleRegister(newUser) {
  const api = await callApi('api/register.php', newUser);
  if (api) {
    if (!api.ok) return { ok: false, message: api.message };
    saveSession(api.user); return { ok: true, user: api.user };
  }
  const all = [...SEED.users, ...lsGet(LOCAL.users, [])];
  if (all.some((x) => x.username.toLowerCase() === newUser.username.toLowerCase())) return { ok: false, message: 'That username is already taken.' };
  lsSet(LOCAL.users, [...lsGet(LOCAL.users, []), newUser]);
  saveSession(newUser); return { ok: true, user: newUser };
}

/* ---------------- fundis ---------------- */
async function getFundis() {
  const api = await callApi('api/fundis.php');
  if (api && api.ok) return api.fundis;
  const profiles = lsGet(LOCAL.profiles, {});
  const list = [...SEED.fundis];
  lsGet(LOCAL.users, []).filter((u) => u.role === 'fundi').forEach((u) => {
    list.push({ id: 'r-' + u.username, username: u.username, name: u.name, trade: u.trade || 'Other',
      location: u.location || '', rate: null, rateUnit: 'per hour', rating: null, bio: '' });
  });
  return list.map((f) => ({ ...f, ...(profiles[f.username] || {}) }));
}

async function saveProfile(username, profile) {
  const api = await callApi('api/profile.php', { username, ...profile });
  if (api) return api;
  const all = lsGet(LOCAL.profiles, {});
  all[username] = profile; lsSet(LOCAL.profiles, all);
  return { ok: true };
}

/* ---------------- bookings ---------------- */
async function loadAllBookings() {
  const api = await callApi('api/bookings.php', { action: 'list' });
  if (api && api.ok) return api.bookings;
  const status = lsGet(LOCAL.bookings + '_status', {});
  return [...SEED.bookings.map((b) => ({ ...b, status: status[b.id] || b.status })), ...lsGet(LOCAL.bookings, [])]
    .map((b) => ({ ...b, status: status[b.id] || b.status }));
}

async function addBooking(booking) {
  const api = await callApi('api/bookings.php', { action: 'add', booking });
  if (api) return api;
  const b = { ...booking, id: 'local-' + Date.now(), status: 'pending' };
  lsSet(LOCAL.bookings, [...lsGet(LOCAL.bookings, []), b]);
  return { ok: true, booking: b };
}

async function setBookingStatus(id, status) {
  const api = await callApi('api/bookings.php', { action: 'status', id, status });
  if (api) return api;
  const s = lsGet(LOCAL.bookings + '_status', {}); s[id] = status; lsSet(LOCAL.bookings + '_status', s);
  return { ok: true };
}

function renderStatusPill(status) { return `<span class="status-pill ${status}">${status}</span>`; }

function esc(s) { return String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }
function priceLabel(f) { return f.rate ? `${Number(f.rate).toLocaleString()} RWF <small>${esc(f.rateUnit || 'per hour')}</small>` : '<small>Rate on request</small>'; }
