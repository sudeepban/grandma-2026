// 25 classic & popular card games great for 3-5 players
// Uses a standard 52-card deck unless noted. Curated for Grandma's birthday night.

window.GAMES_DATA = [
  {
    id: 'hearts',
    name: 'Hearts',
    tagline: 'Avoid the Queen of Spades at all costs.',
    players: [3, 4, 5, 6],
    best: 4,
    minutes: 30,
    difficulty: 2,
    luck: 2,
    deck: 'Standard 52',
    categories: ['Trick-taking', 'Strategy'],
    description: 'A classic trick-taking game where you try to take the fewest points. Every heart is 1 point, the Queen of Spades is a dreaded 13. Low score wins. Or shoot the moon and take them all.',
    howTo: [
      'Deal all cards evenly (remove 2♣ for 3/5 players).',
      'Pass 3 cards each round (left, right, across, hold).',
      'The 2♣ leads the first trick; follow suit if you can.',
      'Score 1 per heart taken, 13 for the Q♠. First to 100 loses.'
    ]
  },
  {
    id: 'spades',
    name: 'Spades',
    tagline: 'Bid what you can take — no more, no less.',
    players: [3, 4],
    best: 4,
    minutes: 45,
    difficulty: 3,
    luck: 2,
    deck: 'Standard 52',
    categories: ['Trick-taking', 'Partnership', 'Bidding'],
    description: 'Partnership trick-taking with spades as permanent trump. Bid the number of tricks you\'ll win, then try to hit your bid exactly. Overbids sting, underbids are disastrous.',
    howTo: [
      'Deal 13 cards to each of 4 players (partners across).',
      'Each player bids the number of tricks they expect.',
      'Spades are always trump; can\'t be led until "broken."',
      'Score 10 × bid if made, plus 1 per overtrick (sandbag).'
    ]
  },
  {
    id: 'rummy',
    name: 'Rummy',
    tagline: 'Melds, runs, and a race to empty your hand.',
    players: [2, 3, 4, 5, 6],
    best: 4,
    minutes: 25,
    difficulty: 1,
    luck: 3,
    deck: 'Standard 52',
    categories: ['Draw & Discard', 'Rummy-style'],
    description: 'The grandmother of matching games. Draw a card, lay down sets or runs, discard. First to go out wins the hand; losers pay the value of cards left in hand.',
    howTo: [
      'Deal 7–10 cards depending on player count.',
      'On your turn: draw from stock or discard, then discard.',
      'Meld sets (3+ same rank) or runs (3+ consecutive, same suit).',
      'Going out ends the hand; count pip value of opponents\' cards.'
    ]
  },
  {
    id: 'gin-rummy',
    name: 'Gin Rummy',
    tagline: 'Knock early, or go for the gin.',
    players: [2, 3, 4],
    best: 2,
    minutes: 20,
    difficulty: 2,
    luck: 3,
    deck: 'Standard 52',
    categories: ['Draw & Discard', 'Rummy-style'],
    description: 'A sleek two-hand rummy. With 3–4 players use the "captains" variant or rotate as dealer. Arrange your hand into melds and knock when your deadwood is 10 or less.',
    howTo: [
      'Deal 10 cards each; flip one card to start discard.',
      'Draw and discard; arrange melds privately in hand.',
      'Knock when deadwood ≤ 10, or call "gin" at zero.',
      'Opponent may lay off cards onto knocker\'s melds.'
    ]
  },
  {
    id: 'crazy-eights',
    name: 'Crazy Eights',
    tagline: 'Match the suit, match the rank, or play an 8.',
    players: [2, 3, 4, 5, 6, 7],
    best: 4,
    minutes: 15,
    difficulty: 1,
    luck: 4,
    deck: 'Standard 52',
    categories: ['Shedding', 'Matching', 'Kids-friendly'],
    description: 'The ancestor of UNO. Match the top of the discard pile by suit or rank. Eights are wild — play one and declare a new suit. First to empty their hand wins.',
    howTo: [
      'Deal 5 cards (7 for 2 players); flip one up.',
      'Play a card matching suit or rank of top card.',
      'Eights are wild: play one and name a new suit.',
      'Can\'t play? Draw until you can. First out wins.'
    ]
  },
  {
    id: 'go-fish',
    name: 'Go Fish',
    tagline: 'Any fives? Go fish!',
    players: [3, 4, 5, 6],
    best: 4,
    minutes: 15,
    difficulty: 1,
    luck: 4,
    deck: 'Standard 52',
    categories: ['Matching', 'Kids-friendly'],
    description: 'A gentle, gossipy matching game. Ask opponents for a rank you hold. If they have it, they hand it over. If not — go fish. Most books of four at the end wins.',
    howTo: [
      'Deal 5 cards each (7 for 2–3 players).',
      'Ask a specific player for a specific rank.',
      'If they have it, collect all; go again. Else, go fish.',
      'Collect 4 of a kind to make a "book." Most books wins.'
    ]
  },
  {
    id: 'president',
    name: 'President',
    tagline: 'Climb the social ladder, one round at a time.',
    players: [3, 4, 5, 6, 7],
    best: 5,
    minutes: 25,
    difficulty: 1,
    luck: 3,
    deck: 'Standard 52',
    categories: ['Shedding', 'Social'],
    description: 'Also called Scum or A**hole. Players race to shed cards; finish order sets next round\'s hierarchy. The President gets tribute from the Scum. Cheerfully ruthless.',
    howTo: [
      'Deal all cards out evenly.',
      'Lead any single, pair, triple, or quad. Next must beat it.',
      'Pass if you can\'t or won\'t play. Twos clear the pile.',
      'First out = President; last out = Scum. Ranks swap cards.'
    ]
  },
  {
    id: 'euchre',
    name: 'Euchre',
    tagline: 'Midwestern magic with only 24 cards.',
    players: [3, 4],
    best: 4,
    minutes: 30,
    difficulty: 3,
    luck: 3,
    deck: '24-card (9–A)',
    categories: ['Trick-taking', 'Partnership'],
    description: 'A brisk partnership trick-taker played with 9s through Aces. The Jack of the trump suit (the "right bower") is the highest card. Call trump or pass — first to 10 wins.',
    howTo: [
      'Deal 5 cards each; flip the top card for potential trump.',
      'Players accept or pass on making that card\'s suit trump.',
      'Jack of trump = right bower; same-color Jack = left bower.',
      'Take 3+ tricks to score; "march" all 5 for bonus points.'
    ]
  },
  {
    id: 'pinochle',
    name: 'Pinochle',
    tagline: 'Melds, bids, and a 48-card pack.',
    players: [3, 4],
    best: 4,
    minutes: 45,
    difficulty: 4,
    luck: 2,
    deck: 'Pinochle (48)',
    categories: ['Trick-taking', 'Partnership', 'Bidding'],
    description: 'A rich bidding and melding game using a special 48-card deck (two of each 9–A). Score points both for melds you declare and tricks you take. A grandparent favorite.',
    howTo: [
      'Deal 12 cards each (3-hand: 15 each + 3 widow).',
      'Bid for the right to name trump.',
      'Declare melds (marriages, runs, pinochle) for points.',
      'Play tricks; count aces, tens, kings captured.'
    ]
  },
  {
    id: 'whist',
    name: 'Whist',
    tagline: 'The quiet Victorian ancestor of Bridge.',
    players: [4],
    best: 4,
    minutes: 30,
    difficulty: 2,
    luck: 3,
    deck: 'Standard 52',
    categories: ['Trick-taking', 'Partnership'],
    description: 'Elegant, conversation-free trick-taking. No bidding — last card dealt fixes trump. Partnerships race to take the most tricks. 3-player variant uses a "dummy" hand.',
    howTo: [
      'Deal 13 cards each; flip dealer\'s last card for trump.',
      'Lead any card; others follow suit if they can.',
      'Highest of suit led (or highest trump) wins.',
      'Score 1 per trick over 6. First to 5 (or 7) wins.'
    ]
  },
  {
    id: 'oh-hell',
    name: 'Oh Hell!',
    tagline: 'Bid exactly right — or bust.',
    players: [3, 4, 5, 6, 7],
    best: 4,
    minutes: 30,
    difficulty: 2,
    luck: 3,
    deck: 'Standard 52',
    categories: ['Trick-taking', 'Bidding'],
    description: 'Also called Oh Pshaw. Hand size shrinks (or grows) each round. You bid the exact tricks you\'ll take — miss by one and you score nothing. Clever and merciless.',
    howTo: [
      'Round 1: 1 card each; add 1 per round (or subtract).',
      'Flip next card for trump; everyone bids in turn.',
      'Play out all tricks. Make your bid exactly!',
      'Hit bid = 10 + tricks; miss = 0. High total wins.'
    ]
  },
  {
    id: 'kings-corner',
    name: 'Kings in the Corner',
    tagline: 'Solitaire with frenemies.',
    players: [2, 3, 4],
    best: 4,
    minutes: 20,
    difficulty: 1,
    luck: 3,
    deck: 'Standard 52',
    categories: ['Patience', 'Draw & Discard'],
    description: 'A cooperative-feeling layout game. Four foundation piles plus four "corners" for kings. Play descending alternating colors. First to empty their hand wins.',
    howTo: [
      'Deal 7 each; flip 4 cards as foundation piles (N/S/E/W).',
      'Draw 1, then make any legal plays: descending, alt color.',
      'Kings go in the corners; start new diagonal piles on them.',
      'Move whole piles onto others to free up your hand.'
    ]
  },
  {
    id: 'michigan',
    name: 'Michigan Rummy',
    tagline: 'Part rummy, part poker, all chips.',
    players: [3, 4, 5, 6, 7, 8],
    best: 5,
    minutes: 30,
    difficulty: 2,
    luck: 4,
    deck: 'Standard 52',
    categories: ['Mixed', 'Rummy-style'],
    description: 'A three-phase chip game: ante to pay cards, play poker, then a stops game where sequences win pots. A laughing-around-the-table staple.',
    howTo: [
      'Set up "pay cards" (A♥ K♣ Q♦ J♠ + 10♥).',
      'Everyone antes a chip on each pay card.',
      'Deal cards including a dead hand; play poker hands.',
      'Stops phase: play in sequence; stops claim pay-card pots.'
    ]
  },
  {
    id: 'canasta',
    name: 'Canasta',
    tagline: 'Seven of a kind for the big points.',
    players: [2, 3, 4],
    best: 4,
    minutes: 60,
    difficulty: 4,
    luck: 2,
    deck: 'Two decks + jokers',
    categories: ['Draw & Discard', 'Rummy-style', 'Partnership'],
    description: 'The 1950s sensation. Partners build melds of the same rank; seven of a kind is a canasta. Jokers and twos are wild. Freeze the discard pile to thwart your foes.',
    howTo: [
      'Deal 11 cards each; use two decks + 4 jokers.',
      'Draw 2, discard 1. Meld 3+ cards of same rank.',
      'A meld of 7 = canasta: 500 (mixed) or 700 (pure).',
      'Must have a canasta to "go out." First to 5000 wins.'
    ]
  },
  {
    id: 'phase-10',
    name: 'Phase 10',
    tagline: 'Ten phases. One winner. Lots of yelling.',
    players: [2, 3, 4, 5, 6],
    best: 4,
    minutes: 60,
    difficulty: 2,
    luck: 3,
    deck: 'Phase 10 deck',
    categories: ['Rummy-style', 'Draw & Discard'],
    description: 'A rummy cousin with a set list of ten increasingly tricky phases. Complete the current phase to advance; if not, you\'re stuck repeating it. First through all ten wins.',
    howTo: [
      'Deal 10 cards each.',
      'Try to complete your current phase (e.g., 2 sets of 3).',
      'Go out by discarding your last card.',
      'Score penalty pts for cards left; advance phase if made.'
    ]
  },
  {
    id: 'skat',
    name: 'Skat',
    tagline: 'Germany\'s national brain-buster.',
    players: [3],
    best: 3,
    minutes: 45,
    difficulty: 5,
    luck: 2,
    deck: '32-card (7–A)',
    categories: ['Trick-taking', 'Bidding'],
    description: 'One of the great three-player card games in the world. Aggressive bidding, clever melds with the two-card skat, and a deep trump hierarchy. Rewards mastery.',
    howTo: [
      'Deal 10 cards each + 2 to the skat (middle).',
      'Bid for the right to declare the game type.',
      'Declarer plays alone vs the other two.',
      'Score 61+ card points to win (declared contract).'
    ]
  },
  {
    id: 'sheepshead',
    name: 'Sheepshead',
    tagline: 'Wisconsin\'s beloved tavern classic.',
    players: [3, 4, 5],
    best: 5,
    minutes: 40,
    difficulty: 4,
    luck: 2,
    deck: '32-card (7–A)',
    categories: ['Trick-taking', 'Partnership', 'Bidding'],
    description: 'A shifting-partners trick-taker where Queens and Jacks become the top trumps. The "picker" takes the blind and usually plays with a silent partner revealed mid-hand.',
    howTo: [
      'Deal all cards; leave a 2-card "blind."',
      'First to pick takes the blind, buries 2, chooses partner.',
      'Q♣ is highest; all Queens, Jacks, diamonds are trump.',
      'Picker\'s team needs 61+ card points to win.'
    ]
  },
  {
    id: 'spoons',
    name: 'Spoons',
    tagline: 'Four of a kind — then grab!',
    players: [3, 4, 5, 6, 7, 8],
    best: 5,
    minutes: 15,
    difficulty: 1,
    luck: 4,
    deck: 'Standard 52',
    categories: ['Action', 'Social', 'Kids-friendly'],
    description: 'Chaotic, hilarious, physical. Pass cards rapidly. The moment someone gets four of a kind, they grab a spoon — everyone else dives for the rest. One short.',
    howTo: [
      'Place (players − 1) spoons in the center.',
      'Deal 4 cards each. Pass one card left, constantly.',
      'On 4-of-a-kind, quietly take a spoon. Others pounce.',
      'Left without a spoon? That\'s a letter in S-P-O-O-N.'
    ]
  },
  {
    id: 'slapjack',
    name: 'Slapjack',
    tagline: 'Slap the Jack — fastest hand wins.',
    players: [3, 4, 5, 6, 7, 8],
    best: 4,
    minutes: 10,
    difficulty: 1,
    luck: 5,
    deck: 'Standard 52',
    categories: ['Action', 'Social', 'Kids-friendly'],
    description: 'Deal cards one at a time to a center pile. When a Jack appears, the first hand to slap it wins the pile. Fast, giggly, great for mixed ages.',
    howTo: [
      'Deal all cards face down to players.',
      'In turn, flip one card face up onto the center pile.',
      'When a Jack lands, first to slap it takes the pile.',
      'Out of cards? Out of the game. Last player wins.'
    ]
  },
  {
    id: 'pig',
    name: 'Pig',
    tagline: 'Sneakily touch your nose — last one\'s the pig.',
    players: [3, 4, 5, 6, 7, 8],
    best: 5,
    minutes: 10,
    difficulty: 1,
    luck: 3,
    deck: 'Standard 52',
    categories: ['Action', 'Social', 'Kids-friendly'],
    description: 'Pass cards simultaneously around the table trying to collect four of a kind. When you get it, stealthily touch your nose. Everyone else must follow. Last one: P-I-G.',
    howTo: [
      'Use one set of 4-of-a-kind per player (mix & deal 4 each).',
      'Everyone passes one card left at the same time.',
      'On 4-of-a-kind, casually touch your nose.',
      'Last to catch on earns a letter. Spell PIG and you\'re out.'
    ]
  },
  {
    id: 'cheat',
    name: 'Cheat (B.S.)',
    tagline: 'Liars prosper — if they don\'t get caught.',
    players: [3, 4, 5, 6, 7, 8],
    best: 5,
    minutes: 20,
    difficulty: 1,
    luck: 3,
    deck: 'Standard 52',
    categories: ['Bluffing', 'Social'],
    description: 'A game of poker-faced fibbing. Play cards face down and declare their rank — truthfully or not. Anyone can call "cheat!" Loser takes the whole pile.',
    howTo: [
      'Deal all cards out evenly.',
      'Play 1–4 face-down cards and declare a rank (in order A, 2, 3…).',
      'Anyone may call "cheat!" Flip the claimed cards.',
      'Liar (or wrong challenger) takes the pile. First empty wins.'
    ]
  },
  {
    id: 'nerts',
    name: 'Nerts',
    tagline: 'Competitive solitaire, all at once.',
    players: [2, 3, 4, 5, 6],
    best: 4,
    minutes: 20,
    difficulty: 2,
    luck: 3,
    deck: 'One deck per player',
    categories: ['Patience', 'Action'],
    description: 'Also called Pounce. Every player has their own deck and plays solitaire simultaneously onto shared center foundations. Speed matters. Yell "Nerts!" when your pile empties.',
    howTo: [
      'Each player uses their own deck (different backs).',
      'Deal a 13-card "Nerts" pile + 4 work piles.',
      'All play at once onto shared Ace foundations in the middle.',
      'Empty your Nerts pile and yell "Nerts!" to end the round.'
    ]
  },
  {
    id: 'thirty-one',
    name: 'Thirty-One',
    tagline: 'Race to 31 in a single suit.',
    players: [3, 4, 5, 6, 7, 8],
    best: 5,
    minutes: 15,
    difficulty: 1,
    luck: 4,
    deck: 'Standard 52',
    categories: ['Draw & Discard', 'Bluffing'],
    description: 'Also called Scat or Blitz. Build the best 3-card hand in one suit (face cards = 10, Ace = 11). Knock when you think you\'re safe. Lowest hand loses a life.',
    howTo: [
      'Deal 3 cards each; start 3 face up in the middle.',
      'On your turn, swap 1 or all 3 with the middle.',
      'Knock instead of drawing when you like your hand.',
      'After knock, one round more; lowest loses a life.'
    ]
  },
  {
    id: 'scopa',
    name: 'Scopa',
    tagline: 'An elegant Italian sweep.',
    players: [2, 3, 4],
    best: 4,
    minutes: 25,
    difficulty: 2,
    luck: 2,
    deck: 'Italian 40',
    categories: ['Capture', 'Strategy'],
    description: 'A beautiful capture game played with a 40-card Italian deck (or A–7, J, Q, K from a standard deck). Sweep the table with a single matching card and shout "Scopa!"',
    howTo: [
      'Deal 3 cards each; lay 4 face up on the table.',
      'Play a card; capture a table card of equal value (or sum).',
      'Clearing the whole table in one play = scopa (bonus pt).',
      'Score for most cards, most coins, 7 of coins, primiera.'
    ]
  },
  {
    id: 'golf',
    name: 'Golf (6-card)',
    tagline: 'Low score wins — just like the real thing.',
    players: [2, 3, 4, 5, 6, 7, 8],
    best: 4,
    minutes: 25,
    difficulty: 1,
    luck: 3,
    deck: 'Standard 52',
    categories: ['Draw & Discard', 'Patience'],
    description: 'Each player has a 2×3 grid of face-down cards. Swap with draws and discards to lower your hand. Matching pairs in a column cancel to zero. Low total wins.',
    howTo: [
      'Deal 6 cards face down in a 2×3 grid per player.',
      'Flip any 2 to start. Draw from stock or discard.',
      'Swap with a grid card or flip a face-down one.',
      'Pairs in a column = 0. Lowest over 9 rounds wins.'
    ]
  }
];
