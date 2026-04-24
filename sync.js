// Realtime Database sync layer — cross-device play logs.
// Uses Firebase v10 modular SDK via dynamic import (CDN, no build step).

(function () {
  const state = {
    db: null,
    ready: false,
    error: null,
    listeners: new Set(), // fn(plays, meta) -> void, where plays = { [gameId]: [entry, ...] }
    playsByGame: {},       // live cache
    unsub: null
  };

  async function init() {
    if (state.ready || state.error) return;
    try {
      const appMod = await import('https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js');
      const dbMod  = await import('https://www.gstatic.com/firebasejs/10.13.2/firebase-database.js');
      const app = appMod.initializeApp(window.FIREBASE_CONFIG);
      const db  = dbMod.getDatabase(app);
      state.db    = db;
      state._rtdb = dbMod;
      state.ready = true;
      subscribe();
    } catch (e) {
      console.error('Firebase init failed', e);
      state.error = e;
      notify();
    }
  }

  function subscribe() {
    const { ref, onValue } = state._rtdb;
    const playsRef = ref(state.db, 'plays');

    // onValue fires immediately with current data, then on every change
    const unsubscribe = onValue(
      playsRef,
      (snapshot) => {
        const next = {};
        if (snapshot.exists()) {
          snapshot.forEach(child => {
            const d   = child.val();
            const gid = d.gameId;
            if (!gid) return;
            const entry = {
              id: child.key,
              rating: d.rating,
              who: d.who,
              players: d.players,
              date: d.date,
              note: d.note || '',
              winner: d.winner || '',
              createdAt: d.createdAt || 0
            };
            if (d.ratings) {
              entry.ratings = Array.isArray(d.ratings)
                ? d.ratings
                : Object.values(d.ratings);
            }
            (next[gid] = next[gid] || []).push(entry);
          });
          // Keep each game's plays in chronological order
          Object.values(next).forEach(arr => arr.sort((a, b) => a.createdAt - b.createdAt));
        }
        state.playsByGame = next;
        notify();
      },
      (err) => {
        console.error('Realtime DB snapshot error', err);
        state.error = err;
        notify();
      }
    );

    state.unsub = unsubscribe;
  }

  function notify() {
    state.listeners.forEach(fn => {
      try { fn(state.playsByGame, { ready: state.ready, error: state.error }); }
      catch (e) { console.error(e); }
    });
  }

  async function addPlay(gameId, entry) {
    if (!state.ready) throw new Error('Realtime DB not ready');
    const { ref, push } = state._rtdb;
    const who = entry.who ||
      (Array.isArray(entry.ratings) ? entry.ratings.map(r => r.name).filter(Boolean).join(', ') : '');
    const payload = {
      gameId,
      rating: entry.rating,
      who,
      players: entry.players,
      date: entry.date,
      note: entry.note || '',
      winner: entry.winner || '',
      passphrase: window.FAMILY_PASSPHRASE || '',
      createdAt: Date.now()
    };
    if (Array.isArray(entry.ratings) && entry.ratings.length > 0) {
      payload.ratings = entry.ratings;
    }
    const newRef = await push(ref(state.db, 'plays'), payload);
    return newRef.key;
  }

  async function deletePlay(gameId, playId) {
    if (!state.ready) throw new Error('Realtime DB not ready');
    const { ref, remove } = state._rtdb;
    await remove(ref(state.db, 'plays/' + playId));
  }

  function onPlaysChange(fn) {
    state.listeners.add(fn);
    // Immediately push current state
    fn(state.playsByGame, { ready: state.ready, error: state.error });
    return () => state.listeners.delete(fn);
  }

  window.GameSync = { init, addPlay, deletePlay, onPlaysChange };
  init();
})();
