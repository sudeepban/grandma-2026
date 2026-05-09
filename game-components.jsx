// GameCard + GameDetail modal + PlayLog entry form

function NameInput({ id, value, onChange, placeholder, knownNames }) {
  const [open, setOpen] = React.useState(false);
  const wrapRef = React.useRef(null);

  const suggestions = (knownNames || []).filter(n =>
    n.toLowerCase().includes(value.toLowerCase()) &&
    n.toLowerCase() !== value.toLowerCase()
  );

  React.useEffect(() => {
    function onDown(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, []);

  return (
    <div className="name-input-wrap" ref={wrapRef}>
      <input
        id={id}
        type="text"
        value={value}
        autoComplete="off"
        placeholder={placeholder}
        onChange={e => { onChange(e.target.value); setOpen(true); }}
        onFocus={() => setOpen(true)}
      />
      {open && suggestions.length > 0 && (
        <ul className="name-dropdown" role="listbox">
          {suggestions.map(name => (
            <li
              key={name}
              className="name-dropdown-item"
              role="option"
              onMouseDown={e => { e.preventDefault(); onChange(name); setOpen(false); }}
            >
              {name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function GameCard({ game, onOpen, plays }) {
  const overallAvg = overallAvgFromPlays(plays);
  const accent = game.accent || 'burgundy';
  return (
    <article className={`game-card accent-${accent}`} onClick={() => onOpen(game)}>
      <CardCorner rank={game.corner?.rank || 'A'} suit={game.corner?.suit || 'spades'} />
      <CardCorner rank={game.corner?.rank || 'A'} suit={game.corner?.suit || 'spades'} rotated />

      <div className="gc-top">
        <span className="gc-cat">{game.categories.join(' · ')}</span>
        {overallAvg !== null && (
          <span className="gc-avg">
            <span className="gc-avg-star">★</span>
            {overallAvg.toFixed(1)}
          </span>
        )}
      </div>

      <h3 className="gc-name">{game.name}</h3>
      <p className="gc-tagline">{game.tagline}</p>

      <div className="gc-stats">
        <PlayersBadge players={game.players} best={game.best} />
        <TimeBadge minutes={game.minutes} />
      </div>

      <div className="gc-meters">
        <PipMeter value={game.difficulty} label="Difficulty" tone="burgundy" />
        <PipMeter value={game.luck} label="Luck" tone="gold" />
      </div>

      <div className="gc-foot">
        <span className="gc-deck">{game.deck}</span>
        <span className="gc-plays">
          {plays.length === 0 ? 'Not played yet' : `${plays.length} play${plays.length > 1 ? 's' : ''} logged`}
        </span>
      </div>
    </article>
  );
}

function perPlayerAverages(plays) {
  const map = {};
  for (const play of plays) {
    if (!Array.isArray(play.ratings)) continue;
    for (const r of play.ratings) {
      if (!r.name) continue;
      if (!map[r.name]) map[r.name] = { total: 0, count: 0 };
      map[r.name].total += r.rating;
      map[r.name].count += 1;
    }
  }
  return Object.entries(map)
    .map(([name, { total, count }]) => ({ name, avg: total / count, count }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

function overallAvgFromPlays(plays) {
  const playerAvgs = perPlayerAverages(plays);
  if (playerAvgs.length === 0) return null;
  return playerAvgs.reduce((s, p) => s + p.avg, 0) / playerAvgs.length;
}

function GameDetail({ game, onClose, plays, onAddPlay, onDeletePlay, knownNames, currentUser }) {
  const [tab, setTab] = React.useState('how');
  const [formOpen, setFormOpen] = React.useState(false);

  React.useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!game) return null;
  const playerAvgs = perPlayerAverages(plays);
  const overallAvg = overallAvgFromPlays(plays);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-sheet" onClick={e => e.stopPropagation()}>
        <CardCorner rank={game.corner?.rank || 'A'} suit={game.corner?.suit || 'spades'} />
        <CardCorner rank={game.corner?.rank || 'A'} suit={game.corner?.suit || 'spades'} rotated />

        <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>

        <div className="modal-header">
          <div className="md-top">
            <span className="md-cat">{game.categories.join(' · ')}</span>
            {overallAvg !== null && (
              <span className="gc-avg md-avg">
                <span className="gc-avg-star">★</span>
                {overallAvg.toFixed(1)}
              </span>
            )}
          </div>
          <h2 className="md-title">{game.name}</h2>
          <p className="md-tagline">{game.tagline}</p>
        </div>

        <div className="modal-stats">
          <div className="ms-item">
            <div className="ms-num">{Math.min(...game.players)}–{Math.max(...game.players)}</div>
            <div className="ms-lbl">Players</div>
            <div className="ms-sub">best at {game.best}</div>
          </div>
          <div className="ms-item">
            <div className="ms-num">{game.minutes}</div>
            <div className="ms-lbl">Minutes</div>
          </div>
          <div className="ms-item">
            <div className="ms-num">{game.difficulty}<span className="ms-of">/5</span></div>
            <div className="ms-lbl">Difficulty</div>
            <div className="ms-sub"><DifficultyLabel value={game.difficulty} /></div>
          </div>
          <div className="ms-item">
            <div className="ms-num">{game.luck}<span className="ms-of">/5</span></div>
            <div className="ms-lbl">Luck factor</div>
          </div>
          <div className="ms-item ms-item-wide">
            <div className="ms-num ms-num-small">{game.deck}</div>
            <div className="ms-lbl">Deck</div>
          </div>
        </div>

        <p className="md-desc">{game.description}</p>

        <div className="tab-row">
          <button className={`tab-btn ${tab === 'how' ? 'tab-active' : ''}`} onClick={() => setTab('how')}>
            How to play
          </button>
          <button className={`tab-btn ${tab === 'log' ? 'tab-active' : ''}`} onClick={() => setTab('log')}>
            Play log {plays.length > 0 && <span className="tab-count">{plays.length}</span>}
          </button>
        </div>

        {tab === 'how' && (
          <ol className="how-list">
            {game.howTo.map((step, i) => (
              <li key={i}>
                <span className="how-num">{i + 1}</span>
                <span className="how-text">{step}</span>
              </li>
            ))}
          </ol>
        )}

        {tab === 'log' && (
          <div className="log-wrap">
            {playerAvgs.length > 0 && (
              <div className="log-summary">
                {playerAvgs.map(({ name, avg, count }) => (
                  <div key={name} className="log-summary-player">
                    <span className="lsp-name">{name}</span>
                    <StarRating value={Math.round(avg)} readOnly />
                    <span className="lsp-val">{avg.toFixed(1)}</span>
                    <span className="lsp-count">{count} play{count > 1 ? 's' : ''}</span>
                  </div>
                ))}
              </div>
            )}

            {!formOpen && currentUser && (
              <button className="btn-primary" onClick={() => setFormOpen(true)}>
                + Log a play
              </button>
            )}

            {!formOpen && !currentUser && (
              <div className="auth-gate">
                <p className="auth-gate-msg">Sign in with Google to log a play.</p>
                <button className="auth-google-btn" onClick={() => window.GameSync.signIn().catch(console.error)}>
                  <svg className="auth-google-icon" viewBox="0 0 24 24" aria-hidden="true">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Sign in with Google
                </button>
              </div>
            )}

            {formOpen && (
              <PlayLogForm
                game={game}
                knownNames={knownNames}
                onCancel={() => setFormOpen(false)}
                onSubmit={(entry) => {
                  onAddPlay(game.id, entry);
                  setFormOpen(false);
                }}
              />
            )}

            <div className="plays-list">
              {plays.length === 0 && !formOpen && (
                <div className="plays-empty">
                  <p>No one's logged a play yet.</p>
                  <p className="pe-sub">Be the first — click above when you've played.</p>
                </div>
              )}
              {[...plays].reverse().map(p => (
                <PlayEntry key={p.id} play={p} onDelete={() => onDeletePlay(game.id, p.id)} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function PlayLogForm({ game, onCancel, onSubmit, knownNames }) {
  const [playerRatings, setPlayerRatings] = React.useState(
    Array.from({ length: 3 }, () => ({ name: '', rating: 0, won: false }))
  );
  const [date, setDate] = React.useState(() => new Date().toISOString().slice(0, 10));
  const [note, setNote] = React.useState('');

  const canSubmit = playerRatings.length > 0 && playerRatings.every(p => p.name.trim() && p.rating > 0);

  function updatePlayer(i, field, value) {
    setPlayerRatings(prev => prev.map((p, idx) => idx === i ? { ...p, [field]: value } : p));
  }

  return (
    <form
      className="play-form"
      onSubmit={(e) => {
        e.preventDefault();
        if (!canSubmit) return;
        const avg = playerRatings.reduce((s, p) => s + p.rating, 0) / playerRatings.length;
        const winner = playerRatings
          .filter(p => p.won && p.name.trim())
          .map(p => p.name.trim())
          .join(', ');
        onSubmit({
          id: Date.now().toString(36) + Math.random().toString(36).slice(2, 5),
          ratings: playerRatings,
          rating: avg,
          players: playerRatings.length,
          date,
          note: note.trim(),
          winner,
          createdAt: Date.now()
        });
      }}
    >
      <div className="pf-header">
        <h4>Log a play of {game.name}</h4>
        <button type="button" className="pf-close" onClick={onCancel} aria-label="Cancel">✕</button>
      </div>

      <div className="pf-field">
        <label>Who played, how did they rate it, and did they win?<span className="req"> *</span></label>
        {playerRatings.map((p, i) => (
          <div key={i} className="pf-player-row">
            <NameInput
              value={p.name}
              onChange={v => updatePlayer(i, 'name', v)}
              placeholder={i === 0 ? 'Grandma' : `Player ${i + 1}`}
              knownNames={knownNames}
            />
            <StarRating value={p.rating} onChange={v => updatePlayer(i, 'rating', v)} size={30} />
            <button
              type="button"
              className={`pf-won-btn ${p.won ? 'pf-won-active' : ''}`}
              onClick={() => updatePlayer(i, 'won', !p.won)}
              aria-label={p.won ? 'Remove winner' : 'Mark as winner'}
              title={p.won ? 'Winner' : 'Mark as winner'}
            >♛</button>
            {playerRatings.length > 1 && (
              <button
                type="button"
                className="pf-player-remove"
                onClick={() => setPlayerRatings(prev => prev.filter((_, idx) => idx !== i))}
                aria-label="Remove player"
              >×</button>
            )}
          </div>
        ))}
        <button
          type="button"
          className="pf-add-player"
          onClick={() => setPlayerRatings(prev => [...prev, { name: '', rating: 0, won: false }])}
        >+ Add player</button>
      </div>

      <div className="pf-field">
        <label htmlFor="pf-date">Date played</label>
        <input
          id="pf-date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <div className="pf-field">
        <label htmlFor="pf-note">Notes <span className="opt">(optional)</span></label>
        <textarea
          id="pf-note"
          rows="3"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder={game.notePlaceholder || 'What happened? Who surprised everyone?'}
        />
      </div>

      <div className="pf-actions">
        <button type="button" className="btn-ghost" onClick={onCancel}>Cancel</button>
        <button type="submit" className="btn-primary" disabled={!canSubmit}>Save play</button>
      </div>
    </form>
  );
}

function PlayEntry({ play, onDelete }) {
  const dateLabel = (() => {
    try {
      const d = new Date(play.date);
      return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
    } catch { return play.date; }
  })();
  const hasIndividualRatings = Array.isArray(play.ratings) && play.ratings.length > 0;
  const winners = play.winner
    ? new Set(play.winner.split(',').map(s => s.trim()).filter(Boolean))
    : new Set();
  return (
    <div className="play-entry">
      <div className="pe-row">
        <span className="pe-date">{dateLabel}</span>
        <div className="pe-meta">
          <span className="pe-chip">{play.players} players</span>
        </div>
      </div>
      <div className="pe-ratings">
        {hasIndividualRatings ? (
          play.ratings.map((r, i) => (
            <div key={i} className={`pe-player-rating ${winners.has(r.name) ? 'pe-player-winner' : ''}`}>
              <span className={`pe-winner-crown ${winners.has(r.name) ? '' : 'pe-crown-hidden'}`}>♛</span>
              <span className="pe-player-name">{r.name}</span>
              <StarRating value={r.rating} readOnly size={20} />
            </div>
          ))
        ) : (
          <div className="pe-player-rating">
            <span className="pe-player-name">{play.who}</span>
            <StarRating value={play.rating} readOnly size={20} />
          </div>
        )}
      </div>
      {play.note && <p className="pe-note">"{play.note}"</p>}
      <button className="pe-delete" onClick={onDelete} aria-label="Delete entry">Remove</button>
    </div>
  );
}

Object.assign(window, { GameCard, GameDetail, PlayLogForm, PlayEntry, overallAvgFromPlays });
