// GameCard + GameDetail modal + PlayLog entry form

function GameCard({ game, onOpen, plays }) {
  const playerAvgs = perPlayerAverages(plays);
  const accent = game.accent || 'burgundy';
  return (
    <article className={`game-card accent-${accent}`} onClick={() => onOpen(game)}>
      <CardCorner rank={game.corner?.rank || 'A'} suit={game.corner?.suit || 'spades'} />
      <CardCorner rank={game.corner?.rank || 'A'} suit={game.corner?.suit || 'spades'} rotated />

      <div className="gc-top">
        <span className="gc-cat">{game.categories.join(' · ')}</span>
        {playerAvgs.length > 0 && (
          <span className="gc-avg" title="Per-player averages">
            {playerAvgs.map(({ name, avg }) => (
              <span key={name} className="gc-avg-player">
                <span className="gc-avg-name">{name[0]}</span>
                <span className="gc-avg-star">★</span>
                {avg.toFixed(1)}
              </span>
            ))}
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

function GameDetail({ game, onClose, plays, onAddPlay, onDeletePlay }) {
  const [tab, setTab] = React.useState('how');
  const [formOpen, setFormOpen] = React.useState(false);

  React.useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!game) return null;
  const playerAvgs = perPlayerAverages(plays);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-sheet" onClick={e => e.stopPropagation()}>
        <CardCorner rank={game.corner?.rank || 'A'} suit={game.corner?.suit || 'spades'} />
        <CardCorner rank={game.corner?.rank || 'A'} suit={game.corner?.suit || 'spades'} rotated />

        <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>

        <div className="modal-header">
          <span className="md-cat">{game.categories.join(' · ')}</span>
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

            {!formOpen && (
              <button className="btn-primary" onClick={() => setFormOpen(true)}>
                + Log a play
              </button>
            )}

            {formOpen && (
              <PlayLogForm
                game={game}
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

function PlayLogForm({ game, onCancel, onSubmit }) {
  const [playerRatings, setPlayerRatings] = React.useState(
    Array.from({ length: 3 }, () => ({ name: '', rating: 0 }))
  );
  const [date, setDate] = React.useState(() => new Date().toISOString().slice(0, 10));
  const [note, setNote] = React.useState('');
  const [winner, setWinner] = React.useState('');

  const canSubmit = playerRatings.length > 0 && playerRatings.every(p => p.name.trim() && p.rating > 0);

  const NAME_SHORTCUTS = { g: 'Grandma', k: 'Kiran', m: 'Mia', d: 'Deep', s: 'Samantha' };

  function updatePlayer(i, field, value) {
    if (field === 'name' && value.length === 1) {
      const expanded = NAME_SHORTCUTS[value.toLowerCase()];
      if (expanded && playerRatings[i].name === '') value = expanded;
    }
    setPlayerRatings(prev => prev.map((p, idx) => idx === i ? { ...p, [field]: value } : p));
  }

  return (
    <form
      className="play-form"
      onSubmit={(e) => {
        e.preventDefault();
        if (!canSubmit) return;
        const avg = playerRatings.reduce((s, p) => s + p.rating, 0) / playerRatings.length;
        onSubmit({
          id: Date.now().toString(36) + Math.random().toString(36).slice(2, 5),
          ratings: playerRatings,
          rating: avg,
          players: playerRatings.length,
          date,
          note: note.trim(),
          winner: winner.trim(),
          createdAt: Date.now()
        });
      }}
    >
      <div className="pf-header">
        <h4>Log a play of {game.name}</h4>
        <button type="button" className="pf-close" onClick={onCancel} aria-label="Cancel">✕</button>
      </div>

      <div className="pf-field">
        <label>Who played & how did they rate it? <span className="req">*</span></label>
        {playerRatings.map((p, i) => (
          <div key={i} className="pf-player-row">
            <input
              type="text"
              value={p.name}
              onChange={e => updatePlayer(i, 'name', e.target.value)}
              placeholder={i === 0 ? 'Grandma' : `Player ${i + 1}`}
            />
            <StarRating value={p.rating} onChange={v => updatePlayer(i, 'rating', v)} size={30} />
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
          onClick={() => setPlayerRatings(prev => [...prev, { name: '', rating: 0 }])}
        >+ Add player</button>
      </div>

      <div className="pf-row">
        <div className="pf-field">
          <label htmlFor="pf-winner">Who won? <span className="opt">(optional)</span></label>
          <input
            id="pf-winner"
            type="text"
            value={winner}
            onChange={(e) => setWinner(e.target.value)}
            placeholder="Grandma, obviously"
          />
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
  return (
    <div className="play-entry">
      <div className="pe-row">
        <span className="pe-date">{dateLabel}</span>
        <div className="pe-meta">
          <span className="pe-chip">{play.players} players</span>
          {play.winner && <span className="pe-chip pe-chip-gold">🏆 {play.winner}</span>}
        </div>
      </div>
      <div className="pe-ratings">
        {hasIndividualRatings ? (
          play.ratings.map((r, i) => (
            <div key={i} className="pe-player-rating">
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

Object.assign(window, { GameCard, GameDetail, PlayLogForm, PlayEntry });
