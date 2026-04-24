// 50 classic & popular card games great for 3-5 players
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
    notePlaceholder: 'Shot the moon. No one saw it coming.',
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
    notePlaceholder: 'Overbid by 4. Sandbags caught up with us.',
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
    notePlaceholder: 'Laid down a clean run on the very first turn.',
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
    notePlaceholder: 'Knocked with 2 deadwood. They had gin right after.',
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
    notePlaceholder: 'Three eights in a row. Pure chaos.',
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
    notePlaceholder: 'Asked for sevens four times. Never got one.',
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
    notePlaceholder: 'Scum for two rounds straight. Revenge is coming.',
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
    notePlaceholder: 'Called it alone and took all 5. Legend.',
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
    notePlaceholder: 'Double pinochle. The table gasped.',
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
    notePlaceholder: '7-trick march. Silent but deadly.',
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
    notePlaceholder: 'Bid 3, took exactly 3. Finally.',
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
    notePlaceholder: 'Moved a whole pile onto a king and went out.',
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
    notePlaceholder: 'Won every pay card pot. Very lucky night.',
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
    notePlaceholder: 'Natural canasta on the first hand. Unreal.',
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
    notePlaceholder: 'Stuck on Phase 6 for three rounds. Someone nearly quit.',
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
    notePlaceholder: 'Declared grand and lost by 1 point. Collective groan.',
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
    notePlaceholder: 'Buried the wrong cards. Partner was not impressed.',
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
    notePlaceholder: 'Knocked the whole pile over. Counted it anyway.',
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
    notePlaceholder: 'Slapped the wrong card. Sore hand. Worth it.',
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
    notePlaceholder: 'Touched nose so slowly no one noticed for a full minute.',
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
    notePlaceholder: 'Called cheat six times. Right twice. Pile was enormous.',
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
    notePlaceholder: 'Cards flying everywhere. Nerts called in under 2 minutes.',
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
    notePlaceholder: 'Knocked with 28. Lost immediately. Told no one.',
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
    notePlaceholder: 'Swept the table three times in one hand. Scopa!',
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
    notePlaceholder: 'Three column pairs. Finished at 12. Par for Grandma.',
    description: 'Each player has a 2×3 grid of face-down cards. Swap with draws and discards to lower your hand. Matching pairs in a column cancel to zero. Low total wins.',
    howTo: [
      'Deal 6 cards face down in a 2×3 grid per player.',
      'Flip any 2 to start. Draw from stock or discard.',
      'Swap with a grid card or flip a face-down one.',
      'Pairs in a column = 0. Lowest over 9 rounds wins.'
    ]
  },
  {
    id: 'old-maid',
    name: 'Old Maid',
    tagline: "Don't be the one left holding her.",
    players: [2, 3, 4, 5, 6, 7, 8],
    best: 4,
    minutes: 15,
    difficulty: 1,
    luck: 4,
    deck: 'Standard 52 (one Queen removed)',
    categories: ['Matching', 'Kids-friendly', 'Social'],
    notePlaceholder: 'Held the Old Maid for three rounds. Everyone knew.',
    description: 'Remove three Queens, leaving one as the Old Maid. Deal all cards, discard any pairs, then take turns drawing from a neighbor\'s hand. Whoever ends up with the unmatched Queen loses.',
    howTo: [
      'Remove 3 Queens from the deck — the lone remaining Queen is the Old Maid.',
      'Deal all cards; players immediately discard any pairs from their hand.',
      'Take turns drawing one card at random from the player to your left.',
      'Discard new pairs as you form them. Holder of the lone Queen at the end loses.'
    ]
  },
  {
    id: 'liars-poker',
    name: "Liar's Poker",
    tagline: 'Bid on what you think is out there — or bluff.',
    players: [3, 4, 5, 6, 7, 8],
    best: 5,
    minutes: 20,
    difficulty: 2,
    luck: 3,
    deck: 'Standard 52',
    categories: ['Bluffing', 'Social', 'Bidding'],
    notePlaceholder: 'Bid four aces with two in hand. Got away with it.',
    description: 'Each player holds cards face-down. Players bid on how many cards of a given rank exist across all hands combined — like Liar\'s Dice but with cards. Raise the bid or call the bluff. Wrong side loses a life.',
    howTo: [
      'Deal 3 cards each, kept face-down. Players may peek at their own.',
      'First player bids a count and rank (e.g., "three sevens").',
      'Each player must raise: higher count of same rank, or any count of higher rank.',
      "Call 'liar!' to challenge. Reveal all cards — if bid is wrong, bidder loses a life; if right, challenger does."
    ]
  },
  {
    id: 'war',
    name: 'War',
    tagline: 'Flip and take — may the cards be with you.',
    players: [2, 3, 4],
    best: 2,
    minutes: 20,
    difficulty: 1,
    luck: 5,
    deck: 'Standard 52',
    categories: ['Matching', 'Kids-friendly'],
    notePlaceholder: 'Three-way war on the very last card. Unbelievable.',
    description: 'Pure luck, pure drama. Split the deck and flip simultaneously. High card takes the pile. Ties go to war — three face-down cards and one face-up. Most cards at the end wins.',
    howTo: [
      'Split the deck evenly between all players.',
      'Everyone flips one card face-up at the same time.',
      'Highest card wins all flipped cards and adds them to the bottom of their pile.',
      'Tie = war: place 3 face-down, flip 1 up. Highest of those wins everything.'
    ]
  },
  {
    id: 'snap',
    name: 'Snap',
    tagline: 'Same card — SNAP!',
    players: [2, 3, 4, 5, 6],
    best: 4,
    minutes: 10,
    difficulty: 1,
    luck: 4,
    deck: 'Standard 52',
    categories: ['Action', 'Kids-friendly', 'Social'],
    notePlaceholder: 'False snap cost the whole pile. Absolutely worth it.',
    description: 'Deal cards face down. Players take turns flipping one card onto their own pile. When any two top piles match in rank, first to shout "Snap!" wins both piles. False snaps are punished. Last player with cards wins.',
    howTo: [
      'Deal all cards face down; no peeking.',
      'Take turns flipping one card face-up onto your own personal pile.',
      'When two top piles match in rank, shout "Snap!" and take both piles.',
      'False snap? Give one card to each other player. Last player with cards wins.'
    ]
  },
  {
    id: 'cribbage',
    name: 'Cribbage',
    tagline: 'Peg your way to 121.',
    players: [2, 3, 4],
    best: 2,
    minutes: 30,
    difficulty: 4,
    luck: 2,
    deck: 'Standard 52 + cribbage board',
    categories: ['Counting', 'Strategy'],
    notePlaceholder: 'Pegged out on a 29-point hand. Once in a lifetime.',
    description: 'One of England\'s oldest card games. Discard to the crib, play cards toward 31, then score combinations in your hand. Fifteens, pairs, runs, and flushes all score. First to peg 121 wins.',
    howTo: [
      'Deal 6 cards each; discard 2 to the shared "crib" (dealer scores it later).',
      'Play cards alternately, announcing running total; score for hitting 15 or 31.',
      'Score your hand: 2 pts per fifteen-combination, pairs, runs, and flushes.',
      'Peg points on the board as you score. First to 121 wins.'
    ]
  },
  {
    id: 'blackjack',
    name: 'Blackjack',
    tagline: 'Beat 21 — without going over.',
    players: [2, 3, 4, 5, 6, 7, 8],
    best: 5,
    minutes: 20,
    difficulty: 2,
    luck: 3,
    deck: 'Standard 52',
    categories: ['Counting', 'Social'],
    notePlaceholder: 'Dealer busted four hands in a row. The house lost everything.',
    description: 'Get closer to 21 than the dealer without busting. Face cards are 10, Aces are 1 or 11. Hit, stand, or double down. Simple to learn, rewarding to play well.',
    howTo: [
      'One player deals; others place bets before cards are dealt.',
      'Each player and the dealer get 2 cards; dealer shows one face-up.',
      'Hit (take a card) or stand. Go over 21 and you bust — you lose.',
      'Dealer must hit on 16 or under, stand on 17+. Beat dealer without busting to win.'
    ]
  },
  {
    id: 'palace',
    name: 'Palace',
    tagline: 'Empty your hand, your face-ups, then gamble blind.',
    players: [2, 3, 4, 5, 6],
    best: 4,
    minutes: 25,
    difficulty: 2,
    luck: 3,
    deck: 'Standard 52',
    categories: ['Shedding', 'Social'],
    notePlaceholder: 'Blind-picked a 2 on the last face-down card. Saved.',
    description: 'Also called Karma or Shed. Play equal or higher cards onto the pile to shed your hand, then face-up palace cards, then blind face-down ones. Special cards shake things up: 2 resets, 10 burns the pile. Last to clear loses.',
    howTo: [
      'Deal 3 face-down, 3 face-up on top of those, and 3 in hand per player.',
      'Play a card equal or higher than the top of the discard pile; pick up the pile if you can\'t.',
      'Clear your hand first, then play face-up cards, then flip face-down ones blind.',
      '2 resets to any value; 10 burns the entire pile. Last player to clear their cards loses.'
    ]
  },
  {
    id: 'concentration',
    name: 'Concentration',
    tagline: 'Remember where everything is.',
    players: [2, 3, 4, 5, 6],
    best: 3,
    minutes: 20,
    difficulty: 2,
    luck: 2,
    deck: 'Standard 52',
    categories: ['Matching', 'Memory', 'Kids-friendly'],
    notePlaceholder: 'Grandma remembered the 7 of clubs from twelve turns ago.',
    description: 'Also called Memory or Pairs. Lay all cards face down in a grid. Flip two — if they match in rank, keep them and go again. If not, flip them back over and remember where they were. Most pairs wins.',
    howTo: [
      'Lay all 52 cards face down in a 4×13 grid.',
      'Take turns flipping two cards face-up.',
      'Matching rank? Keep the pair and take another turn.',
      'No match? Flip them back face-down. Player with most pairs at the end wins.'
    ]
  },
  {
    id: 'five-card-draw',
    name: 'Five-Card Draw',
    tagline: 'The poker your grandpa taught your dad.',
    players: [2, 3, 4, 5, 6],
    best: 5,
    minutes: 20,
    difficulty: 3,
    luck: 3,
    deck: 'Standard 52',
    categories: ['Poker', 'Bluffing', 'Bidding'],
    notePlaceholder: 'Drew to an inside straight. It actually came in.',
    description: 'The original poker. Bet on your initial hand, then discard up to three cards and draw replacements to improve it. A second betting round, then showdown. Best five-card hand wins the pot.',
    howTo: [
      'Ante up, then deal 5 cards face-down to each player.',
      'First betting round: call, raise, or fold.',
      'Discard and draw up to 3 replacement cards (4 if you hold an Ace).',
      'Second betting round, then showdown. Best poker hand wins.'
    ]
  },
  {
    id: 'sevens',
    name: 'Sevens',
    tagline: 'Build out from the sevens — or get stuck.',
    players: [3, 4, 5, 6, 7, 8],
    best: 5,
    minutes: 20,
    difficulty: 1,
    luck: 3,
    deck: 'Standard 52',
    categories: ['Layout', 'Social', 'Kids-friendly'],
    notePlaceholder: 'Sat on the 8 of hearts for four rounds. Pure evil.',
    description: 'Also called Fan Tan or Parliament. All four sevens anchor the center; players extend each suit up toward King and down toward Ace. Hold key cards to block opponents. Last to empty their hand loses.',
    howTo: [
      'Deal all cards evenly (some players may get one extra).',
      'Player with 7♦ plays it first; others may play any seven or extend an existing sequence.',
      'Build each suit up to King or down to Ace beside its seven.',
      'Can\'t play? Pass and take a penalty chip. First to empty hand wins.'
    ]
  },
  {
    id: 'texas-holdem',
    name: "Texas Hold'em",
    tagline: 'Two cards. Five community. Your best hand wins.',
    players: [2, 3, 4, 5, 6, 7, 8],
    best: 5,
    minutes: 30,
    difficulty: 3,
    luck: 3,
    deck: 'Standard 52',
    categories: ['Poker', 'Bluffing', 'Bidding'],
    notePlaceholder: 'Flopped a full house and slow-played it perfectly.',
    description: 'The world\'s most popular poker variant. Each player gets 2 private hole cards; 5 community cards are revealed in stages. Build the best 5-card hand from any combination. Four betting rounds keep the pressure on.',
    howTo: [
      'Post blinds, then deal 2 face-down hole cards to each player.',
      'First betting round (pre-flop), then reveal 3 community cards (the flop). Bet again.',
      'Reveal the 4th card (turn), bet; then the 5th (river), final bet.',
      'Showdown: best 5-card hand from any combination of your 2 hole cards and 5 community cards wins.'
    ]
  },
  {
    id: 'speed',
    name: 'Speed',
    tagline: 'No turns. Just go.',
    players: [2],
    best: 2,
    minutes: 10,
    difficulty: 2,
    luck: 3,
    deck: 'Standard 52',
    categories: ['Action', 'Shedding'],
    notePlaceholder: 'Lost three games in a row. Demanded rematches each time.',
    description: 'A lightning-fast simultaneous game for two. Both players flip center cards at the same time and race to shed their hand by playing one rank higher or lower onto either pile. No turns — pure reaction speed.',
    howTo: [
      'Deal 20 cards to each player with two center piles and two face-down replacement piles.',
      'Both players flip one center card simultaneously — then play freely with no turns.',
      'Play a card one rank higher or lower than either center pile top.',
      'Empty your hand pile to win. If both get stuck, flip new center cards and continue.'
    ]
  },
  {
    id: 'kemps',
    name: 'Kemps',
    tagline: 'Four of a kind — signal your partner without getting caught.',
    players: [4, 6, 8],
    best: 4,
    minutes: 20,
    difficulty: 2,
    luck: 3,
    deck: 'Standard 52',
    categories: ['Matching', 'Social', 'Partnership'],
    notePlaceholder: 'Partner called Kemps before I even noticed we had four of a kind.',
    description: 'A hilarious team game where partners devise a secret signal before play. Race to collect four of a kind, then subtly signal your partner to call "Kemps!" If the other team spots your signal and calls "Cut!" first, you lose the round.',
    howTo: [
      'Partners sit across from each other and secretly agree on a signal (a wink, a tap, etc.).',
      'Deal 4 cards each; flip 4 to the center. Players swap cards with the center freely.',
      'Get four of a kind and give your secret signal to your partner.',
      'Partner calls "Kemps!" to win the round; opponents call "Cut!" if they spot the signal first.'
    ]
  },
  {
    id: 'indian-poker',
    name: 'Indian Poker',
    tagline: 'Everyone can see your card — except you.',
    players: [3, 4, 5, 6, 7, 8],
    best: 5,
    minutes: 15,
    difficulty: 1,
    luck: 4,
    deck: 'Standard 52',
    categories: ['Poker', 'Bluffing', 'Social'],
    notePlaceholder: 'Had a 2 the whole time. Bet with total confidence. Big mistake.',
    description: 'Each player draws one card and holds it face-out against their forehead without peeking — everyone sees your card but you. Bet based on what everyone else is showing. Highest card at showdown wins.',
    howTo: [
      'Deal one card face-down to each player. No peeking.',
      'Without looking, hold your card face-outward against your forehead.',
      'Bet based on what you can see on other players\' foreheads — not your own.',
      'After betting, reveal. Highest card wins the pot.'
    ]
  },
  {
    id: 'chase-the-ace',
    name: 'Chase the Ace',
    tagline: 'Keep it, swap it, or hope the King saves you.',
    players: [3, 4, 5, 6, 7, 8],
    best: 5,
    minutes: 15,
    difficulty: 1,
    luck: 4,
    deck: 'Standard 52',
    categories: ['Social', 'Kids-friendly'],
    notePlaceholder: 'Swapped into an Ace on the last pass. Eliminated immediately.',
    description: 'Also called Cuckoo. Everyone starts with three lives. Each round you try not to end with the lowest card. You can swap with the player to your left — unless they hold a King, which blocks the swap. Ace is lowest.',
    howTo: [
      'Give everyone 3 tokens (lives) and deal one card each.',
      'Look at your card; swap with the player to your left or choose to keep it.',
      'Kings cannot be swapped — holder reveals it immediately and is safe.',
      'Dealer may swap with the top of the deck. Player with the lowest card loses a life. Last one standing wins.'
    ]
  },
  {
    id: 'pitch',
    name: 'Pitch',
    tagline: 'Name your trump and take what you bid.',
    players: [3, 4, 5, 6],
    best: 4,
    minutes: 30,
    difficulty: 3,
    luck: 2,
    deck: 'Standard 52',
    categories: ['Trick-taking', 'Bidding'],
    notePlaceholder: 'Pitched a 4-bid and swept all four points clean.',
    description: 'Also called Setback or High-Low-Jack. Bid to name trump; the highest bidder leads a trump card to set the suit. Score points for capturing High trump, Low trump, the Jack of trump, and Game (most pip value). Miss your bid and get set back.',
    howTo: [
      'Deal 6 cards each; players bid 2–4 on how many of the 4 available points they\'ll take.',
      'Highest bidder names trump by leading any trump card ("pitching" it).',
      'Play out 6 tricks. Score: 1 pt each for High trump, Low trump, Jack of trump, and Game.',
      'Make bid = score it; fall short = subtract your bid from your score. First to 11 wins.'
    ]
  },
  {
    id: 'rummy-500',
    name: 'Rummy 500',
    tagline: 'Raid the discard pile — the points are all in there.',
    players: [2, 3, 4, 5, 6],
    best: 4,
    minutes: 30,
    difficulty: 2,
    luck: 3,
    deck: 'Standard 52',
    categories: ['Draw & Discard', 'Rummy-style'],
    notePlaceholder: 'Grabbed a 14-card discard pile and went out two turns later.',
    description: 'Rummy with a key twist: the discard pile is fanned face-up and you can take any card from it — as long as you take everything above it too. Meld sets and runs; score their face value. First to 500 wins.',
    howTo: [
      'Deal 7 cards each (13 for 2 players); fan the discard pile face-up so all cards are visible.',
      'Draw from the stock or take any card in the discard pile along with everything on top of it.',
      'Meld sets and runs face-up on the table. Lay off cards onto existing melds.',
      'Go out by melding all cards. Score the value of your melds minus cards left in hand. First to 500 wins.'
    ]
  },
  {
    id: 'cassino',
    name: 'Cassino',
    tagline: 'Capture cards by matching or combining values.',
    players: [2, 3, 4],
    best: 2,
    minutes: 25,
    difficulty: 3,
    luck: 2,
    deck: 'Standard 52',
    categories: ['Capture', 'Strategy', 'Counting'],
    notePlaceholder: 'Swept the whole table with the 10 of diamonds. Big Cassino.',
    description: 'An old and elegant capture game. Play a card from hand to take table cards that match its value or sum to it. The 10♦ (Big Cassino) and 2♠ (Little Cassino) are worth extra. Score for most cards, most spades, and special cards.',
    howTo: [
      'Deal 4 to each player and 4 face-up to the table; redeal each time hands empty.',
      'Play one card to capture table cards that match it or whose values sum to it.',
      'Build combinations on the table (e.g., "building 9") for future capture.',
      'Score: most cards (3), most spades (1), Big Cassino 10♦ (2), Little Cassino 2♠ (1), each Ace (1).'
    ]
  },
  {
    id: 'hand-and-foot',
    name: 'Hand and Foot',
    tagline: 'Canasta, but you get two full hands to work with.',
    players: [4, 6],
    best: 4,
    minutes: 90,
    difficulty: 3,
    luck: 2,
    deck: 'Four decks + jokers',
    categories: ['Draw & Discard', 'Rummy-style', 'Partnership'],
    notePlaceholder: 'Picked up the foot on round two and ran away with it.',
    description: 'A beloved canasta-family partnership game. Each player gets two stacks — a "hand" they start with and a "foot" they open later. Build melds toward canastas across multiple rounds. First partnership to 10,000 points wins.',
    howTo: [
      'Deal 11 cards as the "hand" and 11 more face-down as the "foot" to each player.',
      'Draw 2, discard 1. Meld sets of 3+ same rank; jokers and twos are wild.',
      'Pick up the "foot" only after playing out your entire "hand."',
      'Complete canastas (7 cards) to be eligible to go out. First to 10,000 points wins.'
    ]
  },
  {
    id: 'garbage',
    name: 'Garbage',
    tagline: 'Race to arrange Ace through 10 in order.',
    players: [2, 3, 4, 5],
    best: 3,
    minutes: 20,
    difficulty: 1,
    luck: 4,
    deck: 'Standard 52',
    categories: ['Layout', 'Kids-friendly'],
    notePlaceholder: 'Drew the King wild card and slotted it perfectly.',
    description: 'Also called Trash. Deal 10 face-down cards per player in a numbered row. Draw from the deck and place cards in their matching positions (Ace = 1, 2 = 2, and so on). Kings are wild; Jacks and Queens are dead draws. First to fill all ten spots wins.',
    howTo: [
      'Deal 10 cards face-down in a row to each player, numbered positions 1–10.',
      'Draw a card; if it fits a numbered position, place it face-up and flip the displaced card.',
      'Keep placing flipped cards until you draw a Jack, Queen (useless — discard), or a card already filled.',
      'King is wild — place it anywhere. First to complete all 10 positions wins the round.'
    ]
  },
  {
    id: 'egyptian-rat-screw',
    name: 'Egyptian Rat Screw',
    tagline: 'Slap the pile — but only when the rules say so.',
    players: [2, 3, 4, 5, 6, 7, 8],
    best: 5,
    minutes: 20,
    difficulty: 2,
    luck: 4,
    deck: 'Standard 52',
    categories: ['Action', 'Social', 'Kids-friendly'],
    notePlaceholder: 'Caught the sandwich from across the table. My finest hour.',
    description: 'A turbo-charged slap game with rules that reward quick eyes. Play cards onto a central pile in turn. Face cards trigger a countdown the next player must beat with their own face card — or give up their chance. Slap the pile instantly on doubles or sandwiches to steal it.',
    howTo: [
      'Deal all cards out; players hold them face-down without looking.',
      'Take turns flipping one card face-up onto the central pile.',
      'Slap the pile immediately for: doubles (same rank back-to-back) or a sandwich (same rank with exactly one card between).',
      'Face card played (J = 1, Q = 2, K = 3, A = 4 chances): next player must answer with another face card or surrender. Correct slapper takes the pile; false slap costs 2 cards.'
    ]
  },
  {
    id: 'cabo',
    name: 'Cabo',
    tagline: 'Peek, swap, and call Cabo when your total is low.',
    players: [2, 3, 4, 5],
    best: 4,
    minutes: 25,
    difficulty: 2,
    luck: 3,
    deck: 'Standard 52',
    categories: ['Memory', 'Draw & Discard'],
    notePlaceholder: 'Called Cabo with 3 total. No one believed it until the reveal.',
    description: 'A memory-and-deduction game where less is more. Each player gets 4 face-down cards and peeks at two to start. Draw and swap to drive your hand total down. Special face-card powers let you peek or swap blindly. Declare "Cabo!" when you think your total is lowest — but everyone else gets one last turn to catch up.',
    howTo: [
      'Deal 4 cards face-down to each player; secretly peek at your bottom two.',
      'On your turn: draw from the stock or discard pile, then either swap it with a face-down card or discard it.',
      'Face-card powers: King = peek at one of your own; Queen = peek at an opponent\'s; Jack = blind swap with an opponent.',
      'Call "Cabo!" on your turn to trigger final turns for all others. Lowest total wins — but if someone ties or beats you, you lose instead.'
    ]
  },
  {
    id: 'pontoon',
    name: 'Pontoon',
    tagline: "Britain's answer to Blackjack — with two winning bonuses.",
    players: [3, 4, 5, 6, 7, 8],
    best: 5,
    minutes: 20,
    difficulty: 2,
    luck: 3,
    deck: 'Standard 52',
    categories: ['Counting', 'Social'],
    notePlaceholder: 'Hit pontoon AND a five-card trick in the same hand. Double payout.',
    description: 'The classic British betting game. Get closer to 21 than the banker without busting. Two special hands beat everything: Pontoon (Ace + any ten-value) and a Five-Card Trick (five cards without busting). Players can twist (hit) or buy (double bet for one card). Ties always go to the banker.',
    howTo: [
      'One player is the banker; all others place bets, then each player and the banker receive one card face-down.',
      'Banker deals a second round. Players peek at both cards, then twist (take a card) or buy (double stake for 1 card).',
      'Bust over 21 and lose your stake immediately. Stick when satisfied at 15–21.',
      'Banker reveals and must draw to beat all hands. Pontoon (A + 10-value card) and Five-Card Trick pay double.'
    ]
  },
  {
    id: 'sergeant-major',
    name: 'Sergeant Major',
    tagline: 'Three players, three different trick targets.',
    players: [3],
    best: 3,
    minutes: 30,
    difficulty: 3,
    luck: 2,
    deck: 'Standard 52',
    categories: ['Trick-taking', 'Bidding'],
    notePlaceholder: 'Hit 8 tricks as dealer on a terrible hand. Pure graft.',
    description: 'Also called 8-5-3. A crisp three-player trick-taker where each seat has a different quota: the dealer must take 8 of 16 tricks, the second player 5, and the third 3. Beat your quota and extort a card from whoever fell short; miss and pay the toll next round.',
    howTo: [
      'Deal 16 cards to each player; set 4 aside as a face-down blind. Dealer picks up the blind and discards 4.',
      'Dealer names trump, then leads the first trick. Follow suit if you can.',
      'Targets: dealer = 8 tricks, player to dealer\'s left = 5 tricks, remaining player = 3 tricks.',
      'After the hand, each player who beat their quota takes one card from a player who fell short. Swap continues until targets are met.'
    ]
  },
  {
    id: 'spite-and-malice',
    name: 'Spite and Malice',
    tagline: "Competitive solitaire — block your rival's stack.",
    players: [2, 3, 4],
    best: 2,
    minutes: 30,
    difficulty: 2,
    luck: 3,
    deck: 'Two standard decks',
    categories: ['Patience', 'Strategy'],
    notePlaceholder: 'Buried their Ace under three cards. Pure spite. Pure malice.',
    description: 'Also called Cat and Mouse — and the inspiration for the commercial game Skip-Bo. Each player races to clear their personal payoff pile by building shared center stacks from Ace to Queen. Manage four personal discard piles as staging ground, and use Kings as wild cards. Block, bait, and deny your opponent the card they need.',
    howTo: [
      'Shuffle two decks together. Deal 20 cards face-down to each player as their "payoff" pile; flip the top card of each.',
      'Deal 5 cards to each player\'s hand. Four shared center stacks build Ace → Queen; each player also has 4 personal discard piles.',
      'On your turn: play from your hand or payoff pile top onto center stacks in sequence, or onto your own discard piles in any order. Kings are wild.',
      'Refill your hand to 5 at the end of your turn. First player to clear their payoff pile wins.'
    ]
  }
];
