// Reusable UI pieces for Grandma's Card Games site

const SUITS = {
  hearts: '♥',
  diamonds: '♦',
  spades: '♠',
  clubs: '♣'
};

// Small rank+suit chip — playing-card corner style
function SuitPip({ suit = 'spades', rank = 'A', small = false }) {
  const red = suit === 'hearts' || suit === 'diamonds';
  return (
    <span className={`suit-pip ${red ? 'pip-red' : 'pip-black'} ${small ? 'pip-small' : ''}`}>
      <span className="pip-rank">{rank}</span>
      <span className="pip-suit">{SUITS[suit]}</span>
    </span>
  );
}

// Row of filled/empty pips to show a 1-5 rating/level
function PipMeter({ value, max = 5, label, tone = 'burgundy' }) {
  return (
    <div className="pip-meter" title={`${label}: ${value}/${max}`}>
      <span className="pip-meter-label">{label}</span>
      <span className="pip-meter-dots">
        {Array.from({ length: max }).map((_, i) => (
          <span
            key={i}
            className={`pip-dot pip-dot-${tone} ${i < value ? 'filled' : ''}`}
          />
        ))}
      </span>
    </div>
  );
}

// Range chip like "3–5 players"
function PlayersBadge({ players, best }) {
  const min = Math.min(...players);
  const max = Math.max(...players);
  return (
    <span className="players-badge">
      <span className="pb-count">{min === max ? min : `${min}–${max}`}</span>
      <span className="pb-label">players</span>
      {best && <span className="pb-best">best at {best}</span>}
    </span>
  );
}

function TimeBadge({ minutes }) {
  return (
    <span className="time-badge">
      <span className="tb-num">{minutes}</span>
      <span className="tb-label">min</span>
    </span>
  );
}

// Decorative card-corner flourish
function CardCorner({ rank = 'A', suit = 'spades', rotated = false }) {
  const red = suit === 'hearts' || suit === 'diamonds';
  return (
    <div className={`card-corner ${rotated ? 'corner-rot' : ''} ${red ? 'corner-red' : 'corner-black'}`}>
      <div className="corner-rank">{rank}</div>
      <div className="corner-suit">{SUITS[suit]}</div>
    </div>
  );
}

// Star rating input (clickable 1-5)
function StarRating({ value, onChange, readOnly = false, size = 22 }) {
  const [hover, setHover] = React.useState(0);
  return (
    <div className="star-row" style={{ fontSize: size }}>
      {[1, 2, 3, 4, 5].map(n => (
        <button
          key={n}
          type="button"
          disabled={readOnly}
          className={`star ${n <= (hover || value) ? 'star-on' : ''}`}
          onMouseEnter={() => !readOnly && setHover(n)}
          onMouseLeave={() => !readOnly && setHover(0)}
          onClick={() => !readOnly && onChange && onChange(n)}
          aria-label={`${n} star${n > 1 ? 's' : ''}`}
        >
          ★
        </button>
      ))}
    </div>
  );
}

function Chip({ children, active, onClick, tone = 'default' }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`chip chip-${tone} ${active ? 'chip-active' : ''}`}
    >
      {children}
    </button>
  );
}

function DifficultyLabel({ value }) {
  const labels = ['', 'Easy-breezy', 'Light', 'Medium', 'Meaty', 'Brainy'];
  return <span className="diff-label">{labels[value] || '—'}</span>;
}

// Share to window for cross-script use
Object.assign(window, {
  SuitPip, PipMeter, PlayersBadge, TimeBadge, CardCorner,
  StarRating, Chip, DifficultyLabel, SUITS
});
