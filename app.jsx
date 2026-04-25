// Grandma's Card Games — main app

const { useState, useEffect, useMemo } = React;

// Plays are stored in Firestore (see sync.js). We keep a local mirror for UI.

function durationCategory(minutes) {
  if (minutes <= 15) return 'Quick';
  if (minutes > 35) return 'Long';
  return null;
}

// Decorate games with a corner suit/rank for visual flair, and inject a duration category
function decorateGames(games) {
  const combos = [
    { rank: 'A',  suit: 'hearts'   }, { rank: '2', suit: 'spades'   },
    { rank: '3',  suit: 'diamonds' }, { rank: '4', suit: 'clubs'    },
    { rank: '5',  suit: 'hearts'   }, { rank: '6', suit: 'spades'   },
    { rank: '7',  suit: 'diamonds' }, { rank: '8', suit: 'clubs'    },
    { rank: '9',  suit: 'hearts'   }, { rank: '10', suit: 'spades'  }
  ];
  return games.map((g, i) => ({
    ...g,
    corner: combos[i % combos.length],
    categories: [...g.categories, ...(durationCategory(g.minutes) ? [durationCategory(g.minutes)] : [])],
  }));
}

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accentColor": "burgundy",
  "density": "cozy",
  "headerStyle": "ribbon"
}/*EDITMODE-END*/;

const ACCENT_PRESETS = {
  burgundy: { '--burgundy': 'oklch(0.65 0.15 210)', '--burgundy-deep': 'oklch(0.55 0.15 210)', '--burgundy-soft': 'oklch(0.75 0.12 210)' },
  forest:   { '--burgundy': 'oklch(0.62 0.14 170)', '--burgundy-deep': 'oklch(0.52 0.14 170)', '--burgundy-soft': 'oklch(0.72 0.11 170)' },
  navy:     { '--burgundy': 'oklch(0.68 0.10 248)', '--burgundy-deep': 'oklch(0.58 0.11 248)', '--burgundy-soft': 'oklch(0.78 0.08 248)' },
  plum:     { '--burgundy': 'oklch(0.65 0.12 285)', '--burgundy-deep': 'oklch(0.55 0.13 285)', '--burgundy-soft': 'oklch(0.75 0.10 285)' }
};

function App() {
  const tweaks = useTweaks(TWEAK_DEFAULTS);

  const allGames = useMemo(() => decorateGames(window.GAMES_DATA), []);
  const [plays, setPlays] = useState({});
  const [syncStatus, setSyncStatus] = useState('connecting'); // connecting | live | error
  const [openId, setOpenId] = useState(null);
  const [playerFilter, setPlayerFilter] = useState('all');
  const [categoryFilters, setCategoryFilters] = useState(new Set());
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [luckFilter, setLuckFilter] = useState('all');
  const [sort, setSort] = useState('featured');
  const [search, setSearch] = useState('');

  // Apply accent preset
  useEffect(() => {
    const preset = ACCENT_PRESETS[tweaks.accentColor] || ACCENT_PRESETS.burgundy;
    Object.entries(preset).forEach(([k, v]) => document.documentElement.style.setProperty(k, v));
  }, [tweaks.accentColor]);

  // Subscribe to live Firestore updates
  useEffect(() => {
    if (!window.GameSync) return;
    const unsub = window.GameSync.onPlaysChange((next, meta) => {
      setPlays(next);
      if (meta.error) setSyncStatus('error');
      else if (meta.ready) setSyncStatus('live');
    });
    return unsub;
  }, []);

  const categories = useMemo(() => {
    const s = new Set(allGames.flatMap(g => g.categories));
    return Array.from(s).sort();
  }, [allGames]);

  function toggleCategory(cat) {
    setCategoryFilters(prev => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  }

  const filtered = useMemo(() => {
    let list = allGames;
    if (playerFilter === '6+') {
      list = list.filter(g => g.players.some(n => n >= 6));
    } else if (playerFilter !== 'all') {
      const n = parseInt(playerFilter, 10);
      list = list.filter(g => g.players.includes(n));
    }
    if (categoryFilters.size > 0) list = list.filter(g => Array.from(categoryFilters).every(c => g.categories.includes(c)));
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(g =>
        g.name.toLowerCase().includes(q) ||
        g.tagline.toLowerCase().includes(q) ||
        g.description.toLowerCase().includes(q)
      );
    }
    if (difficultyFilter === 'easy') list = list.filter(g => g.difficulty <= 2);
    else if (difficultyFilter === 'medium') list = list.filter(g => g.difficulty === 3);
    else if (difficultyFilter === 'hard') list = list.filter(g => g.difficulty >= 4);
    if (luckFilter === 'skillful') list = list.filter(g => g.luck <= 2);
    else if (luckFilter === 'balanced') list = list.filter(g => g.luck === 3);
    else if (luckFilter === 'lucky') list = list.filter(g => g.luck >= 4);

    const avgFor = (g) => {
      const p = plays[g.id] || [];
      if (!p.length) return -1;
      return p.reduce((s, x) => s + x.rating, 0) / p.length;
    };

    const copy = [...list];
    if (sort === 'name') copy.sort((a, b) => a.name.localeCompare(b.name));
    else if (sort === 'short') copy.sort((a, b) => a.minutes - b.minutes);
    else if (sort === 'easy') copy.sort((a, b) => a.difficulty - b.difficulty);
    else if (sort === 'rated') copy.sort((a, b) => avgFor(b) - avgFor(a));
    else if (sort === 'lucky') copy.sort((a, b) => b.luck - a.luck);
    // 'featured' keeps default order
    return copy;
  }, [allGames, playerFilter, categoryFilters, difficultyFilter, luckFilter, sort, plays, search]);

  const openGame = filtered.find(g => g.id === openId) || allGames.find(g => g.id === openId);

  async function addPlay(gameId, entry) {
    try {
      await window.GameSync.addPlay(gameId, entry);
      // Snapshot listener updates state automatically
    } catch (e) {
      console.error(e);
      alert("Couldn't save — check you're online and the family passphrase is correct.");
    }
  }
  async function deletePlay(gameId, playId) {
    try {
      await window.GameSync.deletePlay(gameId, playId);
    } catch (e) {
      console.error(e);
      alert("Couldn't delete — you may not have permission.");
    }
  }

  const totalPlays = Object.values(plays).reduce((s, arr) => s + arr.length, 0);

  const knownNames = useMemo(() => {
    const names = new Set();
    for (const arr of Object.values(plays)) {
      for (const play of arr) {
        if (Array.isArray(play.ratings)) {
          play.ratings.forEach(r => { if (r.name) names.add(r.name); });
        } else if (play.who) {
          play.who.split(', ').forEach(n => { if (n.trim()) names.add(n.trim()); });
        }
      }
    }
    return Array.from(names).sort();
  }, [plays]);

  return (
    <div>
      <header className="site-header">
        <div className="banner">
          <span className="banner-line" />
          <span className="banner-suit">♠ ♥ ♦ ♣</span>
          <span className="banner-line" />
        </div>
        <div className="title-block">
          <div className="eyebrow">A Birthday Collection of Card Games · For Grandma</div>
          <h1 className="site-title">
            50{tweaks.headerStyle === 'ribbon' && <span className="ribbon"> ♦ </span>}
            {tweaks.headerStyle !== 'ribbon' && ' '}
            Card Games for Grandma
          </h1>
          <p className="site-sub">
            50 of the best card games - a collection for us to play through together and enjoy.
          </p>
        </div>
        <div className="header-meta">
          <div className="hm-item">
            <strong>{totalPlays}</strong> {totalPlays === 1 ? 'play' : 'plays'} logged
          </div>
          <div className="hm-item">
            <span className={`sync-pill sync-${syncStatus}`}>
              <span className="sync-dot" />
              {syncStatus === 'connecting' && 'Connecting…'}
              {syncStatus === 'live' && 'Live · synced'}
              {syncStatus === 'error' && 'Offline'}
            </span>
          </div>
        </div>
      </header>

      <section className="filters">
        <div className="filter-group">
          <span className="filter-label">Players</span>
          <Chip active={playerFilter === '2'} onClick={() => setPlayerFilter('2')}>2</Chip>
          <Chip active={playerFilter === '3'} onClick={() => setPlayerFilter('3')}>3</Chip>
          <Chip active={playerFilter === '4'} onClick={() => setPlayerFilter('4')}>4</Chip>
          <Chip active={playerFilter === '5'} onClick={() => setPlayerFilter('5')}>5</Chip>
          <Chip active={playerFilter === '6+'} onClick={() => setPlayerFilter('6+')}>6+</Chip>
          <Chip active={playerFilter === 'all'} onClick={() => setPlayerFilter('all')}>All</Chip>
        </div>

        <div className="filter-group">
          <span className="filter-label">Difficulty</span>
          <Chip active={difficultyFilter === 'all'} onClick={() => setDifficultyFilter('all')}>Any</Chip>
          <Chip active={difficultyFilter === 'easy'} onClick={() => setDifficultyFilter('easy')}>Simple</Chip>
          <Chip active={difficultyFilter === 'medium'} onClick={() => setDifficultyFilter('medium')}>Moderate</Chip>
          <Chip active={difficultyFilter === 'hard'} onClick={() => setDifficultyFilter('hard')}>Complex</Chip>
        </div>

        <div className="filter-group">
          <span className="filter-label">Luck</span>
          <Chip active={luckFilter === 'all'} onClick={() => setLuckFilter('all')}>Any</Chip>
          <Chip active={luckFilter === 'skillful'} onClick={() => setLuckFilter('skillful')}>Skillful</Chip>
          <Chip active={luckFilter === 'balanced'} onClick={() => setLuckFilter('balanced')}>Balanced</Chip>
          <Chip active={luckFilter === 'lucky'} onClick={() => setLuckFilter('lucky')}>Lucky</Chip>
        </div>

      </section>

      {categories.length > 1 && (
        <section className="filters" style={{ marginTop: 0 }}>
          <div className="filter-group">
            <span className="filter-label">Style</span>
            {categories.map(c => (
              <Chip key={c} active={categoryFilters.has(c)} onClick={() => toggleCategory(c)}>{c}</Chip>
            ))}
          </div>
        </section>
      )}

      <div className="results-bar">
        <span className="results-count">{filtered.length} {filtered.length === 1 ? 'game' : 'games'}</span>
        <select className="sort-select" value={sort} onChange={e => setSort(e.target.value)}>
          <option value="featured">Featured order</option>
          <option value="name">A → Z</option>
          <option value="short">Shortest first</option>
          <option value="easy">Easiest first</option>
          <option value="rated">Highest rated</option>
          <option value="lucky">Luckiest first</option>
        </select>
        <input
          className="search-input"
          type="search"
          placeholder="Search games…"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button
          className="clear-filters-btn"
          style={{ visibility: (playerFilter !== 'all' || difficultyFilter !== 'all' || luckFilter !== 'all' || categoryFilters.size > 0 || search.trim()) ? 'visible' : 'hidden' }}
          onClick={() => { setPlayerFilter('all'); setDifficultyFilter('all'); setLuckFilter('all'); setCategoryFilters(new Set()); setSearch(''); }}
        >Clear filters</button>
      </div>

      <main className="games-grid">
        {filtered.map(g => (
          <GameCard
            key={g.id}
            game={g}
            plays={plays[g.id] || []}
            onOpen={() => setOpenId(g.id)}
          />
        ))}
      </main>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--ink-faint)', fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 20 }}>
          No games match those filters. Try loosening up — Grandma usually does.
        </div>
      )}

      {openGame && (
        <GameDetail
          game={openGame}
          plays={plays[openGame.id] || []}
          onClose={() => setOpenId(null)}
          onAddPlay={addPlay}
          onDeletePlay={deletePlay}
          knownNames={knownNames}
        />
      )}

      <footer className="site-footer">
        <div className="footer-suits">♠ ♥ ♦ ♣</div>
        <div className="footer-note">Happy Birthday, Grandma — may the Queen of Spades always miss your hand.</div>
        <div className="footer-credit">Shuffle · Deal · Remember</div>
      </footer>

      <TweaksPanel title="Tweaks">
        <TweakSection title="Accent color">
          <TweakRadio
            value={tweaks.accentColor}
            onChange={v => tweaks.set('accentColor', v)}
            options={[
              { value: 'burgundy', label: 'Teal' },
              { value: 'forest', label: 'Sea Green' },
              { value: 'navy', label: 'Periwinkle' },
              { value: 'plum', label: 'Violet' }
            ]}
          />
        </TweakSection>
        <TweakSection title="Header flourish">
          <TweakRadio
            value={tweaks.headerStyle}
            onChange={v => tweaks.set('headerStyle', v)}
            options={[
              { value: 'ribbon', label: 'With diamond' },
              { value: 'plain', label: 'No diamond' }
            ]}
          />
        </TweakSection>
      </TweaksPanel>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
