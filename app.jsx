// Grandma's Card Games — main app

const { useState, useEffect, useMemo } = React;

// Plays are stored in Firestore (see sync.js). We keep a local mirror for UI.

// Decorate games with a corner suit/rank for visual flair
function decorateGames(games) {
  const combos = [
    { rank: 'A', suit: 'hearts' }, { rank: 'K', suit: 'spades' },
    { rank: 'Q', suit: 'diamonds' }, { rank: 'J', suit: 'clubs' },
    { rank: '10', suit: 'hearts' }, { rank: '9', suit: 'spades' },
    { rank: '8', suit: 'diamonds' }, { rank: '7', suit: 'clubs' }
  ];
  return games.map((g, i) => ({ ...g, corner: combos[i % combos.length] }));
}

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accentColor": "burgundy",
  "showOnly3to5": true,
  "density": "cozy",
  "headerStyle": "ribbon"
}/*EDITMODE-END*/;

const ACCENT_PRESETS = {
  burgundy: { '--burgundy': 'oklch(0.42 0.12 20)', '--burgundy-deep': 'oklch(0.32 0.13 20)', '--burgundy-soft': 'oklch(0.55 0.10 20)' },
  forest:   { '--burgundy': 'oklch(0.40 0.09 155)', '--burgundy-deep': 'oklch(0.30 0.09 155)', '--burgundy-soft': 'oklch(0.52 0.08 155)' },
  navy:     { '--burgundy': 'oklch(0.38 0.09 255)', '--burgundy-deep': 'oklch(0.28 0.10 255)', '--burgundy-soft': 'oklch(0.52 0.08 255)' },
  plum:     { '--burgundy': 'oklch(0.40 0.10 325)', '--burgundy-deep': 'oklch(0.30 0.11 325)', '--burgundy-soft': 'oklch(0.55 0.09 325)' }
};

function App() {
  const tweaks = useTweaks(TWEAK_DEFAULTS);

  const allGames = useMemo(() => decorateGames(window.GAMES_DATA), []);
  const [plays, setPlays] = useState({});
  const [syncStatus, setSyncStatus] = useState('connecting'); // connecting | live | error
  const [openId, setOpenId] = useState(null);
  const [playerFilter, setPlayerFilter] = useState(tweaks.showOnly3to5 ? 'grandma' : 'all');
  const [categoryFilters, setCategoryFilters] = useState(new Set());
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [sort, setSort] = useState('featured');

  // If tweak for 3-5 default changes, reflect it
  useEffect(() => {
    setPlayerFilter(tweaks.showOnly3to5 ? 'grandma' : 'all');
  }, [tweaks.showOnly3to5]);

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
    if (playerFilter === 'grandma') list = list.filter(g => g.players.some(n => n >= 3 && n <= 5));
    else if (playerFilter !== 'all') {
      const n = parseInt(playerFilter, 10);
      list = list.filter(g => g.players.includes(n));
    }
    if (categoryFilters.size > 0) list = list.filter(g => Array.from(categoryFilters).every(c => g.categories.includes(c)));
    if (difficultyFilter === 'easy') list = list.filter(g => g.difficulty <= 2);
    else if (difficultyFilter === 'medium') list = list.filter(g => g.difficulty === 3);
    else if (difficultyFilter === 'hard') list = list.filter(g => g.difficulty >= 4);

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
    // 'featured' keeps default order
    return copy;
  }, [allGames, playerFilter, categoryFilters, difficultyFilter, sort, plays]);

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

  return (
    <div>
      <header className="site-header">
        <div className="banner">
          <span className="banner-line" />
          <span className="banner-suit">♠ ♥ ♦ ♣</span>
          <span className="banner-line" />
        </div>
        <div className="title-block">
          <div className="eyebrow">A Birthday Card Night · For Grandma</div>
          <h1 className="site-title">
            Grandma's <span className="amp">&</span> the 25
            {tweaks.headerStyle === 'ribbon' && <span className="ribbon"> ♦ </span>}
            {tweaks.headerStyle !== 'ribbon' && ' '}
            Best Card Games
          </h1>
          <p className="site-sub">
            Twenty-five crowd-pleasing card games, all perfect for a table of three to five.
            Pick one, play it, and log how it went — so next birthday we'll know which ones made her laugh loudest.
          </p>
        </div>
        <div className="header-meta">
          <div className="hm-item"><strong>25</strong> games curated</div>
          <span className="hm-dot" />
          <div className="hm-item"><strong>3–5</strong> players each</div>
          <span className="hm-dot" />
          <div className="hm-item">
            <strong>{totalPlays}</strong> {totalPlays === 1 ? 'play' : 'plays'} logged
          </div>
          <span className="hm-dot" />
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
          <Chip active={playerFilter === 'grandma'} onClick={() => setPlayerFilter('grandma')}>3–5 (Grandma's table)</Chip>
          <Chip active={playerFilter === '3'} onClick={() => setPlayerFilter('3')}>3</Chip>
          <Chip active={playerFilter === '4'} onClick={() => setPlayerFilter('4')}>4</Chip>
          <Chip active={playerFilter === '5'} onClick={() => setPlayerFilter('5')}>5</Chip>
          <Chip active={playerFilter === 'all'} onClick={() => setPlayerFilter('all')}>All</Chip>
        </div>

        <div className="filter-group">
          <span className="filter-label">Difficulty</span>
          <Chip active={difficultyFilter === 'all'} onClick={() => setDifficultyFilter('all')}>Any</Chip>
          <Chip active={difficultyFilter === 'easy'} onClick={() => setDifficultyFilter('easy')}>Easy</Chip>
          <Chip active={difficultyFilter === 'medium'} onClick={() => setDifficultyFilter('medium')}>Medium</Chip>
          <Chip active={difficultyFilter === 'hard'} onClick={() => setDifficultyFilter('hard')}>Brainy</Chip>
        </div>

        <div className="filter-group">
          <span className="filter-label">Sort</span>
          <select className="sort-select" value={sort} onChange={e => setSort(e.target.value)}>
            <option value="featured">Featured order</option>
            <option value="name">A → Z</option>
            <option value="short">Shortest first</option>
            <option value="easy">Easiest first</option>
            <option value="rated">Highest rated</option>
          </select>
        </div>
      </section>

      {categories.length > 1 && (
        <section className="filters" style={{ marginTop: 0 }}>
          <div className="filter-group">
            <span className="filter-label">Style</span>
            {categoryFilters.size > 0 && (
              <Chip active={false} onClick={() => setCategoryFilters(new Set())}>Clear</Chip>
            )}
            {categories.map(c => (
              <Chip key={c} active={categoryFilters.has(c)} onClick={() => toggleCategory(c)}>{c}</Chip>
            ))}
          </div>
        </section>
      )}

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
              { value: 'burgundy', label: 'Burgundy' },
              { value: 'forest', label: 'Forest' },
              { value: 'navy', label: 'Navy' },
              { value: 'plum', label: 'Plum' }
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
        <TweakSection title="Default filter">
          <TweakToggle
            label="Start with 3–5 players filter on"
            value={tweaks.showOnly3to5}
            onChange={v => tweaks.set('showOnly3to5', v)}
          />
        </TweakSection>
      </TweaksPanel>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
