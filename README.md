# Grandma's Card Games — 2026

A family card-game companion site for Grandma's birthday. Browse 25 hand-picked card games for 3–5 players, learn the rules, and log plays with ratings and notes that sync across everyone's devices.

## What's in this repo

| File | Purpose |
|---|---|
| `index.html` | Main page (entry point for GitHub Pages) |
| `app.jsx` | Main React app, filters, state |
| `components.jsx` | Small UI pieces (pips, badges, stars) |
| `game-components.jsx` | GameCard, GameDetail modal, PlayLogForm |
| `games-data.js` | The 25 curated games |
| `tweaks-panel.jsx` | Optional tweaks panel scaffolding |
| `styles.css` | All styling |
| `firebase-config.js` | Firebase project config (safe to commit) |
| `sync.js` | Realtime Database live sync layer |
| `database.rules.json` | Copy-paste into Firebase Console (Realtime DB rules) |

## Deploy to GitHub Pages

1. Merge the PR into the `main` branch of `sudeepban/grandma-2026`.
2. In the repo on GitHub: **Settings → Pages**.
3. Set **Source** to `Deploy from a branch`, **Branch** to `main`, folder `/ (root)`.
4. Save. In a minute or two the site will be live at:
   **https://sudeepban.github.io/grandma-2026/**

## Configure Firebase Realtime Database (one-time)

1. Go to the [Firebase Console](https://console.firebase.google.com/project/grandma-2026/overview).
2. **Build → Realtime Database → Create database** (if not already created). Choose your region and start in **locked mode** — we'll paste rules next.
3. **Realtime Database → Rules** tab → replace the contents with the JSON in `database.rules.json` → **Publish**.
4. That's it — the site reads and writes to your Realtime Database project. Plays appear in real time across every device viewing the site.

## The family passphrase

Every play is stamped with a shared passphrase (`grandma2026` by default) to keep random internet folks from writing to your database. The Realtime DB rules reject writes without it.

- **Change the passphrase** by editing `FAMILY_PASSPHRASE` in `firebase-config.js` AND the matching string in `database.rules.json`, then republish the rules.
- To disable the gate entirely, remove the passphrase checks from the rules (not recommended for a public URL).

## Local preview

Just open `index.html` in a browser, or run any static server in this folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Customizing games

Edit `games-data.js`. Each game has: name, tagline, players array, best count, minutes, difficulty (1–5), luck (1–5), deck, category, description, howTo (step array).
