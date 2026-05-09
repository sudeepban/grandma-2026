// Grandma's Card Games — main app

const { useState, useEffect, useMemo } = React;

// Plays are stored in Firestore (see sync.js). We keep a local mirror for UI.

function durationCategory(minutes) {
  if (minutes <= 15) return 'Quick';
  if (minutes > 35) return 'Long';
  return null;
}

function isStandardDeck(deck) {
  return /^standard/i.test(deck);
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
    categories: [
      ...g.categories,
      ...(durationCategory(g.minutes) ? [durationCategory(g.minutes)] : []),
      isStandardDeck(g.deck) ? 'Standard deck' : 'Special deck',
    ],
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
  const [currentUser, setCurrentUser] = useState(null);
  const [openId, setOpenId] = useState(null);
  const [statsOpen, setStatsOpen] = useState(false);
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

  // Subscribe to auth state
  useEffect(() => {
    if (!window.GameSync) return;
    return window.GameSync.onAuthChange(setCurrentUser);
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
      const avg = window.overallAvgFromPlays(plays[g.id] || []);
      return avg === null ? -1 : avg;
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
      alert("Couldn't save — check you're online and signed in.");
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
        <button className="stats-btn" onClick={() => setStatsOpen(true)} aria-label="Stats">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2a10 10 0 1 0 10 10H12V2z" />
            <path d="M12 2a10 10 0 0 1 10 10" />
          </svg>
        </button>

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
          <div className="hm-item">
            {currentUser ? (
              <span className="auth-pill auth-pill-in">
                {currentUser.photoURL && (
                  <img className="auth-avatar" src={currentUser.photoURL} alt="" referrerPolicy="no-referrer" />
                )}
                <span>{currentUser.displayName || currentUser.email}</span>
                <button className="auth-signout-btn" onClick={() => window.GameSync.signOut()}>Sign out</button>
              </span>
            ) : (
              <button className="auth-pill auth-pill-out" onClick={() => window.GameSync.signIn().catch(console.error)}>
                Sign in
              </button>
            )}
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
          currentUser={currentUser}
        />
      )}

      <footer className="site-footer">
        <div className="footer-suits">♠ ♥ ♦ ♣</div>
        <div className="footer-note">Happy Birthday, Grandma — may the Queen of Spades always miss your hand.</div>
        <div className="footer-credit">Shuffle · Deal · Remember</div>
      </footer>

      {statsOpen && (
        <StatsScreen plays={plays} allGames={allGames} onClose={() => setStatsOpen(false)} />
      )}

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

function computeAwards(plays, allGames) {
  const wins = {};
  const ratingMap = {};
  const playCount = {};
  const uniqueGames = {};
  const noteMentions = {};
  const coPlayers = {};    // name -> Set of unique co-player names
  const playerHistory = {}; // name -> [{date, createdAt, won}]
  const perGamePlays = {};  // name -> { gameId -> count }
  const ratingsList = {};   // name -> [rating, ...]
  const noteLengths = {};   // name -> { total chars, count } for notes they appear in
  const uniqueDates = {};   // name -> Set of date strings

  const gameNameMap = Object.fromEntries((allGames || []).map(g => [g.id, g.name]));

  for (const [gameId, gamePlays] of Object.entries(plays)) {
    for (const play of gamePlays) {
      const winners = play.winner
        ? play.winner.split(',').map(s => s.trim()).filter(Boolean)
        : [];
      winners.forEach(name => { wins[name] = (wins[name] || 0) + 1; });

      if (Array.isArray(play.ratings)) {
        const names = play.ratings.map(r => r.name).filter(Boolean);
        play.ratings.forEach(({ name, rating }) => {
          if (!name) return;
          playCount[name] = (playCount[name] || 0) + 1;
          if (!ratingMap[name]) ratingMap[name] = { total: 0, count: 0 };
          ratingMap[name].total += rating;
          ratingMap[name].count += 1;
          if (!uniqueGames[name]) uniqueGames[name] = new Set();
          uniqueGames[name].add(gameId);
          if (!coPlayers[name]) coPlayers[name] = new Set();
          names.forEach(other => { if (other !== name) coPlayers[name].add(other); });
          if (!playerHistory[name]) playerHistory[name] = [];
          playerHistory[name].push({ date: play.date || '', createdAt: play.createdAt || 0, won: winners.includes(name) });
          if (!perGamePlays[name]) perGamePlays[name] = {};
          perGamePlays[name][gameId] = (perGamePlays[name][gameId] || 0) + 1;
          if (!ratingsList[name]) ratingsList[name] = [];
          ratingsList[name].push(rating);
          if (!uniqueDates[name]) uniqueDates[name] = new Set();
          if (play.date) uniqueDates[name].add(play.date);
        });
      }

      if (play.note && Array.isArray(play.ratings)) {
        const lower = play.note.toLowerCase();
        play.ratings.forEach(({ name }) => {
          if (name && lower.includes(name.toLowerCase())) {
            noteMentions[name] = (noteMentions[name] || 0) + 1;
            if (!noteLengths[name]) noteLengths[name] = { total: 0, count: 0 };
            noteLengths[name].total += play.note.length;
            noteLengths[name].count += 1;
          }
        });
      }
    }
  }

  const topEntry = (obj, score = v => v) => {
    const entries = Object.entries(obj);
    if (!entries.length) return null;
    return entries.reduce((a, b) => score(b[1]) > score(a[1]) ? b : a);
  };

  const avg = v => v.total / v.count;
  const qualified = Object.fromEntries(Object.entries(ratingMap).filter(([_, v]) => v.count >= 2));

  const winnerEntry   = topEntry(wins);
  const playerEntry   = topEntry(playCount);
  const enjoyerEntry  = topEntry(qualified, avg);
  const criticEntry   = Object.entries(qualified).length
    ? Object.entries(qualified).reduce((a, b) => avg(b[1]) < avg(a[1]) ? b : a)
    : null;
  const explorerEntry = topEntry(Object.fromEntries(Object.entries(uniqueGames).map(([k, v]) => [k, v.size])));
  const noteEntry     = topEntry(noteMentions);
  const luckyEntry    = (() => {
    const c = Object.entries(playCount).filter(([_, n]) => n >= 3);
    if (!c.length) return null;
    return c.reduce((a, b) => (wins[b[0]] || 0) / b[1] > (wins[a[0]] || 0) / a[1] ? b : a);
  })();

  const socialEntry = topEntry(
    Object.fromEntries(Object.entries(coPlayers).map(([k, v]) => [k, v.size]))
  );

  const streakEntry = (() => {
    const streaks = {};
    for (const [name, history] of Object.entries(playerHistory)) {
      const sorted = [...history].sort((a, b) => {
        const dc = b.date.localeCompare(a.date);
        return dc !== 0 ? dc : b.createdAt - a.createdAt;
      });
      let streak = 0;
      for (const entry of sorted) {
        if (entry.won) streak++;
        else break;
      }
      if (streak > 0) streaks[name] = streak;
    }
    return topEntry(streaks);
  })();

  const devotedEntry = (() => {
    const scores = {};
    for (const [name, gameMap] of Object.entries(perGamePlays)) {
      const best = Object.entries(gameMap).reduce((a, b) => b[1] > a[1] ? b : a);
      if (best[1] >= 2) scores[name] = { count: best[1], gameId: best[0] };
    }
    return topEntry(scores, v => v.count);
  })();

  const quietEntry = (() => {
    const candidates = Object.entries(playCount).filter(([_, c]) => c >= 2);
    if (!candidates.length) return null;
    return candidates.reduce((a, b) => {
      const ma = noteMentions[a[0]] || 0;
      const mb = noteMentions[b[0]] || 0;
      if (mb !== ma) return mb < ma ? b : a;
      return b[1] > a[1] ? b : a;
    });
  })();

  const variance = arr => {
    if (arr.length < 2) return null;
    const mean = arr.reduce((s, v) => s + v, 0) / arr.length;
    return arr.reduce((s, v) => s + (v - mean) ** 2, 0) / arr.length;
  };

  const storytellerEntry = topEntry(
    Object.fromEntries(
      Object.entries(noteLengths)
        .filter(([_, v]) => v.count >= 2)
        .map(([k, v]) => [k, v.total / v.count])
    )
  );

  const varianceQualified = Object.entries(ratingsList).filter(([_, r]) => r.length >= 3);
  const consistentEntry = varianceQualified.length
    ? varianceQualified.reduce((a, b) => variance(b[1]) < variance(a[1]) ? b : a)
    : null;
  const wildCardEntry = varianceQualified.length
    ? varianceQualified.reduce((a, b) => variance(b[1]) > variance(a[1]) ? b : a)
    : null;

  const runnerUpEntry = (() => {
    const candidates = Object.entries(playCount).filter(([_, c]) => c >= 3);
    if (!candidates.length) return null;
    return candidates.reduce((a, b) => {
      const scoreA = a[1] - (wins[a[0]] || 0);
      const scoreB = b[1] - (wins[b[0]] || 0);
      return scoreB > scoreA ? b : a;
    });
  })();

  const dailyEntry = topEntry(
    Object.fromEntries(Object.entries(uniqueDates).map(([k, v]) => [k, v.size]))
  );

  return [
    winnerEntry   && { title: 'Grand Winner',     icon: '♛', name: winnerEntry[0],   stat: `${winnerEntry[1]} win${winnerEntry[1] !== 1 ? 's' : ''}` },
    playerEntry   && { title: 'Player',           icon: '♠', name: playerEntry[0],   stat: `${playerEntry[1]} play${playerEntry[1] !== 1 ? 's' : ''}` },
    enjoyerEntry  && { title: 'Enjoyer',          icon: '♥', name: enjoyerEntry[0],  stat: `${avg(enjoyerEntry[1]).toFixed(1)} avg rating` },
    criticEntry   && { title: 'Critic',           icon: '♦', name: criticEntry[0],   stat: `${avg(criticEntry[1]).toFixed(1)} avg rating` },
    explorerEntry && { title: 'Explorer',         icon: '♣', name: explorerEntry[0], stat: `${explorerEntry[1]} unique game${explorerEntry[1] !== 1 ? 's' : ''}` },
    noteEntry     && { title: 'Noteworthy',       icon: '✦', name: noteEntry[0],     stat: `${noteEntry[1]} mention${noteEntry[1] !== 1 ? 's' : ''}` },
    luckyEntry    && { title: 'Lucky Charm',      icon: '✧', name: luckyEntry[0],    stat: `${Math.round((wins[luckyEntry[0]] || 0) / luckyEntry[1] * 100)}% win rate` },
    socialEntry   && { title: 'Social Butterfly', icon: '❧', name: socialEntry[0],   stat: `${socialEntry[1]} different co-player${socialEntry[1] !== 1 ? 's' : ''}` },
    streakEntry   && { title: 'Streak',           icon: '◈', name: streakEntry[0],   stat: `${streakEntry[1]} win${streakEntry[1] !== 1 ? 's' : ''} in a row` },
    devotedEntry  && { title: 'Devoted',          icon: '♡', name: devotedEntry[0],  stat: `${devotedEntry[1].count} plays of ${gameNameMap[devotedEntry[1].gameId] || ''}` },
    quietEntry        && { title: 'Quiet Achiever',  icon: '◇', name: quietEntry[0],        stat: `${noteMentions[quietEntry[0]] || 0} note mention${(noteMentions[quietEntry[0]] || 0) !== 1 ? 's' : ''}` },
    storytellerEntry  && { title: 'Storyteller',     icon: '✒', name: storytellerEntry[0],  stat: `${Math.round(storytellerEntry[1])} avg note length` },
    consistentEntry   && { title: 'Consistent',      icon: '◉', name: consistentEntry[0],   stat: `${variance(ratingsList[consistentEntry[0]]).toFixed(2)} variance` },
    wildCardEntry     && { title: 'Wild Card',        icon: '✵', name: wildCardEntry[0],     stat: `${variance(ratingsList[wildCardEntry[0]]).toFixed(2)} variance` },
    runnerUpEntry     && { title: 'Runner Up',        icon: '◎', name: runnerUpEntry[0],     stat: `${runnerUpEntry[1]} plays, ${wins[runnerUpEntry[0]] || 0} wins` },
    dailyEntry        && { title: 'Daily Player',     icon: '◆', name: dailyEntry[0],        stat: `${dailyEntry[1]} different days` },
  ].filter(Boolean);
}

const AWARD_DEFINITIONS = {
  'Grand Winner': 'The player who has won the most games in total. When a game ends in a tie and has multiple winners, every winner gets full credit for that win — so sharing a victory still counts. The Grand Winner has come out on top more times than anyone else at the table.',
  'Player': 'The player who has shown up and played the most times overall — win or lose. This person loves the game itself more than the outcome. Whether they\'re on a hot streak or a cold one, they keep pulling up a chair.',
  'Enjoyer': 'The player with the highest average star rating across all the games they\'ve rated. They need to have rated at least 2 games to qualify. This is the group\'s biggest enthusiast — they find the fun in almost everything dealt their way.',
  'Critic': 'The player with the lowest average star rating across all the games they\'ve rated (minimum 2 games to qualify). They have the highest standards at the table. Don\'t take it personally — they just know what they like.',
  'Explorer': 'The player who has played the most different games from the collection. Where others return to their favourites, the Explorer keeps trying something new. They\'ve seen more of this collection than anyone.',
  'Noteworthy': 'The player whose name comes up most often in the written notes left after a game. Whether for a brilliant move, a memorable moment, a surprise win, or a spectacular blunder — this person always leaves an impression worth writing down.',
  'Lucky Charm': 'The player with the best win rate — that is, the highest proportion of games they\'ve played that they\'ve actually won. Here\'s how it works: if someone has played 10 games and won 4 of them, their win rate is 40% (4 ÷ 10). If someone else has played 5 games and won 3, their win rate is 60% (3 ÷ 5) — so they\'d win this award even though they have fewer total wins. To keep it fair, a player must have played at least 3 games to qualify. This is different from Grand Winner, which simply counts raw wins — Lucky Charm rewards the player who wins most often relative to how much they play.',
  'Social Butterfly': 'The player who has sat down to play with the most different people. Every time a new face joins the table, this person has already played with them — or they\'re the reason that new face was invited. They\'re the glue of the group.',
  'Streak': 'The player currently on the longest winning streak — counting their most recent games in order and stopping the moment they hit a loss. If they won their last 4 games in a row, that\'s a streak of 4. This is a live snapshot of who\'s running hot right now.',
  'Devoted': 'The player who has played the same game more times than anyone else has played any single game. They found something they love and they keep coming back to it. A true superfan of one title in the collection.',
  'Quiet Achiever': 'The player who has played plenty of games but appears in the fewest notes. While others make headlines with dramatic moments, this person plays their cards and lets the results speak for themselves. Among players who have played 2 or more games, they are the least written-about — whether that means they win gracefully, lose with dignity, or simply refuse to cause a fuss.',
  'Storyteller': 'The player whose notes tend to be the longest — when they\'re in a game, whoever is writing the notes has a lot to say. Averaged across all the notes their name appears in (minimum 2 notes to qualify). Whether they\'re doing something brilliant, something unexpected, or something worth remembering, they always give people something to write about.',
  'Consistent': 'The player whose star ratings barely vary from game to game. Their scores cluster tightly around their average — they feel roughly the same way about most games and aren\'t easily swayed by a lucky hand or a bad one. Requires at least 3 rated games to qualify. Variance measures how spread out the ratings are; the lower the variance, the more predictable and steady the reviewer.',
  'Wild Card': 'The player with the most unpredictable ratings — some games they\'ve given top marks, others they\'ve rated very low, and the gap is wider than anyone else\'s. Requires at least 3 rated games to qualify. High variance means their scores are all over the place. You never quite know what they\'ll think until they play.',
  'Runner Up': 'The player who shows up the most but wins the least. Calculated by taking the number of plays and subtracting the number of wins — the higher that gap, the stronger the claim to this title. Requires at least 3 plays to qualify. They\'re always at the table, always in the mix, and always finding a way to just miss out.',
  'Daily Player': 'The player who has sat down to play on the most different calendar days. It\'s not about how many games they\'ve played in one sitting — it\'s about how many different days they\'ve shown up. This person doesn\'t need a special occasion. Any day is a good day for cards.',
};

function StatsScreen({ plays, allGames, onClose }) {
  const [activeAward, setActiveAward] = useState(null);

  const topGames = useMemo(() => {
    return allGames
      .map(g => ({ game: g, count: (plays[g.id] || []).length }))
      .filter(x => x.count > 0)
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }, [plays, allGames]);

  const awards = useMemo(() => computeAwards(plays, allGames), [plays, allGames]);

  const summary = useMemo(() => {
    const uniquePlayers = new Set();
    let gamesPlayed = 0;
    let totalPlays = 0;
    for (const gamePlays of Object.values(plays)) {
      if (gamePlays.length > 0) gamesPlayed++;
      totalPlays += gamePlays.length;
      gamePlays.forEach(play => {
        if (Array.isArray(play.ratings)) play.ratings.forEach(r => { if (r.name) uniquePlayers.add(r.name); });
      });
    }
    return { uniquePlayers: uniquePlayers.size, gamesPlayed, totalPlays };
  }, [plays, allGames]);

  const maxCount = topGames[0]?.count || 1;
  const mostPlayed = topGames[0];

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        if (activeAward) setActiveAward(null);
        else onClose();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, activeAward]);

  return (
    <>
      <div className="modal-backdrop" onClick={onClose}>
        <div className="modal-sheet stats-sheet" onClick={e => e.stopPropagation()}>
          <button className="modal-close" onClick={onClose}>✕</button>
          <h2 className="stats-screen-title">Stats</h2>

          {summary.gamesPlayed > 0 && (
            <div className="stats-summary">
              <div className="ss-item">
                <div className="ss-num">{summary.uniquePlayers}</div>
                <div className="ss-label">Players</div>
              </div>
              <div className="ss-item">
                <div className="ss-num">{summary.gamesPlayed}<span className="ss-of"> of {allGames.length}</span></div>
                <div className="ss-label">Games explored</div>
              </div>
              <div className="ss-item">
                <div className="ss-num">{summary.totalPlays}</div>
                <div className="ss-label">Total plays</div>
              </div>
            </div>
          )}

          {mostPlayed ? (
            <>
              <div className="stats-highlight">
                <div className="sh-label">Most played</div>
                <div className="sh-game">{mostPlayed.game.name}</div>
                <div className="sh-count">{mostPlayed.count} {mostPlayed.count === 1 ? 'play' : 'plays'}</div>
              </div>

              <div className="stats-chart">
                <div className="sc-heading">Top 5 most played</div>
                {topGames.map(({ game, count }, i) => (
                  <div key={game.id} className="sc-row">
                    <div className="sc-rank">{i + 1}</div>
                    <div className="sc-name">{game.name}</div>
                    <div className="sc-bar-track">
                      <div className="sc-bar-fill" style={{ width: `${(count / maxCount) * 100}%` }} />
                    </div>
                    <div className="sc-count">{count}</div>
                  </div>
                ))}
              </div>

              {awards.length > 0 && (
                <div className="awards-section">
                  <div className="sc-heading">Player Awards · tap a card to learn more</div>
                  <div className="awards-row">
                    {awards.map(award => (
                      <div key={award.title} className="award-card" onClick={() => setActiveAward(award)}>
                        <div className="ac-icon">{award.icon}</div>
                        <div className="ac-title">{award.title}</div>
                        <div className="ac-name">{award.name}</div>
                        <div className="ac-stat">{award.stat}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <p className="stats-screen-placeholder">No plays logged yet — get playing!</p>
          )}
        </div>
      </div>

      {activeAward && (
        <div className="award-def-backdrop" onClick={() => setActiveAward(null)}>
          <div className="award-def-popup" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setActiveAward(null)}>✕</button>
            <div className="award-def-icon">{activeAward.icon}</div>
            <div className="award-def-label">{activeAward.title}</div>
            <div className="award-def-name">{activeAward.name}</div>
            <div className="award-def-stat">{activeAward.stat}</div>
            <p className="award-def-body">{AWARD_DEFINITIONS[activeAward.title]}</p>
          </div>
        </div>
      )}
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
