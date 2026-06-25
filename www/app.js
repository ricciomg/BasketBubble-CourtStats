// ── AdMob plugin (Capacitor) ─────────────────────────────────────
const isCapacitor = window.Capacitor?.isNativePlatform?.() === true;// permette getione web senza crash. 
const { AdMob, BannerAdSize, BannerAdPosition } = isCapacitor ? window.Capacitor.Plugins : {};

// ═══════════════════════════════════════════════════════════════════
// EVENT DELEGATION — sostituisce tutti gli onclick/onchange/oninput
// inline per conformità CSP senza 'unsafe-inline'.Service Migration | Migration Tool reporting requirements
// ═══════════════════════════════════════════════════════════════════

// Dispatch table: mappa ogni stringa di azione alla funzione corrispondente.
// Se aggiungi nuove funzioni globali, registrale qui.
const ACTION_MAP = {
  'addOppPlayer()':                () => addOppPlayer(),
  'addPlayer()':                   () => addPlayer(),
  'addTimeout()':                  () => addTimeout(),
  'changeOppScore(-1)':            () => changeOppScore(-1),
  'changeOppScore(1)':             () => changeOppScore(1),
  'changeOppScore(2)':             () => changeOppScore(2),
  'changeOppScore(3)':             () => changeOppScore(3),
  'closeCourtModal()':             () => closeCourtModal(),
  "closeModal('modal-add-player')":    () => closeModal('modal-add-player'),
  "closeModal('modal-delete-match')":  () => closeModal('modal-delete-match'),
  "closeModal('modal-edit-match')":    () => closeModal('modal-edit-match'),
  "closeModal('modal-new-match')":     () => closeModal('modal-new-match'),
  "closeModal('modal-next-period')":   () => closeModal('modal-next-period'),
  "closeModal('modal-opp-foul')":      () => closeModal('modal-opp-foul'),
  "closeModal('modal-opp-roster')":    () => closeModal('modal-opp-roster'),
  "closeModal('modal-rollback')":      () => closeModal('modal-rollback'),
  "closeModal('modal-starting5')":     () => closeModal('modal-starting5'),
  "closeModal('modal-sub')":           () => closeModal('modal-sub'),
  "closeModal('modal-timeout')":       () => closeModal('modal-timeout'),
  "closeModal('modal-timer-edit')":    () => closeModal('modal-timer-edit'),
  'closePlayerModal()':            () => closePlayerModal(),
  'closeZoomMap()':                () => closeZoomMap(),
  'confirmRollback()':             () => confirmRollback(),
  'confirmStarting5()':            () => confirmStarting5(),
  'confirmSub()':                  () => confirmSub(),
  'createMatch()':                 () => createMatch(),
  'doContinue()':                  () => doContinue(),
  'doDeleteMatch()':               () => doDeleteMatch(),
  'doEndMatch()':                  () => doEndMatch(),
  'driveDisconnect()':             () => driveDisconnect(),
  'driveToggle()':                 () => driveToggle(),
  'exportReport()':                () => exportReport(),
  "openModal('modal-add-player')": () => openModal('modal-add-player'),
  'openNewMatch()':                () => openNewMatch(),
  'openNextPeriodModal()':         () => openNextPeriodModal(),
  'openOppFoulModal()':            () => openOppFoulModal(),
  'openOppRosterModal()':          () => openOppRosterModal(),
  'openRollback()':                () => openRollback(),
  'openStarting5()':               () => openStarting5(),
  'openSubModal()':                () => openSubModal(),
  'openTimeoutModal()':            () => openTimeoutModal(),
  'recordFT(false)':               () => recordFT(false),
  'recordFT(true)':                () => recordFT(true),
  'recordShot(2,false)':           () => recordShot(2, false),
  'recordShot(2,true)':            () => recordShot(2, true),
  'recordShot(3,false)':           () => recordShot(3, false),
  'recordShot(3,true)':            () => recordShot(3, true),
  "recordStat('assist')":          () => recordStat('assist'),
  "recordStat('block')":           () => recordStat('block'),
  "recordStat('block_against')":   () => recordStat('block_against'),
  "recordStat('foul')":            () => recordStat('foul'),
  "recordStat('foul_drawn')":      () => recordStat('foul_drawn'),
  "recordStat('reb_def')":         () => recordStat('reb_def'),
  "recordStat('reb_off')":         () => recordStat('reb_off'),
  "recordStat('steal')":           () => recordStat('steal'),
  "recordStat('turnover')":        () => recordStat('turnover'),
  'removeTeamLogo()':              () => removeTeamLogo(),
  "recordEditFT(false)":           () => recordEditFT(false),
  "recordEditFT(true)":            () => recordEditFT(true),
  "recordEditShot(2,false)":       () => recordEditShot(2, false),
  "recordEditShot(2,true)":        () => recordEditShot(2, true),
  "recordEditShot(3,false)":       () => recordEditShot(3, false),
  "recordEditShot(3,true)":        () => recordEditShot(3, true),
  "recordEditStat('assist')":      () => recordEditStat('assist'),
  "recordEditStat('block')":       () => recordEditStat('block'),
  "recordEditStat('block_against')": () => recordEditStat('block_against'),
  "recordEditStat('foul')":        () => recordEditStat('foul'),
  "recordEditStat('foul_drawn')":  () => recordEditStat('foul_drawn'),
  "recordEditStat('reb_def')":     () => recordEditStat('reb_def'),
  "recordEditStat('reb_off')":     () => recordEditStat('reb_off'),
  "recordEditStat('steal')":       () => recordEditStat('steal'),
  "recordEditStat('turnover')":    () => recordEditStat('turnover'),
  "switchEditTab('log',this)":     (el) => switchEditTab('log', el),
  "switchEditTab('stats',this)":   (el) => switchEditTab('stats', el),
  'saveClientId()':                () => saveClientId(),
  "showPage('live',this)":         (el) => showPage('live', el),
  "showPage('matches',this)":      (el) => showPage('matches', el),
  "showPage('report',this)":       (el) => showPage('report', el),
  "showPage('roster',this)":       (el) => showPage('roster', el),
  "showPage('settings',this)":     (el) => showPage('settings', el),
  "switchLiveTab('log',this)":     (el) => switchLiveTab('log', el),
  "switchLiveTab('report',this)":  (el) => switchLiveTab('report', el),
  "switchLiveTab('stats',this)":   (el) => switchLiveTab('stats', el),
  'timerApplyEdit()':              () => timerApplyEdit(),
  'timerEdit()':                   () => timerEdit(),
  'timerReset()':                  () => timerReset(),
  'timerToggle()':                 () => timerToggle(),
  'toggleDriveFeature()':          () => toggleDriveFeature(),
  'toggleLanguage()':              () => toggleLanguage(),
  "selectOnboardingLanguage('it')": () => selectOnboardingLanguage('it'),
  "selectOnboardingLanguage('en')": () => selectOnboardingLanguage('en'),
  'acceptDisclaimer()':            () => acceptDisclaimer(),
  'toggleOppRoster()':             () => toggleOppRoster(),
  'toggleReportExport()':          () => toggleReportExport(),
  'toggleZoneSelection()':         () => toggleZoneSelection(),
};

// pickZone(event,this) è speciale: viene usato sulle zone SVG generate staticamente
// e richiede event + element. Lo gestiamo separatamente.
const ZONE_ACTION = 'pickZone(event,this)';

// LOGO BasketBubble
//tramite icons/

// Imposta il logo ovunque appaia nella pagina
document.querySelectorAll('img.app-logo-fixed').forEach(img => {
  img.src = 'icons/icon-maskable-512x512.png';
}

);

// LOGO BasketBubble in prima modale
//document.getElementById('onboarding-logo').src = LOGO_BASE64;
document.getElementById('onboarding-logo').src = 'icons/icon-maskable-512x512.png';

// Listener delegato per click
document.addEventListener('click', function(e) {
  //console.log('CLICK RICEVUTO', e.target)
  const el = e.target.closest('[data-action]');
  if (!el) return;

    //console.log('clicked el:', el);
    //console.log('stat-btn found:', e.target.closest('.stat-btn'));

  const action = el.getAttribute('data-action');

  // ── Flash visivo sul bottone premuto ──
  const _btn = e.target.closest('.stat-btn');
  if (_btn) {
    _btn.classList.remove('flashing');
    void _btn.offsetWidth;
    _btn.classList.add('flashing');
    _btn.addEventListener('animationend', () => _btn.classList.remove('flashing'), { once: true });
  }

  if (action === ZONE_ACTION) { pickZone(e, el); return; }

  // ── Azioni con parametri dinamici (data-* attributes) ────────────
  if (action === 'deletePlayer')        { deletePlayer(el.dataset.id); return; }
  if (action === 'toggleCheck')         { toggleCheck(el.closest('.check-row')); return; }
  if (action === 'toggleS5')            { toggleS5(el.closest('.check-row')); return; }
  if (action === 'liveReportSort') {
    const tbl = el.closest('table');
    const col = el.dataset.col;
    const curCol = tbl.dataset.sortCol;
    const curDir = tbl.dataset.sortDir || 'desc';
    const newDir = (col === curCol && curDir === 'desc') ? 'asc' : 'desc';
    renderLiveReport(col, newDir);
    return;
  }
  if (action === 'openMatchAction')     { openMatchAction(parseInt(el.dataset.idx)); return; }
  if (action === 'selectPlayer')        { selectPlayer(parseInt(el.dataset.idx)); return; }
  if (action === 'deleteLogEntry')      { deleteLogEntry(el.dataset.logid); return; }
  if (action === 'showPlayer')          { showPlayer(el.dataset.id); return; }
  if (action === 'expTab')              { expTab(el.dataset.tab); return; }
  if (action === 'closePP')             { closePP(); return; }
  if (action === 'ppTab')               { ppTab(el.dataset.tab); return; }
  if (action === 'openPlayerModal')     { openPlayerModal(el.dataset.matchid, el.dataset.playerid); return; }
  if (action === 'shotMapTab')          { shotMapTab(el.dataset.tab, el.dataset.prefix); return; }
  if (action === 'deleteOppPlayer')     { deleteOppPlayer(el.dataset.id); return; }
  if (action === 'recordOppFoulByIdx')  { recordOppFoulByIdx(el); return; }
  if (action === 'confirmDeleteMatch')  { confirmDeleteMatch(parseInt(el.dataset.idx)); return; }
  if (action === 'openEditMatch')       { openEditMatch(parseInt(el.dataset.idx)); return; }
  if (action === 'deleteEditLogEntry')  { deleteEditLogEntry(el.dataset.logid); return; }
  if (action === 'setEditQuarter')      { setEditQuarter(el.dataset.q); return; }
  if (action === 'setEditPlayer')       { setEditPlayer(parseInt(el.dataset.idx)); return; }
  if (action === 'closeZoomMap')        { closeZoomMap(); return; }
  if (action === 'openZoomMap')         { openZoomMap(el.dataset.container, el.dataset.title); return; }
  
  // ── Azioni semplici dalla ACTION_MAP ─────────────────────────────
  const fn = ACTION_MAP[action];
  if (fn) { fn(el); }
  else { console.warn('[CSP] Azione non registrata in ACTION_MAP:', action); }
}, false);

// Listener delegato per doppio click
document.addEventListener('dblclick', function(e) {
  const el = e.target.closest('[data-dblclick]');
  if (!el) return;
  const action = el.getAttribute('data-dblclick');
  if (action === 'openZoomMap') {
    openZoomMap(el.dataset.container, el.dataset.title);
  }
});


// Listener delegato per change (select, input[type=file])
document.addEventListener('change', function(e) {
  const el = e.target.closest('[data-change]');
  if (!el) return;
  const action = el.getAttribute('data-change');
  if (action === 'renderReport()')        { renderReport(); }
  else if (action === 'uploadTeamLogo(this)') { uploadTeamLogo(el); }
  else if (action === 'updateExportMap()') { updateExportMap(); }
  else if (action === 'refreshShotMap()') { refreshShotMap(); }
  else if (action === 'refreshPlayerMap') {
    refreshPlayerMap(el.dataset.matchid, el.dataset.playerid);
  }
  else { console.warn('[CSP] data-change non registrato:', action); }
}, false);

// Listener delegato per input (text input con debounce)
document.addEventListener('input', function(e) {
  const el = e.target.closest('[data-input]');
  if (!el) return;
  const action = el.getAttribute('data-input');
  if (action === 'debounceSaveClientId()') { debounceSaveClientId(); }
  else { console.warn('[CSP] data-input non registrato:', action); }
}, false);




// ═══════════════════════════════════════════════════════════════════
// SECURE STORAGE — cifra/decifra localStorage con AES-GCM 256-bit
// Usa Web Crypto API (nativa, disponibile in tutti i browser moderni
// e in Android WebView API 23+).
//
// La chiave di cifratura è derivata da una device-key fissa generata
// al primo avvio e conservata in localStorage in chiaro (essa stessa
// non è un segreto, ma rende i dump di localStorage illeggibili senza
// il contesto del device/profilo browser).
// Per sicurezza superiore (es. PIN utente) si può passare una password
// a deriveKey() — stub già predisposto.
// ═══════════════════════════════════════════════════════════════════

const SecureStorage = (() => {
  const DEVICE_KEY_ITEM = 'cs4_dk';   // chiave raw hex in localStorage (non cifrata)
  const ALGO = { name: 'AES-GCM', length: 256 };
  const IV_LEN = 12; // byte — standard per AES-GCM

  let _cryptoKey = null; // CryptoKey object, inizializzato una volta sola

  // --- Utilità hex <-> Uint8Array ---
  function hexToBytes(hex) {
    const arr = new Uint8Array(hex.length / 2);
    for (let i = 0; i < arr.length; i++)
      arr[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
    return arr;
  }
  function bytesToHex(bytes) {
    return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
  }

  // --- Genera o recupera la device key raw (32 byte casuali) ---
  async function getOrCreateDeviceKey() {
    let hex = localStorage.getItem(DEVICE_KEY_ITEM);
    if (!hex || hex.length !== 64) {
      const raw = crypto.getRandomValues(new Uint8Array(32));
      hex = bytesToHex(raw);
      localStorage.setItem(DEVICE_KEY_ITEM, hex);
    }
    return hexToBytes(hex);
  }

  // --- Importa la raw key come CryptoKey AES-GCM ---
  async function getKey() {
    if (_cryptoKey) return _cryptoKey;
    const raw = await getOrCreateDeviceKey();
    _cryptoKey = await crypto.subtle.importKey(
      'raw', raw, ALGO, false, ['encrypt', 'decrypt']
    );
    return _cryptoKey;
  }

  // --- Cifra una stringa → stringa Base64 (iv + ciphertext) ---
  async function encrypt(plaintext) {
    const key = await getKey();
    const iv = crypto.getRandomValues(new Uint8Array(IV_LEN));
    const encoded = new TextEncoder().encode(plaintext);
    const cipher = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, encoded);
    // Concateniamo iv + ciphertext e convertiamo in Base64
    const combined = new Uint8Array(IV_LEN + cipher.byteLength);
    combined.set(iv, 0);
    combined.set(new Uint8Array(cipher), IV_LEN);
    // Evitiamo lo spread operator (...combined) che causa stack overflow
    // su array grandi. Usiamo un approccio chunk-based sicuro.
    let binary = '';
    const chunkSize = 8192;
    for (let i = 0; i < combined.length; i += chunkSize) {
      binary += String.fromCharCode(...combined.subarray(i, i + chunkSize));
    }
    return btoa(binary);
  }

  // --- Decifra una stringa Base64 → stringa plaintext ---
  async function decrypt(b64) {
    try {
      const key = await getKey();
      const combined = Uint8Array.from(atob(b64), c => c.charCodeAt(0));
      const iv = combined.slice(0, IV_LEN);
      const ciphertext = combined.slice(IV_LEN);
      const plain = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, ciphertext);
      return new TextDecoder().decode(plain);
    } catch {
      return null; // dati corrotti o vecchio formato non cifrato
    }
  }

  // funzione per convertire logo APP in base 64
  async function getAppLogoBase64() {
  try {
    const response = await fetch('icons/icon-maskable-512x512.png');
    const blob = await response.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  } catch(e) {
    return '';
  }
}

  // --- API pubblica ---

  /**
   * Salva un valore cifrato in localStorage.
   * @param {string} key   - chiave localStorage
   * @param {string} value - valore in chiaro (stringa)
   */
  async function setItem(key, value) {
    const encrypted = await encrypt(value);
    localStorage.setItem(key, encrypted);
  }

  /**
   * Legge e decifra un valore da localStorage.
   * Se il valore non è cifrato (primo avvio dopo upgrade) lo restituisce
   * in chiaro e lo riscrive cifrato automaticamente.
   * @returns {string|null}
   */
  async function getItem(key) {
    const stored = localStorage.getItem(key);
    if (!stored) return null;
    // Tentiamo la decifratura
    const decrypted = await decrypt(stored);
    if (decrypted !== null) return decrypted;
    // Fallback: il valore era in chiaro (migrazione da versione precedente)
    // Lo riscriviamo cifrato e restituiamo il valore originale
    await setItem(key, stored);
    return stored;
  }

  /**
   * Rimuove una chiave da localStorage (non serve cifratura).
   */
  function removeItem(key) {
    localStorage.removeItem(key);
  }

  return { setItem, getItem, removeItem };
})();


// ═══ SECURITY UTILITIES ═══
/**
 * esc() — escapes HTML special characters to prevent XSS.
 * USARE SEMPRE quando si inserisce testo utente in innerHTML.
 */
function esc(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/**
 * sanitizeState() — valida e ripulisce lo state letto da localStorage
 * per evitare prototype pollution e dati malformati.
 */
function sanitizeState(raw) {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return {};
  // Copia solo le chiavi attese, scartando tutto il resto
  const safe = Object.create(null);
  const allowed = ['roster','matches','deletedMatchIds','deletedPlayerIds'];
  for (const k of allowed) {
    if (k in raw) safe[k] = raw[k];
  }
  return safe;
}

/**
 * safeParseJSON() — parse JSON con fallback; ritorna sempre un oggetto.
 */
function safeParseJSON(str, fallback = {}) {
  try {
    const parsed = JSON.parse(str);
    return (parsed && typeof parsed === 'object') ? parsed : fallback;
  } catch { return fallback; }
}

// ═══ STATE ═══ (init asincrono — vedi initApp())
let state = { roster:[], matches:[], deletedMatchIds:[], deletedPlayerIds:[] };
let settings = {};
async function saveSettings() { await SecureStorage.setItem('courtstats4_settings', JSON.stringify(settings)); }

function applyTeamLogo() {
  const logos = document.querySelectorAll('.page-logo');
  logos.forEach(img => {
    if(settings.teamLogo) {
      img.src = settings.teamLogo;
      img.style.display = '';
    } else {
      img.style.display = 'none';
    }
  });
}

async function uploadTeamLogo(input) {
  const file = input.files[0];
  if(!file) return;
  if(!file.type.startsWith('image/')) { toast('Seleziona un file immagine'); return; }
  if(file.size > 2 * 1024 * 1024) { toast('Immagine troppo grande (max 2 MB)'); return; }
  const reader = new FileReader();
  reader.onload = async function(e) {
    settings.teamLogo = e.target.result;
    await saveSettings();
    applyTeamLogo();
    renderSettings();
    toast('✅ Logo aggiornato!');
  };
  reader.readAsDataURL(file);
}

async function removeTeamLogo() {
  settings.teamLogo = null;
  await saveSettings();
  applyTeamLogo();
  renderSettings();
  toast('🗑️ Logo rimosso');
}

let liveMatch         = null;
let selectedPlayerIdx = null;
let pendingShot       = null;
let undoStack         = [];

let save = async function save() { await SecureStorage.setItem('courtstats4', JSON.stringify(state)); }

// ═══ NAV ═══
function showPage(id, el) {
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n=>n.classList.remove('active'));
  document.getElementById('page-'+id).classList.add('active');
  el.classList.add('active');
  if(id==='live')     renderLive();
  if(id==='report')   { populateReportSelect(); renderReport(); const eb=document.getElementById('report-export-btn'); if(eb) eb.style.display=settings.reportExportEnabled?'':'none'; }
  if(id==='roster')   renderRoster();
  if(id==='matches')  renderMatches();
  if(id==='settings') renderSettings();
}
function gotoPage(id) { showPage(id, document.querySelectorAll('.nav-item')[{roster:0,matches:1,live:2,report:3,settings:4}[id]]); }
function openModal(id)  { document.getElementById(id).classList.add('open'); }
function closeModal(id) {
  document.getElementById(id).classList.remove('open');
  // If closing opp roster while in setup state, refresh the setup preview
  if (id === 'modal-opp-roster' && liveMatch !== null) {
    const m = state.matches[liveMatch];
    if (m && m.status === 'setup') renderLiveSetup();
  }
}
function toast(msg,dur=2000) {
  const t=document.getElementById('toast');
  t.textContent=msg; t.classList.add('show');
  clearTimeout(t._t); t._t=setTimeout(()=>t.classList.remove('show'),dur);
}

// ═══ LIVE TABS ═══
function switchLiveTab(id,el) {
  document.querySelectorAll('.live-tab').forEach(t=>t.classList.remove('active'));
  document.querySelectorAll('.live-panel').forEach(p=>p.classList.remove('active'));
  el.classList.add('active');
  document.getElementById('lpanel-'+id).classList.add('active');
  if(id==='report') renderLiveReport();
  if(id==='log')    renderLog();
}

// ═══ ROSTER ═══
async function addPlayer() {
  const name=document.getElementById('add-name').value.trim().slice(0,60);
  const num=document.getElementById('add-num').value.trim();
  const role=document.getElementById('add-role').value;
  const numInt = parseInt(num);
  if(!name||!num){ toast(t('toast.player_insert_name_num')); return; }
  if(isNaN(numInt)||numInt<0||numInt>999){ toast('Numero non valido (0-999)'); return; }
  if(name.length<1){ toast('Nome non valido'); return; }
  state.roster.push({id:crypto.randomUUID(),name,num:numInt,role});
  await save(); closeModal('modal-add-player');
  document.getElementById('add-name').value='';
  document.getElementById('add-num').value='';
  renderRoster(); toast('Giocatore aggiunto ✓');
}


//CARICAMENTO ROSTER TRAMITE CSV - parte 1
function triggerCSVInput() {
  document.getElementById('roster-csv-input').click();
}

//CARICAMENTO ROSTER TRAMITE CSV
async function importRosterCSV(file) {
  if (!file) return;
  const text = await file.text();
  const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  let added = 0, skipped = 0;
 for (const line of lines) {
  const cols = line.split(/[,;]/).map(c => c.trim().replace(/^"|"$/g, ''));
  const fullName = cols[0]?.slice(0, 60) || '';
  const numRaw  = cols[1] || '';
  const role    = cols[2] || '';
  const numInt  = parseInt(numRaw);
  if (!fullName || isNaN(numInt) || numInt < 0 || numInt > 999) { skipped++; continue; }
  const existing = state.roster.findIndex(p => p.num === numInt);
  if (existing !== -1) {
    state.roster[existing] = { ...state.roster[existing], name: fullName, num: numInt, role };
  } else {
    state.roster.push({ id: crypto.randomUUID(), name: fullName, num: numInt, role });
  }
  added++;
  }
  await save();
  renderRoster();
  closeModal('modal-add-player');  // ← aggiunta
  toast(`${added} OK ${skipped ? ', ' + skipped + ' KO' : ''} ✓`);
}


async function deletePlayer(id) {
  if(id !== undefined && id !== null && !state.deletedPlayerIds.includes(id)) {
    state.deletedPlayerIds.push(id);
  }
  state.roster = state.roster.filter(p => p.id !== id);
  await save(); renderRoster();
}
function renderRoster() {
  const list=document.getElementById('roster-list'), empty=document.getElementById('roster-empty');
  document.getElementById('roster-count').textContent=t('roster.count',{n:state.roster.length});
  if(!state.roster.length){ list.innerHTML=''; empty.style.display='block'; return; }
  empty.style.display='none';
  list.innerHTML='<div class="section-title">'+t('roster.section')+'</div>'+
    state.roster.sort((a,b)=>a.num-b.num).map(p=>`
    <div class="player-chip">
      <div class="num">#${esc(p.num)}</div>
      <div class="info"><div class="name">${esc(p.name)}</div><div class="role">${esc(p.role)}</div></div>
      <button class="btn btn-danger btn-xs" data-action="deletePlayer" data-id="${esc(p.id)}">✕</button>
    </div>`).join('');
}

// ═══ MATCHES ═══
function openNewMatch() {
  if(!state.roster.length){ toast(t('toast.add_player_first')); return; }
  document.getElementById('nm-date').valueAsDate=new Date();
  document.getElementById('nm-roster-check').innerHTML=state.roster.sort((a,b)=>a.num-b.num).map(p=>`
    <div class="check-row" data-action="toggleCheck">
      <div class="check-box" data-id="${esc(p.id)}"></div>
      <span>#${esc(p.num)} ${esc(p.name)}</span>
      <span class="badge badge-accent" style="margin-left:auto">${esc(p.role)}</span>
    </div>`).join('');
  openModal('modal-new-match');
}
function toggleCheck(row) {
  const box=row.querySelector('.check-box');
  box.classList.toggle('checked');
  box.innerHTML=box.classList.contains('checked')?'✓':'';
}
async function createMatch() {
  const opp=document.getElementById('nm-opponent').value.trim().slice(0,80);
  const date=document.getElementById('nm-date').value;
  const home=document.getElementById('nm-home').value;
  const qlen=Math.min(Math.max(parseInt(document.getElementById('nm-qlen').value)||10,1),20);
  const otlen=Math.min(Math.max(parseInt(document.getElementById('nm-otlen').value)||5,1),15);
  if(!opp){ toast(t('toast.enter_opponent')); return; }
  const ids=[...document.querySelectorAll('#nm-roster-check .check-box.checked')].map(b=>b.dataset.id);
  if(ids.length<5){ toast(t('toast.select_5')); return; }
  const players=ids.map(id=>state.roster.find(p=>p.id===id)).filter(Boolean);
  const match={
    id:crypto.randomUUID(),opponent:opp,date,home,
    status:'setup',quarter:1,isOT:false,otNum:0,
    qlen,otlen,ourScore:0,oppScore:0,
    players:players.map(p=>({...p,onCourt:false,minStart:null})),
    stats:{},log:[],subs:[],starting5:[]
  };
  players.forEach(p=>{ match.stats[p.id]={q1:es(),q2:es(),q3:es(),q4:es()}; });
  state.matches.unshift(match);
  await save(); liveMatch=0; undoStack=[];
  closeModal('modal-new-match');
  gotoPage('live');
  renderLiveSetup();
}
function es() {
  return {fg2m:0,fg2a:0,fg3m:0,fg3a:0,ftm:0,fta:0,reb_off:0,reb_def:0,assist:0,steal:0,turnover:0,foul:0,foul_drawn:0,block:0,block_against:0,shots:[],minPlayed:0};
}
function renderMatches() {
  const list=document.getElementById('matches-list'),empty=document.getElementById('matches-empty');
  if(!state.matches.length){ list.innerHTML=''; empty.style.display='block'; return; }
  empty.style.display='none';
  list.innerHTML='<div class="section-title">'+t('matches.title')+'</div>'+
    state.matches.map((m,i)=>`
    <div class="card">
      <div class="card-row" data-action="openMatchAction" data-idx="${parseInt(i)}" style="cursor:pointer">
        <div>
          <div style="font-weight:700;font-size:16px">${esc(m.opponent)}</div>
          <div style="font-size:12px;color:var(--text2);margin-top:2px">${esc(m.date)} · ${m.home==='home'?t('matches.home'):t('matches.away')}</div>
        </div>
        <div style="text-align:right">
          <div style="font-family:var(--font-display);font-size:28px;letter-spacing:2px;color:${m.ourScore>m.oppScore?'var(--green)':m.ourScore<m.oppScore?'var(--red)':'var(--text)'}">${parseInt(m.ourScore)||0}<span style="color:var(--text3);font-size:18px"> — </span>${parseInt(m.oppScore)||0}</div>
          <span class="badge ${m.status==='live'?'badge-red':m.status==='done'?'badge-green':'badge-accent'}">${m.status==='live'?t('matches.status_live'):m.status==='done'?t('matches.status_done'):'SETUP'}</span>
        </div>
      </div>
      <div style="margin-top:10px;border-top:1px solid var(--border);padding-top:8px;display:flex;justify-content:flex-end;gap:8px;align-items:center">
        ${m.status!=='setup'?`<button class="btn btn-ghost btn-xs" data-action="openEditMatch" data-idx="${parseInt(i)}">✏️ ${t('matches.edit_btn')}</button>`:''}
        ${matchDeleteBtn(m.status, i)}
      </div>
    </div>`).join('');
}
function openMatchAction(i) {
  liveMatch=i; const m=state.matches[i];
  if(m.status==='done'){ gotoPage('report'); populateReportSelect(); document.getElementById('report-match-select').value=m.id; renderReport(); }
  else if(m.status==='setup'){ gotoPage('live'); renderLiveSetup(); }
  else { gotoPage('live'); renderLive(); }
}

// ═══ STARTING 5 ═══
function openStarting5() {
  const m=state.matches[liveMatch];
  document.getElementById('s5-list').innerHTML=m.players.map(p=>`
    <div class="check-row" data-action="toggleS5">
      <div class="check-box s5-box" data-id="${esc(p.id)}"></div>
      <span style="font-family:var(--font-display);font-size:20px;color:var(--accent);min-width:34px">#${esc(p.num)}</span>
      <span>${esc(p.name)}</span>
      <span class="badge badge-accent" style="margin-left:auto">${esc(p.role)}</span>
    </div>`).join('');
  openModal('modal-starting5');
}
function toggleS5(row) {
  const boxes=document.querySelectorAll('.s5-box.checked');
  const box=row.querySelector('.s5-box');
  if(!box.classList.contains('checked')&&boxes.length>=5){ toast(t('toast.max_5')); return; }
  box.classList.toggle('checked');
  box.innerHTML=box.classList.contains('checked')?'✓':'';
}
async function confirmStarting5() {
  const ids=[...document.querySelectorAll('.s5-box.checked')].map(b=>b.dataset.id);
  if(ids.length!==5){ toast(t('toast.select_exactly_5')); return; }
  const m=state.matches[liveMatch];
  m.players.forEach(p=>{
    p.onCourt=ids.includes(p.id);
    p.minStart=ids.includes(p.id)?0:null;
  });
  m.starting5=ids; m.status='live';
  await save(); closeModal('modal-starting5');
  selectedPlayerIdx=null; renderLive();
  // Init timer fresh for new match
  timerInit(state.matches[liveMatch]);
}

// ═══ PERIOD HELPERS ═══
function periodLabel(m) { return m.isOT?'OT'+m.otNum:'Q'+m.quarter; }
function statKey(m)     { return m.isOT?'ot'+m.otNum:'q'+m.quarter; }
// Absolute minutes at start of current period
function pStart(m) { return m.isOT?4*m.qlen+(m.otNum-1)*m.otlen:(m.quarter-1)*m.qlen; }
// Duration of current period
function pDur(m)   { return m.isOT?m.otlen:m.qlen; }
// Absolute minutes at END of current period
function pEnd(m)   { return pStart(m)+pDur(m); }

function ensureKey(m,key) { m.players.forEach(p=>{ if(!m.stats[p.id][key]) m.stats[p.id][key]=es(); }); }
function curKey() { const m=state.matches[liveMatch]; const k=statKey(m); ensureKey(m,k); return k; }

// ═══ LIVE RENDER ═══
function renderLive() {
  if(liveMatch===null){ showNoGame(); return; }
  const m=state.matches[liveMatch];
  if(!m||m.status==='done'){ showNoGame(); return; }
  if(m.status==='setup'){ renderLiveSetup(); return; }
  document.getElementById('live-no-game').style.display='none';
  document.getElementById('live-game').style.display='block';
  document.getElementById('live-setup').style.display='none';
  document.getElementById('live-opponent-label').textContent='vs '+m.opponent;
  document.getElementById('live-score').textContent=m.ourScore+' — '+m.oppScore;
  document.getElementById('live-quarter').textContent=periodLabel(m);
  document.getElementById('opp-score-val').textContent=m.oppScore;
  renderOnCourt();
  const ap=document.querySelector('.live-panel.active');
  if(ap&&ap.id==='lpanel-log')    renderLog();
  if(ap&&ap.id==='lpanel-report') renderLiveReport();
  renderFoulStrip();
  // Timer: always show bar when game is live
  try {
    const tbar = document.getElementById('timer-bar');
    if(tbar) {
      tbar.style.display = 'flex';
      if(timerSeconds < 0) {
        timerInit(m);  // first time: init and render
      } else {
        timerRender(); // already initialized: just refresh display
      }
    }
  } catch(e) { console.warn('Timer error:', e); }
}
// ═══ SETUP SCREEN (match created, quintetto not yet set) ═══
function renderLiveSetup() {
  const m = liveMatch !== null ? state.matches[liveMatch] : null;
  document.getElementById('live-no-game').style.display = 'none';
  document.getElementById('live-game').style.display = 'none';
  document.getElementById('live-setup').style.display = 'block';
  if (!m) return;
  document.getElementById('setup-opponent-label').textContent = 'vs ' + m.opponent;
  document.getElementById('setup-meta-label').textContent = t('live.setup_meta', { date: m.date, venue: m.home === 'home' ? t('matches.home') : t('matches.away'), n: m.players.length });
  // Show opp roster preview if any
  const oppPlayers = m.oppPlayers || [];
  const prev = document.getElementById('setup-opp-preview');
  if (oppPlayers.length) {
    prev.innerHTML = '<div style="background:var(--surface2);border:1px solid var(--border);border-radius:10px;padding:10px 14px">'
      + '<div style="font-size:10px;color:var(--text3);text-transform:uppercase;letter-spacing:.5px;margin-bottom:6px">' + t('live.setup_opp_roster', {n: oppPlayers.length}) + '</div>'
      + oppPlayers.sort((a,b)=>a.num-b.num).map(p =>
          '<span style="display:inline-block;margin:2px 4px;background:var(--surface3);border-radius:6px;padding:2px 8px;font-size:12px;color:var(--text2)">#' + esc(p.num) + (p.name ? ' ' + esc(p.name) : '') + '</span>'
        ).join('') + '</div>';
  } else {
    prev.innerHTML = '';
  }
}

function showNoGame() {
  document.getElementById('live-no-game').style.display='block';
  document.getElementById('live-game').style.display='none';
  document.getElementById('live-setup').style.display='none';
  document.getElementById('timer-bar').style.display='none';
}
function renderOnCourt() {
  const m=state.matches[liveMatch];
  const el=document.getElementById('oncourt-players');
  el.innerHTML=m.players.filter(p=>p.onCourt).map(p=>{
    const mi=m.players.indexOf(p);
    return `<div class="oncourt-player${mi===selectedPlayerIdx?' selected':''}" data-action="selectPlayer" data-idx="${parseInt(mi)}">
      <span class="n">#${esc(p.num)}</span><span>${esc(p.name.split(' ')[0])}</span>
    </div>`;
  }).join('');
  const sel=selectedPlayerIdx!==null?m.players[selectedPlayerIdx]:null;
  document.getElementById('selected-player-label').textContent=sel?`#${sel.num} ${sel.name}`:t('live.select_player_hint');
}
function selectPlayer(idx){ selectedPlayerIdx=idx; renderOnCourt(); }

// ═══ SNAPSHOT / UNDO ═══
function pushUndo() {
  undoStack.push(JSON.parse(JSON.stringify({match:state.matches[liveMatch]})));
  if(undoStack.length>20) undoStack.shift();
}
function openRollback() {
  if(!undoStack.length){ toast(t('toast.nothing_to_undo')); return; }
  const m=state.matches[liveMatch]; const last=m.log[0];
  document.getElementById('rollback-preview').innerHTML=last
    ?`<strong>${esc(last.player||'—')}</strong><br>${esc(last.icon||'')} ${esc(last.text)}`
    :'Ultima azione registrata';
  openModal('modal-rollback');
}
async function confirmRollback() {
  if(!undoStack.length){ closeModal('modal-rollback'); return; }
  state.matches[liveMatch]=undoStack.pop().match;
  await save(); closeModal('modal-rollback'); toast(t('toast.action_undone')); renderLive();
}

// ═══ RECORD ACTIONS ═══
async function recordShot(pts,made) {
  if(selectedPlayerIdx===null){ toast(t('toast.select_player')); return; }
  if(settings.zoneSelection) {
    pendingShot={pts,made}; openCourtModal(pts,made);
  } else {
    // Registra direttamente senza aprire la mappa
    pushUndo();
    const m=state.matches[liveMatch],p=m.players[selectedPlayerIdx],q=curKey();
    const deltaType=pts===2?'shot2':'shot3';
    if(pts===2){ m.stats[p.id][q].fg2a++; if(made){m.stats[p.id][q].fg2m++; m.ourScore+=2;} }
    else        { m.stats[p.id][q].fg3a++; if(made){m.stats[p.id][q].fg3m++; m.ourScore+=3;} }
    m.stats[p.id][q].shots.push({pts,made,zone:'N/A',q,sx:null,sy:null});
    addLog(p,made?'✅':'❌',pts+'pt '+(made?t('stat.fg2m').replace('2Pt ','').replace('3Pt ',''):t('stat.fg2a').replace('2Pt ','').replace('3Pt ',''))+' — '+t('toast.zone_na'),q,
      {type:deltaType,made,pts:made?pts:0,sx:null,sy:null,zone:'N/A'});
    const pPts=Object.values(m.stats[p.id]||{}).reduce((s,b)=>s+b.fg2m*2+b.fg3m*3+b.ftm,0);
    await save(); renderLive(); toast(made?t('toast.shot_made',{name:p.name,pts,total:pPts}):t('toast.shot_missed',{name:p.name}));
  }
}

// ═══ I18N — aggiorna tutti i testi statici dell'interfaccia ════════
// Chiamata da setLanguage() (i18n.js) ogni volta che la lingua cambia,
// e da initApp() al primo avvio.
function applyI18n() {
  // Aggiorna tutti gli elementi con attributo data-i18n
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const attr = el.getAttribute('data-i18n-attr'); // es. "placeholder"
    const html = el.getAttribute('data-i18n-html'); // es. "true" per innerHTML
    const val = t(key);
    if (attr) { el.setAttribute(attr, val); }
    else if (html === 'true') { el.innerHTML = val; }
    else { el.textContent = val; }
  });

  // Aggiorna attributo title
  document.querySelectorAll('[data-i18n-title]').forEach(el => {
    el.title = t(el.getAttribute('data-i18n-title'));
  });

   // Aggiorna le <option> con data-i18n
  document.querySelectorAll('option[data-i18n]').forEach(el => {
    el.textContent = t(el.getAttribute('data-i18n'));
  });
  // Re-render delle sezioni dinamiche che contengono testo tradotto
  renderRoster();
  renderMatches();
  renderSettings();
  if (liveMatch !== null) {
    const m = state.matches[liveMatch];
    if (m && m.status === 'live') renderLive();
    else if (m && m.status === 'setup') renderLiveSetup();
  }
}

// ═══ SETTINGS ═══
function renderSettings() {
  // Language toggle
  const isEN = (typeof getLang === 'function' ? getLang() : (settings.language || 'it')) === 'en';
  const btnLang = document.getElementById('lang-toggle-btn');
  const lblLang = document.getElementById('lang-toggle-label');
  if (btnLang) {
    btnLang.style.background = isEN ? 'var(--accent)' : 'var(--text3)';
    btnLang.innerHTML = `<div style="position:absolute;top:3px;left:${isEN ? '27px' : '3px'};width:22px;height:22px;border-radius:50%;background:#fff;transition:left .25s;box-shadow:0 1px 3px rgba(0,0,0,.3)"></div>`;
  }
  if (lblLang) lblLang.textContent = isEN ? 'EN — English' : 'IT — Italiano';

  const on = settings.zoneSelection;
  const btn = document.getElementById('zone-toggle-btn');
  const lbl = document.getElementById('zone-toggle-label');
  if(btn) {
    btn.style.background = on ? 'var(--accent)' : 'var(--text3)';
    btn.innerHTML = `<div style="position:absolute;top:3px;left:${on?'27px':'3px'};width:22px;height:22px;border-radius:50%;background:#fff;transition:left .25s;box-shadow:0 1px 3px rgba(0,0,0,.3)"></div>`;
  }
  if(lbl) lbl.textContent = on ? t('settings.zone_on') : t('settings.zone_off');

  const onOpp = settings.oppRosterEnabled;
  const btnOpp = document.getElementById('opp-roster-toggle-btn');
  const lblOpp = document.getElementById('opp-roster-toggle-label');
  if(btnOpp) {
    btnOpp.style.background = onOpp ? 'var(--accent)' : 'var(--text3)';
    btnOpp.innerHTML = `<div style="position:absolute;top:3px;left:${onOpp?'27px':'3px'};width:22px;height:22px;border-radius:50%;background:#fff;transition:left .25s;box-shadow:0 1px 3px rgba(0,0,0,.3)"></div>`;
  }
  if(lblOpp) lblOpp.textContent = onOpp ? t('settings.opp_roster_on') : t('settings.opp_roster_off');

  const onExp = settings.reportExportEnabled;
  const btnExp = document.getElementById('export-toggle-btn');
  const lblExp = document.getElementById('export-toggle-label');
  if(btnExp) {
    btnExp.style.background = onExp ? 'var(--accent)' : 'var(--text3)';
    btnExp.innerHTML = `<div style="position:absolute;top:3px;left:${onExp?'27px':'3px'};width:22px;height:22px;border-radius:50%;background:#fff;transition:left .25s;box-shadow:0 1px 3px rgba(0,0,0,.3)"></div>`;
  }
  if(lblExp) lblExp.textContent = onExp ? t('settings.export_on') : t('settings.export_off');

  // Aggiorna visibilità pulsante export nel report
  const exportBtn = document.getElementById('report-export-btn');
  if(exportBtn) exportBtn.style.display = onExp ? '' : 'none';

  // Drive feature toggle
  const onDrive = settings.driveFeatureEnabled;
  const btnDrive = document.getElementById('drive-feature-toggle-btn');
  const lblDrive = document.getElementById('drive-feature-toggle-label');
  if(btnDrive) {
    btnDrive.style.background = onDrive ? 'var(--accent)' : 'var(--text3)';
    btnDrive.innerHTML = `<div style="position:absolute;top:3px;left:${onDrive?'27px':'3px'};width:22px;height:22px;border-radius:50%;background:#fff;transition:left .25s;box-shadow:0 1px 3px rgba(0,0,0,.3)"></div>`;
  }
  if(lblDrive) lblDrive.textContent = onDrive ? t('settings.drive_on') : t('settings.drive_off');
  // Show/hide connect section and roster Drive button
  const connectSection = document.getElementById('drive-connect-section');
  if(connectSection) connectSection.style.display = onDrive ? 'block' : 'none';
  // Populate Client ID input — mostriamo solo una versione mascherata nel DOM.
  // Il valore reale rimane in settings.driveClientId (in memoria, cifrato su disco).
  const clientIdInput = document.getElementById('drive-client-id-input');
  if (clientIdInput) {
    if (settings.driveClientId) {
      // Mostra solo le ultime 6 cifre precedute da asterischi: "••••••••xxxx.apps.googleusercontent.com"
      const full = settings.driveClientId;
      const tail = full.slice(-40); // mostriamo il suffisso riconoscibile ma non il prefisso univoco
      clientIdInput.value = '••••••' + tail;
      clientIdInput.dataset.masked = 'true'; // flag per saveClientId
    } else {
      clientIdInput.value = '';
      clientIdInput.dataset.masked = 'false';
    }
  }
  const clientIdStatus = document.getElementById('drive-client-id-status');
  if(clientIdStatus) {
    if(settings.driveClientId) {
      clientIdStatus.textContent = t('settings.client_id_saved');
      clientIdStatus.style.color = 'var(--green)';
    } else {
      clientIdStatus.textContent = '';
    }
  }
  const driveBtn = document.getElementById('drive-btn');
  if(driveBtn) driveBtn.style.display = onDrive ? '' : 'none';
  const driveBar = document.getElementById('drive-status-bar');
  if(driveBar && !onDrive) driveBar.style.display = 'none';
  // Update connect button in settings
  const drvSettBtn = document.getElementById('drive-settings-btn');
  const drvSettStatus = document.getElementById('drive-settings-status');
  if(drvSettBtn) {
    if(driveEnabled) {
      drvSettBtn.className = 'drive-btn drive-btn-connected';
      drvSettBtn.textContent = t('settings.drive_connected_btn');
      if(drvSettStatus) drvSettStatus.textContent = t('settings.drive_syncing');
    } else {
      drvSettBtn.className = 'drive-btn drive-btn-connect';
      drvSettBtn.textContent = t('settings.drive_connect_btn');
      if(drvSettStatus) drvSettStatus.textContent = '';
    }
  }

  // Logo settings
  const logoPreview = document.getElementById('logo-preview');
  const logoRemoveBtn = document.getElementById('logo-remove-btn');
  if(logoPreview) {
    if(settings.teamLogo) {
      logoPreview.src = settings.teamLogo;
      logoPreview.style.display = 'block';
    } else {
      logoPreview.style.display = 'none';
    }
  }
  if(logoRemoveBtn) logoRemoveBtn.style.display = settings.teamLogo ? '' : 'none';
}
async function toggleZoneSelection() {
  settings.zoneSelection = !settings.zoneSelection;
  await saveSettings();
  renderSettings();
  toast(settings.zoneSelection ? t('toast.zone_enabled') : t('toast.zone_disabled'));
}
async function toggleLanguage() {
  const newLang = (typeof getLang === 'function' ? getLang() : (settings.language || 'it')) === 'it' ? 'en' : 'it';
  if (typeof setLanguage === 'function') {
    await setLanguage(newLang);
  } else {
    settings.language = newLang;
    await saveSettings();
    renderSettings();
  }
}
async function selectOnboardingLanguage(lang) {
  // Imposta la lingua scelta
  if (typeof setLanguage === 'function') {
    await setLanguage(lang);
  } else if (typeof _setLangInternal === 'function') {
    _setLangInternal(lang);
  }
  settings.language = lang;
  settings.languageChosen = true;
  await saveSettings();
  // Nasconde l'overlay 
  const overlay = document.getElementById('lang-onboarding-overlay');
  if (overlay) overlay.style.display = 'none';
  // Procede con lo step successivo dell'onboarding (disclaimer) o finalizza
  await _proceedAfterLanguage();
}

const DISCLAIMER_VERSION = 'v1';

// Traduce solo i testi dell'overlay disclaimer (data-i18n al suo interno),
// senza i re-render pesanti di applyI18n() — utile in fase di onboarding,
// prima che lo stato dell'app sia completamente pronto per il render.
function _translateDisclaimerOverlay() {
  const overlay = document.getElementById('disclaimer-onboarding-overlay');
  if (!overlay || typeof t !== 'function') return;
  overlay.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.textContent = t(key);
  });
}

async function acceptDisclaimer() {
  settings.disclaimerAccepted = DISCLAIMER_VERSION;
  await saveSettings();
  const overlay = document.getElementById('disclaimer-onboarding-overlay');
  if (overlay) overlay.style.display = 'none';
  // Completa l'inizializzazione (render + i18n)
  _finishAppInit();
}

// Mostra l'overlay disclaimer se non ancora accettato, altrimenti finalizza.
async function _proceedAfterLanguage() {
  if (settings.disclaimerAccepted !== DISCLAIMER_VERSION) {
    _translateDisclaimerOverlay();
    const overlay = document.getElementById('disclaimer-onboarding-overlay');
    if (overlay) overlay.style.display = 'flex';
    return;
  }
  _finishAppInit();
}
async function toggleOppRoster() {
  settings.oppRosterEnabled = !settings.oppRosterEnabled;
  await saveSettings();
  renderSettings();
  toast(settings.oppRosterEnabled ? '👥 Roster avversario abilitato' : '⚡ Roster avversario disabilitato');
}
async function toggleReportExport() {
  settings.reportExportEnabled = !settings.reportExportEnabled;
  await saveSettings();
  renderSettings();
  toast(settings.reportExportEnabled ? '📤 Export report abilitato' : '🔒 Export report disabilitato');
}
async function toggleDriveFeature() {
  settings.driveFeatureEnabled = !settings.driveFeatureEnabled;
  await saveSettings();
  renderSettings();
  if (!settings.driveFeatureEnabled && driveEnabled) {
    driveDisconnect();
  }
  toast(settings.driveFeatureEnabled ? '☁️ Sincronizzazione Drive abilitata' : '💾 Sincronizzazione Drive disabilitata');
}

async function saveClientId() {
  const input = document.getElementById('drive-client-id-input');
  if (!input) return;

  // Se il campo contiene il valore mascherato (l'utente non ha modificato nulla), non salvare
  if (input.dataset.masked === 'true' && input.value.startsWith('••••••')) return;

  // Segna il campo come non più mascherato (l'utente ha inserito un nuovo valore)
  input.dataset.masked = 'false';

  const val = input.value.trim();
  // Validazione formato base: deve contenere ".apps.googleusercontent.com"
  if (val && !val.endsWith('.apps.googleusercontent.com')) {
    const statusEl = document.getElementById('drive-client-id-status');
    if (statusEl) { statusEl.textContent = '⚠️ Formato non valido — deve terminare con .apps.googleusercontent.com'; statusEl.style.color = 'var(--red)'; }
    return;
  }
  // Se il Client ID cambia, azzera il token client cached per forzare la re-inizializzazione
  if (val !== settings.driveClientId) {
    _driveTokenClient = null;
    driveToken = null;
    driveTokenExpiry = 0;
    if (driveEnabled) { driveEnabled = false; SecureStorage.removeItem('driveEnabled'); driveUpdateUI(false); }
  }
  settings.driveClientId = val;
  await saveSettings();

  // Ri-maschera il campo subito dopo il salvataggio: il valore in chiaro non deve restare nel DOM
  if (val) {
    const tail = val.slice(-40);
    input.value = '••••••' + tail;
    input.dataset.masked = 'true';
  } else {
    input.value = '';
    input.dataset.masked = 'false';
  }

  const statusEl = document.getElementById('drive-client-id-status');
  if (statusEl) {
    statusEl.textContent = val ? '✅ Client ID salvato sul dispositivo' : 'Client ID rimosso';
    statusEl.style.color = val ? 'var(--green)' : 'var(--text3)';
  }
}

let _clientIdDebounceTimer = null;
function debounceSaveClientId() {
  clearTimeout(_clientIdDebounceTimer);
  _clientIdDebounceTimer = setTimeout(saveClientId, 1000);
}
async function recordFT(made) {
  if(selectedPlayerIdx===null){ toast(t('toast.select_player')); return; }
  pushUndo();
  const m=state.matches[liveMatch],p=m.players[selectedPlayerIdx],q=curKey();
  m.stats[p.id][q].fta++;
  if(made){ m.stats[p.id][q].ftm++; m.ourScore++; }
  addLog(p,made?'🎯':'⭕',made?t('log.ft_made'):t('log.ft_missed'),q,{type:'ft',made,pts:made?1:0});
  if(made) {
    const pPts=Object.values(m.stats[p.id]||{}).reduce((s,b)=>s+b.fg2m*2+b.fg3m*3+b.ftm,0);
    toast(t('toast.ft_made',{name:p.name,total:pPts}), 2500);
  } else {
    toast(t('toast.ft_missed',{name:p.name}), 2500);
  }
  await save(); renderLive();
}
async function recordStat(type) {
  if(selectedPlayerIdx===null){ toast(t('toast.select_player')); return; }
  pushUndo();
  const m=state.matches[liveMatch],p=m.players[selectedPlayerIdx],q=curKey();
  m.stats[p.id][q][type]++;
  const L={reb_off:t('stat.reb_off'),reb_def:t('stat.reb_def'),assist:t('stat.assist'),steal:t('stat.steal'),turnover:t('stat.turnover'),foul:t('stat.foul'),foul_drawn:t('stat.foul_drawn'),block:t('stat.block'),block_against:t('stat.block_against')};
  const I={reb_off:'⬆️',reb_def:'⬇️',assist:'🤝',steal:'🫳',turnover:'💨',foul:'✋',foul_drawn:'🙋',block:'🛡️',block_against:'🚫'};
  addLog(p,I[type],L[type],q,{type,made:false,pts:0});
  if(type==='foul') {
    const fc = getFoulCount(state.matches[liveMatch], p);
    const warn = fc>=5?t('foul.warn5'):fc>=4?t('foul.warn4'):'';
    toast('✋ ' + p.name + ': ' + fc + ' ' + (fc > 1 ? t('foul.plural') : t('foul.singular')) + warn, 3000);
  } else if(type==='foul_drawn') {
    // handled below with opp modal
  } else {
    // Generic confirmation toast with running total
    const allQks = ['q1','q2','q3','q4','ot'];
    const total = allQks.reduce((sum, k) => sum + (m.stats[p.id]?.[k]?.[type] || 0), 0);
    toast(I[type]+' '+p.name+': '+L[type]+' ('+total+')', 2000);
  }
  await save(); renderLive();
  renderFoulStrip();
  // Se fallo subito e ci sono avversari nel roster, apri modal per assegnare fallo avversario
  if(type==='foul_drawn') {
    if(!m.oppFouls) m.oppFouls = {};
    if(settings.oppRosterEnabled) {
      if(m.oppPlayers && m.oppPlayers.length>0) {
        // Auto-open opp foul modal to assign the foul
        setTimeout(()=>{ renderOppFoulList(); openModal('modal-opp-foul'); }, 200);
      } else {
        // No opp roster yet — prompt to add players
        setTimeout(()=>{
          toast(t('toast.opp_add_first_hint'), 3500);
        }, 200);
      }
    } else {
      // Roster avversario disabilitato: incrementa direttamente il contatore falli avversario
      if(!m.oppFouls) m.oppFouls = {};
      const oppFoulKey = '__direct__';
      m.oppFouls[oppFoulKey] = (m.oppFouls[oppFoulKey] || 0) + 1;
      renderFoulStrip();
      await save();
      toast(t('toast.foul_drawn_recorded'), 2000);
    }
  }
}
async function changeOppScore(d) {
  pushUndo();
  const m=state.matches[liveMatch];
  m.oppScore=Math.max(0,m.oppScore+d);
  // Track per-period opponent score
  if(!m.oppScoreByPeriod) m.oppScoreByPeriod={};
  const pk = statKey(m);
  m.oppScoreByPeriod[pk] = Math.max(0,(m.oppScoreByPeriod[pk]||0)+d);
  document.getElementById('opp-score-val').textContent=m.oppScore;
  document.getElementById('live-score').textContent=m.ourScore+' — '+m.oppScore;
  // Log snapshot for game flow chart (only when score actually changed)
  if(d!==0) addLog(null, d>0?'🟠':'↩️', d>0?(d+'pt avv.'):'Correzione avv.', pk, {type:'opp_score', pts: d>0?d:0});
  await save();
}

// ═══ LOG ═══
// Each log entry carries a 'delta' object so we can reverse it on delete
function addLog(p,icon,text,q,delta) {
  const m=state.matches[liveMatch];
  // Attach timer timestamp if timer has been used
  const timerTs = (timerSeconds >= 0 && (timerRunning || timerSeconds < pDur(state.matches[liveMatch])*60)) ? timerCurrentLabel() : null;
  const timeLabel = timerTs ? timerTs.min+':'+timerTs.sec : null;
  m.log.unshift({
    id:crypto.randomUUID(), q, icon, text,
    player:p?'#'+p.num+' '+p.name:'',
    playerId: p?p.id:null,
    statKey: q,
    delta: delta||null,
    timeLabel,
    scoreSnap: {our: m.ourScore, opp: m.oppScore},
    onCourtIds: m.players.filter(pl=>pl.onCourt).map(pl=>pl.id),
    ts:Date.now()
  });
  if(m.log.length>200) m.log.pop();
}

function renderLog() {
  const m=state.matches[liveMatch];
  const el=document.getElementById('live-log');
  if(!m.log.length){ el.innerHTML='<div style="padding:20px;text-align:center;color:var(--text3);font-size:13px">'+t('log.empty')+'</div>'; return; }
  el.innerHTML=m.log.map(l=>`
    <div class="log-entry">
      <span class="log-time">${esc(l.q||'?')}${l.timeLabel?' '+esc(l.timeLabel):''}</span>
      <span style="font-size:16px">${esc(l.icon||'')}</span>
      <div style="flex:1">
        ${l.player?`<div style="font-weight:600;font-size:12px;color:var(--text)">${esc(l.player)}</div>`:''}
        <div style="color:var(--text2);font-size:12px">${esc(l.text)}</div>
      </div>
      <button data-action="deleteLogEntry" data-logid="${esc(l.id)}" style="background:none;border:none;color:var(--text3);font-size:18px;cursor:pointer;padding:2px 6px;line-height:1">✕</button>
    </div>`).join('');
}

async function deleteLogEntry(id, matchIndex) {
  const m=state.matches[matchIndex !== undefined ? matchIndex : liveMatch];
  const entry=m.log.find(l=>String(l.id)===String(id));
  if(!entry){ toast(t('toast.action_not_found')); return; }

  // ── ROLLBACK EFFECT ──────────────────────────
  if(entry.delta && entry.playerId && entry.statKey) {
    const d=entry.delta;
    const pId=entry.playerId;
    const sk=entry.statKey;
    if(!m.stats[pId]||!m.stats[pId][sk]) { /* nothing to rollback */ }
    else if(d.type==='shot2') {
      m.stats[pId][sk].fg2a=Math.max(0,m.stats[pId][sk].fg2a-1);
      if(d.made){ m.stats[pId][sk].fg2m=Math.max(0,m.stats[pId][sk].fg2m-1); m.ourScore=Math.max(0,m.ourScore-2); }
      // Rimuove il punto dalla mappa tiri
      if(d.sx!=null && d.sy!=null) {
        const shots=m.stats[pId][sk].shots||[];
        const idx=shots.findIndex(s=>s.pts===2&&s.made===d.made&&s.sx===d.sx&&s.sy===d.sy&&s.zone===d.zone);
        if(idx>=0) shots.splice(idx,1);
      }
    } else if(d.type==='shot3') {
      m.stats[pId][sk].fg3a=Math.max(0,m.stats[pId][sk].fg3a-1);
      if(d.made){ m.stats[pId][sk].fg3m=Math.max(0,m.stats[pId][sk].fg3m-1); m.ourScore=Math.max(0,m.ourScore-3); }
      // Rimuove il punto dalla mappa tiri
      if(d.sx!=null && d.sy!=null) {
        const shots=m.stats[pId][sk].shots||[];
        const idx=shots.findIndex(s=>s.pts===3&&s.made===d.made&&s.sx===d.sx&&s.sy===d.sy&&s.zone===d.zone);
        if(idx>=0) shots.splice(idx,1);
      }
    } else if(d.type==='ft') {
      m.stats[pId][sk].fta=Math.max(0,m.stats[pId][sk].fta-1);
      if(d.made){ m.stats[pId][sk].ftm=Math.max(0,m.stats[pId][sk].ftm-1); m.ourScore=Math.max(0,m.ourScore-1); }
    } else {
      // generic stat
      if(m.stats[pId][sk][d.type]!==undefined)
        m.stats[pId][sk][d.type]=Math.max(0,m.stats[pId][sk][d.type]-1);
    }
  }

  // ── ROLLBACK OPP SCORE ─────────────────────
  if(entry.delta && entry.delta.type==='opp_score') {
    const d=entry.delta;
    if(d.pts>0) {
      m.oppScore=Math.max(0,m.oppScore-d.pts);
      if(!m.oppScoreByPeriod) m.oppScoreByPeriod={};
      const pk=entry.statKey;
      m.oppScoreByPeriod[pk]=Math.max(0,(m.oppScoreByPeriod[pk]||0)-d.pts);
    }
  }

  // ── ROLLBACK OPP FOUL ──────────────────────
  if(entry.delta && entry.delta.type==='opp_foul') {
    const d  = entry.delta;
    const fd = m.oppFouls && m.oppFouls[d.oppPlayerId];
    if(fd && fd[d.qkey] > 0) {
      fd[d.qkey] = Math.max(0, fd[d.qkey] - 1);
    }
  }

  m.log=m.log.filter(l=>String(l.id)!==String(id));
  await save();
  if (matchIndex === undefined) { renderLog(); renderLive(); renderFoulStrip(); toast(t('toast.action_removed')); }
}

// ═══ LIVE REPORT ═══
function renderLiveReport(sortCol, sortDir) {
  const m=state.matches[liveMatch];
  const el=document.getElementById('live-report-content');
  if(!m){ el.innerHTML=''; return; }
  m.players.forEach(p=>{ if(!m.stats[p.id]) m.stats[p.id]={q1:es(),q2:es(),q3:es(),q4:es()}; });
  // Read current sort state from DOM if not passed
  if(!sortCol) {
    const tbl = el.querySelector('table');
    sortCol = (tbl && tbl.dataset.sortCol) || 'pts';
    sortDir = (tbl && tbl.dataset.sortDir) || 'desc';
  }
  const rows=m.players.map(p=>{
    const all=totals(m,p);
    return {p,pts:all.fg2m*2+all.fg3m*3+all.ftm,min:minPlayed(m,p),foul:all.foul,
            fg2m:all.fg2m,fg2a:all.fg2a,fg3m:all.fg3m,fg3a:all.fg3a,ftm:all.ftm,fta:all.fta,
            val:calcVal(all)};
  });
  const pmMap = calcPlusMinusMap(m);
  rows.forEach(r => { r.pm = pmMap ? (pmMap[r.p.id]||0) : null; });
  const sortFns = {
    name: (a,b)=> (a.p.num - b.p.num),
    min:  (a,b)=> b.min - a.min,
    pts:  (a,b)=> b.pts - a.pts,
    fg2:  (a,b)=> b.fg2m - a.fg2m || b.fg2a - a.fg2a,
    fg3:  (a,b)=> b.fg3m - a.fg3m || b.fg3a - a.fg3a,
    ft:   (a,b)=> b.ftm  - a.ftm  || b.fta  - a.fta,
    foul: (a,b)=> b.foul - a.foul,
    val:  (a,b)=> b.val  - a.val,
    pm:   (a,b)=> (b.pm||0) - (a.pm||0),
  };
  rows.sort((a,b)=> sortDir==='asc' ? -(sortFns[sortCol]||sortFns.pts)(a,b) : (sortFns[sortCol]||sortFns.pts)(a,b));
  const arrow = col => col===sortCol ? (sortDir==='desc'?' ▾':' ▴') : '';
  const thStyle = col => `cursor:pointer;user-select:none;${col===sortCol?'color:var(--accent)':''}`;
  const sa = `data-action="liveReportSort"`;
  const toFirst=(m.timeouts&&m.timeouts.firstHalf)||0;
  const toSecond=(m.timeouts&&m.timeouts.secondHalf)||0;
  el.innerHTML=`
    <div style="padding:8px 16px 6px">
      <div style="display:flex;align-items:center;gap:8px;background:var(--surface);border:1px solid var(--border);border-radius:10px;padding:8px 14px">
        <span style="font-size:10px;color:var(--text3);text-transform:uppercase;letter-spacing:.5px;white-space:nowrap">Timeout</span>
        <span style="font-family:var(--font-mono);font-size:14px;font-weight:700;color:var(--blue)">1°-2°Q: ${toFirst}/2</span>
        <span style="color:var(--surface3)">|</span>
        <span style="font-family:var(--font-mono);font-size:14px;font-weight:700;color:var(--blue)">3°-4°Q: ${toSecond}/3</span>
        ${toFirst>=2?'<span style="font-size:11px;color:var(--red);margin-left:auto">⚠️ 1°-2°Q esauriti</span>':toSecond>=3?'<span style="font-size:11px;color:var(--red);margin-left:auto">⚠️ 3°-4°Q esauriti</span>':''}
      </div>
    </div>
    <div class="scroll-x" style="margin:0 16px 12px">
      <table class="stat-table" style="font-size:12px" data-sort-col="${sortCol}" data-sort-dir="${sortDir}">
        <thead><tr>
          <th style="text-align:left;${thStyle('name')}" ${sa} data-col="name">${t('col.player')}${arrow('name')}</th>
          <th style="${thStyle('min')}" ${sa} data-col="min">Min${arrow('min')}</th>
		  <th style="${thStyle('pts')}" ${sa} data-col="pts">Pts${arrow('pts')}</th>
		  <th style="${thStyle('foul')}" ${sa} data-col="foul">FF${arrow('foul')}</th>
          <th style="${thStyle('fg2')}" ${sa} data-col="fg2">2P${arrow('fg2')}</th>
          <th style="${thStyle('fg3')}" ${sa} data-col="fg3">3P${arrow('fg3')}</th>
          <th style="${thStyle('ft')}"  ${sa} data-col="ft">TL${arrow('ft')}</th>
          <th style="${thStyle('val')}" ${sa} data-col="val">Val${arrow('val')}</th>
          ${pmMap?`<th style="${thStyle('pm')}" ${sa} data-col="pm">+/−${arrow('pm')}</th>`:''}
        </tr></thead>
        <tbody>${rows.map(r=>`<tr>
          <td style="white-space:nowrap">#${esc(r.p.num)} ${esc(r.p.name.split(' ')[0])}</td>
          <td>${r.min}'</td>
          <td><strong style="color:var(--accent)">${r.pts}</strong></td>
          <td style="color:${r.foul>=5?'var(--red)':'inherit'}">${r.foul}${r.foul>=5?' ⚠️':''}</td>
          <td style="color:var(--text2)">${r.fg2m}/${r.fg2a}</td>
          <td style="color:var(--text2)">${r.fg3m}/${r.fg3a}</td>
          <td style="color:var(--text2)">${r.ftm}/${r.fta}</td>
          <td style="font-weight:700;color:${r.val>0?'var(--green)':r.val<0?'var(--red)':'var(--text2)'}">${r.val>0?'+':''}${r.val}</td>
          ${pmMap?`<td style="font-weight:700;color:${r.pm>0?'var(--green)':r.pm<0?'var(--red)':'var(--text2)'}">${r.pm>0?'+':''}${r.pm}</td>`:''}
        </tr>`).join('')}</tbody>
      </table>
    </div>`;
}

// ═══ MINUTES PLAYED — FIXED ═══
// minStart and minPlayed are stored in absolute match-minutes.
// A player who plays all 4 quarters of 10min each will have minStart=0
// committed at end of Q1 as 10min, Q2 as 10min, Q3 as 10min, Q4 as 10min = 40min total.
function minPlayed(m, p) {
  // Sum already-committed minutes across all stat buckets
  let committed=0;
  Object.values(m.stats[p.id]||{}).forEach(s=>{ committed+=(s.minPlayed||0); });
  // Add in-progress time for current period only if on court
  let inProgress=0;
  if(p.onCourt && p.minStart!==null) {
    let elapsedInPeriod;
    if(p.subRemainSec !== undefined && p.subRemainSec !== null && timerSeconds >= 0) {
      const elapsed = Math.max(0, p.subRemainSec - timerSeconds);
      inProgress = elapsed / 60;
    } else if(timerSeconds >= 0) {
      const remainingMin = timerSeconds / 60;
      elapsedInPeriod = Math.max(0, pDur(m) - remainingMin);
      const enteredAtInPeriod = p.minStart - pStart(m);
      inProgress = Math.max(0, elapsedInPeriod - enteredAtInPeriod);
    } else {
      elapsedInPeriod = pDur(m);
      const enteredAtInPeriod = p.minStart - pStart(m);
      inProgress = Math.max(0, elapsedInPeriod - enteredAtInPeriod);
    }
  }
  return Math.round(Math.max(0, committed+inProgress));
}

// Called when a period ends — writes earned minutes into the stat bucket and
// resets minStart to the beginning of the next period.
function commitMinutes(m) {
  const k=statKey(m);
  ensureKey(m,k);
  // Always credit the full period duration to players on court at period end.
  // If timer still has time remaining, that time is attributed to whoever
  // is on court — they played those minutes too (game closed early or OT etc).
  const elapsedInPeriod = pDur(m); // full period duration
  m.players.forEach(p=>{
    if(p.onCourt && p.minStart!==null) {
      const enteredAtInPeriod = Math.max(0, p.minStart - pStart(m));
      const earned = Math.max(0, elapsedInPeriod - enteredAtInPeriod);
      m.stats[p.id][k].minPlayed=(m.stats[p.id][k].minPlayed||0)+earned;
      p.minStart=pEnd(m);
      p.subRemainSec=null; // reset: nuovo periodo, nessuna sub manuale pendente
    }
  });
}

// Called on substitution — commits partial minutes for the exiting player
function commitSubMinutes(m, p, minLeft, secLeft) {
  const k=statKey(m);
  ensureKey(m,k);
  if(p.minStart===null) return;
  // Always use manual input from substitution modal
  const remainSec=(parseInt(minLeft)||0)*60+(parseInt(secLeft)||0);
  const remainMin = remainSec / 60;
  const periodElapsed = pDur(m) - remainMin;
  const enteredAtPeriodMinute = p.minStart - pStart(m);
  const earned = Math.max(0, periodElapsed - enteredAtPeriodMinute);
  m.stats[p.id][k].minPlayed=(m.stats[p.id][k].minPlayed||0)+earned;
}

// ═══ PERIOD END ═══
async function openNextPeriodModal() {
  const m=state.matches[liveMatch];
  const lbl=periodLabel(m);
  document.getElementById('npm-title').textContent='FINE '+lbl;
  if(!m.isOT&&m.quarter<4) {
    document.getElementById('npm-body').textContent=t('modal.nextPeriod.body_next',{lbl});
    document.getElementById('npm-continue').textContent=t('modal.nextPeriod.goto_q',{n:m.quarter+1});
  } else {
    document.getElementById('npm-body').textContent=t('modal.nextPeriod.body_end',{lbl});
    document.getElementById('npm-continue').textContent=t('modal.nextPeriod.add_ot');
  }
  openModal('modal-next-period');
}
async function doContinue() {
  const m=state.matches[liveMatch];
  commitMinutes(m);
  if(!m.isOT&&m.quarter<4) {
    m.quarter++;
    // Reset minStart to the absolute start of the new period
    m.players.forEach(p=>{ if(p.onCourt) { p.minStart=pStart(m); p.subRemainSec=null; } });
  } else {
    m.isOT=true; m.otNum=(m.otNum||0)+1;
    const k='ot'+m.otNum;
    m.players.forEach(p=>{ m.stats[p.id][k]=es(); if(p.onCourt) { p.minStart=pStart(m); p.subRemainSec=null; } });
  }
  await save(); closeModal('modal-next-period'); toast(t('period.started',{p:periodLabel(m)}));
  timerInit(m);
  renderLive();
}
async function doEndMatch() {
  const m=state.matches[liveMatch];
  commitMinutes(m);
  m.status='done'; await save(); closeModal('modal-next-period'); toast(t('toast.match_ended')); renderLive();
}

// ═══ SUBSTITUTION ═══
function openSubModal() {
  if(liveMatch===null) return;
  const m=state.matches[liveMatch];
  const bench=m.players.filter(p=>!p.onCourt);
  const court=m.players.filter(p=>p.onCourt);
  if(!bench.length){ toast(t('toast.no_bench')); return; }
  document.getElementById('sub-in').innerHTML=bench.map(p=>`<option value="${esc(p.id)}">#${esc(p.num)} ${esc(p.name)}</option>`).join('');
  document.getElementById('sub-out').innerHTML=court.map(p=>`<option value="${esc(p.id)}">#${esc(p.num)} ${esc(p.name)}</option>`).join('');
  // Auto-fill time from timer if running or paused with value
  if(timerSeconds > 0 && timerSeconds >= 0) {
    const t = timerCurrentLabel();
    document.getElementById('sub-min').value = t.min;
    document.getElementById('sub-sec').value = t.sec;
  } else {
    document.getElementById('sub-min').value='';
    document.getElementById('sub-sec').value='';
  }
  openModal('modal-sub');
}
async function confirmSub() {
  const m=state.matches[liveMatch];
  const inId=document.getElementById('sub-in').value;
  const outId=document.getElementById('sub-out').value;
  const min=document.getElementById('sub-min').value||'0';
  const sec=document.getElementById('sub-sec').value||'00';
  const pIn=m.players.find(p=>p.id===inId);
  const pOut=m.players.find(p=>p.id===outId);
  if(!pIn||!pOut){ toast(t('toast.error_generic')); return; }
  // Commit partial minutes for outgoing player
  commitSubMinutes(m,pOut,min,sec);
  pIn.onCourt=true; pOut.onCourt=false;
  // minStart per il giocatore entrante = minuto assoluto della sub (calcolato dal tempo manuale)
  const remainSec=(parseInt(min)||0)*60+(parseInt(sec)||0);
  pIn.minStart=pEnd(m)-(remainSec/60);
  // Salva anche il tempo rimanente esatto della sub per poterlo usare in minPlayed
  // senza dipendere da timerSeconds (che non si aggiorna con il tempo manuale)
  pIn.subRemainSec=remainSec;
  m.subs.push({q:periodLabel(m),min,sec,in:pIn.name,out:pOut.name,inNum:pIn.num,outNum:pOut.num});
  addLog(null,'⇄',t('log.sub',{inNum:pIn.num,inName:pIn.name,outNum:pOut.num,outName:pOut.name,min:min,sec:String(sec).padStart(2,'0')}),periodLabel(m),null);
  selectedPlayerIdx=null;
  await save(); closeModal('modal-sub'); renderLive();
  toast(`Sub: ${pIn.name} ↔ ${pOut.name}`);
}

// ═══ COURT MODAL ═══
function openCourtModal(pts, made) {
  const colorClass = made ? 'z-made' : 'z-missed';
  const removeClass = made ? 'z-missed' : 'z-made';
  document.querySelectorAll('.z2').forEach(el=>{
    const disabled = pts===3;
    el.classList.toggle('z-disabled', disabled);
    el.style.pointerEvents = disabled ? 'none' : 'auto';
    if(!disabled) { el.classList.add(colorClass); el.classList.remove(removeClass); }
    else { el.classList.remove('z-made','z-missed'); }
  });
  document.querySelectorAll('.z3').forEach(el=>{
    const disabled = pts===2;
    el.classList.toggle('z-disabled', disabled);
    el.style.pointerEvents = disabled ? 'none' : 'auto';
    if(!disabled) { el.classList.add(colorClass); el.classList.remove(removeClass); }
    else { el.classList.remove('z-made','z-missed'); }
  });
  const madeLabel = made ? t('court.label_made') : t('court.label_missed');
  document.getElementById('court-type-label').textContent = pts===2
    ? t('court.type_2pt_label', {result: madeLabel})
    : t('court.type_3pt_label', {result: madeLabel});
  document.getElementById('shot-dots').innerHTML='';
  document.getElementById('court-modal').classList.add('open');
}
function closeCourtModal() {
  document.getElementById('court-modal').classList.remove('open');
  pendingShot=null;
}
async function pickZone(evt, el) {
  if(!pendingShot) { console.warn('pickZone: no pendingShot'); return; }
  const {pts,made,editMode}=pendingShot;

  // Capture SVG coordinates
  const svg = document.getElementById('court-svg');
  const pt  = svg.createSVGPoint();
  pt.x = evt.clientX; pt.y = evt.clientY;
  const svgP = pt.matrixTransform(svg.getScreenCTM().inverse());
  const sx = Math.round(svgP.x);
  const sy = Math.round(svgP.y);

  // Show dot
  const dot=document.createElementNS('http://www.w3.org/2000/svg','circle');
  dot.setAttribute('cx',sx); dot.setAttribute('cy',sy); dot.setAttribute('r',9);
  dot.setAttribute('class','shot-dot'+(made?'':' missed'));
  document.getElementById('shot-dots').appendChild(dot);

  pendingShot=null;

  if (editMode) {
    // Route to edit-match handler
    setTimeout(async () => {
      closeCourtModal();
      _doRecordEditShot(pts, made, el.dataset.zone, sx, sy);
      // Re-open edit modal (it was open before court modal)
      openModal('modal-edit-match');
    }, 650);
    return;
  }

  // Normal live path
  pushUndo();
  const m=state.matches[liveMatch],p=m.players[selectedPlayerIdx],q=curKey();
  const deltaType=pts===2?'shot2':'shot3';
  if(pts===2){ m.stats[p.id][q].fg2a++; if(made){m.stats[p.id][q].fg2m++; m.ourScore+=2;} }
  else        { m.stats[p.id][q].fg3a++; if(made){m.stats[p.id][q].fg3m++; m.ourScore+=3;} }

  m.stats[p.id][q].shots.push({pts,made,zone:el.dataset.zone,q,sx,sy});
  addLog(p,made?'✅':'❌',pts+'pt '+(made?t('log.shot_made'):t('log.shot_missed'))+' — '+el.dataset.zone,q,
    {type:deltaType,made,pts:made?pts:0,sx,sy,zone:el.dataset.zone});

  const pPts=Object.values(m.stats[p.id]||{}).reduce((s,b)=>s+b.fg2m*2+b.fg3m*3+b.ftm,0);
  setTimeout(async ()=>{ closeCourtModal(); await save(); renderLive(); toast(made?t('toast.shot_made',{name:p.name,pts,total:pPts}):t('toast.shot_missed',{name:p.name})); },650);
}

// ═══ REPORT ═══
function totals(m,p) {
  const a=es();
  if(!m.stats[p.id]) return a;
  Object.values(m.stats[p.id]).forEach(s=>{
    Object.keys(a).forEach(k=>{
      if(k==='shots') a.shots=[...a.shots,...(s.shots||[])];
      else a[k]=(a[k]||0)+(s[k]||0);
    });
  });
  return a;
}
// Calcola il bonus/malus (valutazione) di un giocatore
// Formula: PTS + REB + ASS + RUB + STOP - (TIR.Sbagliati) - (TL.Sbagliati) - PERSE - FALLI
function calcVal(all) {
  const pts  = all.fg2m*2 + all.fg3m*3 + all.ftm;
  const reb  = (all.reb_off||0) + (all.reb_def||0);
  const ast  = all.assist||0;
  const stl  = all.steal||0;
  const blk  = all.block||0;
  const fgMissed  = ((all.fg2a||0)-(all.fg2m||0)) + ((all.fg3a||0)-(all.fg3m||0));
  const ftMissed  = (all.fta||0) - (all.ftm||0);
  const tov  = all.turnover||0;
  const foul = all.foul||0;
  return pts + reb + ast + stl + blk - fgMissed - ftMissed - tov - foul;
}

// Calcola il +/- di ogni giocatore usando il log degli eventi (onCourtIds).
// Restituisce un oggetto { playerId: number }, oppure null se il log
// non contiene onCourtIds (partite non tracciate live).
// periods: array opzionale di chiavi quarto per filtrare (es. ['q1','q2']); null/vuoto = tutta la partita.
function calcPlusMinusMap(m, periods) {
  const pm = {};
  m.players.forEach(p => { pm[p.id] = 0; });
  const hasData = m.log && m.log.some(l => l.onCourtIds && l.onCourtIds.length > 0);
  if (!hasData) return null;
  const filterPeriods = periods && periods.length > 0 ? new Set(periods) : null;
  m.log.forEach(l => {
    if (!l.onCourtIds || !l.delta) return;
    if (filterPeriods && !filterPeriods.has(l.q)) return;
    const pts = l.delta.pts || 0;
    if (pts === 0) return;
    const isOpp = l.delta.type === 'opp_score';
    l.onCourtIds.forEach(id => {
      if (pm[id] === undefined) pm[id] = 0;
      if (isOpp) pm[id] -= pts;
      else       pm[id] += pts;
    });
  });
  return pm;
}

// ── Dati condivisi tra renderReport() ed exportReport() ──────────────────────
// Calcola rows (statistiche giocatori), pmMap (+/-), periods e ptotals (punteggi per quarto).
// Chiamata da entrambe le funzioni per evitare duplicazione.
function buildMatchData(m) {
  const rows = m.players.map(p => {
    const all    = totals(m, p);
    const pts    = all.fg2m*2 + all.fg3m*3 + all.ftm;
    const fg2pct = all.fg2a > 0 ? Math.round(all.fg2m / all.fg2a * 100) : 0;
    const fg3pct = all.fg3a > 0 ? Math.round(all.fg3m / all.fg3a * 100) : 0;
    const ftpct  = all.fta  > 0 ? Math.round(all.ftm  / all.fta  * 100) : 0;
    const min    = minPlayed(m, p);
    return { p, pts, all, fg2pct, fg3pct, ftpct, min };
  }).sort((a, b) => b.pts - a.pts);

  const pmMap = calcPlusMinusMap(m);
  rows.forEach(r => { r.pm = pmMap ? (pmMap[r.p.id] || 0) : null; });

  const periods = [];
  for (let q = 1; q <= 4; q++) periods.push({ key: 'q' + q, label: 'Q' + q });
  if (m.isOT) for (let o = 1; o <= m.otNum; o++) periods.push({ key: 'ot' + o, label: 'OT' + o });

  const ptotals = periods.map(({ key, label }) => {
    let pts = 0;
    m.players.forEach(p => { const s = m.stats[p.id]?.[key]; if (s) pts += s.fg2m*2 + s.fg3m*3 + s.ftm; });
    const opp = (m.oppScoreByPeriod && m.oppScoreByPeriod[key]) || 0;
    return { label, pts, opp };
  });

  return { rows, pmMap, periods, ptotals };
}

// ─────────────────────────────────────────────────────────────────────────────
// SHARED REPORT BUILDER FUNCTIONS
// Usate sia da renderReport() (in-app) che da exportReport() (standalone HTML).
// Restituiscono HTML string. Il parametro `mode` è 'inapp' | 'export' e controlla
// se usare CSS variables (in-app) o colori hex hardcoded (export standalone).
// ─────────────────────────────────────────────────────────────────────────────

// Tema colori: CSS var per in-app, hex per export standalone
function _reportTheme(mode) {
  if (mode === 'inapp') {
    return {
      accent:   'var(--accent)',
      green:    'var(--green)',
      red:      'var(--red)',
      yellow:   'var(--yellow)',
      text1:    'var(--text1)',
      text2:    'var(--text2)',
      text3:    'var(--text3)',
      surface:  'var(--surface2)',
      border:   'rgba(255,255,255,.08)',
      cardBg:   'var(--surface2)',
    };
  }
  return {
    accent:   '#f5a623',
    green:    '#2ecc71',
    red:      '#e74c3c',
    yellow:   '#f5a623',
    text1:    '#f0eee8',
    text2:    '#ccc',
    text3:    '#888',
    surface:  '#1c1c27',
    border:   'rgba(255,255,255,.08)',
    cardBg:   '#13131a',
  };
}

// ── Shot Summary cards (FG / 2pt / 3pt / TL) ────────────────────────────────
function renderShotSummaryHTML(rows, mode) {
  const th = _reportTheme(mode);
  const T = rows.reduce((acc, {all}) => ({
    fg2m: acc.fg2m + all.fg2m, fg2a: acc.fg2a + all.fg2a,
    fg3m: acc.fg3m + all.fg3m, fg3a: acc.fg3a + all.fg3a,
    ftm:  acc.ftm  + all.ftm,  fta:  acc.fta  + all.fta,
  }), {fg2m:0, fg2a:0, fg3m:0, fg3a:0, ftm:0, fta:0});
  const fg2pct = T.fg2a > 0 ? Math.round(T.fg2m / T.fg2a * 100) : 0;
  const fg3pct = T.fg3a > 0 ? Math.round(T.fg3m / T.fg3a * 100) : 0;
  const ftpct  = T.fta  > 0 ? Math.round(T.ftm  / T.fta  * 100) : 0;
  const fgm = T.fg2m + T.fg3m, fga = T.fg2a + T.fg3a;
  const fgpct = fga > 0 ? Math.round(fgm / fga * 100) : 0;
  function pC(v, att) { return att === 0 ? th.text3 : v >= 50 ? th.green : v >= 33 ? th.yellow : th.red; }
  const cards = [
    {label: t('report.shot_fg'),  made: fgm,    att: fga,    pct: fgpct,  col: pC(fgpct, fga)},
    {label: t('report.shot_fg2'), made: T.fg2m, att: T.fg2a, pct: fg2pct, col: pC(fg2pct, T.fg2a)},
    {label: t('report.shot_fg3'), made: T.fg3m, att: T.fg3a, pct: fg3pct, col: pC(fg3pct, T.fg3a)},
    {label: t('report.shot_ft'),  made: T.ftm,  att: T.fta,  pct: ftpct,  col: pC(ftpct, T.fta)},
  ];
  const grid = mode === 'inapp'
    ? 'display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin:0 16px 16px'
    : 'display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:16px';
  const cardStyle = mode === 'inapp'
    ? `class="card" style="padding:14px;text-align:center;margin:0"`
    : `style="background:${th.cardBg};border:1px solid ${th.border};border-radius:12px;padding:14px;text-align:center"`;
  return `<div style="${grid}">
    ${cards.map(c => `<div ${cardStyle}>
      <div style="font-size:11px;color:${th.text3};text-transform:uppercase;letter-spacing:.8px;margin-bottom:6px">${c.label}</div>
      <div style="font-size:26px;font-weight:900;color:${c.col};line-height:1">${c.made}/${c.att}</div>
      <div style="font-size:20px;font-weight:700;color:${pC(c.pct, c.att)};margin-top:4px">${c.pct}%</div>
    </div>`).join('')}
  </div>`;
}

// ── Team Totals cards (reb/ast/stl/tov/blk/foul) ────────────────────────────
function renderTeamTotalsHTML(rows, mode) {
  const th = _reportTheme(mode);
  const T = rows.reduce((acc, {all}) => ({
    reb_off:    acc.reb_off    + (all.reb_off    || 0),
    reb_def:    acc.reb_def    + (all.reb_def    || 0),
    assist:     acc.assist     + (all.assist     || 0),
    steal:      acc.steal      + (all.steal      || 0),
    turnover:   acc.turnover   + (all.turnover   || 0),
    block:      acc.block      + (all.block      || 0),
    foul:       acc.foul       + (all.foul       || 0),
    foul_drawn: acc.foul_drawn + (all.foul_drawn || 0),
  }), {reb_off:0, reb_def:0, assist:0, steal:0, turnover:0, block:0, foul:0, foul_drawn:0});
  const stats = [
    {icon:'🏀', label: t('stat.reb_off_label'),    val: T.reb_off},
    {icon:'🛡️', label: t('stat.reb_def_label'),    val: T.reb_def},
    {icon:'↕️', label: t('stat.reb_tot_label'),    val: T.reb_off + T.reb_def},
    {icon:'🎯', label: t('col.ast'),               val: T.assist},
    {icon:'🫳', label: t('stat.steal_label'),      val: T.steal},
    {icon:'💸', label: t('stat.turnover_label'),   val: T.turnover},
    {icon:'🙌', label: t('stat.block_short') || t('stat.block'), val: T.block},
    {icon:'✋', label: t('stat.fouls_made_label'), val: T.foul},
    {icon:'🙋', label: t('stat.fouls_drawn_label'),val: T.foul_drawn},
  ];
  const cardStyle = mode === 'inapp'
    ? `class="card" style="padding:12px;text-align:center;margin:0"`
    : `style="background:${th.cardBg};border:1px solid ${th.border};border-radius:12px;padding:12px;text-align:center"`;
  return `<div class="grid3-fixed" style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin:0 ${mode==='inapp'?'16px':'0'} 16px">
    ${stats.map(s => `<div ${cardStyle}>
      <div style="font-size:18px;margin-bottom:2px">${s.icon}</div>
      <div style="font-size:${mode==='inapp'?'11':'13'}px;color:${th.text2};font-weight:600;letter-spacing:.3px;margin-bottom:4px">${s.label}</div>
      <div style="font-size:${mode==='inapp'?'28':'30'}px;font-weight:900;color:${th.text1};line-height:1">${s.val}</div>
    </div>`).join('')}
  </div>`;
}

// ── Substitutions table ──────────────────────────────────────────────────────
function renderSubstitutionsHTML(m, mode) {
  if (!m.subs || !m.subs.length) return '';
  const th = _reportTheme(mode);
  if (mode === 'inapp') {
    return `
<div class="section-title">${t('report.substitutions').toUpperCase()}</div>
<div class="card" style="padding:0;overflow:hidden;margin-bottom:8px">
  <div class="scroll-x">
    <table class="stat-table" style="width:100%">
      <thead><tr>
        <th style="text-align:left">${t('report.sub.quarter')}</th>
        <th style="text-align:center">${t('report.sub.in')}</th>
        <th style="text-align:center">${t('report.sub.out')}</th>
        <th style="text-align:center">${t('report.sub.at_end')}</th>
      </tr></thead>
      <tbody>${m.subs.map(s => `<tr>
        <td>${esc(s.q)}</td>
        <td style="color:var(--green)">↑ #${esc(s.inNum)} ${esc(s.in)}</td>
        <td style="color:var(--red)">↓ #${esc(s.outNum)} ${esc(s.out)}</td>
        <td>${esc(s.min)}:${esc(String(s.sec).padStart(2,'0'))}</td>
      </tr>`).join('')}</tbody>
    </table>
  </div>
</div>`;
  }
  // export mode
  return `<h2>${t('report.substitutions')}</h2>
<table><thead><tr>
  <th>${t('report.sub.quarter')}</th>
  <th>${t('report.sub.in')}</th>
  <th>${t('report.sub.out')}</th>
  <th>${t('report.sub.at_end')}</th>
</tr></thead>
<tbody>${m.subs.map(s => `<tr>
  <td>${esc(s.q)}</td>
  <td class="green">↑ #${esc(s.inNum)} ${esc(s.in)}</td>
  <td class="red">↓ #${esc(s.outNum)} ${esc(s.out)}</td>
  <td>${esc(s.min)}:${esc(String(s.sec).padStart(2,'0'))}</td>
</tr>`).join('')}</tbody></table>`;
}

// ── Opp Fouls section ────────────────────────────────────────────────────────
function renderOppFoulsHTML(m, mode) {
  const oppP = m.oppPlayers || [];
  if (!oppP.length) return '';
  const th = _reportTheme(mode);
  const oppF = m.oppFouls || {};
  const oppRows = oppP.map(p => {
    const fd = oppF[p.id];
    let tot = 0;
    if (fd && typeof fd === 'object') tot = Object.values(fd).reduce((a,b) => a + (b||0), 0);
    else if (typeof fd === 'number') tot = fd;
    return {p, tot};
  }).sort((a,b) => b.tot - a.tot);
  const totalOppFouls = oppRows.reduce((a,r) => a + r.tot, 0);
  const foulColor = (tot) => tot >= 5 ? th.red : tot >= 3 ? th.yellow : th.text3;

  if (mode === 'inapp') {
    return `<div class="section-title">${t('report.opp_fouls').toUpperCase()}</div>
    <div class="card" style="border:1px solid rgba(231,76,60,.2)">
      <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:12px">
        ${oppRows.map(({p,tot}) => `<div style="background:var(--surface2);border:1px solid rgba(255,255,255,.08);border-radius:10px;padding:10px 14px;display:flex;align-items:center;gap:10px;min-width:130px">
          <div style="font-size:22px;font-weight:900;font-family:var(--font-mono);color:var(--accent)">#${esc(p.num)}</div>
          <div>
            <div style="font-size:13px;font-weight:600;color:var(--text1)">${esc(p.name)}</div>
            <div style="font-size:20px;font-weight:900;color:${foulColor(tot)}">${tot} ${t('report.opp_foul_count',{n:tot})}${tot>=5?' ⚠️':''}</div>
          </div>
        </div>`).join('')}
      </div>
      <div style="font-size:12px;color:var(--text3);border-top:1px solid rgba(255,255,255,.06);padding-top:10px">${t('report.opp_foul_total',{n:totalOppFouls})}</div>
    </div>`;
  }
  // export mode
  return `<h2>${t('report.opp_fouls')}</h2>
<div style="background:${th.cardBg};border:1px solid rgba(231,76,60,.2);border-radius:12px;padding:14px;margin-bottom:16px">
  <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:12px">
    ${oppRows.map(({p,tot}) => `<div style="background:${th.surface};border:1px solid ${th.border};border-radius:10px;padding:10px 14px;display:flex;align-items:center;gap:10px;min-width:130px">
      <div style="font-size:22px;font-weight:900;font-family:monospace;color:${th.accent}">#${esc(p.num)}</div>
      <div>
        <div style="font-size:13px;font-weight:600;color:${th.text1}">${esc(p.name)}</div>
        <div style="font-size:20px;font-weight:900;color:${foulColor(tot)}">${tot} ${t('report.opp_foul_count',{n:tot})}${tot>=5?' ⚠️':''}</div>
      </div>
    </div>`).join('')}
  </div>
  <div style="font-size:12px;color:${th.text3};border-top:1px solid rgba(255,255,255,.06);padding-top:10px">${t('report.opp_foul_total',{n:totalOppFouls})}</div>
</div>`;
}

// ── Game Flow: dati (series + stats) ────────────────────────────────────────
function buildGameFlowData(m) {
  const logAsc = [...(m.log || [])].reverse();
  const pkeys = [];
  const curQ = m.isOT ? (m.otNum || 1) : (m.quarter || 1);
  if (!m.isOT) {
    for (let q = 1; q <= curQ; q++) pkeys.push({key: 'q'+q, label: 'Q'+q});
  } else {
    for (let q = 1; q <= 4; q++) pkeys.push({key: 'q'+q, label: 'Q'+q});
    for (let o = 1; o <= curQ; o++) pkeys.push({key: 'ot'+o, label: 'OT'+o});
  }

  // Punteggi cumulativi di fine quarto
  const qEndScore = {};
  {
    const curPK = m.isOT ? 'ot'+(m.otNum||1) : 'q'+(m.quarter||1);
    let os = 0, op = 0;
    pkeys.forEach(({key}) => {
      if (m.status === 'live' && key === curPK) {
        qEndScore[key] = {our: m.ourScore||0, opp: m.oppScore||0};
      } else {
        let pts = 0;
        m.players.forEach(p => { const s = m.stats[p.id]?.[key]; if (s) pts += s.fg2m*2+s.fg3m*3+s.ftm; });
        const opp = (m.oppScoreByPeriod && m.oppScoreByPeriod[key]) || 0;
        os += pts; op += opp;
        qEndScore[key] = {our: os, opp: op};
      }
    });
  }

  // Costruzione serie cronologica
  const series = [{our:0, opp:0, q:'start', anchor:true}];
  const useFallback = !logAsc.some(l => l.scoreSnap && l.scoreSnap.our !== undefined);
  if (!useFallback) {
    const eventsByQ = {};
    pkeys.forEach(({key}) => eventsByQ[key] = []);
    logAsc.forEach(l => {
      if (l.scoreSnap && l.scoreSnap.our !== undefined && eventsByQ[l.q]) {
        const minNum = l.timeLabel ? (()=>{ const p=String(l.timeLabel).split(':'); return p.length===2?parseInt(p[0])*60+parseInt(p[1]):parseFloat(l.timeLabel)*60; })() : null;
        eventsByQ[l.q].push({our: l.scoreSnap.our, opp: l.scoreSnap.opp, q: l.q, min: minNum, ts: l.ts||0});
      }
    });
    pkeys.forEach(({key}) => {
      const qe = qEndScore[key]; if (!qe) return;
      const evs = (eventsByQ[key]||[]).slice().sort((a,b) => {
        if (a.min !== null && b.min !== null) return b.min - a.min;
        if (a.min !== null) return -1; if (b.min !== null) return 1;
        return a.ts - b.ts;
      });
      evs.forEach(ev => { ev.our = Math.min(ev.our, qe.our); ev.opp = Math.min(ev.opp, qe.opp); });
      let prevOur = series[series.length-1]?.our ?? 0;
      let prevOpp = series[series.length-1]?.opp ?? 0;
      evs.forEach(ev => {
        const safeOur = Math.max(ev.our, prevOur), safeOpp = Math.max(ev.opp, prevOpp);
        if (safeOur !== prevOur || safeOpp !== prevOpp) {
          series.push({...ev, our: safeOur, opp: safeOpp});
          prevOur = safeOur; prevOpp = safeOpp;
        }
      });
      const last = series[series.length-1];
      if (last && !last.anchor && last.our === qe.our && last.opp === qe.opp) series.pop();
      series.push({our: qe.our, opp: qe.opp, q: key, anchor: true});
    });
  } else {
    pkeys.forEach(({key}) => { const qe = qEndScore[key]; if (qe) series.push({our: qe.our, opp: qe.opp, q: key, anchor:true}); });
  }

  // Statistiche match
  let maxOurLead=0, maxOppLead=0, ties=0, leadChanges=0, prevSign=0;
  for (let i = 1; i < series.length; i++) {
    const diff = series[i].our - series[i].opp;
    if (diff > maxOurLead)  maxOurLead = diff;
    if (-diff > maxOppLead) maxOppLead = -diff;
    if (diff === 0) ties++;
    const curSign = diff>0?1:diff<0?-1:0;
    if (curSign !== 0 && prevSign !== 0 && curSign !== prevSign) leadChanges++;
    if (curSign !== 0) prevSign = curSign;
  }
  if (maxOurLead < 0) maxOurLead = 0;
  if (maxOppLead < 0) maxOppLead = 0;

  return {series, pkeys, maxOurLead, maxOppLead, ties, leadChanges};
}

// ── Game Flow: SVG chart ─────────────────────────────────────────────────────
function buildGameFlowSVG(series, pkeys, accentColor) {
  const W=340, H=180, padL=30, padR=36, padT=12, padB=26;
  const plotW = W-padL-padR, plotH = H-padT-padB;
  const maxY = Math.max(...series.map(s=>s.our), ...series.map(s=>s.opp), 1);
  function py(v) { return Math.round(H-padB-v*plotH/maxY); }
  const nQ = pkeys.length, qW = plotW/nQ;
  const qOrder = pkeys.map(p=>p.key);
  const buckets = pkeys.map(()=>[]);
  series.forEach((s,i) => { if(i===0) return; const qi=qOrder.indexOf(s.q); if(qi>=0) buckets[qi].push(i); });
  const seriesX = new Array(series.length); seriesX[0] = padL;
  buckets.forEach((idxList, qi) => {
    const xLeft=padL+qi*qW, xRight=padL+(qi+1)*qW;
    const intra=idxList.filter(i=>!series[i].anchor), anchor=idxList.find(i=>series[i].anchor), total=intra.length+1;
    intra.forEach((si,pos) => { seriesX[si]=Math.round(xLeft+(pos+1)/total*qW); });
    if (anchor !== undefined) seriesX[anchor]=Math.round(xRight);
  });
  let qBands = '';
  pkeys.forEach(({key, label}, qi) => {
    const x1=Math.round(padL+qi*qW), x2=Math.round(padL+(qi+1)*qW);
    if (qi%2===0) qBands+=`<rect x="${x1}" y="${padT}" width="${x2-x1}" height="${plotH}" fill="rgba(255,255,255,0.025)"/>`;
    if (qi>0)     qBands+=`<line x1="${x1}" y1="${padT}" x2="${x1}" y2="${H-padB}" stroke="rgba(255,255,255,0.08)" stroke-width="1" stroke-dasharray="3,3"/>`;
    qBands+=`<text x="${(x1+x2)/2}" y="${H-8}" text-anchor="middle" font-size="10" fill="#555" font-family="sans-serif">${label}</text>`;
  });
  const nTicks=4, rawStep=maxY/nTicks, yStep=Math.max(1,Math.ceil(rawStep/5)*5);
  let yGrid='';
  for (let v=0; v<=maxY; v+=yStep) {
    const y=py(v);
    yGrid+=`<line x1="${padL}" y1="${y}" x2="${W-padR}" y2="${y}" stroke="rgba(255,255,255,0.05)" stroke-width="1"/>`;
    yGrid+=`<text x="${padL-4}" y="${y+3.5}" text-anchor="end" font-size="9" fill="#555" font-family="sans-serif">${v}</text>`;
  }
  const ourPts=series.map((s,i)=>seriesX[i]+','+py(s.our)).join(' ');
  const oppPts=series.map((s,i)=>seriesX[i]+','+py(s.opp)).join(' ');
  const maxDots=50, dotStep=Math.max(1,Math.floor(series.length/maxDots)), dotIdxs=new Set();
  for (let i=0; i<series.length; i+=dotStep) dotIdxs.add(i); dotIdxs.add(series.length-1);
  const ourDots=[...dotIdxs].map(i=>`<circle cx="${seriesX[i]}" cy="${py(series[i].our)}" r="${i===series.length-1?2:1}" fill="#f7ca8b"/>`).join('');
  const oppDots=[...dotIdxs].map(i=>`<circle cx="${seriesX[i]}" cy="${py(series[i].opp)}" r="${i===series.length-1?2:1}" fill="#c9c7c7"/>`).join('');
  const lastS=series[series.length-1], lastX=seriesX[series.length-1];
  const ourEndY=py(lastS.our), oppEndY=py(lastS.opp), endX=lastX+6, gap=Math.abs(ourEndY-oppEndY);
  const ourLblY=ourEndY+(gap<14?(ourEndY<=oppEndY?-4:4):0);
  const oppLblY=oppEndY+(gap<14?(oppEndY<ourEndY?4:-4):0);
  return `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" style="width:100%;display:block">
    ${qBands}${yGrid}
    <polyline points="${oppPts}" fill="none" stroke="rgba(255,255,255,.35)" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round"/>
    <polyline points="${ourPts}" fill="none" stroke="${accentColor}" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round"/>
    ${ourDots}${oppDots}
    <text x="${endX}" y="${ourLblY+4}" font-size="8" font-weight="700" fill="${accentColor}" font-family="sans-serif">${lastS.our}</text>
    <text x="${endX}" y="${oppLblY+4}" font-size="8" font-weight="700" fill="#aaa" font-family="sans-serif">${lastS.opp}</text>
  </svg>`;
}

// ── Game Flow: sezione completa HTML ─────────────────────────────────────────
function renderGameFlowHTML(m, mode) {
  const {series, pkeys, maxOurLead, maxOppLead, ties, leadChanges} = buildGameFlowData(m);
  if (series.length < 2) return '';
  const th = _reportTheme(mode);
  const svgChart = buildGameFlowSVG(series, pkeys, th.accent);

  if (mode === 'inapp') {
    return `<div class="section-title">${t('report.game_flow').toUpperCase()}</div>
    <div class="card" style="margin:0 0 8px">
      <div style="margin-bottom:8px">${svgChart}</div>
      <div style="display:flex;gap:16px;justify-content:center;font-size:11px;color:var(--text2);margin-bottom:14px">
        <span><span style="display:inline-block;width:14px;height:3px;background:var(--accent);border-radius:2px;vertical-align:middle;margin-right:4px"></span>${t('report.gf_us')}</span>
        <span><span style="display:inline-block;width:14px;height:3px;background:rgba(255,255,255,.35);border-radius:2px;vertical-align:middle;margin-right:4px"></span>${esc(m.opponent)}</span>
      </div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px">
        <div style="background:var(--surface2);border-radius:10px;padding:12px;text-align:center">
          <div style="font-size:18px;margin-bottom:4px">🚀</div>
          <div style="font-size:18px;font-weight:900;line-height:1"><span style="color:var(--accent)">+${maxOurLead}</span><span style="color:var(--text3);font-size:12px"> / </span><span style="color:var(--text3)">+${maxOppLead}</span></div>
          <div style="font-size:10px;color:var(--text3);margin-top:4px">${t('report.gf_max_lead')}</div>
        </div>
        <div style="background:var(--surface2);border-radius:10px;padding:12px;text-align:center">
          <div style="font-size:18px;margin-bottom:4px">⚖️</div>
          <div style="font-family:var(--font-display);font-size:28px;font-weight:900;color:var(--text1);line-height:1">${ties}</div>
          <div style="font-size:10px;color:var(--text3);margin-top:4px">${t('report.gf_ties')}</div>
        </div>
        <div style="background:var(--surface2);border-radius:10px;padding:12px;text-align:center">
          <div style="font-size:18px;margin-bottom:4px">🔄</div>
          <div style="font-family:var(--font-display);font-size:28px;font-weight:900;color:var(--text1);line-height:1">${leadChanges}</div>
          <div style="font-size:10px;color:var(--text3);margin-top:4px">${t('report.gf_lead_changes')}</div>
        </div>
      </div>
    </div>`;
  }
  // export mode
  return `<h2>${t('report.game_flow')}</h2>
<div style="background:${th.cardBg};border:1px solid ${th.border};border-radius:12px;padding:14px;margin-bottom:16px">
  <div style="margin-bottom:8px">${svgChart}</div>
  <div style="display:flex;gap:16px;justify-content:center;font-size:11px;margin-bottom:14px">
    <span><span style="display:inline-block;width:14px;height:3px;background:${th.accent};border-radius:2px;vertical-align:middle;margin-right:4px"></span>${t('report.gf_us')}</span>
    <span><span style="display:inline-block;width:14px;height:3px;background:rgba(255,255,255,.35);border-radius:2px;vertical-align:middle;margin-right:4px"></span>${esc(m.opponent)}</span>
  </div>
  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px">
    <div style="background:${th.surface};border-radius:10px;padding:12px;text-align:center">
      <div style="font-size:18px;margin-bottom:4px">🚀</div>
      <div style="font-size:20px;font-weight:900;line-height:1"><span style="color:${th.accent}">+${maxOurLead}</span><span style="color:${th.text3};font-size:13px"> / </span><span style="color:${th.text3}">+${maxOppLead}</span></div>
      <div style="font-size:11px;color:${th.text3};margin-top:4px">${t('report.gf_max_lead')}</div>
    </div>
    <div style="background:${th.surface};border-radius:10px;padding:12px;text-align:center">
      <div style="font-size:18px;margin-bottom:4px">⚖️</div>
      <div style="font-size:32px;font-weight:900;color:${th.text1};line-height:1">${ties}</div>
      <div style="font-size:11px;color:${th.text3};margin-top:4px">${t('report.gf_ties')}</div>
    </div>
    <div style="background:${th.surface};border-radius:10px;padding:12px;text-align:center">
      <div style="font-size:18px;margin-bottom:4px">🔄</div>
      <div style="font-size:32px;font-weight:900;color:${th.text1};line-height:1">${leadChanges}</div>
      <div style="font-size:11px;color:${th.text3};margin-top:4px">${t('report.gf_lead_changes')}</div>
    </div>
  </div>
</div>`;
}

// ── Lineup rows builder (logica UNICA per entrambe le versioni) ───────────────
// Sostituisce la logica duplicata in exportReport() (lineupStatsData IIFE)
// e in renderReport() (sezione quintetti IIFE).
// Restituisce un array di row objects pronti per il rendering.
function buildLineupRows(m) {
  const log = m.log || [];
  const hasCourt = log.some(l => l.onCourtIds && l.onCourtIds.length > 0);
  if (!hasCourt) return null;

  function lineupKey(ids) { return [...ids].sort().join('|'); }

  // 1) Scoring stats per lineup
  const scoreMap = {};
  log.forEach(l => {
    if (!l.onCourtIds || !l.onCourtIds.length || !l.delta) return;
    const pts = l.delta.pts || 0; if (!pts) return;
    const k = lineupKey(l.onCourtIds);
    if (!scoreMap[k]) scoreMap[k] = {ids: l.onCourtIds.slice(), pts:0, ptso:0};
    if (l.delta.type === 'opp_score') scoreMap[k].ptso += pts;
    else scoreMap[k].pts += pts;
  });

  // 2) Minutes via segment reconstruction
  const logAsc = [...log].reverse();
  const qlen = m.qlen || 10, otlen = m.otlen || 5;
  function pStartMin(q) {
    if (!q) return 0;
    return q.startsWith('q') ? (parseInt(q.slice(1))-1)*qlen : 4*qlen+(parseInt(q.slice(2))-1)*otlen;
  }
  function pDurMin(q) { return (!q || q.startsWith('q')) ? qlen : otlen; }
  function pEndMin(q) { return pStartMin(q) + pDurMin(q); }

  const periodSet = new Set();
  if (!m.isOT) {
    for (let i=1; i<=(m.quarter||1); i++) periodSet.add('q'+i);
  } else {
    for (let i=1; i<=4; i++) periodSet.add('q'+i);
    for (let o=1; o<=(m.otNum||1); o++) periodSet.add('ot'+o);
  }

  const curPK = m.isOT ? 'ot'+(m.otNum||1) : 'q'+(m.quarter||1);
  const isLive = m.status === 'live';
  function effectivePEnd(q) {
    const fullEnd = pEndMin(q);
    if (isLive && q === curPK) {
      const remMin = (typeof timerSeconds==='number' && timerSeconds>=0) ? timerSeconds/60 : 0;
      const elapsed = pDurMin(q) - remMin;
      return pStartMin(q) + Math.max(0, Math.min(elapsed, pDurMin(q)));
    }
    return fullEnd;
  }

  let initIds = null;
  for (const l of logAsc) { if (l.onCourtIds && l.onCourtIds.length===5) { initIds=l.onCourtIds.slice(); break; } }
  if (!initIds) { for (const l of logAsc) { if (l.onCourtIds && l.onCourtIds.length>0) { initIds=l.onCourtIds.slice(); break; } } }
  if (!initIds) return null;

  const subsGrouped = {};
  (m.subs||[]).forEach(s => {
    const q = (s.q||'').toLowerCase().replace(/[^a-z0-9]/g,'').replace('quarto','q').replace('quarter','q');
    const key = q.startsWith('ot') ? q : (q.startsWith('q') ? q : null);
    if (!key) return;
    if (!subsGrouped[key]) subsGrouped[key] = [];
    subsGrouped[key].push({remSec: (parseInt(s.min)||0)*60+(parseInt(s.sec)||0), inName: s.in, outName: s.out});
  });

  const nameToId = {};
  m.players.forEach(p => { nameToId[p.name] = p.id; });

  const segments = [];
  const periodOrder = ['q1','q2','q3','q4','ot1','ot2','ot3','ot4','ot5'];
  let currentIds = initIds.slice();
  periodOrder.forEach(q => {
    if (!periodSet.has(q)) return;
    const pStart = pStartMin(q), pDur = pDurMin(q), pEnd = effectivePEnd(q);
    if (pEnd <= pStart) return;
    const subsInPeriod = (subsGrouped[q]||[]).slice().sort((a,b) => b.remSec-a.remSec);
    let segStart = pStart;
    subsInPeriod.forEach(sub => {
      const elapsed = pDur-(sub.remSec/60);
      const segEnd = pStart+Math.max(0,Math.min(elapsed,pDur));
      if (segEnd > segStart && segEnd <= pEnd)
        segments.push({startMin:segStart, endMin:segEnd, key:lineupKey(currentIds), ids:currentIds.slice()});
      if (segEnd <= pEnd) segStart = segEnd;
      if (elapsed <= (pEnd-pStart)) {
        const inId=nameToId[sub.inName], outId=nameToId[sub.outName];
        if (inId && outId) {
          currentIds = currentIds.map(id => id===outId ? inId : id);
          if (!currentIds.includes(inId)) currentIds = currentIds.filter(id=>id!==outId).concat(inId);
        }
      }
    });
    if (pEnd > segStart) segments.push({startMin:segStart, endMin:pEnd, key:lineupKey(currentIds), ids:currentIds.slice()});
  });

  const minMap = {};
  segments.forEach(seg => {
    const dur = seg.endMin-seg.startMin; if (dur<=0) return;
    if (!minMap[seg.key]) minMap[seg.key]=0;
    minMap[seg.key] += dur;
  });

  // 3) VAL per quintetto
  function computeLineupVAL(lkStr, ids) {
    const acc = {};
    ids.forEach(id => { acc[id]={pts:0,reb:0,ast:0,stl:0,blk:0,fgm:0,fga:0,ftm:0,fta:0,tov:0}; });
    const idSet = new Set(ids);
    log.forEach(l => {
      if (!l.onCourtIds||!l.onCourtIds.length) return;
      if (lineupKey(l.onCourtIds)!==lkStr) return;
      if (!l.playerId||!idSet.has(l.playerId)) return;
      const d=l.delta; if(!d) return;
      const a=acc[l.playerId]; if(!a) return;
      switch(d.type) {
        case 'shot2':    a.fga+=1; if(d.made){a.pts+=2;a.fgm+=1;} break;
        case 'shot3':    a.fga+=1; if(d.made){a.pts+=3;a.fgm+=1;} break;
        case 'ft':       a.fta+=1; if(d.made){a.pts+=1;a.ftm+=1;} break;
        case 'reb_off':
        case 'reb_def':  a.reb+=1; break;
        case 'assist':   a.ast+=1; break;
        case 'steal':    a.stl+=1; break;
        case 'block':    a.blk+=1; break;
        case 'turnover': a.tov+=1; break;
      }
    });
    let val=0;
    ids.forEach(id => {
      const a=acc[id]; if(!a) return;
      val += a.pts+a.reb+a.ast+a.stl+a.blk+(a.fgm-a.fga)+(a.ftm-a.fta)-a.tov;
    });
    return val;
  }

  // 4) Merge e build result
  const allKeys = new Set([...Object.keys(scoreMap), ...Object.keys(minMap)]);
  const result = [];
  allKeys.forEach(k => {
    const sc = scoreMap[k] || {pts:0, ptso:0};
    const mins = minMap[k] || 0;
    if (sc.pts===0 && sc.ptso===0 && mins<0.1) return;
    const ids = (scoreMap[k]||{ids:k.split('|')}).ids;
    const players = ids.map(id=>m.players.find(p=>p.id===id)).filter(Boolean).sort((a,b)=>parseInt(a.num)-parseInt(b.num));
    const pm = sc.pts-sc.ptso;
    const val = computeLineupVAL(k, ids);
    const minFormatted = mins>0 ? (Math.floor(mins)+':'+String(Math.round((mins%1)*60)).padStart(2,'0')) : '0:00';
    result.push({key:k, players, pts:sc.pts, ptso:sc.ptso, pm, val, mins, minFormatted});
  });
  result.sort((a,b) => b.pm-a.pm || b.pts-a.pts);
  return result.length ? result : null;
}

// ─────────────────────────────────────────────────────────────────────────────
// END SHARED REPORT BUILDER FUNCTIONS
// ─────────────────────────────────────────────────────────────────────────────

async function exportReport() {
  if(!settings.reportExportEnabled){ toast('⚙️ '+t('report.export_disabled')); return; }
  const id = document.getElementById('report-match-select').value;
  const m  = state.matches.find(x=>x.id===id);
  if(!m){ toast(t('report.select_match')); return; }

  // Build standalone HTML report
  const {rows, pmMap: pmMapExp, periods, ptotals} = buildMatchData(m);

  const courtImgEl = document.querySelector('#court-svg image');
  const courtImg   = courtImgEl ? courtImgEl.getAttribute('href') : '';
  const teamLogo   = settings.teamLogo || '';  

   // Converti logo app in base64 per il report standalone
  let appLogo = '';
  try {
    const resp = await fetch('icons/icon-maskable-512x512.png');
    const blob = await resp.blob();
    appLogo = await new Promise(resolve => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  } catch(e) { appLogo = ''; }

  // Build shot data as JSON for interactive filter in exported page
  const allShots = m.players.flatMap(p=>Object.values(m.stats[p.id]||{}).flatMap(s=>s.shots||[]));
  const playerShotData = JSON.stringify(m.players.map(p=>{
    const allS = Object.values(m.stats[p.id]||{});
    const allTot = totals(m, p);
    return {
      id: p.id, num: p.num, name: p.name,
      shots: allS.flatMap(s=>s.shots||[]),
      ftm: allS.reduce((a,s)=>a+(s.ftm||0),0),
      fta: allS.reduce((a,s)=>a+(s.fta||0),0),
      val: calcVal(allTot),
      pm: pmMapExp ? (pmMapExp[p.id]||0) : null,
    };
  }));

  // Stats per quarto per ogni giocatore, usate per il Box Score filtrabile
  const _bsPeriodKeys=[];
  for(let q=1;q<=4;q++) _bsPeriodKeys.push('q'+q);
  if(m.isOT) for(let o=1;o<=m.otNum;o++) _bsPeriodKeys.push('ot'+o);
  const matchStatsData = JSON.stringify({
    periods: _bsPeriodKeys,
    players: m.players.map(p=>({
      id: p.id, num: p.num, name: p.name,
      byPeriod: Object.fromEntries(_bsPeriodKeys.map(k=>[k, m.stats[p.id]?.[k]||null]))
    }))
  });

  // Serializza solo gli eventi del log utili per il +/- (con onCourtIds e punti)
  const pmLogData = JSON.stringify(
    (m.log||[])
      .filter(l => l.onCourtIds && l.onCourtIds.length > 0 && l.delta && (l.delta.pts||0) > 0)
      .map(l => ({ q: l.q, ids: l.onCourtIds, pts: l.delta.pts, opp: l.delta.type === 'opp_score' }))
  );

  // ── Lineup stats (quintetti) — calcolate dalla funzione condivisa ──────────
  const lineupStatsData = buildLineupRows(m);

  const lineupStatsJSON = JSON.stringify(lineupStatsData);

  // CREAZIONE STANDALONEPAGE REPORT ESPORTATO
  const standalonePage = `<!DOCTYPE html>
<html lang="it">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta http-equiv="Content-Security-Policy" content="default-src 'self' 'unsafe-inline' data: blob:; img-src * data: blob:;">
<title>Report — ${esc(m.opponent)} ${esc(m.date)}</title>
<style>
  *{-webkit-box-sizing:border-box;box-sizing:border-box}
  body{font-family:-apple-system,BlinkMacSystemFont,'Helvetica Neue',system-ui,sans-serif;background:#0a0a0f;color:#f0eee8;margin:0;padding:16px;padding-bottom:max(16px,env(safe-area-inset-bottom));-webkit-text-size-adjust:100%}
  h1{font-size:22px;margin:0 0 4px}
  h2{font-size:16px;color:#888;margin:20px 0 8px;text-transform:uppercase;letter-spacing:1px;border-bottom:1px solid #1c1c27;padding-bottom:4px}
  .meta{font-size:12px;color:#888;margin-bottom:16px}
  .score{font-size:48px;font-weight:900;letter-spacing:4px;color:${m.ourScore>m.oppScore?'#2ecc71':'#e74c3c'}}
  .periods{display:-webkit-flex;display:flex;-webkit-flex-wrap:wrap;flex-wrap:wrap;margin:12px 0}
  .periods > *{margin:4px}
  .period{background:#1c1c27;border-radius:8px;padding:8px 12px;text-align:center;min-width:50px}
  .period-label{font-size:10px;color:#888;text-transform:uppercase}
  .period-pts{font-size:24px;font-weight:700;color:#f5a623}
  .scroll-wrap{overflow-x:auto;-webkit-overflow-scrolling:touch;border-radius:10px;border:1px solid #1c1c27;margin-bottom:16px}
  table{width:100%;border-collapse:separate;border-spacing:0;font-size:11px;margin:0}
  th{background:#1a1a26;color:#aaa;padding:8px 5px;text-align:center;font-size:10px;text-transform:uppercase;letter-spacing:.5px;white-space:nowrap}
  th.sortable{cursor:pointer;user-select:none;transition:color .15s,background .15s}
  th.sortable:hover{color:#f5a623;background:#222235 !important}
  th.sort-active{color:#f5a623 !important}
  th.sort-active::after{content:' ▾';font-size:9px}
  th.sort-asc::after{content:' ▴' !important}
  td{padding:7px 5px;text-align:center;border-bottom:1px solid rgba(255,255,255,.05);white-space:nowrap}
  tbody tr:nth-child(even) td{background:rgba(255,255,255,0.07)}
  tbody tr:nth-child(odd) td{background:transparent}
  th:nth-child(even){background:rgba(255,255,255,0.05) !important}
  th:first-child{text-align:left;position:-webkit-sticky;position:sticky;left:0;z-index:3;background:#1a1a26;border-right:2px solid rgba(255,255,255,0.15);min-width:110px}
  td:first-child{text-align:left;font-weight:600;position:-webkit-sticky;position:sticky;left:0;z-index:2;background:#0a0a0f;border-right:2px solid rgba(255,255,255,0.15)}
  tbody tr:nth-child(even) td:first-child{background:#111120 !important}
  tbody tr:nth-child(odd) td:first-child{background:#0a0a0f !important}
  .dim{color:#ccc;font-size:9px}
  .green{color:#2ecc71} .red{color:#e74c3c}
  .court-wrap{border-radius:12px;overflow:hidden;border:1px solid rgba(245,166,35,.15);margin-bottom:8px}
  .legend{display:-webkit-flex;display:flex;padding:6px 12px;background:#1c1c27;font-size:11px;-webkit-justify-content:center;justify-content:center;-webkit-flex-wrap:wrap;flex-wrap:wrap}
  .legend > *{margin:3px 6px}
  .dot{width:10px;height:10px;border-radius:50%;display:inline-block;margin-right:4px}
  .q-card{background:#13131a;border:1px solid rgba(245,166,35,.12);border-radius:10px;padding:12px;margin-bottom:12px}
  .q-title{font-size:16px;font-weight:700;color:#f5a623;margin-bottom:8px;letter-spacing:1px}
  @media(max-width:480px){
  div[style*="grid-template-columns:repeat(3,1fr)"]:not(.grid3-fixed){grid-template-columns:repeat(2,1fr) !important}
  div[style*="grid-template-columns:repeat(4,1fr)"]{grid-template-columns:repeat(2,1fr) !important}
}
</style>
</head>
<body>



<div style="position:relative;display:flex;align-items:center;margin-bottom:12px">

  <!-- TESTO A SINISTRA -->
  <div>
    <h1 style="margin:0 0 4px">vs ${esc(m.opponent)}</h1>
    <div class="meta">${esc(m.date)} · ${m.home==='home'?t('matches.home'):t('matches.away')}</div>
  </div>

  <!-- LOGO CENTRATO -->
  ${teamLogo ? `<img src="${teamLogo}" 
    style="position:absolute;left:50%;transform:translateX(-50%);width:56px;height:56px;border-radius:50%;object-fit:cover" 
    alt="Logo">` : ''}

  <!-- LOGO APP IN ALTO A DESTRA -->
${appLogo ? `<img src="${appLogo}" class="app-logo-fixed"
  style="position:absolute;top:0;right:0;width:56px;height:56px;border-radius:50%;object-fit:cover"
  alt="BasketBubble"/>` : ''}

</div>

<div class="score">${parseInt(m.ourScore)||0} — ${parseInt(m.oppScore)||0}</div>
<div class="periods">
  ${ptotals.map(({label,pts,opp})=>`<div class="period"><div class="period-label">${esc(label)}</div><div class="period-pts">${parseInt(pts)||0}<span style="color:#888;font-size:16px"> — </span><span style="color:#888">${parseInt(opp)||0}</span></div></div>`).join('')}
</div>

<h2>${t('report.box_score')}</h2>
<div id="exp-bs-period-bar" style="display:flex;gap:5px;flex-wrap:wrap;align-items:center;margin-bottom:10px">
  <!-- populated by JS --></div>
<div class="scroll-wrap" id="exp-bs-wrap">
<table id="exp-bs-table">
  <thead><tr>
    <th class="sortable" data-col="0">${t('col.player')}</th>
    <th class="sortable" data-col="1">${t('col.min')}</th><th class="sortable sort-active" data-col="2">${t('col.pts')}</th><th class="sortable" data-col="3">${t('col.fg2')}</th><th class="sortable" data-col="4">${t('col.fg3')}</th><th class="sortable" data-col="5">${t('col.ft')}</th>
    <th class="sortable" data-col="6">${t('col.reb_off')}</th><th class="sortable" data-col="7">${t('col.reb_def')}</th><th class="sortable" data-col="8">${t('col.ast')}</th><th class="sortable" data-col="9">${t('col.stl')}</th><th class="sortable" data-col="10">${t('col.tov')}</th><th class="sortable" data-col="11">${t('col.foul')}</th><th class="sortable" data-col="12">${t('col.foul_drawn')}</th><th class="sortable" data-col="13">${t('col.block')}</th><th class="sortable" data-col="14">${t('col.block_against')}</th><th class="sortable" data-col="15">Val</th>${pmMapExp?'<th class="sortable" data-col="16">+/−</th>':''}
  </tr></thead>
  <tbody id="exp-bs-body">
    ${rows.map(({p,pts,all,fg2pct,fg3pct,ftpct,min,pm})=>{const val=calcVal(all);return`<tr>
      <td style="cursor:pointer;color:#f5a623" data-showplayer="${esc(p.id)}" data-sort="${esc(p.num)}">#${esc(p.num)} ${esc(p.name)} ›</td>
      <td data-sort="${min}">${min}'</td>
      <td data-sort="${pts}"><strong style="color:#f5a623">${pts}</strong></td>
      <td data-sort="${all.fg2a>0?Math.round(all.fg2m/all.fg2a*100):-1}">${all.fg2m}/${all.fg2a}<br><span class="dim">${fg2pct}%</span></td>
      <td data-sort="${all.fg3a>0?Math.round(all.fg3m/all.fg3a*100):-1}">${all.fg3m}/${all.fg3a}<br><span class="dim">${fg3pct}%</span></td>
      <td data-sort="${all.fta>0?Math.round(all.ftm/all.fta*100):-1}">${all.ftm}/${all.fta}<br><span class="dim">${ftpct}%</span></td>
      <td data-sort="${all.reb_off}">${all.reb_off}</td>
      <td data-sort="${all.reb_def}">${all.reb_def}</td>
      <td data-sort="${all.assist}">${all.assist}</td>
      <td data-sort="${all.steal||0}">${all.steal||0}</td>
      <td data-sort="${all.turnover||0}">${all.turnover||0}</td>
      <td data-sort="${all.foul}">${all.foul>=5?all.foul+' ⚠️':all.foul}</td>
      <td data-sort="${all.foul_drawn}">${all.foul_drawn}</td>
      <td data-sort="${all.block||0}">${all.block||0}</td>
      <td data-sort="${all.block_against||0}">${all.block_against||0}</td>
      <td data-sort="${val}" style="font-weight:700;color:${val>0?'#2ecc71':val<0?'#e74c3c':'#888'}">${val>0?'+':''}${val}</td>
      ${pmMapExp?`<td data-sort="${pm}" style="font-weight:700;color:${pm>0?'#2ecc71':pm<0?'#e74c3c':'#888'}">${pm>0?'+':''}${pm}</td>`:''}
    </tr>`}).join('')}
  </tbody>
</table>
</div>

<h2>${t('report.shot_summary')}</h2>
${renderShotSummaryHTML(rows, 'export')}

<h2>${t('report.team_totals')}</h2>
${renderTeamTotalsHTML(rows, 'export')}

<h2>${t('report.shot_map')}</h2>
<div style="margin-bottom:10px;display:flex;gap:8px;align-items:center;flex-wrap:wrap">
  <select id="exp-player-filter" style="flex:1;min-width:120px;background:#1c1c27;color:#f0eee8;border:1px solid #333;border-radius:8px;padding:8px">
    <option value="">${t('filter.all_players')}</option>
  </select>
  <div id="exp-period-btns" style="display:flex;gap:5px;flex-wrap:wrap;align-items:center">
    <!-- populated by JS below -->
  </div>
</div>
<div style="display:flex;gap:0;margin-bottom:10px;background:#1c1c27;border-radius:10px;padding:3px">
<button id="exp-tab-dots" data-exptab="dots" style="flex:1;padding:7px;border:none;border-radius:8px;font-size:12px;font-weight:600;cursor:pointer;background:#f5a623;color:#000">${t('report.tab.precise_shots')}</button>
<button id="exp-tab-bubble" data-exptab="bubble" style="flex:1;padding:7px;border:none;border-radius:8px;font-size:12px;font-weight:600;cursor:pointer;background:transparent;color:#888">${t('report.tab.zone_bubbles')}</button></div>

<div class="court-wrap" id="exp-map-wrap" ondblclick="openExpZoomMap()" style="cursor:zoom-in">
  <svg id="exp-svg" viewBox="0 0 923 569" style="width:100%;display:block" xmlns="http://www.w3.org/2000/svg">
    <g transform="scale(1,-1) translate(0,-569)">
      <image href="${courtImg}" x="0" y="0" width="923" height="569" preserveAspectRatio="xMidYMid meet"/>
      <rect id="exp-overlay" x="0" y="0" width="923" height="569" fill="rgba(0,0,0,0.22)"/>
    </g>
    <g id="exp-dots"></g>
  </svg>
  <div class="legend" id="exp-legend"></div>
</div>
\u003cscript\u003e   // qui inizia lo script
 // FIX MODALE PALERY IN REPORT ESPORTATO
 const _i18n = {
   'player.pts_label':     ${JSON.stringify(t('player.pts_label'))},
   'legend_made':   ${JSON.stringify(t('court.legend_made'))},
   'legend_missed': ${JSON.stringify(t('court.legend_missed'))},
   'misc.no_shots':      ${JSON.stringify(t('misc.no_shots'))},
   'filter.all':       ${JSON.stringify(t('filter.all'))},
   'filter.all_players': ${JSON.stringify(t('filter.all_players'))},
   'court.legend_made':   ${JSON.stringify(t('court.legend_made'))},
   'court.legend_missed': ${JSON.stringify(t('court.legend_missed'))},
   'report.tab.zone_bubbles':  ${JSON.stringify(t('report.tab.zone_bubbles'))},
   'report.tab.precise_shots': ${JSON.stringify(t('report.tab.precise_shots'))},
   'player.min_label': ${JSON.stringify(t('player.min_label'))},
   'player.reb_label': ${JSON.stringify(t('player.reb_label'))},
   'player.ast_label': ${JSON.stringify(t('player.ast_label'))},
   'player.stl_label': ${JSON.stringify(t('player.stl_label'))},
   'player.fls_label': ${JSON.stringify(t('player.fls_label'))},
   'player.val_label': ${JSON.stringify(t('player.val_label'))},
   'player.pm_label': ${JSON.stringify(t('player.pm_label'))},
   'player.shots_label': ${JSON.stringify(t('player.shots_label'))},
   'player.2pt_label': ${JSON.stringify(t('player.2pt_label'))},
   'player.3pt_label': ${JSON.stringify(t('player.3pt_label'))},
   'player.ft_label': ${JSON.stringify(t('player.ft_label'))},
   'report.shot_map': ${JSON.stringify(t('report.shot_map'))},
   'report.shotmap.zoom_hint' : ${JSON.stringify(t('report.shotmap.zoom_hint'))},
   'shotmap.bubble.legend' : ${JSON.stringify(t('shotmap.bubble.legend'))},
   'shotmap.bubble.gradient' : ${JSON.stringify(t('shotmap.bubble.gradient'))},
   'report.shot_map':     ${JSON.stringify(t('report.shot_map'))},
'report.by_quarter':   ${JSON.stringify(t('report.by_quarter'))},
'col.quarter':         ${JSON.stringify(t('col.quarter'))},
'col.min':             ${JSON.stringify(t('col.min'))},
'col.pts':             ${JSON.stringify(t('col.pts'))},
'col.fg2':             ${JSON.stringify(t('col.fg2'))},
'col.fg3':             ${JSON.stringify(t('col.fg3'))},
'col.ft':              ${JSON.stringify(t('col.ft'))},
'col.reb_off':         ${JSON.stringify(t('col.reb_off'))},
'col.reb_def':         ${JSON.stringify(t('col.reb_def'))},
'col.ast':             ${JSON.stringify(t('col.ast'))},
'col.stl':             ${JSON.stringify(t('col.stl'))},
'col.tov':             ${JSON.stringify(t('col.tov'))},
'col.foul':            ${JSON.stringify(t('col.foul'))},
'col.foul_drawn':      ${JSON.stringify(t('col.foul_drawn'))},
'col.block':           ${JSON.stringify(t('col.block'))},
'col.block_against':   ${JSON.stringify(t('col.block_against'))},
  };
function t(k){ return _i18n[k] || k; }
const _players = ${playerShotData};
const _matchStats = ${matchStatsData};
const _pmLog = ${pmLogData};  // eventi scoring con onCourtIds per calcolo +/- per quarto
const _pmData = ${JSON.stringify(pmMapExp||null)};
const _courtImg = "${courtImg}";

// Calcola +/- per un sottoinsieme di quarti (array di chiavi); null/vuoto = tutta la partita
function calcPmForPeriods(periods) {
  if(!_pmLog || !_pmLog.length) return null;
  const filterSet = (periods && periods.length > 0) ? new Set(periods) : null;
  const pm = {};
  _pmLog.forEach(function(e) {
    if(filterSet && !filterSet.has(e.q)) return;
    e.ids.forEach(function(id) {
      if(pm[id] === undefined) pm[id] = 0;
      if(e.opp) pm[id] -= e.pts;
      else      pm[id] += e.pts;
    });
  });
  return pm;
}
const _teamLogo = "${teamLogo}";
let _expTab = 'dots';

function openExpZoomMap() {
  const svg = document.getElementById('exp-svg');
  if (!svg) return;
  const clone = svg.cloneNode(true);

  clone.style.cssText = 'width:95vw;height:auto;display:block';

  const overlay = document.createElement('div');
  overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.95);z-index:99999;display:flex;align-items:center;justify-content:center;cursor:zoom-out';

  const closeBtn = document.createElement('div');
  closeBtn.innerHTML = '✕';
  closeBtn.style.cssText = 'position:fixed;top:16px;right:16px;color:white;font-size:24px;font-weight:bold;cursor:pointer;background:rgba(255,255,255,0.15);border-radius:50%;width:40px;height:40px;display:flex;align-items:center;justify-content:center;z-index:100000';

  const close = () => overlay.remove();

  overlay.addEventListener('click', close);
  closeBtn.addEventListener('click', (e) => { e.stopPropagation(); close(); });

  overlay.appendChild(clone);
  overlay.appendChild(closeBtn);
  document.body.appendChild(overlay);
}

// Populate player select
const sel = document.getElementById('exp-player-filter');
_players.forEach(p => {
  const o = document.createElement('option');
  o.value = p.id; o.textContent = '#'+p.num+' '+p.name;
  sel.appendChild(o);
});
// Populate period pill buttons (mappa tiri)
const allShots = _players.flatMap(p=>p.shots||[]);
const periodKeys = [...new Set(allShots.map(s=>s.q).filter(Boolean))].sort();
let _expPeriods = []; // empty = all
const _epBs = 'padding:5px 12px;border-radius:20px;border:1.5px solid #444;background:#1c1c27;color:#aaa;font-size:12px;font-weight:600;cursor:pointer';
const epContainer = document.getElementById('exp-period-btns');
const allBtn = document.createElement('button');
allBtn.id = 'epb-all';
allBtn.dataset.ep = 'all';
allBtn.textContent = t('filter.all');
allBtn.style.cssText = _epBs + ';background:#f5a623;color:#000;border-color:#f5a623';
epContainer.appendChild(allBtn);
periodKeys.forEach(k => {
  const btn = document.createElement('button');
  btn.id = 'epb-' + k;
  btn.textContent = k.startsWith('q') ? 'Q'+k.slice(1) : 'OT'+k.slice(2);
  btn.style.cssText = _epBs;
  btn.dataset.ep = k;
  epContainer.appendChild(btn);
});

// Populate Box Score period bar (uses _matchStats.periods — always all periods)
const bsPeriodKeys = _matchStats.periods || [];
const bsBar = document.getElementById('exp-bs-period-bar');
if(bsBar && bsPeriodKeys.length > 0) {
  const bsAllBtn = document.createElement('button');
  bsAllBtn.id = 'bsb-all'; bsAllBtn.dataset.bsp = 'all';
  bsAllBtn.textContent = t('filter.all');
  bsAllBtn.style.cssText = _epBs + ';background:#f5a623;color:#000;border-color:#f5a623';
  bsBar.appendChild(bsAllBtn);
  bsPeriodKeys.forEach(k => {
    const btn = document.createElement('button');
    btn.id = 'bsb-' + k; btn.dataset.bsp = k;
    btn.textContent = k.startsWith('q') ? 'Q'+k.slice(1) : 'OT'+k.slice(2);
    btn.style.cssText = _epBs;
    bsBar.appendChild(btn);
  });
}
let _bsSelected = []; // empty = all

function bsPeriodToggle(key) {
  if(!key) {
    _bsSelected = [];
  } else {
    const idx = _bsSelected.indexOf(key);
    if(idx >= 0) _bsSelected.splice(idx, 1);
    else _bsSelected.push(key);
  }
  const allActive = _bsSelected.length === 0;
  const ab = document.getElementById('bsb-all');
  if(ab) { ab.style.background = allActive?'#f5a623':'#1c1c27'; ab.style.color = allActive?'#000':'#aaa'; ab.style.borderColor = allActive?'#f5a623':'#444'; }
  bsPeriodKeys.forEach(k => {
    const btn = document.getElementById('bsb-'+k);
    if(!btn) return;
    const on = _bsSelected.includes(k);
    btn.style.background = on?'#f5a623':'#1c1c27'; btn.style.color = on?'#000':'#aaa'; btn.style.borderColor = on?'#f5a623':'#444';
  });
  updateExportBoxScore();
}

function _bsStatForPlayer(p) {
  // Aggrega le stats del giocatore per i periodi selezionati (o tutti)
  const keys = (_bsSelected.length > 0) ? _bsSelected : bsPeriodKeys;
  const acc = {fg2m:0,fg2a:0,fg3m:0,fg3a:0,ftm:0,fta:0,reb_off:0,reb_def:0,assist:0,steal:0,turnover:0,block:0,block_against:0,foul:0,foul_drawn:0,minPlayed:0};
  keys.forEach(k => {
    const s = p.byPeriod[k];
    if(!s) return;
    acc.fg2m+=s.fg2m||0; acc.fg2a+=s.fg2a||0;
    acc.fg3m+=s.fg3m||0; acc.fg3a+=s.fg3a||0;
    acc.ftm +=s.ftm ||0; acc.fta +=s.fta ||0;
    acc.reb_off+=s.reb_off||0; acc.reb_def+=s.reb_def||0;
    acc.assist+=s.assist||0; acc.steal+=s.steal||0;
    acc.turnover+=s.turnover||0; acc.block+=s.block||0;
    acc.block_against+=s.block_against||0;
    acc.foul+=s.foul||0; acc.foul_drawn+=s.foul_drawn||0;
    acc.minPlayed+=s.minPlayed||0;
  });
  return acc;
}

function updateExportBoxScore() {
  const tbody = document.getElementById('exp-bs-body');
  if(!tbody || !_matchStats) return;
  const activePm = calcPmForPeriods(_bsSelected);  // filtra per quarti selezionati nel box score
  const rows = _matchStats.players.map(p => {
    const s = _bsStatForPlayer(p);
    const pts = s.fg2m*2 + s.fg3m*3 + s.ftm;
    const fg2pct = s.fg2a>0 ? Math.round(s.fg2m/s.fg2a*100) : 0;
    const fg3pct = s.fg3a>0 ? Math.round(s.fg3m/s.fg3a*100) : 0;
    const ftpct  = s.fta>0  ? Math.round(s.ftm/s.fta*100)   : 0;
    const min    = Math.round(s.minPlayed||0);
    return {p, s, pts, fg2pct, fg3pct, ftpct, min};
  }).sort((a,b)=>b.pts-a.pts);

  tbody.innerHTML = rows.map(({p, s, pts, fg2pct, fg3pct, ftpct, min}) => {
    var val = s.fg2m*2+s.fg3m*3+s.ftm + (s.reb_off||0)+(s.reb_def||0)+(s.assist||0)+(s.steal||0)+(s.block||0)
              - ((s.fg2a||0)-(s.fg2m||0)) - ((s.fg3a||0)-(s.fg3m||0)) - ((s.fta||0)-(s.ftm||0)) - (s.turnover||0) - (s.foul||0);
    var valColor = val>0?'#2ecc71':val<0?'#e74c3c':'#888';
    var pmCell = '';
    if(activePm) {
      var pm = activePm[p.id] !== undefined ? activePm[p.id] : 0;
      var pmColor = pm>0?'#2ecc71':pm<0?'#e74c3c':'#888';
      pmCell = '<td data-sort="'+pm+'" style="font-weight:700;color:'+pmColor+'">'+(pm>0?'+':'')+pm+'</td>';
    }
    return '<tr>'
    +'<td style="cursor:pointer;color:#f5a623" data-showplayer="'+p.id+'" data-sort="'+p.num+'">#'+p.num+' '+p.name+' &rsaquo;</td>'
    +'<td data-sort="'+min+'">'+min+"'</td>"
    +'<td data-sort="'+pts+'"><strong style="color:#f5a623">'+pts+'</strong></td>'
    +'<td data-sort="'+(s.fg2a>0?Math.round(s.fg2m/s.fg2a*100):-1)+'">'+s.fg2m+'/'+s.fg2a+'<br><span class="dim">'+fg2pct+'%</span></td>'
    +'<td data-sort="'+(s.fg3a>0?Math.round(s.fg3m/s.fg3a*100):-1)+'">'+s.fg3m+'/'+s.fg3a+'<br><span class="dim">'+fg3pct+'%</span></td>'
    +'<td data-sort="'+(s.fta>0?Math.round(s.ftm/s.fta*100):-1)+'">'+s.ftm+'/'+s.fta+'<br><span class="dim">'+ftpct+'%</span></td>'
    +'<td data-sort="'+(s.reb_off||0)+'">'+(s.reb_off||0)+'</td>'
    +'<td data-sort="'+(s.reb_def||0)+'">'+(s.reb_def||0)+'</td>'
    +'<td data-sort="'+(s.assist||0)+'">'+(s.assist||0)+'</td>'
    +'<td data-sort="'+(s.steal||0)+'">'+(s.steal||0)+'</td>'
    +'<td data-sort="'+(s.turnover||0)+'">'+(s.turnover||0)+'</td>'
    +'<td data-sort="'+(s.block||0)+'">'+(s.block||0)+'</td>'
    +'<td data-sort="'+(s.block_against||0)+'">'+(s.block_against||0)+'</td>'
    +'<td data-sort="'+(s.foul||0)+'" class="'+(s.foul>=5?'red':'')+'">'+s.foul+(s.foul>=5?' ⚠️':'')+'</td>'
    +'<td data-sort="'+(s.foul_drawn||0)+'">'+(s.foul_drawn||0)+'</td>'
    +'<td data-sort="'+val+'" style="font-weight:700;color:'+valColor+'">'+(val>0?'+':'')+val+'</td>'
    +pmCell
    +'</tr>';
  }).join('');
  // Re-apply current sort after tbody rebuild
  var table = document.getElementById('exp-bs-table');
  if(table) {
    var sortEvent = new Event('re-sort');
    table.dispatchEvent(sortEvent);
  }
}

function expPeriodToggle(key) {
  if(!key) {
    _expPeriods = [];
  } else {
    const idx = _expPeriods.indexOf(key);
    if(idx >= 0) _expPeriods.splice(idx, 1);
    else _expPeriods.push(key);
  }
  const allActive = _expPeriods.length === 0;
  const ab = document.getElementById('epb-all');
  if(ab) { ab.style.background = allActive?'#f5a623':'#1c1c27'; ab.style.color = allActive?'#000':'#aaa'; ab.style.borderColor = allActive?'#f5a623':'#444'; }
  periodKeys.forEach(k => {
    const btn = document.getElementById('epb-'+k);
    if(!btn) return;
    const on = _expPeriods.includes(k);
    btn.style.background = on?'#f5a623':'#1c1c27'; btn.style.color = on?'#000':'#aaa'; btn.style.borderColor = on?'#f5a623':'#444';
  });
  updateExportMap();
}

function expTab(t) {
  _expTab = t;
  document.getElementById('exp-tab-dots').style.background   = t==='dots'   ? '#f5a623':'transparent';
  document.getElementById('exp-tab-dots').style.color        = t==='dots'   ? '#000':'#888';
  document.getElementById('exp-tab-bubble').style.background = t==='bubble' ? '#f5a623':'transparent';
  document.getElementById('exp-tab-bubble').style.color      = t==='bubble' ? '#000':'#888';
  updateExportMap();
}

// Event delegation (replaces all inline onclick/onchange — required for CSP)
document.addEventListener('click', function(e) {
  const btn = e.target.closest('button');
  const td  = e.target.closest('td');
  if(td && td.dataset.showplayer) { showPlayer(td.dataset.showplayer); return; }
  if(btn) {
    if(btn.dataset.exptab)         { expTab(btn.dataset.exptab); return; }
    if(btn.dataset.ep !== undefined){ expPeriodToggle(btn.dataset.ep === 'all' ? null : btn.dataset.ep); return; }
    if(btn.dataset.bsp !== undefined){ bsPeriodToggle(btn.dataset.bsp === 'all' ? null : btn.dataset.bsp); return; }
    if(btn.dataset.pptab)          { ppTab(btn.dataset.pptab); return; }
    if(btn.dataset.closepp)        { closePP(); return; }
  }
});
document.addEventListener('change', function(e) {
  if(e.target.id === 'exp-player-filter') updateExportMap();
});

function bubbleColor(pct) {
  let r,g,b,a;
  if(pct <= 0.5) {
    const t=pct*2;
    r=Math.round(231+t*(200-231)); g=Math.round(76+t*(180-76)); b=Math.round(60+t*(0-60));
    a=0.92-t*0.57;
  } else {
    const t=(pct-0.5)*2;
    r=Math.round(200+t*(46-200)); g=Math.round(180+t*(204-180)); b=Math.round(0+t*(113-0));
    a=0.35+t*0.57;
  }
  return {r,g,b,a};
}

const zoneDef = {
  'Top Ang.Sx':{x:170,y:170,rx:50,ry:60},'Top Sx':{x:280,y:120,rx:50,ry:60},
  'Top Cx-Sx':{x:400,y:100,rx:50,ry:60},'Top Cx-Dx':{x:520,y:100,rx:50,ry:60},
  'Top Dx':{x:640,y:120,rx:50,ry:60},'Top Ang.Dx':{x:750,y:170,rx:50,ry:60},
  'Angolo Sx Mid':{x:50,y:360,rx:50,ry:60},'Angolo Sx Basso':{x:50,y:480,rx:50,ry:60},
  'Ala Sx':{x:90,y:250,rx:50,ry:60},
  'Alto Sx':{x:280,y:240,rx:50,ry:60},'Alto Cx-Sx':{x:400,y:240,rx:50,ry:60},
  'Alto Cx-Dx':{x:520,y:240,rx:50,ry:60},'Alto Dx':{x:640,y:240,rx:50,ry:60},
  'Ala Dx':{x:830,y:250,rx:50,ry:60},
  'Angolo Dx Mid':{x:870,y:360,rx:50,ry:60},'Angolo Dx Basso':{x:870,y:480,rx:50,ry:60},
  'Mid Est Sx':{x:160,y:360,rx:50,ry:60},'Mid Sx':{x:280,y:360,rx:50,ry:60},
  'Mid Cx-Sx':{x:400,y:360,rx:50,ry:60},'Mid Cx-Dx':{x:520,y:360,rx:50,ry:60},
  'Mid Dx':{x:640,y:360,rx:50,ry:60},'Mid Est Dx':{x:760,y:360,rx:50,ry:60},
  'Base Est Sx':{x:160,y:480,rx:50,ry:60},'Baseline Sx':{x:280,y:480,rx:50,ry:60},
  'Paint Basso Sx':{x:400,y:480,rx:50,ry:60},'Canestro':{x:520,y:480,rx:50,ry:60},
  'Paint Basso Dx':{x:640,y:480,rx:50,ry:60},'Baseline Dx':{x:760,y:480,rx:50,ry:60}
};

function updateExportMap() {
  const pid = document.getElementById('exp-player-filter').value;
  let shots = _players.flatMap(p => {
    if(pid && String(p.id)!==String(pid)) return [];
    const allShots = p.shots || [];
    if(!_expPeriods || _expPeriods.length === 0) return allShots;
    return allShots.filter(s => _expPeriods.includes(s.q));
  });

  if(_expTab === 'dots') {
    const dots = shots.map(s=>{
      const zd=zoneDef[s.zone]||{};
      const cx=s.sx!=null?s.sx:(zd.x||461);
      const cy=s.sy!=null?s.sy:(zd.y||300);
      const col2 = s.made?'#2ecc71':'#e74c3c';
      return '<g>'
        +'<circle cx="'+cx+'" cy="'+cy+'" r="11" fill="'+col2+'" fill-opacity="0.15"/>'
        +'<circle cx="'+cx+'" cy="'+cy+'" r="8" fill="'+col2+'" stroke="white" stroke-width="1.5"/>'
        +'</g>';
    }).join('');
    document.getElementById('exp-dots').innerHTML = dots;
    // restore overlay
    document.getElementById('exp-svg').querySelector('rect').setAttribute('fill','rgba(0,0,0,0.22)');
    const made=shots.filter(s=>s.made).length, tot=shots.length;
    document.getElementById('exp-legend').innerHTML =
  '<div style="display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:16px;padding-bottom:4px">' +
  '<span><span class="dot" style="background:#2ecc71"></span>'+t('court.legend_made')+'</span>'+
  '<span><span class="dot" style="background:#e74c3c"></span>'+t('court.legend_missed')+'</span>'+
  '<span style="color:#888">'+made+'/'+tot+' ('+(tot?Math.round(made/tot*100):0)+'%)</span>'+
  '</div>'+
  '<div style="text-align:center;padding:2px 0 6px">'+
  '<span style="font-size:10px;color:#888;cursor:zoom-in" ondblclick="openExpZoomMap()">🔍 Doppio tap per ingrandire</span>'+
  '</div>';
  } else {
    // Bubbles
    const zs={};
    shots.forEach(s=>{ if(!zs[s.zone]) zs[s.zone]={made:0,total:0}; zs[s.zone].total++; if(s.made) zs[s.zone].made++; });
    const maxT = Math.max(...Object.values(zs).map(z=>z.total),1);
    // Inject defs if not already present
    const expSvg = document.getElementById('exp-svg');
    let expDefs = expSvg.querySelector('defs');
    if(!expDefs) { expDefs = document.createElementNS('http://www.w3.org/2000/svg','defs'); expSvg.insertBefore(expDefs, expSvg.firstChild); }
    // Add blur filter once
    if(!expSvg.querySelector('#bblur-exp')) {
      const filt = document.createElementNS('http://www.w3.org/2000/svg','filter');
      filt.setAttribute('id','bblur-exp'); filt.setAttribute('x','-50%'); filt.setAttribute('y','-50%'); filt.setAttribute('width','200%'); filt.setAttribute('height','200%');
      const gb = document.createElementNS('http://www.w3.org/2000/svg','feGaussianBlur'); gb.setAttribute('stdDeviation','4');
      filt.appendChild(gb); expDefs.appendChild(filt);
    }
    const bubbles = Object.entries(zs).map(([zone,z])=>{
      const def=zoneDef[zone]; if(!def) return '';
      const pct=z.total?z.made/z.total:0, pctInt=Math.round(pct*100);
      const maxRs=Math.min(def.rx,def.ry)*0.85;
      const r=Math.max(30,Math.round(maxRs*(z.total/maxT)));
      const {r:cr,g:cg,b:cb}=bubbleColor(pct);
      const fs=Math.max(18,Math.min(28,Math.round(r*0.62)));
      const fs2=Math.max(14,Math.min(22,Math.round(r*0.48)));
      const cy=569-def.y;
      const gid='ebg_'+zone.replace(/[^a-z0-9]/gi,'_');
      const sid='ebs_'+zone.replace(/[^a-z0-9]/gi,'_');
      const hid='ebh_'+zone.replace(/[^a-z0-9]/gi,'_');
      const bright='rgb('+Math.min(255,Math.round(cr*1.25))+','+Math.min(255,Math.round(cg*1.25))+','+Math.min(255,Math.round(cb*1.25))+')';
      const dark='rgb('+Math.round(cr*0.45)+','+Math.round(cg*0.45)+','+Math.round(cb*0.45)+')';
      const base='rgb('+cr+','+cg+','+cb+')';
      // Add per-bubble gradients to defs
      expDefs.innerHTML += '<radialGradient id="'+gid+'" cx="42%" cy="35%" r="65%" fx="38%" fy="30%"><stop offset="0%" stop-color="'+bright+'"/><stop offset="45%" stop-color="'+base+'"/><stop offset="100%" stop-color="'+dark+'"/></radialGradient>'+
        '<radialGradient id="'+sid+'" cx="50%" cy="50%" r="50%"><stop offset="60%" stop-color="black" stop-opacity="0"/><stop offset="100%" stop-color="black" stop-opacity="0.28"/></radialGradient>'+
        '<radialGradient id="'+hid+'" cx="50%" cy="25%" r="55%" fx="50%" fy="10%"><stop offset="0%" stop-color="white" stop-opacity="0.72"/><stop offset="100%" stop-color="white" stop-opacity="0"/></radialGradient>';
      const shadowY=cy+r*0.82, shadowRx=r*0.72, shadowRy=r*0.18;
      return '<ellipse cx="'+def.x+'" cy="'+shadowY+'" rx="'+shadowRx+'" ry="'+shadowRy+'" fill="rgba(0,0,0,0.22)" filter="url(#bblur-exp)"/>'+
        '<circle cx="'+def.x+'" cy="'+cy+'" r="'+r+'" fill="url(#'+gid+')"/>'+
        '<circle cx="'+def.x+'" cy="'+cy+'" r="'+r+'" fill="url(#'+sid+')"/>'+
        '<circle cx="'+def.x+'" cy="'+cy+'" r="'+r+'" fill="none" stroke="'+bright+'" stroke-width="1.5" stroke-opacity="0.6"/>'+
        '<circle cx="'+def.x+'" cy="'+cy+'" r="'+r+'" fill="url(#'+hid+')"/>'+
        '<text x="'+def.x+'" y="'+cy+'" dy=".35em" text-anchor="middle" font-size="'+fs+'" font-weight="900" font-family="Arial Black,Arial,sans-serif" fill="rgba(0,0,0,0.45)" stroke="rgba(0,0,0,0.3)" stroke-width="4" stroke-linejoin="round">'+pctInt+'%</text>'+
        '<text x="'+def.x+'" y="'+cy+'" dy=".35em" text-anchor="middle" font-size="'+fs+'" font-weight="900" font-family="Arial Black,Arial,sans-serif" fill="white">'+pctInt+'%</text>'+
        '<text x="'+def.x+'" y="'+(cy+r+18)+'" text-anchor="middle" font-size="'+fs2+'" font-weight="800" font-family="Arial,sans-serif" fill="rgba(0,0,0,0.5)" stroke="rgba(0,0,0,0.3)" stroke-width="4" stroke-linejoin="round">'+z.made+'/'+z.total+'</text>'+
        '<text x="'+def.x+'" y="'+(cy+r+18)+'" text-anchor="middle" font-size="'+fs2+'" font-weight="800" font-family="Arial,sans-serif" fill="white">'+z.made+'/'+z.total+'</text>';
    }).join('');
    document.getElementById('exp-dots').innerHTML = bubbles;
    document.getElementById('exp-svg').querySelector('rect').setAttribute('fill','rgba(0,0,0,0.3)');
document.getElementById('exp-legend').innerHTML =
  '<div style="display:flex;align-items:center;justify-content:center;padding-bottom:4px">' +
  '<span style="font-size:10px;color:#888">Dimensione=numero tiri · Colore=% realizzazione</span>' +
  '</div>'+
  '<div style="display:flex;justify-content:center;align-items:center;padding:2px 0 6px">'+
  '<div style="width:80px;height:10px;border-radius:5px;background:linear-gradient(to right,rgba(231,76,60,0.92),rgba(200,180,0,0.35),rgba(46,204,113,0.92))"></div>'+
  '<span style="font-size:9px;color:#888;margin-left:6px">0% → 100%</span>'+
  '</div>'+
  '<div style="text-align:center;padding:2px 0 4px">'+
  '<span style="font-size:10px;color:#888;cursor:zoom-in" ondblclick="openExpZoomMap()">🔍 Doppio tap per ingrandire</span>'+
  '</div>';
  }
}
updateExportMap();

// ── Box Score sorting ──────────────────────────────────────────
(function(){
  var _sortCol = 2, _sortDir = -1; // default: pts desc
  var table = document.getElementById('exp-bs-table');
  if(!table) return;

  function getSortValue(td) {
    var ds = td.getAttribute('data-sort');
    if(ds !== null && ds !== '') return parseFloat(ds);
    // fallback: testo numerico
    var n = parseFloat(td.textContent);
    return isNaN(n) ? td.textContent.trim().toLowerCase() : n;
  }

  function sortTable(col) {
    if(_sortCol === col) {
      _sortDir *= -1;
    } else {
      _sortCol = col;
      _sortDir = col === 0 ? 1 : -1; // nomi asc, numeri desc
    }
    var tbody = table.querySelector('tbody');
    var rows = Array.from(tbody.querySelectorAll('tr'));
    rows.sort(function(a, b) {
      var aVal = getSortValue(a.cells[col]);
      var bVal = getSortValue(b.cells[col]);
      if(typeof aVal === 'string' || typeof bVal === 'string') {
        return _sortDir * String(aVal).localeCompare(String(bVal));
      }
      return _sortDir * (bVal - aVal);
    });
    rows.forEach(function(r){ tbody.appendChild(r); });
    // Update header styles
    Array.from(table.querySelectorAll('th.sortable')).forEach(function(th, i){
      th.classList.remove('sort-active','sort-asc');
      if(i === _sortCol) {
        th.classList.add('sort-active');
        if(_sortDir === 1) th.classList.add('sort-asc');
      }
    });
  }

  Array.from(table.querySelectorAll('th.sortable')).forEach(function(th, i){
    th.addEventListener('click', function(){ sortTable(i); });
  });

  // Re-apply sort when tbody is rebuilt (e.g. after period filter)
  table.addEventListener('re-sort', function(){ sortTable(_sortCol); });
})();
<\/script>



${renderOppFoulsHTML(m, 'export')}

${renderGameFlowHTML(m, 'export')}

<h2>${t('report.lineups')}</h2>
${lineupStatsData && lineupStatsData.length ? `
<div id="exp-lineup-wrap">
  <div style="overflow-x:auto;border-radius:10px;border:1px solid #1c1c27;margin-bottom:8px">
    <table id="exp-lineup-table" style="width:100%;border-collapse:separate;border-spacing:0;font-size:11px">
      <thead>
        <tr>
          <th data-lcol="0" style="text-align:left;background:#1a1a26;color:#aaa;padding:8px 10px;font-size:10px;text-transform:uppercase;letter-spacing:.5px;white-space:nowrap;min-width:160px;cursor:pointer">Quintetto</th>
          <th data-lcol="1" style="background:#1a1a26;color:#aaa;padding:8px 8px;font-size:10px;text-transform:uppercase;letter-spacing:.5px;text-align:center;cursor:pointer">MIN</th>
          <th data-lcol="2" style="background:#1a1a26;color:#aaa;padding:8px 8px;font-size:10px;text-transform:uppercase;letter-spacing:.5px;text-align:center;cursor:pointer">PTS</th>
          <th data-lcol="3" style="background:#1a1a26;color:#aaa;padding:8px 8px;font-size:10px;text-transform:uppercase;letter-spacing:.5px;text-align:center;cursor:pointer">PTSO</th>
          <th data-lcol="4" style="background:#1a1a26;color:#aaa;padding:8px 8px;font-size:10px;text-transform:uppercase;letter-spacing:.5px;text-align:center;cursor:pointer">VAL</th>
          <th data-lcol="5" style="background:#1a1a26;color:#f5a623;padding:8px 8px;font-size:10px;text-transform:uppercase;letter-spacing:.5px;text-align:center;cursor:pointer">+/&#x2212;</th>
        </tr>
      </thead>
      <tbody id="exp-lineup-body">
        ${lineupStatsData.map((row,i)=>{
          const pmColor = row.pm>0?'#2ecc71':row.pm<0?'#e74c3c':'#888';
          const valColor = row.val>0?'#2ecc71':row.val<0?'#e74c3c':'#888';
          const bg = i%2===0?'rgba(255,255,255,0.04)':'transparent';
          const nums = row.players.map(p=>`<span style="display:inline-flex;align-items:center;justify-content:center;width:26px;height:26px;border-radius:6px;background:#f5a623;color:#000;font-weight:700;font-size:11px;margin:1px">${esc(p.num)}</span>`).join('');
          const playersJson = JSON.stringify(row.players.map(p=>({num:p.num,name:p.name})));
          return `<tr data-idx="${i}" data-players="${esc(playersJson)}" style="background:${bg};cursor:pointer">
            <td style="padding:6px 10px;border-bottom:1px solid rgba(255,255,255,.04);white-space:nowrap" data-sort="${esc(row.players.map(p=>p.num).join(','))}">${nums}</td>
            <td style="padding:6px 8px;border-bottom:1px solid rgba(255,255,255,.04);text-align:center;font-family:monospace" data-sort="${row.mins.toFixed(2)}">${row.minFormatted}</td>
            <td style="padding:6px 8px;border-bottom:1px solid rgba(255,255,255,.04);text-align:center;font-weight:700;color:#f5a623" data-sort="${row.pts}">${row.pts}</td>
            <td style="padding:6px 8px;border-bottom:1px solid rgba(255,255,255,.04);text-align:center;color:#888" data-sort="${row.ptso}">${row.ptso}</td>
            <td style="padding:6px 8px;border-bottom:1px solid rgba(255,255,255,.04);text-align:center;font-weight:700;color:${valColor}" data-sort="${row.val}">${row.val>0?'+':''}${row.val}</td>
            <td style="padding:6px 8px;border-bottom:1px solid rgba(255,255,255,.04);text-align:center;font-weight:700;color:${pmColor}" data-sort="${row.pm}">${row.pm>0?'+':''}${row.pm}</td>
          </tr>`;
        }).join('')}
      </tbody>
    </table>
  </div>
  ${lineupStatsData.length > 10 ? `<div style="text-align:center;margin-bottom:16px"><button id="exp-lineup-toggle" style="background:transparent;border:1px solid #444;color:#aaa;border-radius:20px;padding:5px 18px;font-size:12px;cursor:pointer">Mostra tutti (${lineupStatsData.length})</button></div>` : ''}
</div>

<!-- Lineup detail modal -->
<div id="lineup-modal-overlay" style="display:none;position:fixed;inset:0;z-index:400;background:rgba(0,0,0,.8);backdrop-filter:blur(6px);align-items:flex-end;justify-content:center">
  <div id="lineup-modal" style="background:#13131a;border:1px solid #222;border-radius:20px 20px 0 0;width:100%;max-width:480px;padding:20px 16px 32px;max-height:88vh;overflow-y:auto">
    <div style="width:36px;height:4px;background:#2a2a3a;border-radius:2px;margin:0 auto 18px"></div>
    <div style="font-size:13px;font-weight:700;letter-spacing:1.5px;color:#f5a623;text-align:center;margin-bottom:20px;text-transform:uppercase">Quintetto</div>
    <div id="lineup-modal-players" style="display:flex;flex-wrap:wrap;justify-content:center;gap:12px"></div>
    <button onclick="document.getElementById('lineup-modal-overlay').style.display='none';document.body.style.overflow=''"
      style="margin-top:24px;width:100%;padding:12px;background:#1c1c27;border:1px solid #333;border-radius:12px;color:#888;font-size:14px;cursor:pointer">
      Chiudi
    </button>
  </div>
</div>

<script>
(function(){
  var tbl = document.getElementById('exp-lineup-table');
  if(!tbl) return;
  var sortCol = 5, sortAsc = false, showAll = false;

  /* ── Jersey SVG (canotta basket) ── */
function jerseysvg(num) {
  var n = String(num);
  return '<div style="width:72px;display:flex;flex-direction:column;align-items:center;gap:6px">'
    + '<div style="width:72px;height:72px;background:#f5a623;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:' + (n.length > 2 ? '26' : '32') + 'px;font-weight:900;color:#fff;font-family:Arial Black,Arial,sans-serif;letter-spacing:-1px">'
    + n
    + '</div>'
    + '</div>';
}
  /* ── Open modal ── */
  function openLineupModal(players) {
    var container = document.getElementById('lineup-modal-players');
    container.innerHTML = players.map(function(p){
      return '<div style="display:flex;flex-direction:column;align-items:center;gap:7px;width:76px">'
        + jerseysvg(p.num)
        + '<div style="font-size:11px;font-weight:700;color:#f0eee8;text-align:center;line-height:1.3;max-width:74px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="' + p.name + '">' + p.name + '</div>'
        + '</div>';
    }).join('');
    var overlay = document.getElementById('lineup-modal-overlay');
    overlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  /* ── Row click ── */
  document.getElementById('exp-lineup-body').addEventListener('click', function(e){
    var tr = e.target.closest('tr');
    if(!tr) return;
    try {
      var players = JSON.parse(tr.dataset.players);
      openLineupModal(players);
    } catch(err) {}
  });

  /* ── Close on overlay click ── */
  document.getElementById('lineup-modal-overlay').addEventListener('click', function(e){
    if(e.target === this){ this.style.display='none'; document.body.style.overflow=''; }
  });

  /* ── Sort ── */
  function applyVisibility() {
    var rows = Array.from(document.getElementById('exp-lineup-body').querySelectorAll('tr'));
    rows.forEach(function(r,i){ r.style.display = (showAll || i<10) ? 'table-row' : 'none'; });
    var btn = document.getElementById('exp-lineup-toggle');
    if(btn) btn.textContent = showAll ? 'Mostra solo i 10 principali' : 'Mostra tutti (' + rows.length + ')';
  }

  function sortTable() {
    var tbody = document.getElementById('exp-lineup-body');
    var rows = Array.from(tbody.querySelectorAll('tr'));
    rows.sort(function(a,b){
      var aVal = parseFloat(a.querySelectorAll('td')[sortCol].dataset.sort)||0;
      var bVal = parseFloat(b.querySelectorAll('td')[sortCol].dataset.sort)||0;
      return sortAsc ? aVal-bVal : bVal-aVal;
    });
    rows.forEach(function(r){ tbody.appendChild(r); });
    tbl.querySelectorAll('th[data-lcol]').forEach(function(th){
      var active = parseInt(th.dataset.lcol)===sortCol;
      th.style.color = active ? '#f5a623' : '#aaa';
    });
    applyVisibility();
  }

  tbl.querySelectorAll('th[data-lcol]').forEach(function(th){
    th.addEventListener('click', function(){
      var col = parseInt(th.dataset.lcol);
      if(col===sortCol) sortAsc=!sortAsc; else { sortCol=col; sortAsc=false; }
      sortTable();
    });
  });

  var toggleBtn = document.getElementById('exp-lineup-toggle');
  if(toggleBtn) {
    toggleBtn.addEventListener('click', function(){
      showAll=!showAll;
      applyVisibility();
    });
  }

  sortTable();
})();
<\/script>
` : '<p style="color:#888;font-size:13px;padding:4px 0 16px">Nessun dato quintetti disponibile (richiede tracciamento live).</p>'}


${renderSubstitutionsHTML(m, 'export')}




<div style="margin-top:24px;font-size:10px;color:#333;text-align:center">Generato da BasketBubble</div>

<!-- Player panel -->
<div id="pp" style="display:none;position:fixed;top:0;left:0;right:0;bottom:0;z-index:300;background:#0a0a0f;overflow-y:auto;-webkit-overflow-scrolling:touch">
  <div style="background:#13131a;border-bottom:1px solid #222;padding:14px 16px;display:-webkit-flex;display:flex;-webkit-align-items:center;align-items:center;position:-webkit-sticky;position:sticky;top:0;z-index:10">
    <div id="pp-num" style="font-family:monospace;font-size:44px;font-weight:900;color:#f5a623;line-height:1;min-width:58px;text-align:center;margin-right:12px">#0</div>
    <div style="-webkit-flex:1;flex:1">
      <div id="pp-name" style="font-size:20px;font-weight:700"></div>
    </div>
    <button data-closepp="1" style="background:#1c1c27;border:1px solid #333;color:#f0eee8;border-radius:8px;padding:8px 14px;font-size:13px;cursor:pointer">✕ Chiudi</button>
  </div>
  <div id="pp-body" style="padding:14px 14px 48px"></div>
</div>
\u003cscript\u003e
const _courtImg2 = _courtImg;

function showPlayer(pid) {
  const p = _players.find(x=>String(x.id)===String(pid));
  if(!p) return;

  const shots = p.shots||[];
  const fg2m=shots.filter(s=>s.pts===2&&s.made).length, fg2a=shots.filter(s=>s.pts===2).length;
  const fg3m=shots.filter(s=>s.pts===3&&s.made).length, fg3a=shots.filter(s=>s.pts===3).length;
  const fg2p=fg2a>0?Math.round(fg2m/fg2a*100):0;
  const fg3p=fg3a>0?Math.round(fg3m/fg3a*100):0;
  const ftm=p.ftm||0, fta=p.fta||0;
  const ftp=fta>0?Math.round(ftm/fta*100):0;
  const pts=fg2m*2+fg3m*3+ftm;
  const valExp=p.val!=null?p.val:null;
  const pmExp=p.pm!=null?p.pm:null;
  const reb=(p.reb_off||0)+(p.reb_def||0);
  const ast=p.assist||0;
  const stl=p.steal||0;
  const foul=p.foul||0;
  const min=p.min||0;

  function pC(v, att) { return att === 0 ? '#555566' : v >= 50 ? '#2ecc71' : v >= 33 ? '#f0c030' : '#e74c3c'; }

  // Raccogli i periodi disponibili dai tiri
  const periodKeys=[..._matchStats.periods||[]];

  document.getElementById('pp-num').textContent='#'+p.num;
  document.getElementById('pp-name').textContent=p.name;

  // ── Mappa tiri builder ──────────────────────────────────────
  const courtImg=_courtImg;
  const zoneDef={
    'Top Ang.Sx':{x:170,y:170,rx:50,ry:60},'Top Sx':{x:280,y:120,rx:50,ry:60},
    'Top Cx-Sx':{x:400,y:100,rx:50,ry:60},'Top Cx-Dx':{x:520,y:100,rx:50,ry:60},
    'Top Dx':{x:640,y:120,rx:50,ry:60},'Top Ang.Dx':{x:750,y:170,rx:50,ry:60},
    'Angolo Sx Mid':{x:50,y:360,rx:50,ry:60},'Angolo Sx Basso':{x:50,y:480,rx:50,ry:60},
    'Ala Sx':{x:90,y:250,rx:50,ry:60},
    'Alto Sx':{x:280,y:240,rx:50,ry:60},'Alto Cx-Sx':{x:400,y:240,rx:50,ry:60},
    'Alto Cx-Dx':{x:520,y:240,rx:50,ry:60},'Alto Dx':{x:640,y:240,rx:50,ry:60},
    'Ala Dx':{x:830,y:250,rx:50,ry:60},
    'Angolo Dx Mid':{x:870,y:360,rx:50,ry:60},'Angolo Dx Basso':{x:870,y:480,rx:50,ry:60},
    'Mid Est Sx':{x:160,y:360,rx:50,ry:60},'Mid Sx':{x:280,y:360,rx:50,ry:60},
    'Mid Cx-Sx':{x:400,y:360,rx:50,ry:60},'Mid Cx-Dx':{x:520,y:360,rx:50,ry:60},
    'Mid Dx':{x:640,y:360,rx:50,ry:60},'Mid Est Dx':{x:760,y:360,rx:50,ry:60},
    'Base Est Sx':{x:160,y:480,rx:50,ry:60},'Baseline Sx':{x:280,y:480,rx:50,ry:60},
    'Paint Basso Sx':{x:400,y:480,rx:50,ry:60},'Canestro':{x:520,y:480,rx:50,ry:60},
    'Paint Basso Dx':{x:640,y:480,rx:50,ry:60},'Baseline Dx':{x:760,y:480,rx:50,ry:60}
  };

  function bColor(pct){
    let r,g,b;
    if(pct<=0.5){const t=pct*2;r=Math.round(231+t*(200-231));g=Math.round(76+t*(180-76));b=Math.round(60+t*(0-60));}
    else{const t=(pct-0.5)*2;r=Math.round(200+t*(46-200));g=Math.round(180+t*(204-180));b=Math.round(0+t*(113-0));}
    return {r,g,b};
  }

  function buildShotMap(filteredShots){
    // Dots
    const dots=filteredShots.map(s=>{
      const def=zoneDef[s.zone];
      const cx=s.sx!=null?s.sx:(def?.x||461);
      const cy=s.sy!=null?s.sy:(def?.y||300);
      const col=s.made?'#2ecc71':'#e74c3c';
      return '<g><circle cx="'+cx+'" cy="'+cy+'" r="11" fill="'+col+'" fill-opacity="0.15"/>'
        +'<circle cx="'+cx+'" cy="'+cy+'" r="8" fill="'+col+'" stroke="white" stroke-width="1.5"/></g>';
    }).join('');

    // Bubbles
    const zs={};
    filteredShots.forEach(s=>{
      if(!zs[s.zone]) zs[s.zone]={made:0,total:0};
      zs[s.zone].total++;
      if(s.made) zs[s.zone].made++;
    });
    const maxT=Math.max(...Object.values(zs).map(z=>z.total),1);
    let defs='<filter id="ppblur" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="4"/></filter>';
    const bubbles=Object.entries(zs).map(([zone,z])=>{
      const def=zoneDef[zone]; if(!def) return '';
      const pct=z.total?z.made/z.total:0, pctInt=Math.round(pct*100);
      const maxR=Math.min(def.rx,def.ry)*0.85;
      const r=Math.max(30,Math.round(maxR*(z.total/maxT)));
      const {r:cr,g:cg,b:cb}=bColor(pct);
      const fs=Math.max(18,Math.min(28,Math.round(r*0.62)));
      const fs2=Math.max(14,Math.min(22,Math.round(r*0.48)));
      const cy=569-def.y;
      const gid='ppbg_'+zone.replace(/[^a-z0-9]/gi,'_');
      const sid='ppbs_'+zone.replace(/[^a-z0-9]/gi,'_');
      const hid='ppbh_'+zone.replace(/[^a-z0-9]/gi,'_');
      const bright='rgb('+Math.min(255,Math.round(cr*1.25))+','+Math.min(255,Math.round(cg*1.25))+','+Math.min(255,Math.round(cb*1.25))+')';
      const dark='rgb('+Math.round(cr*0.45)+','+Math.round(cg*0.45)+','+Math.round(cb*0.45)+')';
      const base='rgb('+cr+','+cg+','+cb+')';
      const shadowY=cy+r*0.82, shadowRx=r*0.72, shadowRy=r*0.18;
      defs+='<radialGradient id="'+gid+'" cx="42%" cy="35%" r="65%" fx="38%" fy="30%"><stop offset="0%" stop-color="'+bright+'"/><stop offset="45%" stop-color="'+base+'"/><stop offset="100%" stop-color="'+dark+'"/></radialGradient>'
        +'<radialGradient id="'+sid+'" cx="50%" cy="50%" r="50%"><stop offset="60%" stop-color="black" stop-opacity="0"/><stop offset="100%" stop-color="black" stop-opacity="0.28"/></radialGradient>'
        +'<radialGradient id="'+hid+'" cx="50%" cy="25%" r="55%" fx="50%" fy="10%"><stop offset="0%" stop-color="white" stop-opacity="0.72"/><stop offset="100%" stop-color="white" stop-opacity="0"/></radialGradient>';
      return '<ellipse cx="'+def.x+'" cy="'+shadowY+'" rx="'+shadowRx+'" ry="'+shadowRy+'" fill="rgba(0,0,0,0.22)" filter="url(#ppblur)"/>'
        +'<circle cx="'+def.x+'" cy="'+cy+'" r="'+r+'" fill="url(#'+gid+')"/>'
        +'<circle cx="'+def.x+'" cy="'+cy+'" r="'+r+'" fill="url(#'+sid+')"/>'
        +'<circle cx="'+def.x+'" cy="'+cy+'" r="'+r+'" fill="none" stroke="'+bright+'" stroke-width="1.5" stroke-opacity="0.6"/>'
        +'<circle cx="'+def.x+'" cy="'+cy+'" r="'+r+'" fill="url(#'+hid+')"/>'
        +'<text x="'+def.x+'" y="'+cy+'" dy=".35em" text-anchor="middle" font-size="'+fs+'" font-weight="900" font-family="Arial Black,Arial,sans-serif" fill="rgba(0,0,0,0.45)" stroke="rgba(0,0,0,0.3)" stroke-width="4" stroke-linejoin="round">'+pctInt+'%</text>'
        +'<text x="'+def.x+'" y="'+cy+'" dy=".35em" text-anchor="middle" font-size="'+fs+'" font-weight="900" font-family="Arial Black,Arial,sans-serif" fill="white">'+pctInt+'%</text>'
        +'<text x="'+def.x+'" y="'+(cy+r+18)+'" text-anchor="middle" font-size="'+fs2+'" font-weight="800" font-family="Arial,sans-serif" fill="rgba(0,0,0,0.5)" stroke="rgba(0,0,0,0.3)" stroke-width="4" stroke-linejoin="round">'+z.made+'/'+z.total+'</text>'
        +'<text x="'+def.x+'" y="'+(cy+r+18)+'" text-anchor="middle" font-size="'+fs2+'" font-weight="800" font-family="Arial,sans-serif" fill="white">'+z.made+'/'+z.total+'</text>';
    }).join('');

    const made=filteredShots.filter(s=>s.made).length, tot=filteredShots.length;
    const pct=tot?Math.round(made/tot*100):0;

    return {dots, bubbles, defs, made, tot, pct};
  }

  // Pill style
  // fallo come pill separato const pillS='display:inline-flex;flex:1;flex-direction:column;align-items:center;background:#1c1c27;border:1px solid #333;border-radius:10px;padding:8px 14px;min-width:60px';
  const pillS='display:flex;flex-direction:column;align-items:center;background:#1c1c27;border:1px solid #333;border-radius:10px;padding:8px;text-align:center';
  const pillV='font-size:22px;font-weight:900;color:#f5a623;line-height:1';
  const pillL='font-size:9px;color:#888;text-transform:uppercase;margin-top:3px';

  // Shooting breakdown
  const shootS='background:#1c1c27;border:1px solid #333;border-radius:10px;padding:12px;margin:0 0 14px';

  // Period pill buttons
  const epBs='padding:5px 12px;border-radius:20px;border:1.5px solid #444;background:#1c1c27;color:#aaa;font-size:12px;font-weight:600;cursor:pointer';
  let periodBtns='';
  if(periodKeys.length>0){
    periodBtns='<button id="pp-epb-all" data-ppep="all" style="'+epBs+';background:#f5a623;color:#000;border-color:#f5a623">'+t('filter.all')+'</button>';
    periodKeys.forEach(function(k){
      const label=k.startsWith('q')?'Q'+k.slice(1):'OT'+k.slice(2);
      periodBtns+='<button id="pp-epb-'+k+'" data-ppep="'+k+'" style="'+epBs+'">'+label+'</button>';
    });
  }

  const {dots:dotsInit, bubbles:bubblesInit, defs:defsInit, made:madeInit, tot:totInit, pct:pctInit} = buildShotMap(shots);

  const tabStyle='flex:1;padding:7px;border:none;border-radius:8px;font-size:12px;font-weight:600;cursor:pointer;';

  document.getElementById('pp-body').innerHTML=
    // ── Pills ──
    //--fallo come pill separato '<div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:14px;padding:0">'
    '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:14px">'
    +'<div style="'+pillS+'"><div style="'+pillV+'">'+pts+'</div><div style="'+pillL+'">'+t('player.pts_label')+'</div></div>'
    +'<div style="'+pillS+'"><div style="'+pillV+'">'+min+'</div><div style="'+pillL+'">'+t('player.min_label')+'</div></div>'
    +'<div style="'+pillS+'"><div style="'+pillV+'">'+reb+'</div><div style="'+pillL+'">'+t('player.reb_label')+'</div></div>'
    +'<div style="'+pillS+'"><div style="'+pillV+'">'+ast+'</div><div style="'+pillL+'">'+t('player.ast_label')+'</div></div>'
    +'<div style="'+pillS+'"><div style="'+pillV+'">'+stl+'</div><div style="'+pillL+'">'+t('player.stl_label')+'</div></div>'
    +'<div style="'+pillS+(foul>=5?';border-color:#e74c3c':'')+'"><div style="font-size:22px;font-weight:900;color:'+(foul>=5?'#e74c3c':'#f5a623')+';line-height:1">'+foul+'</div><div style="'+pillL+'">'+t('player.fls_label')+'</div></div>'
    +'</div>'

    // ── Shooting breakdown ──
    +'<div style="'+shootS+'">'
    +'<div style="font-size:9px;color:#888;text-transform:uppercase;letter-spacing:1px;margin-bottom:10px">'+t('player.shots_label')+'</div>'
    +'<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;text-align:center">'
    +'<div><div style="font-size:9px;color:#888;text-transform:uppercase;margin-bottom:4px">'+t('player.2pt_label')+'</div>'
    +'<div style="font-size:22px;font-weight:900;color:'+pC(fg2p,fg2a)+';line-height:1">'+fg2m+'/'+fg2a+'</div>'
    +'<div style="font-size:14px;font-weight:700;color:'+pC(fg2p,fg2a)+'">'+fg2p+'%</div></div>'
    +'<div><div style="font-size:9px;color:#888;text-transform:uppercase;margin-bottom:4px">'+t('player.3pt_label')+'</div>'
    +'<div style="font-size:22px;font-weight:900;color:'+pC(fg3p,fg3a)+';line-height:1">'+fg3m+'/'+fg3a+'</div>'
    +'<div style="font-size:14px;font-weight:700;color:'+pC(fg3p,fg3a)+'">'+fg3p+'%</div></div>'
    +'<div><div style="font-size:9px;color:#888;text-transform:uppercase;margin-bottom:4px">'+t('player.ft_label')+'</div>'
    +'<div style="font-size:22px;font-weight:900;color:'+pC(ftp,fta)+';line-height:1">'+ftm+'/'+fta+'</div>'
    +'<div style="font-size:14px;font-weight:700;color:'+pC(ftp,fta)+'">'+ftp+'%</div></div>'
    +'</div></div>'

    // ── VAL / +/- ──
    +(valExp!==null||pmExp!==null
      ? '<div style="display:grid;grid-template-columns:1fr'+(pmExp!==null?' 1fr':'')+';gap:10px;margin-bottom:14px">'
        +(valExp!==null?'<div style="background:#1c1c27;border:1px solid #333;border-radius:10px;padding:12px;text-align:center">'
          +'<div style="font-size:9px;color:#888;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px">'+t('player.val_label')+'</div>'
          +'<div style="font-size:28px;font-weight:900;color:'+(valExp>0?'#2ecc71':valExp<0?'#e74c3c':'#888')+';line-height:1">'+(valExp>0?'+':'')+valExp+'</div></div>':'')
        +(pmExp!==null?'<div style="background:#1c1c27;border:1px solid #333;border-radius:10px;padding:12px;text-align:center">'
          +'<div style="font-size:9px;color:#888;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px">'+t('player.pm_label')+'</div>'
          +'<div style="font-size:28px;font-weight:900;color:'+(pmExp>0?'#2ecc71':pmExp<0?'#e74c3c':'#888')+';line-height:1">'+(pmExp>0?'+':'')+pmExp+'</div></div>':'')
        +'</div>'
      : '')

  // ── By Quarter ──
  + (periodKeys.length > 0 ? (function(){
    const keys = periodKeys;
    let pRows = '';
    keys.forEach(function(k){
      const s = p.byPeriod ? (p.byPeriod[k] || null) : null;
      // recupera byPeriod dal _matchStats
      const ms = _matchStats.players.find(function(x){ return String(x.id)===String(p.id); });
      const sd = ms ? (ms.byPeriod[k] || null) : null;
      if(!sd) return;
      const pts2 = (sd.fg2m||0)*2 + (sd.fg3m||0)*3 + (sd.ftm||0);
      const fg2pct = sd.fg2a>0 ? Math.round(sd.fg2m/sd.fg2a*100) : 0;
      const fg3pct = sd.fg3a>0 ? Math.round(sd.fg3m/sd.fg3a*100) : 0;
      const ftpct  = sd.fta>0  ? Math.round(sd.ftm/sd.fta*100)   : 0;
      const min    = Math.round(sd.minPlayed||0);
      const label  = k.startsWith('q') ? 'Q'+k.slice(1) : 'OT'+k.slice(2);
      pRows += '<tr>'
        +'<td style="text-align:left;font-weight:700;color:#f5a623">'+label+'</td>'
        +'<td>'+min+"'</td>"
        +'<td><strong style="color:#f5a623">'+pts2+'</strong></td>'
        +'<td>'+sd.fg2m+'/'+sd.fg2a+'<br><span style="font-size:9px;color:#aaa">'+fg2pct+'%</span></td>'
        +'<td>'+sd.fg3m+'/'+sd.fg3a+'<br><span style="font-size:9px;color:#aaa">'+fg3pct+'%</span></td>'
        +'<td>'+sd.ftm+'/'+sd.fta+'<br><span style="font-size:9px;color:#aaa">'+ftpct+'%</span></td>'
        +'<td>'+(sd.reb_off||0)+'</td>'
        +'<td>'+(sd.reb_def||0)+'</td>'
        +'<td>'+(sd.assist||0)+'</td>'
        +'<td>'+(sd.steal||0)+'</td>'
        +'<td>'+(sd.turnover||0)+'</td>'
        +'<td>'+(sd.foul||0)+'</td>'
        +'<td>'+(sd.foul_drawn||0)+'</td>'
        +'<td>'+(sd.block||0)+'</td>'
        +'<td>'+(sd.block_against||0)+'</td>'
        +'</tr>';
    });
    if(!pRows) return '';
    return '<div style="font-size:9px;color:#888;text-transform:uppercase;letter-spacing:1px;margin:14px 0 8px">'+t('report.by_quarter').toUpperCase()+'</div>'
      +'<div style="overflow-x:auto;border-radius:10px;border:1px solid #1c1c27;margin-bottom:14px">'
      +'<table style="width:100%;border-collapse:separate;border-spacing:0;font-size:11px">'
      +'<thead><tr>'
      +'<th style="background:#1a1a26;color:#aaa;padding:6px 8px;text-align:left;font-size:10px;text-transform:uppercase;white-space:nowrap">'+t('col.quarter')+'</th>'
      +'<th style="background:#1a1a26;color:#aaa;padding:6px 5px;text-align:center;font-size:10px;text-transform:uppercase;white-space:nowrap">'+t('col.min')+'</th>'
      +'<th style="background:#1a1a26;color:#aaa;padding:6px 5px;text-align:center;font-size:10px;text-transform:uppercase;white-space:nowrap">'+t('col.pts')+'</th>'
      +'<th style="background:#1a1a26;color:#aaa;padding:6px 5px;text-align:center;font-size:10px;text-transform:uppercase;white-space:nowrap">'+t('col.fg2')+'</th>'
      +'<th style="background:#1a1a26;color:#aaa;padding:6px 5px;text-align:center;font-size:10px;text-transform:uppercase;white-space:nowrap">'+t('col.fg3')+'</th>'
      +'<th style="background:#1a1a26;color:#aaa;padding:6px 5px;text-align:center;font-size:10px;text-transform:uppercase;white-space:nowrap">'+t('col.ft')+'</th>'
      +'<th style="background:#1a1a26;color:#aaa;padding:6px 5px;text-align:center;font-size:10px;text-transform:uppercase;white-space:nowrap">'+t('col.reb_off')+'</th>'
      +'<th style="background:#1a1a26;color:#aaa;padding:6px 5px;text-align:center;font-size:10px;text-transform:uppercase;white-space:nowrap">'+t('col.reb_def')+'</th>'
      +'<th style="background:#1a1a26;color:#aaa;padding:6px 5px;text-align:center;font-size:10px;text-transform:uppercase;white-space:nowrap">'+t('col.ast')+'</th>'
      +'<th style="background:#1a1a26;color:#aaa;padding:6px 5px;text-align:center;font-size:10px;text-transform:uppercase;white-space:nowrap">'+t('col.stl')+'</th>'
      +'<th style="background:#1a1a26;color:#aaa;padding:6px 5px;text-align:center;font-size:10px;text-transform:uppercase;white-space:nowrap">'+t('col.tov')+'</th>'
      +'<th style="background:#1a1a26;color:#aaa;padding:6px 5px;text-align:center;font-size:10px;text-transform:uppercase;white-space:nowrap">'+t('col.foul')+'</th>'
      +'<th style="background:#1a1a26;color:#aaa;padding:6px 5px;text-align:center;font-size:10px;text-transform:uppercase;white-space:nowrap">'+t('col.foul_drawn')+'</th>'
      +'<th style="background:#1a1a26;color:#aaa;padding:6px 5px;text-align:center;font-size:10px;text-transform:uppercase;white-space:nowrap">'+t('col.block')+'</th>'
      +'<th style="background:#1a1a26;color:#aaa;padding:6px 5px;text-align:center;font-size:10px;text-transform:uppercase;white-space:nowrap">'+t('col.block_against')+'</th>'
      +'</tr></thead>'
      +'<tbody>'+pRows+'</tbody>'
      +'</table></div>';
  })() : '') 

    // ── Mappa tiri ──
    +(shots.length>0
      ? '<div style="font-size:10px;color:#888;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px">'+t('report.shot_map').toUpperCase()+'</div>'
        // Period filter
        +(periodBtns?'<div id="pp-period-btns" style="display:flex;gap:5px;flex-wrap:wrap;margin-bottom:10px">'+periodBtns+'</div>':'')
        // Tab switcher
        +'<div style="display:flex;background:#1c1c27;border-radius:10px;padding:3px;gap:3px;margin-bottom:10px">'
        +'<button id="pp-tab-dots" data-pptab="dots" style="'+tabStyle+'background:#f5a623;color:#000">'+t('report.tab.precise_shots')+'</button>'
        +'<button id="pp-tab-bubble" data-pptab="bubble" style="'+tabStyle+'background:transparent;color:#888">'+t('report.tab.zone_bubbles')+'</button>'
        +'</div>'
        // Dots view
        +'<div id="pp-dots">'
        +'<div id="pp-dots-wrap" style="border-radius:12px;overflow:hidden;border:1px solid rgba(245,166,35,.15);margin-bottom:8px;cursor:zoom-in">'
        +'<svg id="pp-svg-dots" viewBox="0 0 923 569" style="width:100%;display:block" xmlns="http://www.w3.org/2000/svg">'
        +'<defs><filter id="glow-g"><feGaussianBlur stdDeviation="3" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>'
        +'<filter id="glow-r"><feGaussianBlur stdDeviation="3" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>'
        +'<g transform="scale(1,-1) translate(0,-569)">'
        +'<image href="'+courtImg+'" x="0" y="0" width="923" height="569" preserveAspectRatio="xMidYMid meet"/>'
        +'<rect x="0" y="0" width="923" height="569" fill="rgba(0,0,0,0.22)"/>'
        +'</g>'
        +'<g id="pp-dots-g">'+dotsInit+'</g>'
        +'</svg>'
        +'<div id="pp-dots-legend" style="display:flex;gap:16px;padding:7px 12px;background:#1c1c27;justify-content:center;flex-wrap:wrap;align-items:center;font-size:11px">'
        +'<span style="color:#2ecc71">● '+t('court.legend_made')+'</span>'
        +'<span style="color:#e74c3c">● '+t('court.legend_missed')+'</span>'
        +'<span style="color:#888">'+madeInit+'/'+totInit+' — '+pctInit+'%</span>'
        +'</div>'
        +'<div style="padding:4px 12px 8px;background:#1c1c27;text-align:center"><span style="font-size:10px;color:#888">🔍 '+t('report.shotmap.zoom_hint')+'</span></div>'
        +'</div></div>'
        // Bubble view
        +'<div id="pp-bubble" style="display:none">'
        +'<div id="pp-bubble-wrap" style="border-radius:12px;overflow:hidden;border:1px solid rgba(245,166,35,.15);margin-bottom:8px;cursor:zoom-in">'
        +'<svg id="pp-svg-bubble" viewBox="0 0 923 569" style="width:100%;display:block" xmlns="http://www.w3.org/2000/svg">'
        +'<defs>'+defsInit+'</defs>'
        +'<g transform="scale(1,-1) translate(0,-569)">'
        +'<image href="'+courtImg+'" x="0" y="0" width="923" height="569" preserveAspectRatio="xMidYMid meet"/>'
        +'<rect id="pp-bubble-rect" x="0" y="0" width="923" height="569" fill="rgba(0,0,0,0.3)"/>'
        +'</g>'
        +'<g id="pp-bubbles-g">'+bubblesInit+'</g>'
        +'</svg>'
        +'<div style="display:flex;gap:10px;padding:7px 12px;background:#1c1c27;justify-content:center;flex-wrap:wrap;align-items:center">'
        +'<div style="font-size:10px;color:#888">'+t('shotmap.bubble.legend')+'</div>'
        +'</div>'
        +'<div style="display:flex;padding:4px 16px 4px;background:#1c1c27;justify-content:center;align-items:center">'
        +'<div style="width:80px;height:10px;border-radius:5px;background:linear-gradient(to right,rgba(231,76,60,0.92),rgba(200,180,0,0.35),rgba(46,204,113,0.92))"></div>'
        +'<div style="font-size:9px;color:#888;margin-left:6px">'+t('shotmap.bubble.gradient')+'</div>'
        +'</div>'
        +'<div style="padding:4px 12px 8px;background:#1c1c27;text-align:center"><span style="font-size:10px;color:#888">🔍 '+t('report.shotmap.zoom_hint')+'</span></div>'
        +'</div></div>'
      : '<div style="color:#888;text-align:center;padding:20px">'+t('misc.no_shots')+'</div>');

  document.getElementById('pp').style.display='block';
  document.body.style.overflow='hidden';

  // ── Stato filtri periodo per questa modale ──
  let _ppPeriods=[];
  let _ppTab='dots';

  function _ppFilteredShots(){
    if(!_ppPeriods.length) return shots;
    return shots.filter(function(s){ return _ppPeriods.indexOf(s.q)>=0; });
  }

  function _ppUpdateMap(){
    const fs=_ppFilteredShots();
    const {dots,bubbles,defs,made,tot,pct}=buildShotMap(fs);
    // Update dots
    var dotsG=document.getElementById('pp-dots-g');
    if(dotsG) dotsG.innerHTML=dots;
    var legend=document.getElementById('pp-dots-legend');
    if(legend) legend.innerHTML='<span style="color:#2ecc71">● '+t('court.legend_made')+'</span>'
      +'<span style="color:#e74c3c">● '+t('court.legend_missed')+'</span>'
      +'<span style="color:#888">'+made+'/'+tot+' — '+pct+'%</span>';
    // Update bubbles
    var bubblesG=document.getElementById('pp-bubbles-g');
    if(bubblesG) bubblesG.innerHTML=bubbles;
    var svgBubble=document.getElementById('pp-svg-bubble');
    if(svgBubble){
      var existingDefs=svgBubble.querySelector('defs');
      if(existingDefs) existingDefs.innerHTML=defs;
    }
  }

  function _ppPeriodToggle(key){
    if(!key){
      _ppPeriods=[];
    } else {
      var idx=_ppPeriods.indexOf(key);
      if(idx>=0) _ppPeriods.splice(idx,1);
      else _ppPeriods.push(key);
    }
    const allActive=_ppPeriods.length===0;
    var ab=document.getElementById('pp-epb-all');
    if(ab){ ab.style.background=allActive?'#f5a623':'#1c1c27'; ab.style.color=allActive?'#000':'#aaa'; ab.style.borderColor=allActive?'#f5a623':'#444'; }
    periodKeys.forEach(function(k){
      var btn=document.getElementById('pp-epb-'+k);
      if(!btn) return;
      var on=_ppPeriods.indexOf(k)>=0;
      btn.style.background=on?'#f5a623':'#1c1c27'; btn.style.color=on?'#000':'#aaa'; btn.style.borderColor=on?'#f5a623':'#444';
    });
    _ppUpdateMap();
  }

  // Delegate period buttons e tab dentro pp-body
  var ppBody=document.getElementById('pp-body');
  ppBody.addEventListener('click', function(e){
    var btn=e.target.closest('button');
    if(!btn) return;
    if(btn.dataset.ppep!==undefined){
      _ppPeriodToggle(btn.dataset.ppep==='all'?null:btn.dataset.ppep);
      return;
    }
    if(btn.dataset.pptab){
      _ppTab=btn.dataset.pptab;
      document.getElementById('pp-dots').style.display=_ppTab==='dots'?'block':'none';
      document.getElementById('pp-bubble').style.display=_ppTab==='bubble'?'block':'none';
      document.getElementById('pp-tab-dots').style.background=_ppTab==='dots'?'#f5a623':'transparent';
      document.getElementById('pp-tab-dots').style.color=_ppTab==='dots'?'#000':'#888';
      document.getElementById('pp-tab-bubble').style.background=_ppTab==='bubble'?'#f5a623':'transparent';
      document.getElementById('pp-tab-bubble').style.color=_ppTab==='bubble'?'#000':'#888';
    }
  });

  // ── Doppio tap zoom (dots e bubble) ──
  function _ppZoomSetup(wrapperId, svgId){
    var wrap=document.getElementById(wrapperId);
    if(!wrap) return;
    var _lastTap=0;
    wrap.addEventListener('touchend', function(e){
      var now=Date.now();
      if(now-_lastTap<300){
        e.preventDefault();
        var svgEl=document.getElementById(svgId);
        if(!svgEl) return;
        var clone=svgEl.cloneNode(true);
        clone.style.cssText='width:95vw;height:auto;display:block';
        var overlay=document.createElement('div');
        overlay.style.cssText='position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.97);z-index:999999;display:flex;align-items:center;justify-content:center;overflow:hidden';
        var closeBtn=document.createElement('div');
        closeBtn.innerHTML='✕';
        closeBtn.style.cssText='position:fixed;top:12px;right:12px;color:white;font-size:22px;font-weight:bold;cursor:pointer;background:rgba(255,255,255,0.2);border-radius:50%;width:38px;height:38px;display:flex;align-items:center;justify-content:center;z-index:1000000';
        var close=function(){ overlay.remove(); };
        overlay.addEventListener('click',close);
        closeBtn.addEventListener('click',function(ev){ ev.stopPropagation(); close(); });
        overlay.appendChild(clone);
        overlay.appendChild(closeBtn);
        document.body.appendChild(overlay);
        // Pinch-to-zoom
        var _scale=1,_lastDist=0,_tx=0,_ty=0,_startTx=0,_startTy=0,_startMidX=0,_startMidY=0;
        function _getDist(t){ return Math.hypot(t[0].clientX-t[1].clientX,t[0].clientY-t[1].clientY); }
        function _getMid(t){ return {x:(t[0].clientX+t[1].clientX)/2,y:(t[0].clientY+t[1].clientY)/2}; }
        function _applyT(){ clone.style.transform='translate('+_tx+'px,'+_ty+'px) scale('+_scale+')'; clone.style.transformOrigin='0 0'; }
        overlay.addEventListener('touchstart',function(ev){
          if(ev.touches.length===2){ ev.preventDefault(); _lastDist=_getDist(ev.touches); var m=_getMid(ev.touches); _startMidX=m.x;_startMidY=m.y;_startTx=_tx;_startTy=_ty; }
        },{passive:false});
        overlay.addEventListener('touchmove',function(ev){
          if(ev.touches.length===2){ ev.preventDefault();
            var dist=_getDist(ev.touches),ratio=dist/_lastDist;
            var ns=Math.min(Math.max(_scale*ratio,1),5);
            var m=_getMid(ev.touches);
            _tx=m.x-((_startMidX-_startTx)*(ns/_scale));
            _ty=m.y-((_startMidY-_startTy)*(ns/_scale));
            _scale=ns;_lastDist=dist;_startMidX=m.x;_startMidY=m.y;_startTx=_tx;_startTy=_ty;
            _applyT();
          }
        },{passive:false});
        var _lt=0;
        overlay.addEventListener('touchend',function(ev){
          if(ev.touches.length===0){ var n=Date.now(); if(n-_lt<300){_scale=1;_tx=0;_ty=0;_applyT();} _lt=n; }
        });
      }
      _lastTap=now;
    });
  }

  if(shots.length>0){
    _ppZoomSetup('pp-dots-wrap','pp-svg-dots');
    _ppZoomSetup('pp-bubble-wrap','pp-svg-bubble');
  }
}
 
function ppTab(tab){
  document.getElementById('pp-dots').style.display=tab==='dots'?'block':'none';
  document.getElementById('pp-bubble').style.display=tab==='bubble'?'block':'none';
  document.getElementById('pp-tab-dots').style.background=tab==='dots'?'#f5a623':'transparent';
  document.getElementById('pp-tab-dots').style.color=tab==='dots'?'#000':'#888';
  document.getElementById('pp-tab-bubble').style.background=tab==='bubble'?'#f5a623':'transparent';
  document.getElementById('pp-tab-bubble').style.color=tab==='bubble'?'#000':'#888';
}
function closePP(){document.getElementById('pp').style.display='none';document.body.style.overflow='';}

\u003c/script\u003e`;

  // ── Debug panel ──
  function showDebugLog(msg) {
    let panel = document.getElementById('debug-panel');
    if(!panel) {
      panel = document.createElement('div');
      panel.id = 'debug-panel';
      panel.style.cssText = 'position:fixed;bottom:0;left:0;right:0;max-height:40vh;overflow-y:auto;background:rgba(0,0,0,0.92);color:#0f0;font-size:11px;font-family:monospace;padding:8px;z-index:999999;border-top:2px solid #0f0';
      const closeBtn = document.createElement('div');
      closeBtn.innerHTML = '✕ Chiudi log';
      closeBtn.style.cssText = 'color:#f00;cursor:pointer;margin-bottom:6px;font-weight:bold';
      closeBtn.onclick = () => panel.remove();
      panel.appendChild(closeBtn);
      document.body.appendChild(panel);
    }
    const line = document.createElement('div');
    line.textContent = new Date().toISOString().slice(11,19) + ' ' + msg;
    panel.appendChild(line);
    panel.scrollTop = panel.scrollHeight;
  }

   const blob = new Blob([standalonePage], {type:'text/html'});
   const fileName = 'report_'+(m.opponent||'partita').replace(/[^a-zA-Z0-9\u00C0-\u024F_-]/g,'_')+'_'+(m.date||'').replace(/[^0-9-]/g,'_')+'.html';

  //showDebugLog('fileName: ' + fileName);
  //showDebugLog('blob size: ' + blob.size);
  //showDebugLog('Capacitor: ' + !!window.Capacitor);
  //showDebugLog('isNative: ' + window.Capacitor?.isNativePlatform?.());

  // Prova Capacitor Filesystem prima (APK), poi fallback web
      if(window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform()) {
  //showDebugLog('Usando Capacitor Plugins');
  try {
    const Filesystem  = window.Capacitor.Plugins.Filesystem;
    const Permissions = window.Capacitor.Plugins.Permissions;

    // Richiedi permesso runtime
    if (Permissions) {
      try {
        const check = await Permissions.checkPermissions();
        //showDebugLog('Perm check: ' + JSON.stringify(check));
        const needRequest = check.publicStorage !== 'granted'
                         && check.storage      !== 'granted';
        if (needRequest) {
          const req = await Permissions.requestPermissions({
            permissions: ['storage', 'publicStorage']
          });
          //showDebugLog('Perm request: ' + JSON.stringify(req));
          const denied = req.storage      === 'denied'
                      && req.publicStorage === 'denied';
          if (denied) {
            toast('Permesso storage negato — impossibile salvare');
            return;
          }
        }
      } catch(permErr) {
        //showDebugLog('Perm error (ignoro): ' + permErr.message);
      }
    }

    const reader = new FileReader();
    reader.onerror = (e) => { 
      //showDebugLog('FileReader error: ' + e); 
      toast('Errore lettura file'); };
    reader.onloadend = async () => {
      try {
        //showDebugLog('FileReader completato, scrivo file...');
        const base64 = reader.result.split(',')[1];

        const candidates = ['CACHE', 'DOCUMENTS', 'EXTERNAL_STORAGE'];
        let written = false;

        for (const dir of candidates) {
          try {
            //showDebugLog('Provo directory: ' + dir);
            try {
              await Filesystem.mkdir({
                path: 'BasketBubble',
                directory: dir,
                recursive: true
              });
              //showDebugLog('mkdir OK in ' + dir);
            } catch(mkErr) {
              //showDebugLog('mkdir skip (' + dir + '): ' + mkErr.message);
            }

            const result = await Filesystem.writeFile({
            path: 'BasketBubble/' + fileName,
            data: base64,
            directory: dir
        });

           //showDebugLog('Scritto in ' + dir + ': ' + JSON.stringify(result));

          // Share sheet — unico punto di uscita verso l'utente
          const { Share } = window.Capacitor.Plugins;
          //showDebugLog('Share plugin: ' + !!Share); // Debug Share plugin

          if (Share) {
  try {
    //showDebugLog('Apro share sheet...');
    await Share.share({
      title: fileName,
      url: result.uri,
      dialogTitle: 'Salva o condividi il report'
    });
    //showDebugLog('Share completato');
  } catch(shareErr) {
    //showDebugLog('Share annullato/errore: ' + shareErr.message);
    toast(t('report.exported_ok'));
  }
} else {
  //showDebugLog('Share non disponibile');
  toast(t('report.exported_ok') + ' → Cache');
}

written = true;
break;
          } catch(writeErr) {
            //showDebugLog('Fallito ' + dir + ': ' + writeErr.message);
          }
        }

        if (!written) throw new Error('Nessuna directory disponibile');

      } catch(e) {
        //showDebugLog('Errore finale: ' + e.message);
        toast('Errore salvataggio: ' + e.message);
      }
    };
    reader.readAsDataURL(blob);
  } catch(e) {
    //showDebugLog('Filesystem error: ' + e.message);
    toast('Errore: ' + e.message);
  }
} else {
    //showDebugLog('Usando fallback web');
    const url = URL.createObjectURL(blob);
    const a   = document.createElement('a');
    a.href     = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
    toast(t('report.exported_ok'));
  }
}



function populateReportSelect() {
  const sel=document.getElementById('report-match-select'), prev=sel.value;
  sel.innerHTML=`<option value="">${t('report.select_match')}</option>`+
    state.matches.map(m=>`<option value="${esc(m.id)}">${esc(m.date)} vs ${esc(m.opponent)} (${parseInt(m.ourScore)||0}-${parseInt(m.oppScore)||0})</option>`).join('');
  if(prev) sel.value=prev;
}
function renderReport() {
  const id=document.getElementById('report-match-select').value;
  const m=state.matches.find(x=>x.id===id);
  const el=document.getElementById('report-content');
  if(!m){ el.innerHTML='<div class="empty-state"><div class="e-icon">📊</div><p>'+t('report.select_match')+'</p></div>'; return; }

  const {rows, pmMap, periods, ptotals} = buildMatchData(m);

  // Reset in-app box score filter state for the new match
  _iabsSelected = [];
  _iabsPeriods  = periods;
  _iabsMatchId  = m.id;
  _iabsSortCol  = 2;  // reset a PTS
  _iabsSortDir  = -1; // desc

  el.innerHTML=`
    <div class="card">
      <div class="card-row" style="align-items:flex-start">
        <div>
          <div style="font-family:var(--font-display);font-size:22px;letter-spacing:1px">vs ${esc(m.opponent)}</div>
          <div style="font-size:12px;color:var(--text2)">${esc(m.date)} · ${m.home==='home'?t('matches.home'):t('matches.away')}</div>
        </div>
        <div style="text-align:right">
          <div style="font-family:var(--font-display);font-size:36px;letter-spacing:3px;color:${m.ourScore>m.oppScore?'var(--green)':'var(--red)'}">${parseInt(m.ourScore)||0}<span style="font-size:20px;color:var(--text3)"> — </span>${parseInt(m.oppScore)||0}</div>
		        <span class="badge ${m.status==='live' ? 'badge-accent' : m.ourScore>m.oppScore ? 'badge-green' : 'badge-red'}">
            ${m.status==='live' ? t('matches.status_live') : m.ourScore>m.oppScore ? t('match.result.win') : t('match.result.loss')}
            </span>
        </div>
      </div>
      <div style="display:grid;grid-template-columns:repeat(${ptotals.length},1fr);gap:6px;margin-top:14px">
        ${ptotals.map(({label,pts,opp})=>`
          <div style="background:var(--surface2);border-radius:8px;padding:8px;text-align:center">
            <div style="font-size:10px;color:var(--text3);text-transform:uppercase">${esc(label)}</div>
            <div style="font-family:var(--font-display);font-size:20px;color:var(--accent);line-height:1">${parseInt(pts)||0}<span style="color:var(--text3);font-size:14px"> — </span><span style="color:var(--text2);font-size:18px">${parseInt(opp)||0}</span></div>
          </div>`).join('')}
      </div>
    </div>

    <div class="section-title">${t('report.box_score').toUpperCase()}</div>
    ${periods.length>1?`<div id="inapp-bs-period-bar" style="display:flex;gap:5px;flex-wrap:wrap;align-items:center;padding:0 16px 10px">
      ${(()=>{
        const _bs='padding:5px 12px;border-radius:20px;border:1.5px solid var(--border);background:var(--surface2);color:var(--text2);font-size:12px;font-weight:600;cursor:pointer';
        const allB='<button data-iabsp="all" id="iabsp-all" style="'+_bs+';background:var(--accent);color:#000;border-color:var(--accent)">'+t('filter.all')+'</button>';
        return allB + periods.map(({key,label})=>'<button data-iabsp="'+key+'" id="iabsp-'+key+'" style="'+_bs+'">'+label+'</button>').join('');
      })()}
    </div>`:''}
    <div class="scroll-x" style="margin:0 16px 12px">
      <table class="stat-table sticky-table" id="inapp-bs-table">
        <thead><tr id="inapp-bs-head">
          <th class="sortable" data-iabscol="0" style="text-align:left;min-width:100px">${t('col.player')}</th>
          <th class="sortable" data-iabscol="1">${t('col.min')}</th><th class="sortable sort-active" data-iabscol="2">${t('col.pts')}</th><th class="sortable" data-iabscol="3">${t('col.fg2')}</th><th class="sortable" data-iabscol="4">${t('col.fg3')}</th><th class="sortable" data-iabscol="5">${t('col.ft')}</th>
          <th class="sortable" data-iabscol="6">${t('col.reb_off')}</th><th class="sortable" data-iabscol="7">${t('col.reb_def')}</th><th class="sortable" data-iabscol="8">${t('col.ast')}</th><th class="sortable" data-iabscol="9">${t('col.stl')}</th><th class="sortable" data-iabscol="10">${t('col.tov')}</th><th class="sortable" data-iabscol="11">${t('col.foul')}</th><th class="sortable" data-iabscol="12">${t('col.foul_drawn')}</th><th class="sortable" data-iabscol="13">${t('col.block')}</th><th class="sortable" data-iabscol="14">${t('col.block_against')}</th><th class="sortable" data-iabscol="15">Val</th>${pmMap?'<th class="sortable" data-iabscol="16">+/−</th>':''}
        </tr></thead>
        <tbody id="inapp-bs-body">${rows.map(({p,pts,all,fg2pct,fg3pct,ftpct,min,pm})=>{const val=calcVal(all);return`
          <tr>
            <td style="cursor:pointer;color:var(--accent)" data-action="openPlayerModal" data-matchid="${esc(m.id)}" data-playerid="${esc(p.id)}" data-sort="${esc(p.num)}">#${esc(p.num)} ${esc(p.name)} ›</td>
            <td data-sort="${min}">${min}'</td>
            <td data-sort="${pts}"><strong>${pts}</strong></td>
            <td data-sort="${all.fg2a>0?Math.round(all.fg2m/all.fg2a*100):-1}">${all.fg2m}/${all.fg2a}<br><span class="pct">${fg2pct}%</span></td>
            <td data-sort="${all.fg3a>0?Math.round(all.fg3m/all.fg3a*100):-1}">${all.fg3m}/${all.fg3a}<br><span class="pct">${fg3pct}%</span></td>
            <td data-sort="${all.fta>0?Math.round(all.ftm/all.fta*100):-1}">${all.ftm}/${all.fta}<br><span class="pct">${ftpct}%</span></td>
            <td data-sort="${all.reb_off}">${all.reb_off}</td><td data-sort="${all.reb_def}">${all.reb_def}</td>
            <td data-sort="${all.assist}">${all.assist}</td><td data-sort="${all.steal}">${all.steal}</td><td data-sort="${all.turnover}">${all.turnover}</td>
            <td data-sort="${all.block||0}">${all.block||0}</td><td data-sort="${all.block_against||0}">${all.block_against||0}</td>
            <td data-sort="${all.foul}" style="color:${all.foul>=5?'var(--red)':'inherit'}">${all.foul}${all.foul>=5?' ⚠️':''}</td>
            <td data-sort="${all.foul_drawn}">${all.foul_drawn}</td>
            <td data-sort="${val}" style="font-weight:700;color:${val>0?'var(--green)':val<0?'var(--red)':'var(--text2)'}">${val>0?'+':''}${val}</td>
            ${pmMap?`<td data-sort="${pm}" style="font-weight:700;color:${pm>0?'var(--green)':pm<0?'var(--red)':'var(--text2)'}">${pm>0?'+':''}${pm}</td>`:''}
          </tr>`}).join('')}
        </tbody>
      </table>
    </div>

    <div class="section-title">${t('report.shot_summary').toUpperCase()}</div>
    ${renderShotSummaryHTML(rows, 'inapp')}

    <div class="section-title">${t('report.team_totals').toUpperCase()}</div>
    ${renderTeamTotalsHTML(rows, 'inapp')}

    ${renderOppFoulsHTML(m, 'inapp')}
	
	
    ${renderSubstitutionsHTML(m, 'inapp')}

    <div class="section-title">${t('report.shot_map').toUpperCase()}</div>
    <div style="padding:0 16px 12px;display:flex;gap:8px">
      <select id="shot-map-player" data-change="refreshShotMap()" style="flex:1;margin-bottom:0">
        <option value="">${t('filter.all_players')}</option>
        ${m.players.map(p=>'<option value="'+esc(p.id)+'">#'+esc(p.num)+' '+esc(p.name)+'</option>').join('')}
      </select>
      <div id="shot-map-period-btns" style="display:flex;gap:5px;flex-wrap:wrap;align-items:center">
        ${(()=>{
          const periods=[];
          for(let q=1;q<=4;q++) periods.push({key:'q'+q,label:'Q'+q});
          if(m.isOT) for(let o=1;o<=m.otNum;o++) periods.push({key:'ot'+o,label:'OT'+o});
          const bs='padding:5px 12px;border-radius:20px;border:1.5px solid var(--border);background:var(--surface2);color:var(--text2);font-size:12px;font-weight:600;cursor:pointer';
          const allBtn='<button data-smp="all" id="smp-btn-all" style="'+bs+';background:var(--accent);color:#000;border-color:var(--accent)">'+t('filter.all')+'</button>';
          return allBtn + periods.map(({key,label})=>'<button data-smp="'+key+'" id="smp-btn-'+key+'" style="'+bs+'">'+label+'</button>').join('');
        })()}
      </div>
    </div>
    <div id="shot-map-container" ${settings.zoneSelection ? '' : 'style="display:none"'}>${settings.zoneSelection ? renderShotMap(m, null, null) : '<div style="padding:16px;color:var(--text3);font-size:13px;text-align:center">⚙️ '+t('misc.zone_disabled')+'</div>'}</div>


   ${renderGameFlowHTML(m, 'inapp')}

    ${(()=>{
      // ── LINEUPS (QUINTETTI) — usa buildLineupRows() condivisa ────────
      const lineupRows = buildLineupRows(m);
      if (!lineupRows || !lineupRows.length) return '';

      const MAX_LU = 5;
      const hasMoreLU = lineupRows.length > MAX_LU;

      function renderLURow(row, hidden) {
        const pmColor = row.pm > 0 ? 'var(--green)' : row.pm < 0 ? 'var(--red)' : 'var(--text2)';
        const pmStr = (row.pm > 0 ? '+' : '') + row.pm;
        const valColor = row.val > 0 ? 'var(--green)' : row.val < 0 ? 'var(--red)' : 'var(--text2)';
        const valStr = (row.val > 0 ? '+' : '') + row.val;
        const playersJson = JSON.stringify(row.players).replace(/"/g, '&quot;');
        return `<tr${hidden ? ' class="lu-hidden-row" style="display:none"' : ''} data-luplayers="${playersJson}" style="cursor:pointer">
          <td style="text-align:left;padding:6px 8px">
            <div style="display:flex;gap:4px;flex-wrap:wrap">
              ${row.players.map(p => `<span style="background:var(--accent);color:#000;border-radius:6px;padding:2px 7px;font-size:11px;font-weight:700">${esc(p.num)}</span>`).join('')}
            </div>
          </td>
          <td style="font-family:var(--font-mono);font-size:12px">${row.minFormatted}</td>
          <td style="font-weight:700;color:var(--accent)">${row.pts}</td>
          <td style="color:var(--text2)">${row.ptso}</td>
          <td style="font-weight:700;color:${valColor}">${valStr}</td>
          <td style="font-weight:700;color:${pmColor}">${pmStr}</td>
        </tr>`;
      }

      return `<div class="section-title">${t('report.lineups').toUpperCase()}</div>
      <div class="card" style="padding:0;overflow:hidden;margin-bottom:8px">
        <div class="scroll-x">
          <table class="stat-table sticky-table" style="width:100%">
            <thead><tr>
              <th style="text-align:left;min-width:160px">${t('report.lineups')}</th>
              <th>${t('col.min')}</th>
              <th style="color:var(--accent)">PTS</th>
              <th>PTSO</th>
              <th>VAL</th>
              <th>+/−</th>
            </tr></thead>
            <tbody id="lu-report-tbody">
              ${lineupRows.slice(0, MAX_LU).map(r => renderLURow(r, false)).join('')}
              ${lineupRows.slice(MAX_LU).map(r => renderLURow(r, true)).join('')}
            </tbody>
          </table>
        </div>
        ${hasMoreLU ? `<div style="text-align:center;padding:8px 0 12px">
          <button id="lu-report-toggle" style="background:transparent;border:1px solid var(--border);color:var(--text2);border-radius:20px;padding:5px 18px;font-size:12px;cursor:pointer">
            Mostra tutti (${lineupRows.length})
          </button>
        </div>` : ''}
      </div>`;
    })()}


  <div id="lu-report-modal-overlay" style="display:none;position:fixed;inset:0;z-index:400;background:rgba(0,0,0,.8);backdrop-filter:blur(6px);align-items:flex-end;justify-content:center">
    <div id="lu-report-modal" style="background:#13131a;border:1px solid #222;border-radius:20px 20px 0 0;width:100%;max-width:480px;padding:20px 16px 32px;max-height:88vh;overflow-y:auto">
      <div style="width:36px;height:4px;background:#2a2a3a;border-radius:2px;margin:0 auto 18px"></div>
      <div style="font-size:13px;font-weight:700;letter-spacing:1.5px;color:#f5a623;text-align:center;margin-bottom:20px;text-transform:uppercase">${t('report.lineups')}</div>
      <div id="lu-report-modal-players" style="display:flex;flex-wrap:wrap;justify-content:center;gap:12px"></div>
      <button id="lu-report-modal-close" style="margin-top:24px;width:100%;padding:12px;background:#1c1c27;border:1px solid #333;border-radius:12px;color:#888;font-size:14px;cursor:pointer">
        ${t('report.action.close')}
      </button>
    </div>
  </div>
  `;
}


// ── In-app Box Score period filter ─────────────────────────────────────────
let _iabsSelected = []; // [] = tutti i quarti
let _iabsPeriods  = []; // popolato da renderReport
let _iabsMatchId  = null;
let _iabsSortCol  = 2;  // default: PTS
let _iabsSortDir  = -1; // -1 = desc, 1 = asc

function _iabsStatForPlayer(m, playerId, selectedKeys) {
  const keys = selectedKeys.length > 0 ? selectedKeys : _iabsPeriods.map(p => p.key);
  const acc = {fg2m:0,fg2a:0,fg3m:0,fg3a:0,ftm:0,fta:0,
               reb_off:0,reb_def:0,assist:0,steal:0,turnover:0,
               block:0,block_against:0,foul:0,foul_drawn:0,minPlayed:0};
  keys.forEach(k => {
    const s = m.stats[playerId]?.[k];
    if(!s) return;
    acc.fg2m+=s.fg2m||0; acc.fg2a+=s.fg2a||0;
    acc.fg3m+=s.fg3m||0; acc.fg3a+=s.fg3a||0;
    acc.ftm +=s.ftm ||0; acc.fta +=s.fta ||0;
    acc.reb_off+=s.reb_off||0; acc.reb_def+=s.reb_def||0;
    acc.assist+=s.assist||0; acc.steal+=s.steal||0;
    acc.turnover+=s.turnover||0; acc.block+=s.block||0;
    acc.block_against+=s.block_against||0;
    acc.foul+=s.foul||0; acc.foul_drawn+=s.foul_drawn||0;
    acc.minPlayed+=s.minPlayed||0;
  });
  return acc;
}

function updateInAppBoxScore() {
  const tbody = document.getElementById('inapp-bs-body');
  if(!tbody) return;
  const m = state.matches.find(x => x.id === _iabsMatchId);
  if(!m) return;
  const activePm = calcPlusMinusMap(m, _iabsSelected.length > 0 ? _iabsSelected : null);
  const hasPm = activePm && Object.keys(activePm).length > 0;
  const updatedRows = m.players.map(p => {
    const all = _iabsStatForPlayer(m, p.id, _iabsSelected);
    const pts     = all.fg2m*2 + all.fg3m*3 + all.ftm;
    const fg2pct  = all.fg2a>0 ? Math.round(all.fg2m/all.fg2a*100) : 0;
    const fg3pct  = all.fg3a>0 ? Math.round(all.fg3m/all.fg3a*100) : 0;
    const ftpct   = all.fta >0 ? Math.round(all.ftm /all.fta *100) : 0;
    const min     = Math.round(all.minPlayed||0);
    const pm      = hasPm ? (activePm[p.id] ?? 0) : null;
    const val     = calcVal(all);
    return {p, all, pts, fg2pct, fg3pct, ftpct, min, pm, val};
  }).sort((a,b) => b.pts - a.pts);

  const sortedRows = updatedRows.slice().sort((a, b) => {
    const getVal = (r, col) => {
      switch(col) {
        case 0: return parseInt(r.p.num) || 0;
        case 1: return r.min;
        case 2: return r.pts;
        case 3: return r.all.fg2a > 0 ? Math.round(r.all.fg2m / r.all.fg2a * 100) : -1;
        case 4: return r.all.fg3a > 0 ? Math.round(r.all.fg3m / r.all.fg3a * 100) : -1;
        case 5: return r.all.fta  > 0 ? Math.round(r.all.ftm  / r.all.fta  * 100) : -1;
        case 6: return r.all.reb_off || 0;
        case 7: return r.all.reb_def || 0;
        case 8: return r.all.assist  || 0;
        case 9: return r.all.steal   || 0;
        case 10: return r.all.turnover || 0;
        case 11: return r.all.block   || 0;
        case 12: return r.all.block_against || 0;
        case 13: return r.all.foul || 0;
        case 14: return r.all.foul_drawn || 0;
        case 15: return r.val;
        case 16: return r.pm !== null ? r.pm : -999;
        default: return r.pts;
      }
    };
    const av = getVal(a, _iabsSortCol), bv = getVal(b, _iabsSortCol);
    return _iabsSortDir * (bv - av);
  });

  tbody.innerHTML = sortedRows.map(({p, all, pts, fg2pct, fg3pct, ftpct, min, pm, val}) => `
    <tr>
      <td style="cursor:pointer;color:var(--accent)" data-action="openPlayerModal" data-matchid="${esc(m.id)}" data-playerid="${esc(p.id)}" data-sort="${esc(p.num)}">#${esc(p.num)} ${esc(p.name)} ›</td>
      <td data-sort="${min}">${min}'</td>
      <td data-sort="${pts}"><strong>${pts}</strong></td>
      <td data-sort="${all.fg2a>0?Math.round(all.fg2m/all.fg2a*100):-1}">${all.fg2m}/${all.fg2a}<br><span class="pct">${fg2pct}%</span></td>
      <td data-sort="${all.fg3a>0?Math.round(all.fg3m/all.fg3a*100):-1}">${all.fg3m}/${all.fg3a}<br><span class="pct">${fg3pct}%</span></td>
      <td data-sort="${all.fta>0?Math.round(all.ftm/all.fta*100):-1}">${all.ftm}/${all.fta}<br><span class="pct">${ftpct}%</span></td>
      <td data-sort="${all.reb_off}">${all.reb_off}</td><td data-sort="${all.reb_def}">${all.reb_def}</td>
      <td data-sort="${all.assist}">${all.assist}</td><td data-sort="${all.steal}">${all.steal}</td><td data-sort="${all.turnover}">${all.turnover}</td>
      <td data-sort="${all.block||0}">${all.block||0}</td><td data-sort="${all.block_against||0}">${all.block_against||0}</td>
      <td data-sort="${all.foul}" style="color:${all.foul>=5?'var(--red)':'inherit'}">${all.foul}${all.foul>=5?' ⚠️':''}</td>
      <td data-sort="${all.foul_drawn}">${all.foul_drawn}</td>
      <td data-sort="${val}" style="font-weight:700;color:${val>0?'var(--green)':val<0?'var(--red)':'var(--text2)'}">${val>0?'+':''}${val}</td>
      ${pm!==null?`<td data-sort="${pm}" style="font-weight:700;color:${pm>0?'var(--green)':pm<0?'var(--red)':'var(--text2)'}">${pm>0?'+':''}${pm}</td>`:''}
    </tr>`).join('');
  // Aggiorna stile intestazioni
  _iabsUpdateSortHeaders();
}

function _iabsUpdateSortHeaders() {
  const head = document.getElementById('inapp-bs-head');
  if(!head) return;
  head.querySelectorAll('th[data-iabscol]').forEach(th => {
    const col = parseInt(th.dataset.iabscol);
    th.classList.remove('sort-active', 'sort-asc', 'sort-desc');
    // rimuovi vecchie frecce
    const old = th.querySelector('.sort-arrow');
    if(old) old.remove();
    if(col === _iabsSortCol) {
      th.classList.add('sort-active', _iabsSortDir === -1 ? 'sort-desc' : 'sort-asc');
      const arrow = document.createElement('span');
      arrow.className = 'sort-arrow';
      arrow.textContent = _iabsSortDir === -1 ? ' ▼' : ' ▲';
      arrow.style.cssText = 'font-size:0.65em;opacity:0.8;';
      th.appendChild(arrow);
    }
  });
}

function inAppBsPeriodToggle(key) {
  if(!key) {
    _iabsSelected = [];
  } else {
    const idx = _iabsSelected.indexOf(key);
    if(idx >= 0) _iabsSelected.splice(idx, 1);
    else _iabsSelected.push(key);
  }
  const allActive = _iabsSelected.length === 0;
  const allBtn = document.getElementById('iabsp-all');
  if(allBtn) {
    allBtn.style.background  = allActive ? 'var(--accent)' : 'var(--surface2)';
    allBtn.style.color       = allActive ? '#000' : 'var(--text2)';
    allBtn.style.borderColor = allActive ? 'var(--accent)' : 'var(--border)';
  }
  _iabsPeriods.forEach(({key:k}) => {
    const b = document.getElementById('iabsp-'+k);
    if(!b) return;
    const on = _iabsSelected.includes(k);
    b.style.background  = on ? 'var(--accent)' : 'var(--surface2)';
    b.style.color       = on ? '#000' : 'var(--text2)';
    b.style.borderColor = on ? 'var(--accent)' : 'var(--border)';
  });
  updateInAppBoxScore();
}

// Multi-select period state for shot map
let _smpSelected = []; // empty = all periods

// Event delegation for period buttons (avoids CSP issues with onclick=)
document.addEventListener('click', function(e) {
  // Sort intestazioni Box Score interno
  const th = e.target.closest('#inapp-bs-head th[data-iabscol]');
  if(th) {
    const col = parseInt(th.dataset.iabscol);
    if(_iabsSortCol === col) {
      _iabsSortDir *= -1;
    } else {
      _iabsSortCol = col;
      _iabsSortDir = -1;
    }
    updateInAppBoxScore();
    return;
  }
  const btn = e.target.closest('button');
  if(!btn) return;
  if(btn.dataset.smp !== undefined) {
    shotMapPeriodToggle(btn.dataset.smp === 'all' ? null : btn.dataset.smp);
  } else if(btn.dataset.pd !== undefined) {
    const mid = btn.dataset.matchid, pid = btn.dataset.playerid;
    pdPeriodToggle(btn.dataset.pd === 'all' ? null : btn.dataset.pd, mid, pid);
  } else if(btn.dataset.ep !== undefined) {
    expPeriodToggle(btn.dataset.ep === 'all' ? null : btn.dataset.ep);
  } else if(btn.dataset.iabsp !== undefined) {
    inAppBsPeriodToggle(btn.dataset.iabsp === 'all' ? null : btn.dataset.iabsp);
  } else if(btn.id === 'lu-report-toggle') {
    const tbody = document.getElementById('lu-report-tbody');
    if (!tbody) return;
    const hidden = tbody.querySelectorAll('.lu-hidden-row');
    const isCollapsed = hidden.length > 0 && hidden[0].style.display === 'none';
    hidden.forEach(r => { r.style.display = isCollapsed ? '' : 'none'; });
    btn.textContent = isCollapsed ? 'Mostra meno' : ('Mostra tutti (' + tbody.querySelectorAll('tr').length + ')');
  } else if(btn.id === 'lu-report-modal-close') {
    const ov = document.getElementById('lu-report-modal-overlay');
    if (ov) { ov.style.display = 'none'; document.body.style.overflow = ''; }
  }  else if(btn.id === 'roster-csv-btn') {
  document.getElementById('roster-csv-input').click();
  }
});

// Lineup modal — click su riga della tabella nel report normale
document.addEventListener('click', function(e) {
  const row = e.target.closest('#lu-report-tbody tr[data-luplayers]');
  if (!row) return;
  const players = JSON.parse(row.dataset.luplayers);
  const container = document.getElementById('lu-report-modal-players');
  if (!container) return;
  container.innerHTML = players.map(p => `
    <div style="display:flex;flex-direction:column;align-items:center;gap:6px;min-width:72px">
      <div style="width:44px;height:44px;border-radius:50%;background:var(--accent);display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:900;color:#000">${esc(p.num)}</div>
      <div style="font-size:12px;color:var(--text1);text-align:center;max-width:80px;line-height:1.2">${esc(p.name)}</div>
    </div>
  `).join('');
  const overlay = document.getElementById('lu-report-modal-overlay');
  if (overlay) { overlay.style.display = 'flex'; document.body.style.overflow = 'hidden'; }
});

// Chiudi lineup modal toccando lo sfondo
document.addEventListener('click', function(e) {
  const overlay = document.getElementById('lu-report-modal-overlay');
  if (overlay && e.target === overlay) {
    overlay.style.display = 'none';
    document.body.style.overflow = '';
  }
});

function shotMapPeriodToggle(key) {
  if(!key) {
    _smpSelected = [];
  } else {
    const idx = _smpSelected.indexOf(key);
    if(idx >= 0) _smpSelected.splice(idx, 1);
    else _smpSelected.push(key);
  }
  _shotMapPeriodUpdateBtns();
  refreshShotMap();
}

function _shotMapPeriodUpdateBtns() {
  const allActive = _smpSelected.length === 0;
  const allBtn = document.getElementById('smp-btn-all');
  if(allBtn) {
    allBtn.style.background = allActive ? 'var(--accent)' : 'var(--surface2)';
    allBtn.style.color      = allActive ? '#000' : 'var(--text2)';
    allBtn.style.borderColor= allActive ? 'var(--accent)' : 'var(--border)';
  }
  ['q1','q2','q3','q4','ot1','ot2','ot3'].forEach(k => {
    const btn = document.getElementById('smp-btn-'+k);
    if(!btn) return;
    const on = _smpSelected.includes(k);
    btn.style.background = on ? 'var(--accent)' : 'var(--surface2)';
    btn.style.color      = on ? '#000' : 'var(--text2)';
    btn.style.borderColor= on ? 'var(--accent)' : 'var(--border)';
  });
}

function refreshShotMap() {
  const id = document.getElementById('report-match-select').value;
  const m  = state.matches.find(x=>x.id===id);
  if(!m) return;
  const pid = document.getElementById('shot-map-player').value;
  const filterId = pid ? pid : null;
  const filterPeriods = _smpSelected.length > 0 ? _smpSelected : null;
  // Preserve active tab before re-rendering
  const bubblesVisible = document.getElementById('shotmap-bubble');
  const activeTab = (bubblesVisible && bubblesVisible.style.display !== 'none') ? 'bubble' : 'dots';
  document.getElementById('shot-map-container').innerHTML = renderShotMap(m, filterId, filterPeriods);
  // Restore tab
  shotMapTab(activeTab, '');
}
function renderShotMap(m, filterPlayerId, filterPeriod, prefix) {
  const px = prefix || '';
  // filterPeriod can be a string, an array of strings, or null (= all)
  const _fp = Array.isArray(filterPeriod) ? filterPeriod : (filterPeriod ? [filterPeriod] : null);
  let shots = m.players.flatMap(p => {
    if(filterPlayerId && p.id !== filterPlayerId) return [];
    if(_fp && _fp.length > 0) {
      return _fp.flatMap(period => {
        const s = m.stats[p.id]?.[period];
        return s ? (s.shots||[]) : [];
      });
    }
    return Object.values(m.stats[p.id]||{}).flatMap(s=>s.shots||[]);
  });
  if(!shots.length) return '<div style="padding:20px;text-align:center;color:var(--text3);font-size:13px">'+t('misc.no_shots')+'</div>';

   // ── Zone geometry: center + half-size (for max bubble radius) ──
  const zoneDef = {
    'Top Ang.Sx':  {x:170,y:170,rx:50,ry:60},
    'Top Sx':      {x:280,y:120,rx:50,ry:60},
    'Top Cx-Sx':   {x:400,y:100,rx:50,ry:60},
    'Top Cx-Dx':   {x:520,y:100,rx:50,ry:60},
    'Top Dx':      {x:640,y:120,rx:50,ry:60},
    'Top Ang.Dx':  {x:750,y:170,rx:50,ry:60},
  	'Angolo Sx Mid':{x:50,y:360,rx:50,ry:60},
	  'Angolo Sx Basso':{x:50,y:480,rx:50,ry:60},
    'Ala Sx':      {x:90,y:250,rx:50,ry:60},
    'Alto Sx':     {x:280,y:240,rx:50,ry:60},
    'Alto Cx-Sx':  {x:400,y:240,rx:50,ry:60},
    'Alto Cx-Dx':  {x:520,y:240,rx:50,ry:60},
    'Alto Dx':     {x:640,y:240,rx:50,ry:60},
    'Ala Dx':      {x:830,y:250,rx:50,ry:60},
	  'Angolo Dx Mid':{x:870,y:360,rx:50,ry:60},
	  'Angolo Dx Basso':{x:870,y:480,rx:50,ry:60},
    'Mid Est Sx':  {x:160,y:360,rx:50,ry:60},
    'Mid Sx':      {x:280,y:360,rx:50,ry:60},
    'Mid Cx-Sx':   {x:400,y:360,rx:50,ry:60},
    'Mid Cx-Dx':   {x:520,y:360,rx:50,ry:60},
    'Mid Dx':      {x:640,y:360,rx:50,ry:60},
    'Mid Est Dx':  {x:760,y:360,rx:50,ry:60},
    'Base Est Sx': {x:160,y:480,rx:50,ry:60},
    'Baseline Sx': {x:280,y:480,rx:50,ry:60},
    'Paint Basso Sx':{x:400,y:480,rx:50,ry:60},
    'Canestro':    {x:520,y:480,rx:50,ry:60},
    'Paint Basso Dx':{x:640,y:480,rx:50,ry:60},
    'Baseline Dx': {x:760,y:480,rx:50,ry:60},
  };

  // ── Build per-zone stats ──
  const zoneStats = {};
  shots.forEach(s => {
    if(!zoneStats[s.zone]) zoneStats[s.zone] = {made:0, total:0, pts:s.pts};
    zoneStats[s.zone].total++;
    if(s.made) zoneStats[s.zone].made++;
  });

  // ── Colour function: 0%=red, 50%=yellow-transparent, 100%=green ──
  function bubbleColor(pct) {
    // pct 0..1
    // 0.0 → rgb(231,76,60)   opacity 0.92
    // 0.5 → rgb(200,180,0)   opacity 0.35
    // 1.0 → rgb(46,204,113)  opacity 0.92
    let r,g,b,a;
    if(pct <= 0.5) {
      const t = pct * 2; // 0..1
      r = Math.round(231 + t*(200-231));
      g = Math.round(76  + t*(180-76));
      b = Math.round(60  + t*(0-60));
      a = 0.92 - t * 0.57; // 0.92 → 0.35
    } else {
      const t = (pct - 0.5) * 2; // 0..1
      r = Math.round(200 + t*(46-200));
      g = Math.round(180 + t*(204-180));
      b = Math.round(0   + t*(113-0));
      a = 0.35 + t * 0.57; // 0.35 → 0.92
    }
    return {r,g,b,a};
  }

  const maxTotal = Math.max(...Object.values(zoneStats).map(z=>z.total), 1);

  // ── Build bubble SVG elements (3D style) ──
  let bubbleDefs = '';
  const bubbles = Object.entries(zoneStats).map(([zone, zs]) => {
    const def = zoneDef[zone];
    if(!def) return '';
    const pct    = zs.total > 0 ? zs.made / zs.total : 0;
    const pctInt = Math.round(pct * 100);
    const {r:cr,g:cg,b:cb} = bubbleColor(pct);
    const cx = def.x, cy = 569 - def.y;
    const maxRscaled = Math.min(def.rx, def.ry) * 0.85;
    const rScaled = Math.max(30, Math.round(maxRscaled * (zs.total / maxTotal)));
    const fs  = Math.max(18, Math.min(28, Math.round(rScaled * 0.62)));
    const fs2 = Math.max(14, Math.min(22, Math.round(rScaled * 0.48)));

    // Unique gradient IDs per bubble
    const gid  = 'bg_' + zone.replace(/[^a-z0-9]/gi,'_');
    const sid  = 'bs_' + zone.replace(/[^a-z0-9]/gi,'_');
    const hid  = 'bh_' + zone.replace(/[^a-z0-9]/gi,'_');

    // Base color variants
    const base   = `rgb(${cr},${cg},${cb})`;
    const dark   = `rgb(${Math.round(cr*0.45)},${Math.round(cg*0.45)},${Math.round(cb*0.45)})`;
    const mid    = `rgb(${Math.round(cr*0.75)},${Math.round(cg*0.75)},${Math.round(cb*0.75)})`;
    const bright = `rgb(${Math.min(255,Math.round(cr*1.25))},${Math.min(255,Math.round(cg*1.25))},${Math.min(255,Math.round(cb*1.25))})`;

    // Drop shadow filter
    bubbleDefs += `
      <radialGradient id="${gid}" cx="42%" cy="35%" r="65%" fx="38%" fy="30%">
        <stop offset="0%"   stop-color="${bright}" stop-opacity="1"/>
        <stop offset="45%"  stop-color="${base}"   stop-opacity="1"/>
        <stop offset="100%" stop-color="${dark}"   stop-opacity="1"/>
      </radialGradient>
      <radialGradient id="${sid}" cx="50%" cy="50%" r="50%">
        <stop offset="60%"  stop-color="black" stop-opacity="0"/>
        <stop offset="100%" stop-color="black" stop-opacity="0.28"/>
      </radialGradient>
      <radialGradient id="${hid}" cx="50%" cy="25%" r="55%" fx="50%" fy="10%">
        <stop offset="0%"   stop-color="white" stop-opacity="0.72"/>
        <stop offset="100%" stop-color="white" stop-opacity="0"/>
      </radialGradient>`;

    // Shadow ellipse beneath
    const shadowY = cy + rScaled * 0.82;
    const shadowRx = rScaled * 0.72;
    const shadowRy = rScaled * 0.18;

    return `<g>
      <ellipse cx="${cx}" cy="${shadowY}" rx="${shadowRx}" ry="${shadowRy}"
        fill="rgba(0,0,0,0.22)" filter="url(#bblur)"/>
      <circle cx="${cx}" cy="${cy}" r="${rScaled}" fill="url(#${gid})"/>
      <circle cx="${cx}" cy="${cy}" r="${rScaled}" fill="url(#${sid})"/>
      <circle cx="${cx}" cy="${cy}" r="${rScaled}"
        fill="none" stroke="${bright}" stroke-width="1.5" stroke-opacity="0.6"/>
      <circle cx="${cx}" cy="${cy}" r="${rScaled}" fill="url(#${hid})"/>
      <text x="${cx}" y="${cy}" dy=".35em" text-anchor="middle"
        font-size="${fs}" font-weight="900" font-family="Arial Black,Arial,sans-serif"
        fill="rgba(0,0,0,0.45)" stroke="rgba(0,0,0,0.3)" stroke-width="4"
        stroke-linejoin="round">${pctInt}%</text>
      <text x="${cx}" y="${cy}" dy=".35em" text-anchor="middle"
        font-size="${fs}" font-weight="900" font-family="Arial Black,Arial,sans-serif"
        fill="white">${pctInt}%</text>
      <text x="${cx}" y="${cy+rScaled+18}" text-anchor="middle"
        font-size="${fs2}" font-weight="800" font-family="Arial,sans-serif"
        fill="rgba(0,0,0,0.5)" stroke="rgba(0,0,0,0.3)" stroke-width="4"
        stroke-linejoin="round">${zs.made}/${zs.total}</text>
      <text x="${cx}" y="${cy+rScaled+18}" text-anchor="middle"
        font-size="${fs2}" font-weight="800" font-family="Arial,sans-serif"
        fill="white">${zs.made}/${zs.total}</text>
    </g>`;
  }).join('');

  // ── Build exact-position shot dots ──
  const dots = shots.map(s => {
    const def = zoneDef[s.zone];
    const cx  = (s.sx != null) ? s.sx : (def?.x || 461);
    const cy  = (s.sy != null) ? s.sy : (def?.y || 300);
    const col   = s.made ? '#2ecc71' : '#e74c3c';
    const glow  = s.made ? 'rgba(46,204,113,0.7)' : 'rgba(231,76,60,0.7)';
    const inner = s.made ? '#fff' : '#fff';
    // Outer glow circle + main dot + inner symbol
    return `<g>
      <circle cx="${cx}" cy="${cy}" r="11" fill="${col}" fill-opacity="0.15"/>
      <circle cx="${cx}" cy="${cy}" r="8" fill="${col}" stroke="white" stroke-width="1.5" filter="url(#glow-${s.made?'g':'r'})"/>
    </g>`;
  }).join('');

  const courtImg = document.querySelector('#court-svg image')?.getAttribute('href') || '';
  const totalMade  = shots.filter(s=>s.made).length;
  const totalShots = shots.length;
  const totalPct   = totalShots ? Math.round(totalMade/totalShots*100) : 0;

  return `
    <!-- ── TAB switcher ── -->
   <!--   <div style="display:flex;margin:0 16px 6px;align-items:center;gap:8px">-->
   <!--     <span style="font-size:10px;color:var(--text3)">🔍 ${t('report.shotmap.zoom_hint')}</span>-->
   <!--   </div> -->
    <div style="display:flex;margin:0 16px 10px;background:var(--surface2);border-radius:10px;padding:3px;gap:3px">
		<button id="${px}tab-dots" data-action="shotMapTab" data-tab="dots" data-prefix="${px}"
			style="flex:1;padding:7px 0;border:none;border-radius:8px;font-size:12px;font-weight:600;cursor:pointer;background:var(--accent);color:#000">
			${t('report.tab.precise_shots')}
		</button>
		<button id="${px}tab-bubble" data-action="shotMapTab" data-tab="bubble" data-prefix="${px}"
			style="flex:1;padding:7px 0;border:none;border-radius:8px;font-size:12px;font-weight:600;cursor:pointer;background:transparent;color:var(--text2)">
			${t('report.tab.zone_bubbles')}
		</button>
    </div>

<!-- ── DOTS view ── -->
<div id="${px}shotmap-dots" style="display:block">
  <div data-dblclick="openZoomMap" data-container="${px}shotmap-dots" data-title="${t('report.shotmap.zoom_hint')}" style="margin:0 16px 8px;border-radius:12px;overflow:hidden;border:1px solid var(--border);cursor:zoom-in">
    <svg viewBox="0 0 923 569" style="width:100%;display:block" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="glow-g"><feGaussianBlur stdDeviation="3" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <filter id="glow-r"><feGaussianBlur stdDeviation="3" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      <g transform="scale(1,-1) translate(0,-569)">
        <image href="${courtImg}" x="0" y="0" width="923" height="569" preserveAspectRatio="xMidYMid meet"/>
        <rect x="0" y="0" width="923" height="569" fill="rgba(0,0,0,0.22)"/>
      </g>
      ${dots}
    </svg>
    <div style="display:flex;gap:16px;padding:7px 12px;background:var(--surface2);justify-content:center;flex-wrap:wrap;align-items:center">
      <div style="display:flex;align-items:center;gap:5px;font-size:11px;color:var(--green)"><div style="width:10px;height:10px;background:var(--green);border-radius:50%"></div>${t('court.legend_made')}</div>
      <div style="display:flex;align-items:center;gap:5px;font-size:11px;color:var(--red)"><div style="width:10px;height:10px;background:var(--red);border-radius:50%"></div>${t('court.legend_missed')}</div>
      <div style="font-size:11px;color:var(--text2);font-weight:600">${totalMade}/${totalShots} — ${totalPct}%</div>
    </div>
    <div style="padding:4px 12px 8px;background:var(--surface2);text-align:center">
      <span style="font-size:10px;color:var(--text3)">🔍 ${t('report.shotmap.zoom_hint')}</span>
    </div>
  </div>
</div>

<!-- ── BUBBLE view ── -->
<div id="${px}shotmap-bubble" style="display:none">
  <div data-dblclick="openZoomMap" data-container="${px}shotmap-bubble" data-title="${t('report.tab.zone_bubbles')}" style="margin:0 16px 8px;border-radius:12px;overflow:hidden;border:1px solid var(--border);cursor:zoom-in">
    <svg viewBox="0 0 923 569" style="width:100%;display:block" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="bblur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4"/>
        </filter>
        ${bubbleDefs}
      </defs>
      <g transform="scale(1,-1) translate(0,-569)">
        <image href="${courtImg}" x="0" y="0" width="923" height="569" preserveAspectRatio="xMidYMid meet"/>
        <rect x="0" y="0" width="923" height="569" fill="rgba(0,0,0,0.3)"/>
      </g>
      ${bubbles}
    </svg>
    <div style="display:flex;gap:10px;padding:7px 12px;background:var(--surface2);justify-content:center;flex-wrap:wrap;align-items:center">
      <div style="font-size:10px;color:var(--text2)">${t('shotmap.bubble.legend')}</div>
    </div>
    <div style="display:flex;gap:0;padding:4px 16px 4px;background:var(--surface2);justify-content:center;align-items:center">
      <div style="width:80px;height:10px;border-radius:5px;background:linear-gradient(to right,rgba(231,76,60,0.92),rgba(200,180,0,0.35),rgba(46,204,113,0.92))"></div>
      <div style="font-size:9px;color:var(--text3);margin-left:6px">${t('shotmap.bubble.gradient')}</div>
    </div>
    <div style="padding:4px 12px 8px;background:var(--surface2);text-align:center">
      <span style="font-size:10px;color:var(--text3)">🔍 ${t('report.shotmap.zoom_hint')}</span>
    </div>
  </div>
</div>
</div>`;
}

function shotMapTab(tab, prefix) {
  const px = prefix || '';
  document.getElementById(px+'shotmap-dots').style.display   = tab==='dots'   ? 'block' : 'none';
  document.getElementById(px+'shotmap-bubble').style.display = tab==='bubble' ? 'block' : 'none';
  document.getElementById(px+'tab-dots').style.background    = tab==='dots'   ? 'var(--accent)' : 'transparent';
  document.getElementById(px+'tab-dots').style.color         = tab==='dots'   ? '#000' : 'var(--text2)';
  document.getElementById(px+'tab-bubble').style.background  = tab==='bubble' ? 'var(--accent)' : 'transparent';
  document.getElementById(px+'tab-bubble').style.color       = tab==='bubble' ? '#000' : 'var(--text2)';
}


function getFoulCount(m, p) {
  let total = 0;
  Object.values(m.stats[p.id]||{}).forEach(s => { total += (s.foul||0); });
  return total;
}

function openTimeoutModal() {
  if(liveMatch===null) return;
  const m = state.matches[liveMatch];
  if(!m.timeouts) m.timeouts = {firstHalf:0, secondHalf:0, log:[]};
  const isOT = m.isOT;
  const isFirst = !isOT && m.quarter <= 2;
  const used   = isOT ? 0 : (isFirst ? (m.timeouts.firstHalf||0) : (m.timeouts.secondHalf||0));
  const limit  = isOT ? 99 : (isFirst ? 2 : 3);
  const remaining = Math.max(0, limit - used);
  let info = '';
  if(isOT) {
    info = t('timeout.overtime_unlimited');
  } else if(isFirst) {
    info = t('timeout.first_half_info', {used, remaining});
  } else {
    info = t('timeout.second_half_info', {used, remaining});
  }
  document.getElementById('timeout-info').innerHTML = info +
    (remaining === 0 && !isOT ? '<br><span style="color:var(--red);font-weight:600">⚠️ '+t('toast.timeout_exhausted')+'</span>' : '');
  openModal('modal-timeout');
}

async function addTimeout() {
  const m = state.matches[liveMatch];
  if(!m.timeouts) m.timeouts = {firstHalf:0, secondHalf:0, log:[]};
  const isOT = m.isOT;
  const isFirst = !isOT && m.quarter <= 2;
  const used  = isFirst ? (m.timeouts.firstHalf||0) : (m.timeouts.secondHalf||0);
  const limit = isOT ? 99 : (isFirst ? 2 : 3);
  if(used >= limit && !isOT) { toast(t('toast.timeout_exhausted')); closeModal('modal-timeout'); return; }
  if(isFirst) m.timeouts.firstHalf  = used + 1;
  else        m.timeouts.secondHalf = used + 1;
  if(!m.timeouts.log) m.timeouts.log = [];
  const tot = (m.timeouts.firstHalf||0) + (m.timeouts.secondHalf||0);
  m.timeouts.log.push({q: periodLabel(m), n: tot});
  addLog(null, '⏸', 'Timeout #'+tot+' ('+periodLabel(m)+')', periodLabel(m), null);
  await save(); closeModal('modal-timeout');
  toast(t('toast.timeout_recorded',{used: isFirst?(m.timeouts.firstHalf):(m.timeouts.secondHalf), limit, half: isFirst?'1°-2°Q':'3°-4°Q'}));
  renderLive();
}


// ═══ TIMER ═══
let timerInterval  = null;
let timerSeconds   = -1;  // -1 = not yet initialized
let timerRunning   = false;

function timerInit(m) {
  // Always stop any running interval first
  clearInterval(timerInterval);
  timerInterval = null;
  timerRunning  = false;
  // Reset to full period duration
  timerSeconds  = pDur(m) * 60;
  timerRender();
  const bar = document.getElementById('timer-bar');
  if(bar) bar.style.display = 'flex';
  // Also ensure the flex display is applied inline (overrides none)
}

function timerToggle() {
  if(timerRunning) timerPause();
  else             timerStart();
}

function timerStart() {
  if(timerRunning) return;
  // Always clear any stale interval before creating a new one
  clearInterval(timerInterval);
  timerInterval = null;
  timerRunning  = true;
  timerInterval = setInterval(() => {
    if(timerSeconds > 0) {
      timerSeconds--;
      timerRender();
    } else {
      timerSeconds = 0;
      clearInterval(timerInterval);
      timerInterval = null;
      timerRunning  = false;
      timerRender();
      toast('⏱ Tempo scaduto!', 3000);
    }
  }, 1000);
  timerRender();
}

function timerPause() {
  clearInterval(timerInterval);
  timerInterval = null;
  timerRunning  = false;
  timerRender();
}

function timerReset() {
  timerPause();
  if(liveMatch !== null) {
    timerSeconds = pDur(state.matches[liveMatch]) * 60;
  }
  timerRender();
}

function timerEdit() {
  // Pre-fill with current time
  const s   = Math.max(0, timerSeconds);
  const min = Math.floor(s / 60);
  const sec = s % 60;
  document.getElementById('timer-edit-min').value = min;
  document.getElementById('timer-edit-sec').value = String(sec).padStart(2,'0');
  openModal('modal-timer-edit');
}

function timerApplyEdit() {
  const min = parseInt(document.getElementById('timer-edit-min').value) || 0;
  const sec = parseInt(document.getElementById('timer-edit-sec').value) || 0;
  timerSeconds = min * 60 + sec;
  timerRender();
  closeModal('modal-timer-edit');
  toast('Timer aggiornato: ' + String(min).padStart(2,'0') + ':' + String(sec).padStart(2,'0'));
}

function timerRender() {
  if(timerSeconds < 0) return; // not initialized yet
  const s   = Math.max(0, timerSeconds);
  const min = Math.floor(s / 60);
  const sec = s % 60;
  const display = document.getElementById('timer-display');
  const btn     = document.getElementById('timer-toggle-btn');
  if(!display || !btn) return;
  display.textContent = String(min).padStart(2,'0') + ':' + String(sec).padStart(2,'0');
  display.className   = 'timer-display ' + (timerRunning ? 'running' : 'paused');
  btn.textContent     = timerRunning ? t('live.timer_pause') : t('live.timer_start');
  btn.className       = 'timer-btn ' + (timerRunning ? 'timer-btn-pause' : 'timer-btn-start');
}

// Returns current timer time as "MM:SS al termine" string for auto-fill in sub modal
function timerCurrentLabel() {
  const s   = Math.max(0, timerSeconds);
  const min = Math.floor(s / 60);
  const sec = s % 60;
  return {min: String(min), sec: String(sec).padStart(2,'0')};
}

// Current elapsed minutes for log timestamp
function timerElapsedMin() {
  if(liveMatch === null) return null;
  const m   = state.matches[liveMatch];
  const dur = pDur(m);
  const remaining = timerSeconds / 60;
  return Math.round((dur - remaining) * 10) / 10;
}


// ═══ OPPONENT ROSTER & FOULS ═══

function openOppRosterModal() {
  if(liveMatch===null) return;
  renderOppRosterList();
  openModal('modal-opp-roster');
}

async function addOppPlayer() {
  const m = state.matches[liveMatch];
  if(!m.oppPlayers) m.oppPlayers = [];
  const num  = document.getElementById('opp-player-num').value.trim();
  const name = (document.getElementById('opp-player-name').value.trim() || '#'+num).slice(0,60);
  const numInt = parseInt(num);
  if(!num){ toast(t('toast.player_insert_num')); return; }
  if(isNaN(numInt)||numInt<0||numInt>999){ toast('Numero non valido (0-999)'); return; }
  if(m.oppPlayers.find(p=>p.num===numInt)){ toast('Numero già presente'); return; }
  m.oppPlayers.push({ id: crypto.randomUUID(), num: numInt, name });
  if(!m.oppFouls) m.oppFouls = {};
  m.oppFouls[m.oppPlayers[m.oppPlayers.length-1].id] = {q1:0,q2:0,q3:0,q4:0,ot:0};
  document.getElementById('opp-player-num').value  = '';
  document.getElementById('opp-player-name').value = '';
  await save();
  renderOppRosterList();
  renderFoulStrip();
}

async function deleteOppPlayer(id) {
  const m = state.matches[liveMatch];
  m.oppPlayers = (m.oppPlayers||[]).filter(p=>p.id!==id);
  delete m.oppFouls[id];
  await save(); renderOppRosterList(); renderFoulStrip();
}

function renderOppRosterList() {
  const m  = state.matches[liveMatch];
  const el = document.getElementById('opp-roster-list');
  const players = m.oppPlayers||[];
  if(!players.length){ el.innerHTML=`<div style="color:var(--text3);font-size:13px;text-align:center;padding:12px">${t('live.opp_roster_empty')}</div>`; return; }
  el.innerHTML = players.sort((a,b)=>a.num-b.num).map(p=>{
    const fouls = Object.values(m.oppFouls[p.id]||{}).reduce((a,b)=>a+b,0);
    const col   = fouls>=5?'var(--red)':fouls>=4?'var(--accent)':'var(--text)';
    return `<div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid rgba(255,255,255,.05)">
      <span style="font-family:var(--font-display);font-size:22px;color:var(--accent);min-width:34px">#${esc(p.num)}</span>
      <span style="flex:1;font-size:14px">${esc(p.name)}</span>
      <span style="font-family:var(--font-mono);font-weight:700;color:${col};font-size:16px">${fouls}F${fouls>=5?' ⚠️':''}</span>
      <button data-action="deleteOppPlayer" data-id="${esc(p.id)}" style="background:none;border:none;color:var(--text3);font-size:16px;cursor:pointer">✕</button>
    </div>`;
  }).join('');
}

function openOppFoulModal() {
  if(liveMatch===null) return;
  const m = state.matches[liveMatch];
  if(!m.oppPlayers||!m.oppPlayers.length){
    toast(t('toast.add_opp_players_first'));
    openOppRosterModal(); return;
  }
  renderOppFoulList();
  openModal('modal-opp-foul');
}

function renderOppFoulList() {
  const m  = state.matches[liveMatch];
  const el = document.getElementById('opp-foul-list');
  if(!m.oppFouls) m.oppFouls = {};
  const players = (m.oppPlayers||[]).sort((a,b)=>a.num-b.num);
  if(!players.length){
    el.innerHTML=`<div style="color:var(--text3);font-size:13px;text-align:center;padding:12px">${t('live.opp_foul_empty')}</div>`;
    return;
  }
  el.innerHTML = players.map((p,idx)=>{
    // Ensure foul entry exists
    if(!m.oppFouls[p.id]) m.oppFouls[p.id]={q1:0,q2:0,q3:0,q4:0,ot:0};
    const foulData = m.oppFouls[p.id];
    const total    = Object.values(foulData).reduce((a,b)=>a+b,0);
    const col      = total>=5?'var(--red)':total>=4?'var(--accent)':'var(--text)';
    // Use data-idx attribute instead of large timestamp in onclick
    return '<div style="display:flex;align-items:center;gap:10px;padding:10px 0;border-bottom:1px solid rgba(255,255,255,.05)">'
      +'<span style="font-family:var(--font-display);font-size:22px;color:var(--accent);min-width:34px">#'+esc(p.num)+'</span>'
      +'<span style="flex:1;font-size:14px">'+esc(p.name)+'</span>'
      +'<span style="font-family:var(--font-mono);font-weight:700;color:'+col+';min-width:28px;text-align:right">'+total+'F</span>'
      +'<button data-action="recordOppFoulByIdx" data-oppidx="'+parseInt(idx)+'"'
      +' style="background:rgba(231,76,60,.15);border:1px solid rgba(231,76,60,.35);color:#e74c3c;border-radius:8px;padding:7px 14px;font-size:13px;font-weight:700;cursor:pointer">'
      +'✋ +1</button>'
      +'</div>';
  }).join('');
}

function recordOppFoulByIdx(btn) {
  const m   = state.matches[liveMatch];
  const players = (m.oppPlayers||[]).sort((a,b)=>a.num-b.num);
  const idx = parseInt(btn.getAttribute('data-oppidx'));
  const p   = players[idx];
  if(!p){ toast('Errore: giocatore non trovato'); return; }
  recordOppFoul(p.id);
}

async function recordOppFoul(pid) {
  const m   = state.matches[liveMatch];
  const key = m.isOT ? 'ot' : 'q'+m.quarter;
  if(!m.oppFouls[pid]) m.oppFouls[pid] = {q1:0,q2:0,q3:0,q4:0,ot:0};
  m.oppFouls[pid][key] = (m.oppFouls[pid][key]||0)+1;
  const p     = m.oppPlayers.find(x=>x.id===pid);
  const total = Object.values(m.oppFouls[pid]).reduce((a,b)=>a+b,0);
  const warn  = total>=5?' — '+t('foul.warn5'):total>=4?' — '+t('foul.warn4'):'';
  // Store delta so log deletion can roll back
  addLog(null,'🟥','Fallo avv. #'+p.num+' '+p.name+' ('+total+'F)'+warn, periodLabel(m),
    {type:'opp_foul', oppPlayerId: pid, qkey: key});
  await save();
  renderOppFoulList();
  renderFoulStrip();
  toast('Fallo #'+p.num+': '+total+'F'+warn, 2500);
}

function renderFoulStrip() {
  if(liveMatch===null) return;
  const m  = state.matches[liveMatch];
  const qk = m.isOT?'ot':'q'+m.quarter;

  // OUR fouls this quarter + total match
  let ourQ = 0, ourTot = 0;
  const allQks = ['q1','q2','q3','q4','ot'];
  m.players.forEach(p=>{
    const s = m.stats[p.id]?.[qk];
    if(s) ourQ += (s.foul||0);
    allQks.forEach(k=>{ const sq = m.stats[p.id]?.[k]; if(sq) ourTot += (sq.foul||0); });
  });

  // OPP fouls this quarter + total match
  let oppQ = 0, oppTot = 0;
  Object.entries(m.oppFouls||{}).forEach(([key, fd])=>{
    if(key === '__direct__') {
      // Falli registrati senza roster: contati solo nel totale
      oppTot += (typeof fd === 'number' ? fd : 0);
      oppQ   += (typeof fd === 'number' ? fd : 0); // non abbiamo info per quarto, li mostriamo tutti
    } else {
      oppQ += (fd[qk]||0);
      allQks.forEach(k=>{ oppTot += (fd[k]||0); });
    }
  });

  // Render dots for our fouls
  const ourEl = document.getElementById('our-fouls-strip');
  const oppEl = document.getElementById('opp-fouls-strip');
  if(!ourEl||!oppEl) return;

  function foulDots(count, warn) {
    return Array.from({length:Math.min(count,8)}).map((_,i)=>{
      const isWarn = warn && i>=warn-1;
      return `<span style="display:inline-flex;align-items:center;justify-content:center;width:18px;height:18px;border-radius:50%;background:${isWarn?'var(--red)':'var(--surface3)'};border:1px solid ${isWarn?'var(--red)':'var(--border)'};font-size:9px;font-weight:700;color:${isWarn?'#fff':'var(--text2)'}">${i+1}</span>`;
    }).join('') + (count>8?`<span style="font-size:10px;color:var(--text2)"> +${count-8}</span>`:'');
  }

  const totStyle = `font-family:var(--font-mono);font-size:10px;color:var(--text3);margin-left:5px;white-space:nowrap`;
  ourEl.innerHTML = `<span style="font-family:var(--font-mono);font-size:14px;font-weight:700;color:${ourQ>=5?'var(--red)':ourQ>=4?'var(--accent)':'var(--text)'};margin-right:4px">${ourQ}</span>` + foulDots(ourQ, 5) + `<span style="${totStyle}">(${ourTot} tot)</span>`;
  oppEl.innerHTML = `<span style="font-family:var(--font-mono);font-size:14px;font-weight:700;color:${oppQ>=5?'var(--red)':oppQ>=4?'var(--accent)':'var(--text)'};margin-right:4px">${oppQ}</span>` + foulDots(oppQ, 5) + `<span style="${totStyle}">(${oppTot} tot)</span>`;
}


// ═══ ZOOM MAP ═══
function openZoomMap(svgContainerId, title) {
  const container = document.getElementById(svgContainerId);
  if(!container) return;
  const svgEl = container.querySelector('svg');
  if(!svgEl) return;
  const clone = svgEl.cloneNode(true);

  clone.style.cssText = `width:100%;height:100%;display:block;object-fit:contain`;

  const overlay = document.createElement('div');
  overlay.style.cssText = `position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.97);z-index:99999;display:flex;align-items:center;justify-content:center;overflow:hidden`;

  const closeBtn = document.createElement('div');
  closeBtn.innerHTML = '✕';
  closeBtn.style.cssText = `position:fixed;top:12px;right:12px;color:white;font-size:22px;font-weight:bold;cursor:pointer;background:rgba(255,255,255,0.2);border-radius:50%;width:38px;height:38px;display:flex;align-items:center;justify-content:center;z-index:100000`;

  const close = () => overlay.remove();

  overlay.addEventListener('click', close);
  closeBtn.addEventListener('click', (e) => { e.stopPropagation(); close(); });
  window.addEventListener('keydown', function onKey(e) {
    if(e.key === 'Escape') { close(); window.removeEventListener('keydown', onKey); }
  });

  overlay.appendChild(clone);
  overlay.appendChild(closeBtn);
  document.body.appendChild(overlay);

  // ── Pinch-to-zoom ──────────────────────────────────────────────
  let _scale = 1, _lastDist = 0, _tx = 0, _ty = 0;
  let _startTx = 0, _startTy = 0, _startMidX = 0, _startMidY = 0;

  function _getDist(t) {
    return Math.hypot(t[0].clientX - t[1].clientX, t[0].clientY - t[1].clientY);
  }
  function _getMid(t) {
    return { x: (t[0].clientX + t[1].clientX) / 2, y: (t[0].clientY + t[1].clientY) / 2 };
  }
  function _applyTransform() {
    clone.style.transform = `translate(${_tx}px, ${_ty}px) scale(${_scale})`;
    clone.style.transformOrigin = '0 0';
  }

  overlay.addEventListener('touchstart', (e) => {
    if (e.touches.length === 2) {
      e.preventDefault();
      _lastDist = _getDist(e.touches);
      const mid = _getMid(e.touches);
      _startMidX = mid.x; _startMidY = mid.y;
      _startTx = _tx;     _startTy = _ty;
    }
  }, { passive: false });

  overlay.addEventListener('touchmove', (e) => {
    if (e.touches.length === 2) {
      e.preventDefault();
      const dist  = _getDist(e.touches);
      const ratio = dist / _lastDist;
      const newScale = Math.min(Math.max(_scale * ratio, 1), 5);
      const mid = _getMid(e.touches);
      _tx = mid.x - ((_startMidX - _startTx) * (newScale / _scale));
      _ty = mid.y - ((_startMidY - _startTy) * (newScale / _scale));
      _scale = newScale; _lastDist = dist;
      _startMidX = mid.x; _startMidY = mid.y;
      _startTx = _tx;     _startTy = _ty;
      _startTx = _tx;     _startTy = _ty;
      _applyTransform();
    }
  }, { passive: false });

  // Doppio tap per resettare zoom
  let _lastTap = 0;
  overlay.addEventListener('touchend', (e) => {
    if (e.touches.length === 0) {
      const now = Date.now();
      if (now - _lastTap < 300) { _scale = 1; _tx = 0; _ty = 0; _applyTransform(); }
      _lastTap = now;
    }
  });
  // ── Fine pinch-to-zoom ─────────────────────────────────────────
}

 // ── LISTENER GESTIONE CARICAMENTO CSV ────────────────────────────────
document.getElementById('roster-csv-input').addEventListener('change', e => {
  importRosterCSV(e.target.files[0]);
  e.target.value = ''; // reset per permettere di ricaricare lo stesso file
});


// ═══ PLAYER DETAIL MODAL ═══

function openPlayerModal(matchId, playerId) {
  const m = state.matches.find(x => x.id === matchId);
  if(!m) return;
  const p = m.players.find(x => x.id === playerId);
  if(!p) return;

  document.getElementById('pd-num').textContent  = '#' + p.num;
  document.getElementById('pd-name').textContent = p.name;
  document.getElementById('pd-role').textContent = p.role || '';

  const all    = totals(m, p);
  const pts    = all.fg2m*2 + all.fg3m*3 + all.ftm;
  const min    = minPlayed(m, p);
  const fg2pct = all.fg2a>0 ? Math.round(all.fg2m/all.fg2a*100) : 0;
  const fg3pct = all.fg3a>0 ? Math.round(all.fg3m/all.fg3a*100) : 0;
  const ftpct  = all.fta>0  ? Math.round(all.ftm/all.fta*100)   : 0;
  const val    = calcVal(all);
  const pmMap  = calcPlusMinusMap(m);
  const pm     = pmMap ? (pmMap[p.id] || 0) : null;

  // Periods
  const periods = [];
  for(let q=1;q<=4;q++) periods.push({key:'q'+q, label:'Q'+q});
  if(m.isOT) for(let o=1;o<=m.otNum;o++) periods.push({key:'ot'+o, label:'OT'+o});

  // Per-period rows
  const pRows = periods.map(({key,label}) => {
    const s = m.stats[p.id]?.[key];
    if(!s) return '';
    const qpts = s.fg2m*2 + s.fg3m*3 + s.ftm;
    if(qpts===0 && (s.minPlayed||0)===0 && s.reb_off+s.reb_def+s.assist+s.steal+s.foul+s.foul_drawn+s.block+s.block_against===0) return '';
    const p2 = s.fg2a>0?Math.round(s.fg2m/s.fg2a*100)+'%':'—';
    const p3 = s.fg3a>0?Math.round(s.fg3m/s.fg3a*100)+'%':'—';
    const pt = s.fta>0 ?Math.round(s.ftm/s.fta*100)+'%':'—';
    return '<tr>'
      +'<td style="color:var(--accent);font-weight:700">'+label+'</td>'
      +'<td>'+Math.round(s.minPlayed||0)+"'</td>"
      +'<td><strong style="color:var(--accent)">'+qpts+'</strong></td>'
      +'<td>'+s.fg2m+'/'+s.fg2a+'<span class="pct"> '+p2+'</span></td>'
      +'<td>'+s.fg3m+'/'+s.fg3a+'<span class="pct"> '+p3+'</span></td>'
      +'<td>'+s.ftm+'/'+s.fta+'<span class="pct"> '+pt+'</span></td>'
      +'<td>'+s.reb_off+'</td><td>'+s.reb_def+'</td>'
      +'<td>'+s.assist+'</td><td>'+(s.steal||0)+'</td><td>'+(s.turnover||0)+'</td>'
      +'<td style="color:'+(s.foul>=5?'var(--red)':'inherit')+'">'+s.foul+(s.foul>=5?' ⚠️':'')+'</td>'
	  +'<td>'+(s.foul_drawn || 0)+'</td>'  
      +'<td>'+s.block+'</td><td>'+s.block_against+'</td>'
      +'</tr>';
  }).join('');


  // Period filter pills (multi-select)
  const _pdBs = 'padding:5px 12px;border-radius:20px;border:1.5px solid var(--border);background:var(--surface2);color:var(--text2);font-size:12px;font-weight:600;cursor:pointer';
  const periodOpts = '<button data-pd="all" data-matchid="'+esc(m.id)+'" data-playerid="'+esc(p.id)+'" id="pd-btn-all" style="'+_pdBs+';background:var(--accent);color:#000;border-color:var(--accent)">'+t('filter.all')+'</button>'
    + periods.map(({key,label})=>'<button data-pd="'+key+'" data-matchid="'+esc(m.id)+'" data-playerid="'+esc(p.id)+'" id="pd-btn-'+key+'" style="'+_pdBs+'">'+label+'</button>').join('');
	

  document.getElementById('pd-body').innerHTML = `
    <!-- Pills -->
    <!-- fallo come pill separato <div style="padding:14px 16px 10px;display:flex;gap:8px;flex-wrap:wrap"> -->
     <div style="padding:14px 16px 10px;display:grid;grid-template-columns:repeat(3,1fr);gap:8px">  
      <div class="pd-pill"><div class="pd-pill-val">${pts}</div><div class="pd-pill-lbl">${t('player.pts_label')}</div></div>
      <div class="pd-pill"><div class="pd-pill-val">${min}'</div><div class="pd-pill-lbl">${t('player.min_label')}</div></div>
      <div class="pd-pill"><div class="pd-pill-val">${all.reb_off+all.reb_def}</div><div class="pd-pill-lbl">${t('player.reb_label')}</div></div>
      <div class="pd-pill"><div class="pd-pill-val">${all.assist}</div><div class="pd-pill-lbl">${t('player.ast_label')}</div></div>
      <div class="pd-pill"><div class="pd-pill-val">${all.steal}</div><div class="pd-pill-lbl">${t('player.stl_label')}</div></div>
      <div class="pd-pill" style="${all.foul>=5?'border-color:var(--red)':''}">
        <div class="pd-pill-val" style="color:${all.foul>=5?'var(--red)':'var(--accent)'}">${all.foul}</div>
        <div class="pd-pill-lbl">${t('player.fls_label')}</div>
      </div>
    </div>

 <!-- Shooting breakdown -->
    <div style="margin:0 16px 14px;background:var(--surface);border:1px solid var(--border);border-radius:10px;padding:12px">
      <div style="font-size:9px;color:var(--text3);text-transform:uppercase;letter-spacing:1px;margin-bottom:10px">${t('player.shots_label')}</div>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;text-align:center">
        <div>
          <div style="font-size:9px;color:var(--text3);text-transform:uppercase;margin-bottom:4px">${t('player.2pt_label')}</div>
            <div style="font-family:var(--font-display);font-size:22px;color:${all.fg2a===0?'var(--text3)':fg2pct>=50?'var(--green)':fg2pct>=33?'var(--yellow)':'var(--red)'}">${all.fg2m}/${all.fg2a}</div>
            <div style="font-size:14px;font-weight:700;color:${all.fg2a===0?'var(--text3)':fg2pct>=50?'var(--green)':fg2pct>=33?'var(--yellow)':'var(--red)'}">${fg2pct}%</div>
        </div>
        <div>
          <div style="font-size:9px;color:var(--text3);text-transform:uppercase;margin-bottom:4px">${t('player.3pt_label')}</div>
            <div style="font-family:var(--font-display);font-size:22px;color:${all.fg3a===0?'var(--text3)':fg3pct>=50?'var(--green)':fg3pct>=33?'var(--yellow)':'var(--red)'}">${all.fg3m}/${all.fg3a}</div>
            <div style="font-size:14px;font-weight:700;color:${all.fg3a===0?'var(--text3)':fg3pct>=50?'var(--green)':fg3pct>=33?'var(--yellow)':'var(--red)'}">${fg3pct}%</div>
        </div>
        <div>
          <div style="font-size:9px;color:var(--text3);text-transform:uppercase;margin-bottom:4px">${t('player.ft_label')}</div>
            <div style="font-family:var(--font-display);font-size:22px;color:${all.fta===0?'var(--text3)':ftpct>=50?'var(--green)':ftpct>=33?'var(--yellow)':'var(--red)'}">${all.ftm}/${all.fta}</div>
            <div style="font-size:14px;font-weight:700;color:${all.fta===0?'var(--text3)':ftpct>=50?'var(--green)':ftpct>=33?'var(--yellow)':'var(--red)'}">${ftpct}%</div>
        </div>
      </div>
    </div>

    <!-- VAL and +/- cards -->
    <div style="margin:0 16px 14px;display:grid;grid-template-columns:1fr${pm!==null?' 1fr':''};gap:10px">
      <div style="background:var(--surface);border:1px solid var(--border);border-radius:10px;padding:12px;text-align:center">
        <div style="font-size:9px;color:var(--text3);text-transform:uppercase;letter-spacing:1px;margin-bottom:6px">${t('player.val_label')}</div>
        <div style="font-family:var(--font-display);font-size:28px;font-weight:900;color:${val>0?'var(--green)':val<0?'var(--red)':'var(--text2)'};line-height:1">${val>0?'+':''}${val}</div>
      </div>
      ${pm!==null?`<div style="background:var(--surface);border:1px solid var(--border);border-radius:10px;padding:12px;text-align:center">
        <div style="font-size:9px;color:var(--text3);text-transform:uppercase;letter-spacing:1px;margin-bottom:6px">${t('player.pm_label')}</div>
        <div style="font-family:var(--font-display);font-size:28px;font-weight:900;color:${pm>0?'var(--green)':pm<0?'var(--red)':'var(--text2)'};line-height:1">${pm>0?'+':''}${pm}</div>
      </div>`:''}
    </div>

    <!-- Per-period table -->
    ${pRows ? `
    <div class="section-title" style="padding-top:4px">${t('report.by_quarter').toUpperCase()}</div>
    <div class="scroll-x" style="margin:0 16px 14px">
      <table class="stat-table sticky-table">
        <thead><tr>
          <th style="text-align:left;min-width:36px">${t('col.quarter')}</th>
          <th>${t('col.min')}</th><th>${t('col.pts')}</th><th>${t('col.fg2')}</th><th>${t('col.fg3')}</th><th>${t('col.ft')}</th>
          <th>${t('col.reb_off')}</th><th>${t('col.reb_def')}</th><th>${t('col.ast')}</th><th>${t('col.stl')}</th><th>${t('col.tov')}</th><th>${t('col.foul')}</th><th>${t('col.foul_drawn')}</th><th>${t('col.block')}</th><th>${t('col.block_against')}</th>
        </tr></thead>
        <tbody>${pRows}</tbody>
      </table>
    </div>` : ''}

    <!-- Shot map with period filter -->
    <div class="section-title" style="padding-top:4px">${t('report.shot_map').toUpperCase()}</div>
    <div style="padding:0 16px 8px;display:flex;gap:5px;flex-wrap:wrap">
      ${periodOpts}
    </div>
    <div id="pd-map">${settings.zoneSelection ? renderShotMap(m, playerId, null, 'pd-') : '<div style="padding:16px;color:var(--text3);font-size:13px;text-align:center">⚙️ '+t('misc.zone_disabled')+'</div>'}</div>
  `;

  _pdSelected = []; // reset multi-select on new player
  document.getElementById('modal-player').classList.add('open');
  document.body.style.overflow = 'hidden';
}

// Multi-select state for player detail shot map
let _pdSelected = [];

function pdPeriodToggle(key, matchId, playerId) {
  if(!key) {
    _pdSelected = [];
  } else {
    const idx = _pdSelected.indexOf(key);
    if(idx >= 0) _pdSelected.splice(idx, 1);
    else _pdSelected.push(key);
  }
  // Update button styles
  const allBtn = document.getElementById('pd-btn-all');
  const allActive = _pdSelected.length === 0;
  if(allBtn) {
    allBtn.style.background  = allActive ? 'var(--accent)' : 'var(--surface2)';
    allBtn.style.color       = allActive ? '#000' : 'var(--text2)';
    allBtn.style.borderColor = allActive ? 'var(--accent)' : 'var(--border)';
  }
  ['q1','q2','q3','q4','ot1','ot2','ot3'].forEach(k => {
    const btn = document.getElementById('pd-btn-'+k);
    if(!btn) return;
    const on = _pdSelected.includes(k);
    btn.style.background  = on ? 'var(--accent)' : 'var(--surface2)';
    btn.style.color       = on ? '#000' : 'var(--text2)';
    btn.style.borderColor = on ? 'var(--accent)' : 'var(--border)';
  });
  refreshPlayerMap(matchId, playerId);
}

function refreshPlayerMap(matchId, playerId) {
  const m = state.matches.find(x => x.id === matchId);
  if(!m) return;
  const filterPeriods = _pdSelected.length > 0 ? _pdSelected : null;
  // Preserve active tab before re-rendering
  const bubblesVisible = document.getElementById('pd-shotmap-bubble');
  const activeTab = (bubblesVisible && bubblesVisible.style.display !== 'none') ? 'bubble' : 'dots';
  document.getElementById('pd-map').innerHTML = renderShotMap(m, playerId, filterPeriods, 'pd-');
  // Restore tab
  shotMapTab(activeTab, 'pd-');
}

function closePlayerModal() {
  document.getElementById('modal-player').classList.remove('open');
  document.body.style.overflow = '';
}

function matchDeleteBtn(status, idx) {
  if(status === 'live') {
    return '<span style="font-size:11px;color:var(--text3);font-style:italic">'+t('matches.delete_disabled')+'</span>';
  }
  return '<button data-action="confirmDeleteMatch" data-idx="' + idx + '" class="btn btn-danger btn-xs">🗑 '+t('matches.delete_btn')+'</button>';
}


// ═══ EDIT MATCH ═══
let editMatchIndex        = null;
let editSelectedPlayerIdx = null;
let editCurrentQuarter    = 'q1';

function openEditMatch(i) {
  editMatchIndex        = i;
  editSelectedPlayerIdx = null;
  const m = state.matches[i];

  let defaultQ = 'q1';
  if (m.status === 'live') {
    defaultQ = statKey(m) || 'q1';
  } else if (m.log && m.log.length) {
    defaultQ = m.log[0].q || 'q1';
  } else {
    defaultQ = 'q4';
  }
  editCurrentQuarter = defaultQ;

  document.getElementById('edit-match-meta').textContent =
    m.opponent + ' · ' + m.date + ' · ' + (m.ourScore) + ' – ' + (m.oppScore);

  renderEditQuarterSelect();
  renderEditRoster();
  renderEditLog();

  switchEditTab('stats', document.querySelector('#modal-edit-match .live-tab'));
  openModal('modal-edit-match');
}

function switchEditTab(name, el) {
  document.querySelectorAll('#modal-edit-match .live-tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  document.getElementById('edit-panel-stats').style.display = name === 'stats' ? '' : 'none';
  document.getElementById('edit-panel-log').style.display   = name === 'log'   ? '' : 'none';
  if (name === 'log') renderEditLog();
}

function renderEditQuarterSelect() {
  const m = state.matches[editMatchIndex];
  const keys = ['q1','q2','q3','q4'];
  const otKeys = new Set();
  if (m.stats) {
    Object.values(m.stats).forEach(ps => {
      Object.keys(ps).forEach(k => { if (k.startsWith('ot')) otKeys.add(k); });
    });
  }
  if (m.log) { m.log.forEach(l => { if (l.q && l.q.startsWith('ot')) otKeys.add(l.q); }); }
  if (m.isOT && m.otNum) otKeys.add('ot'+m.otNum);
  for (let o=1; o<=9; o++) { if (otKeys.has('ot'+o)) keys.push('ot'+o); }
  const labels = { q1:'Q1', q2:'Q2', q3:'Q3', q4:'Q4' };
  for (let o=1; o<=9; o++) labels['ot'+o]='OT'+o;

  document.getElementById('edit-quarter-select').innerHTML = keys.map(k =>
    `<button data-action="setEditQuarter" data-q="${k}"
      class="btn btn-xs ${editCurrentQuarter===k?'btn-primary':'btn-ghost'}"
      id="edit-q-btn-${k}">${labels[k]||k.toUpperCase()}</button>`
  ).join('');
}

function setEditQuarter(k) {
  editCurrentQuarter = k;
  renderEditQuarterSelect();
}

function renderEditRoster() {
  const m = state.matches[editMatchIndex];
  document.getElementById('edit-roster-select').innerHTML = m.players.map((p,i) =>
    `<div data-action="setEditPlayer" data-idx="${i}"
      class="oncourt-player ${editSelectedPlayerIdx===i?'selected':''}"
      id="edit-p-btn-${i}">
      <span class="n">#${p.num}</span>
      <span style="font-size:12px">${p.name.split(' ')[0]}</span>
    </div>`
  ).join('');
}

function setEditPlayer(i) {
  editSelectedPlayerIdx = i;
  renderEditRoster();
}

function renderEditLog() {
  const m  = state.matches[editMatchIndex];
  const el = document.getElementById('edit-log-list');
  if (!m.log || !m.log.length) {
    el.innerHTML = '<div style="padding:20px;text-align:center;color:var(--text3);font-size:13px">'+t('misc.no_log_actions')+'</div>';
    return;
  }
  el.innerHTML = m.log.map(l =>
    `<div class="log-entry">
      <span class="log-time">${l.q||'?'}${l.timeLabel?' '+l.timeLabel:''}</span>
      <span style="font-size:16px">${l.icon||''}</span>
      <div style="flex:1">
        ${l.player?`<div style="font-weight:600;font-size:12px;color:var(--text)">${l.player}</div>`:''}
        <div style="color:var(--text2);font-size:12px">${l.text}</div>
      </div>
      <button data-action="deleteEditLogEntry" data-logid="${l.id}"
        style="background:none;border:none;color:var(--text3);font-size:18px;cursor:pointer;padding:2px 6px;line-height:1">✕</button>
    </div>`
  ).join('');
}

function deleteEditLogEntry(id) {
  deleteLogEntry(id, editMatchIndex);
  renderEditLog();
  refreshEditMeta();
}

function editCurKey() {
  const m = state.matches[editMatchIndex];
  const k = editCurrentQuarter;
  ensureKey(m, k);
  return k;
}

function addEditLog(m, p, icon, text, q, delta) {
  // Leggi il minuto e il secondo dal campo di input nel modal di modifica
  const minInput = document.getElementById('edit-event-minute');
  const secInput = document.getElementById('edit-event-second');
  const minVal = minInput ? minInput.value.trim() : '';
  const secVal = secInput ? secInput.value.trim() : '';
  let timeLabel = null;
  if (minVal !== '' && secVal !== '') {
    timeLabel = minVal + "'" + secVal.padStart(2, '0') + '"';
  } else if (minVal !== '') {
    timeLabel = minVal + "'";
  } else if (secVal !== '') {
    timeLabel = "0'" + secVal.padStart(2, '0') + '"';
  }

  // Calcola scoreSnap: somma tutti i punti segnati fino ad ora per tutti i quarti
  let ourSnap = 0;
  const allPeriodKeys = ['q1','q2','q3','q4','ot1','ot2','ot3','ot4','ot5'];
  m.players.forEach(pl => {
    allPeriodKeys.forEach(k => {
      const s = m.stats[pl.id]?.[k];
      if (s) ourSnap += (s.fg2m||0)*2 + (s.fg3m||0)*3 + (s.ftm||0);
    });
  });
  let oppSnap = 0;
  allPeriodKeys.forEach(k => { oppSnap += (m.oppScoreByPeriod?.[k] || 0); });

  m.log.unshift({
    id: Date.now() + '' + Math.random(),
    q, icon, text,
    player:   p ? '#' + p.num + ' ' + p.name : '',
    playerId: p ? p.id : null,
    statKey:  q,
    delta:    delta || null,
    timeLabel,
    scoreSnap: { our: ourSnap, opp: oppSnap },
    ts: Date.now()
  });
  if (m.log.length > 200) m.log.pop();
}

function refreshEditMeta() {
  const m = state.matches[editMatchIndex];
  document.getElementById('edit-match-meta').textContent =
    m.opponent + ' · ' + m.date + ' · ' + m.ourScore + ' – ' + m.oppScore;
}

function recordEditShot(pts, made) {
  if (editSelectedPlayerIdx === null) { toast('Seleziona un giocatore'); return; }
  if (settings.zoneSelection) {
    pendingShot = { pts, made, editMode: true };
    openCourtModal(pts, made);
  } else {
    _doRecordEditShot(pts, made, 'N/A', null, null);
  }
}

function _doRecordEditShot(pts, made, zone, sx, sy) {
  const m = state.matches[editMatchIndex];
  const p = m.players[editSelectedPlayerIdx];
  const q = editCurKey();
  const deltaType = pts === 2 ? 'shot2' : 'shot3';
  if (pts === 2) {
    m.stats[p.id][q].fg2a++;
    if (made) { m.stats[p.id][q].fg2m++; m.ourScore += 2; }
  } else {
    m.stats[p.id][q].fg3a++;
    if (made) { m.stats[p.id][q].fg3m++; m.ourScore += 3; }
  }
  m.stats[p.id][q].shots.push({ pts, made, zone: zone || 'N/A', q, sx: sx || null, sy: sy || null });
  addEditLog(m, p, made ? '✅' : '❌',
    made ? t('log.edit_shot_made',{pts,zone:zone||'N/A'}) : t('log.edit_shot_missed',{pts,zone:zone||'N/A'}), q,
    { type: deltaType, made, pts: made ? pts : 0, sx: sx || null, sy: sy || null, zone: zone || 'N/A' });
  save();
  refreshEditMeta();
  renderEditLog();
  renderMatches();
  toast(made ? t('toast.edit_shot_made',{name:p.name,pts}) : t('toast.edit_shot_missed',{name:p.name}));
}

function recordEditFT(made) {
  if (editSelectedPlayerIdx === null) { toast('Seleziona un giocatore'); return; }
  const m = state.matches[editMatchIndex];
  const p = m.players[editSelectedPlayerIdx];
  const q = editCurKey();
  m.stats[p.id][q].fta++;
  if (made) { m.stats[p.id][q].ftm++; m.ourScore++; }
  addEditLog(m, p, made ? '🎯' : '⭕',
    made ? t('log.edit_ft_made') : t('log.edit_ft_missed'), q,
    { type: 'ft', made, pts: made ? 1 : 0 });
  save();
  refreshEditMeta();
  renderEditLog();
  toast(made ? t('toast.edit_ft_made',{name:p.name}) : t('toast.edit_ft_missed',{name:p.name}));
}

function recordEditStat(type) {
  if (editSelectedPlayerIdx === null) { toast('Seleziona un giocatore'); return; }
  const m = state.matches[editMatchIndex];
  const p = m.players[editSelectedPlayerIdx];
  const q = editCurKey();
  m.stats[p.id][q][type]++;
  const L = { reb_off:t('stat.reb_off_label'), reb_def:t('stat.reb_def_label'), assist:t('col.ast'),
               steal:t('stat.steal_label'),  turnover:t('stat.turnover_label'), foul:t('stat.foul_label'),
               foul_drawn:t('stat.foul_drawn_label'), block:t('stat.block_label'), block_against:t('stat.block_against_label') };
  const I = { reb_off:'⬆️', reb_def:'⬇️', assist:'🤝', steal:'🫳',
               turnover:'💨', foul:'✋', foul_drawn:'🙋', block:'🛡️', block_against:'🚫' };
  addEditLog(m, p, I[type], (L[type] || type) + ' [modifica]', q,
    { type, made: false, pts: 0 });
  save();
  renderEditLog();
  if (type === 'foul') {
    const fc = getFoulCount(m, p);
    const warn = fc >= 5 ? ' — '+t('foul.warn5') : fc >= 4 ? ' — '+t('foul.warn4') : '';
    toast('✋ ' + p.name + ': ' + fc + (fc > 1 ? ' falli' : ' fallo') + warn, 3000);
  } else {
    const allQks = ['q1','q2','q3','q4','ot1','ot2','ot3'];
    const total = allQks.reduce((s,k) => s + (m.stats[p.id]?.[k]?.[type] || 0), 0);
    toast(I[type] + ' ' + p.name + ': ' + (L[type] || type) + ' (' + total + ')');
  }
}

// ═══ DELETE MATCH ═══
let _deleteMatchIdx = null;

function confirmDeleteMatch(i) {
  _deleteMatchIdx = i;
  const m = state.matches[i];
  document.getElementById('delete-match-desc').textContent =
    t('misc.confirm_delete_match',{opp:m.opponent,date:m.date});
  openModal('modal-delete-match');
}

async function doDeleteMatch() {
  if(_deleteMatchIdx === null) return;
  // Save tombstone so Drive merge never restores this match
  const deletedId = state.matches[_deleteMatchIdx] && state.matches[_deleteMatchIdx].id;
  if(deletedId && !state.deletedMatchIds.includes(deletedId)) {
    state.deletedMatchIds.push(deletedId);
  }
  // If deleting the live match, reset liveMatch
  if(liveMatch === _deleteMatchIdx) { liveMatch = null; }
  else if(liveMatch !== null && liveMatch > _deleteMatchIdx) { liveMatch--; }
  state.matches.splice(_deleteMatchIdx, 1);
  _deleteMatchIdx = null;
  await save();
  closeModal('modal-delete-match');
  renderMatches();
  populateReportSelect();
  toast(t('toast.match_deleted'));
}


// ═══ GOOGLE DRIVE SYNC ═══
// Il Client ID non è hardcoded: viene letto dalle impostazioni (inserito dall'utente)
function getDriveClientId() {
  return (settings.driveClientId || '').trim();
}
const DRIVE_SCOPE = 'https://www.googleapis.com/auth/drive.appdata';
const DRIVE_FILE_NAME = 'courtstats4_data.json';
let driveToken = null;
let driveTokenExpiry = 0;       // timestamp ms quando scade
let driveFileId = null;   // caricato in initApp()
let driveSyncing = false;
let driveEnabled = false; // caricato in initApp()
let _driveTokenClient = null;

// Ottieni/rinnova il token in modo silenzioso; chiama callback(token) o callback(null)
function driveGetToken(callback) {
  const now = Date.now();
  // Token ancora valido (con 2 min di margine)
  if (driveToken && driveTokenExpiry - now > 120000) { callback(driveToken); return; }

  if (typeof google === 'undefined') { callback(null); return; }

  const clientId = getDriveClientId();
  if (!clientId) { toast('⚠️ Inserisci il Client ID Google nelle impostazioni Drive'); callback(null); return; }

  if (!_driveTokenClient) {
    _driveTokenClient = google.accounts.oauth2.initTokenClient({
      client_id: clientId,
      scope: DRIVE_SCOPE,
      prompt: '',   // nessun popup se già autorizzato
      callback: (resp) => {
        if (resp.error || !resp.access_token) {
          // Se il refresh silenzioso fallisce, chiedi login esplicito
          if (resp.error === 'interaction_required' || resp.error === 'login_required') {
            driveEnabled = false;
            SecureStorage.removeItem('driveEnabled');
            driveUpdateUI(false);
            toast('⚠️ Sessione Drive scaduta — ripremi ☁ Drive per riconnetterti');
          }
          callback(null); return;
        }
        driveToken = resp.access_token;
        driveTokenExpiry = Date.now() + (resp.expires_in || 3600) * 1000;
        callback(driveToken);
      }
    });
  }
  // Richiesta silenziosa (non mostra popup se già autorizzato)
  _driveTokenClient.requestAccessToken({ prompt: '' });
}

async function driveToggle() {
  if (driveEnabled) { driveDisconnect(); }
  else { driveConnectExplicit(); }
}

function driveConnectExplicit() {
  if (typeof google === 'undefined') { toast('Google SDK non ancora caricato, riprova tra un secondo'); return; }
  const clientId = getDriveClientId();
  if (!clientId) { toast('⚠️ Inserisci prima il Client ID Google nelle impostazioni Drive'); return; }
  if (!_driveTokenClient) {
    _driveTokenClient = google.accounts.oauth2.initTokenClient({
      client_id: clientId,
      scope: DRIVE_SCOPE,
      callback: async (resp) => {
        if (resp.error || !resp.access_token) { toast('Errore autenticazione: ' + (resp.error||'unknown')); return; }
        driveToken = resp.access_token;
        driveTokenExpiry = Date.now() + (resp.expires_in || 3600) * 1000;
        driveEnabled = true;
        await SecureStorage.setItem('driveEnabled', '1');
        driveUpdateUI(true);
        driveSync();
        toast('✅ Connesso a Google Drive — dati al sicuro!');
      }
    });
  }
  _driveTokenClient.requestAccessToken({ prompt: 'consent' });
}

async function driveDisconnect() {
  if (driveToken && typeof google !== 'undefined') {
    google.accounts.oauth2.revoke(driveToken, () => {});
  }
  driveToken = null;
  driveEnabled = false;
  SecureStorage.removeItem('driveEnabled');
  driveUpdateUI(false);
  toast('Disconnesso da Google Drive');
}

function driveUpdateUI(connected) {
  const btn = document.getElementById('drive-btn');
  const bar = document.getElementById('drive-status-bar');
  const dot = document.getElementById('drive-dot');
  const txt = document.getElementById('drive-status-text');
  if (!btn) return;
  if (connected) {
    btn.className = 'drive-btn drive-btn-connected';
    btn.textContent = '✓ Drive';
    bar.style.display = 'flex';
    dot.className = 'drive-dot drive-dot-ok';
    txt.textContent = 'Google Drive attivo';
  } else {
    btn.className = 'drive-btn drive-btn-connect';
    btn.textContent = '☁ Drive';
    bar.style.display = 'none';
  }
  // Aggiorna anche il pulsante nella pagina Config
  renderSettings();
}

function driveSyncStatus(syncing, error) {
  const dot = document.getElementById('drive-dot');
  const txt = document.getElementById('drive-status-text');
  if (!dot) return;
  if (syncing) {
    dot.className = 'drive-dot drive-dot-sync';
    txt.textContent = 'Sincronizzazione…';
  } else if (error) {
    dot.className = 'drive-dot';
    dot.style.background = '#e74c3c';
    txt.textContent = '⚠️ Errore sync';
  } else {
    dot.className = 'drive-dot drive-dot-ok';
    dot.style.background = '';
    const d = new Date();
    txt.textContent = 'Sincronizzato alle ' + d.getHours() + ':' + String(d.getMinutes()).padStart(2,'0');
  }
}

async function driveSync() {
  if (!driveEnabled || !settings.driveFeatureEnabled || driveSyncing) return;
  driveSyncing = true;
  driveSyncStatus(true);

  driveGetToken(async (token) => {
    if (!token) { driveSyncing = false; driveSyncStatus(false, true); return; }

    try {
      // Cerca file esistente
      if (!driveFileId) {
        const search = await fetch(
          'https://www.googleapis.com/drive/v3/files?spaces=appDataFolder&q=name%3D%22' + DRIVE_FILE_NAME + '%22&fields=files(id)',
          { headers: { Authorization: 'Bearer ' + token } }
        );
        if (search.status === 401) { driveToken = null; driveSyncing = false; driveSync(); return; }
        const sData = await search.json();
        if (sData.files && sData.files.length > 0) {
          driveFileId = sData.files[0].id;
          await SecureStorage.setItem('driveFileId', driveFileId);
        }
      }

      // Scarica e mergia dati remoti
      if (driveFileId) {
        const dl = await fetch(
          'https://www.googleapis.com/drive/v3/files/' + driveFileId + '?alt=media',
          { headers: { Authorization: 'Bearer ' + token } }
        );
        if (dl.status === 401) { driveToken = null; driveSyncing = false; driveSync(); return; }
        if (dl.ok) {
          try {
            const remoteParsed = await dl.json();
            // Sanitize remote data to prevent prototype pollution
            const remote = sanitizeState(remoteParsed);
            let changed = false;

            // Merge tombstones: unione degli ID cancellati da entrambi i lati
            const allDeletedMatches  = Array.from(new Set([
              ...(state.deletedMatchIds  || []),
              ...(remote.deletedMatchIds  || [])
            ]));
            const allDeletedPlayers = Array.from(new Set([
              ...(state.deletedPlayerIds || []),
              ...(remote.deletedPlayerIds || [])
            ]));
            state.deletedMatchIds  = allDeletedMatches;
            state.deletedPlayerIds = allDeletedPlayers;

            // Merge matches: prendi tutte le partite remote non cancellate e non già presenti
            if (remote.matches && remote.matches.length) {
              const localIds = new Set(state.matches.map(m => m.id));
              const toAdd = remote.matches.filter(m =>
                !allDeletedMatches.includes(m.id) && !localIds.has(m.id)
              );
              // Rimuovi eventuali partite locali che sono nei tombstone remoti
              state.matches = state.matches.filter(m => !allDeletedMatches.includes(m.id));
              if (toAdd.length) { state.matches = state.matches.concat(toAdd); changed = true; }
              else if (state.matches.length !== (state.matches.length + toAdd.length)) changed = true;
            }

            // Merge roster: stessa logica
            if (remote.roster && remote.roster.length) {
              const localPids = new Set(state.roster.map(p => p.id));
              const toAddP = remote.roster.filter(p =>
                !allDeletedPlayers.includes(p.id) && !localPids.has(p.id)
              );
              state.roster = state.roster.filter(p => !allDeletedPlayers.includes(p.id));
              if (toAddP.length) { state.roster = state.roster.concat(toAddP); changed = true; }
            }

            if (changed) {
              await SecureStorage.setItem('courtstats4', JSON.stringify(state));
              renderRoster(); renderMatches();
            }
          } catch(e) { /* file corrotto remoto, sovrascriviamo */ }
        }
      }

      // Carica stato corrente
      const body = JSON.stringify(state);
      let response;
      if (driveFileId) {
        response = await fetch(
          'https://www.googleapis.com/upload/drive/v3/files/' + driveFileId + '?uploadType=media',
          { method: 'PATCH', headers: { Authorization: 'Bearer ' + token, 'Content-Type': 'application/json' }, body }
        );
      } else {
        const meta = { name: DRIVE_FILE_NAME, parents: ['appDataFolder'] };
        const form = new FormData();
        form.append('metadata', new Blob([JSON.stringify(meta)], { type: 'application/json' }));
        form.append('file', new Blob([body], { type: 'application/json' }));
        response = await fetch(
          'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id',
          { method: 'POST', headers: { Authorization: 'Bearer ' + token }, body: form }
        );
        if (response.ok) {
          const d = await response.json();
          driveFileId = d.id;
          await SecureStorage.setItem('driveFileId', driveFileId);
        }
      }

      if (response && response.status === 401) {
        // Token scaduto durante l'upload — azzera e riprova
        driveToken = null; driveSyncing = false; driveSync(); return;
      }

      driveSyncStatus(false);
    } catch(e) {
      console.error('Drive sync error', e);
      driveSyncStatus(false, true);
    }
    driveSyncing = false;
  });
}

// Override save() per triggerare sync automatico con debounce 3s
const _origSave = save;
save = async function save() {
  await SecureStorage.setItem('courtstats4', JSON.stringify(state));
  if (driveEnabled) { clearTimeout(save._driveTimer); save._driveTimer = setTimeout(driveSync, 3000); }
}

// Rinnovo token preventivo ogni 50 minuti (token dura 60 min)
setInterval(() => { if (driveEnabled && settings.driveFeatureEnabled) { driveToken = null; driveSync(); } }, 50 * 60 * 1000);



// ── AdMob - Advertising ────────────────────────────────────────────────────────
async function initAds() {

    // ── DEBUG OVERLAY (rimuovi prima del publish) ──
  const dbg = document.createElement('div');
  dbg.style = 'position:fixed;top:0;left:0;right:0;z-index:9999;background:rgba(0,0,0,.85);color:#0f0;font-size:11px;padding:8px;font-family:monospace;max-height:40vh;overflow-y:auto';
  document.body.appendChild(dbg);
  const log = (msg) => { dbg.innerHTML += msg + '<br>'; };

  log('isCapacitor: ' + isCapacitor);
  log('AdMob: ' + (typeof AdMob));


  try {
    log('initialize...');

    await AdMob.initialize({ initializeForTesting: true });

    log('initialize OK');

    log('importa gli enum esplicitamente...');

    log('showBanner...');

    await AdMob.showBanner({
      adId: 'ca-app-pub-3940256099942544/6300978111', // test banner ID
      adSize: BannerAdSize.BANNER,
      position: BannerAdPosition.BOTTOM_CENTER,
      margin: 0,
    });

    log('showBanner OK');

    // Fallback padding fisso in attesa del listener
    const nav = document.querySelector('nav');
    if (nav) nav.style.marginBottom = '60px';
    // Padding preciso quando AdMob comunica la dimensione reale
    AdMob.addListener('bannerAdSizeChanged', (info) => {
      const nav = document.querySelector('nav');
      if (nav) nav.style.marginBottom = info.height + 'px';
    });
  } catch(e) {
    log('ERRORE: ' + e.message);
    console.warn('AdMob non disponibile:', e);
  }
}


// ═══ INIT ASINCRONO ═══
// Tutta l'inizializzazione è async perché SecureStorage usa Web Crypto API (Promise-based).
async function initApp() {
  // Carica state cifrato
  const _rawState = safeParseJSON(await SecureStorage.getItem('courtstats4'), {});
  const _s = sanitizeState(_rawState);
  state.roster           = _s.roster           || [];
  state.matches          = _s.matches          || [];
  state.deletedMatchIds  = _s.deletedMatchIds  || [];
  state.deletedPlayerIds = _s.deletedPlayerIds || [];

  // Carica settings cifrati
  const _rawSettings = safeParseJSON(await SecureStorage.getItem('courtstats4_settings'), {});
  settings = _rawSettings;
  if(settings.zoneSelection === undefined) settings.zoneSelection = true;
  if(settings.oppRosterEnabled === undefined) settings.oppRosterEnabled = true;
  if(settings.driveClientId === undefined) settings.driveClientId = '';
  if(settings.driveFeatureEnabled === undefined) settings.driveFeatureEnabled = false;
  if(settings.reportExportEnabled === undefined) settings.reportExportEnabled = true;
  if(settings.teamLogo === undefined) settings.teamLogo = null;

  // ── STEP 1: ripristina la lingua salvata ──────────────────────────
  if (typeof _setLangInternal === 'function') {
    _setLangInternal(settings.language || 'it');
  }

  // Carica driveFileId e driveEnabled cifrati
  const _rawDriveFileId = await SecureStorage.getItem('driveFileId') || null;
  driveFileId = (_rawDriveFileId && /^[a-zA-Z0-9_\-]+$/.test(_rawDriveFileId)) ? _rawDriveFileId : null;
  driveEnabled = (await SecureStorage.getItem('driveEnabled')) === '1';

  // Auto-reconnect silenzioso se era attivo
  if (driveEnabled && settings.driveFeatureEnabled) {
    const wait = setInterval(() => {
      if (typeof google !== 'undefined') {
        clearInterval(wait);
        driveUpdateUI(true);
        driveSync();
      }
    }, 500);
    setTimeout(() => clearInterval(wait), 10000);
  }

    // ── Inizializza AdMob ─────────────────────────────────────────
    await initAds();

  // ── MIGRAZIONE DATI: ripara partite create con il bug parseInt(UUID)||0 ──
  state.matches.forEach(m => {
    if (!m.players || !m.stats) return;
    // Caso 1: players è vuoto ma stats ha la chiave "0" — non recuperabile, skip
    // Caso 2: players ha UUID validi ma stats ha chiave "0" — rimappa
    const hasZeroKey = '0' in m.stats;
    if (hasZeroKey && m.players.length > 0) {
      // Distribuisci le stats dalla chiave "0" al primo giocatore (best effort)
      // oppure ricrea stats vuote per tutti i giocatori
      m.players.forEach(p => {
        if (!m.stats[p.id]) {
          m.stats[p.id] = m.stats['0'] || { q1: es(), q2: es(), q3: es(), q4: es() };
        }
      });
      delete m.stats['0'];
    }
    // Caso 3: ogni giocatore senza entry stats riceve entry vuota
    m.players.forEach(p => {
      if (!m.stats[p.id]) m.stats[p.id] = { q1: es(), q2: es(), q3: es(), q4: es() };
    });
  });

  // ── ONBOARDING: LINGUA → DISCLAIMER ────────────────────────────────
  
 

  if (!settings.languageChosen) {
    // Primo avvio: mostra overlay selezione lingua e blocca qui.
    // Il resto (eventuale disclaimer + _finishAppInit) viene eseguito
    // da _proceedAfterLanguage() dopo la scelta della lingua.
    const overlay = document.getElementById('lang-onboarding-overlay');
    if (overlay) overlay.style.display = 'flex';
    return;
  }

  if (settings.disclaimerAccepted !== DISCLAIMER_VERSION) {
    // Lingua già scelta in passato, ma disclaimer non ancora accettato
    // (utente nuovo che ha già selezionato la lingua, o aggiornamento
    // che introduce per la prima volta i termini di utilizzo).
    if (typeof _setLangInternal === 'function') {
      _setLangInternal(settings.language || 'it');
    }
    _translateDisclaimerOverlay();
    const overlay = document.getElementById('disclaimer-onboarding-overlay');
    if (overlay) overlay.style.display = 'flex';
    return; // Il resto verrà eseguito da _finishAppInit() dopo l'accettazione
  }

  _finishAppInit();
}

function _finishAppInit() {
  // Render iniziale
  const li = state.matches.findIndex(m => m.status === 'live' || m.status === 'setup');
  if (li >= 0) liveMatch = li;
  renderRoster(); renderMatches();
  applyTeamLogo();
  // Applica i testi nella lingua salvata (Step 2)
  applyI18n();

  // Quando l'utente clicca sul campo Client ID (mascherato), svuotalo
  // così può digitare il nuovo valore senza confondersi con i •
  const cidInput = document.getElementById('drive-client-id-input');
  if (cidInput) {
    cidInput.addEventListener('focus', () => {
      if (cidInput.dataset.masked === 'true') {
        cidInput.value = '';
        cidInput.dataset.masked = 'false';
      }
    });
    // Se l'utente esce dal campo senza modificare, ri-mostra il valore mascherato
    cidInput.addEventListener('blur', () => {
      if (cidInput.dataset.masked === 'false' && cidInput.value === '' && settings.driveClientId) {
        const tail = settings.driveClientId.slice(-40);
        cidInput.value = '••••••' + tail;
        cidInput.dataset.masked = 'true';
      }
    });
  }
}

initApp().catch(err => console.error('[initApp] Errore:', err));

// ═══ AGGIUNTO SU SUGGERIMENTO DI COPILOT PER APK ═══

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js');
}

