const doors = {
  0: {
    closedImg: 'door1',
    position: {
      left: 40,
      top: 17,
      width: 32,
      height: 79
    },
    dest: 1,
    dir: 'FORWARD',
    mapPosition: {
      x: 2,
      y: 0
    },
    state: 'CLOSED',
    description: 'It\'s a heavy wooden door with iron hinges.',
    lockedText: 'Darn it, the thing\'s locked.  Now where could that key be???',
    // TODO: allow text to come in array form to customize pages
    openText: 'You open the door. It\'s the door leading into Birthday Castle.'
  },
  1: {
    dest: 0,
    dir: 'DOWN',
    mapPosition: {
      x: 2,
      y: 4
    },
    state: 'OPEN'
  },
  2: {
    closedImg: 'door2',
    position: {
      left: 48,
      top: 58,
      width: 16,
      height: 37
    },
    dest: 2,
    dir: 'FORWARD',
    mapPosition: {
      x: 2,
      y: 0
    },
    state: 'LOCKED',
    description: 'Yet another door. Great.',
    unlockText: 'Yay! You\'ve unlocked it!',
    openText: 'Hooray! You\'ve opened it!',
    need: 0,
  },
  3: {
    openImg: 'door3',
    position: {
      left: 76,
      top: 59,
      width: 9,
      height: 44
    },
    dest: 3,
    dir: 'FORWARD',
    mapPosition: {
      x: 4,
      y: 2
    },
    state: 'LOCKED',
    description: 'This door probably leads someplace unintersting',
    unlockText: 'Great, it\'s unlocked now',
    openText: 'Aaaaand you opened the door. How exciting.',
    need: 5
  },
  4: {
    dest: 1,
    dir: 'BACK',
    mapPosition: {
      x: 2,
      y: 4
    },
    state: 'OPEN'
  },
  5: {
    dest: 1,
    dir: 'BACK',
    mapPosition: {
      x: 2,
      y: 4
    },
    state: 'OPEN'
  },
  6: {
    dest: 5,
    openImg: 'door4',
    position: {
      left: 49,
      top: 50,
      width: 6,
      height: 13
    },
    dir: 'FORWARD',
    mapPosition: {
      x: 1,
      y: 0
    },
    hidden: true,
    state: 'CLOSED',
    openText: 'Oh nice. I guess there was a hidden door there.'
  },
  7: {
    closedImg: 'door5',
    position: {
      left: 17,
      top: 15,
      width: 9,
      height: 57
    },
    dest: 5,
    dir: 'LEFT',
    mapPosition: {
      x: 0,
      y: 2
    },
    state: 'CLOSED',
    description: 'A familiar, acrid odor eminates from the other side of of this door, as if seeping through the pores of the woods itself. There is a Buffolo Bills ensignia engraved on the side.',
    openText: 'Opened it! You have a good feeling about this one.'
  },
  8: {
    closedImg: 'door6',
    position: {
      left: 86,
      top: 15,
      width: 9,
      height: 57
    },
    dest: 6,
    dir: 'RIGHT',
    mapPosition: {
      x: 4,
      y: 2
    },
    state: 'CLOSED',
    description: 'This door probably leads someplace unintersting',
    openText: 'You keep opening doors. That\'s the spirit!'
  },
  9: {
    closedImg: 'door7',
    position: {
      left: 50,
      top: 25,
      width: 12,
      height: 23
    },
    dest: 7,
    dir: 'FORWARD',
    mapPosition: {
      x: 2,
      y: 0
    },
    state: 'CLOSED',
    description: 'This door probably leads someplace unintersting',
    openText: 'You keep opening doors. That\'s the spirit!'
  },
  10: {
    dest: 4,
    dir: 'FORWARD',
    mapPosition: {
      x: 4,
      y: 1
    },
    state: 'OPEN'
  },
  11: {
    dest: 2,
    dir: 'BACK',
    mapPosition: {
      x: 2,
      y: 4
    },
    state: 'OPEN'
  },
  12: {
    dest: 4,
    dir: 'DOWN',
    mapPosition: {
      x: 2,
      y: 4
    },
    state: 'OPEN'
  }
};

const items = {
  0: {
    name: 'key 1',
    position: {
      left: 52,
      top: 8,
      width: 8,
      height: 6,
    },
    img: 'key1',
    description: 'There\'s a random key embedded in the wall.',
    itemListDescription: 'This is a real nice-looking key.'
  },
  1: {
    position: {
      left: 80,
      top: 108,
      width: 28,
      height: 60,
    },
    img: 'plunger',
    description: 'Your average, run of the mill plunger. How boring.'
  },
  2: {
    position: {
      left: 99,
      top: 75,
      width: 72,
      height: 150
    },
    img: 'toilet',
    description: 'Welp, so much for using this toilet'
  },
  3: {
    name: 'torch',
    position: {
      left: 1,
      top: 20,
      width: 6,
      height: 27
    },
    img: 'torch1',
    description: 'One of two torches in this room'
  },
  4: {
    name: 'torch',
    position: {
      left: 105,
      top: 20,
      width: 6,
      height: 27
    },
    img: 'torch1',
    description: 'The other torch'
  },
  5: {
    name: 'key 2',
    img: 'key2',
    description: 'This key bears a skull. This must be a skeleton key.'
  },
  6: {
    name: 'sword',
    position: {
      left: 32,
      top: 30,
      width: 49,
      height: 9
    },
    img: 'sword',
    description: 'A sword'
  },
  7: {
    name: 'sling',
    position: {
      left: 43,
      top: 64,
      width: 29,
      height: 8
    },
    img: 'sling',
    description: 'A sling'
  },
  8: {
    name: 'torch',
    position: {
      left: 5,
      top: 33,
      width: 12,
      height: 21
    },
    img: 'torch2',
    description: 'A torch'
  },
  9: {
    name: 'torch',
    position: {
      left: 38,
      top: 36,
      width: 11,
      height: 15
    },
    img: 'torch3',
    description: 'A torch, man'
  },
  10: {
    name: 'scott',
    position: {
      left: 0,
      top: 0,
      width: 112,
      height: 112
    },
    img: 'scott',
    description: 'He seems aggressive, but you don\'t think there\'s any reason to be concerned at the moment.',
    itemListDescription: 'Scott is in your inventory now. Feel free to use him as you would any other items or spells.',
    onHit: '"Cool man. got any beer?"',
    onSpeak: '"I thought you said this party would be cool.", says Scott, looking concerned. "Why haven\'t I had any beer yet?"',
    requiresPrecision: true
  },
  11: {
    name: 'sign',
    img: 'welcomeSign',
    description: '_____The sign reads: ______"Welcome to" ____"Lobotomy Manor."                             But I\'m not at Lobotomy Manor!                   I\'m at Birthday Castle... right?' ,
    itemListDescription: 'Lobotomy Manor? Boy does this sign give me the creeps!',
    position: {
      left: 44,
      top: 36,
      width: 24,
      height: 18
    }
  },
  12: {
    name: 'frying pan',
    img: 'fryingPan',
    description: 'A commercial for a frying pan plays quietly in the background.',
    itemListDescription: 'Congratulations. You are the proud owner of a shiney, new frying pan',
    position: {
      left: 71,
      top: 20,
      width: 15,
      height: 15
    },
  },
  13: {
    name: 'bottle',
    img: 'bottle',
    description: 'You grow enraged as you realize that, while there is an unattended drink on the counter, it is simply a beer and not a gin and soda.',
    itemListDescription: 'A bottle. Ugh... You remember how you had to drink that beer instead of gin and soda. What an awful time you had. Frankly you could do without the soda too. All you really want is the gin. That sweet, nourishing gin.',
    position: {
      left: 50,
      top: 48,
      width: 8,
      height: 8
    },
    onTake: 'You chug the beer angrily in the hopes the bottle might come in handy later on.'
  },
};

const scenery = {
  0: {
    img: 'skull',
    description: 'It\'s the skull of some creature. Its meaning seems quite clear: death lurks inside.',
    startPosition: {
      left: 49,
      top: 4,
      width: 14,
      height: 15
    },
    endPosition: {
      left: 49,
      top: -8
    },
    trigger: 'OPEN',
    movedText: '"Whaaaaaat," you think to yourself as you watch the skull move itself upward. "That is absolutely fucking nuts."'
  },
  1: {
    name: 'book',
    description: 'It\'s an ancient tome. It seems that no one has disturbed its pages for centuries.',
    startPosition: {
      left: 21,
      top: 62,
      width: 15,
      height: 6
    },
    contains: [5],
    openText: 'The book is opened and examined. A rectangular hole has been cut out of the inside of the book.'
  },
  2: {
    img: 'jasonHidden',
    description: 'You must be seeing things. It is as though a man is there beyond the corner, doing a poor job of hiding from you.',
    startPosition: {
      left: 72,
      top: 22,
      width: 8,
      height: 56
    },
    onSpeak: 'You can\'t be sure, but you could swear you heard the words "Uncle Flesh" uttered from deep within this corridor.'
  },
  3: {
    name: 'gunk',
    description: 'The ground outside the entrance is overrun with bulbous green gunk.',
    startPosition: {
      left: 27,
      top: 73,
      width: 80,
      height: 30
    },
  },
  4: {
    img: 'eightBallSmall',
    description: 'It is an eight ball',
    startPosition: {
      left: 103,
      top: 73,
      width: 9,
      height: 9
    },
  }
};

const rooms = {
  0: {
    img: 'room0',
    description: 'It\'s the entrance to Shadowgate. You can hear wolves howling deep in the forest behind you.',
    doors: [0],
    items: [0],
    scenery: [0]
  },
  1: {
    img: 'room1',
    description: 'The lobby of Birthday Castle',
    initialDescription: 'A man stumbles toward you. "Oh shit is that Scott?" you wonder as you pull yourself through the half-ajar door. "Why am I not shocked to find him here..."',
    doors: [1, 2, 3],
    items: [11, 3, 4, 10],
    scenery: [] 
  },
  2: {
    img: 'room2',
    description: 'The stone passage winds to an unseen end.',
    doors: [4, 6, 10],
    items: [8, 9],
    scenery: [1, 2] 
  },
  3: {
    img: 'room3',
    description: 'It\'s nothing but a closet. An ordinary, run-of-the-mill closet. Oh, and some items.',
    doors: [5],
    items: [6, 7],
    scenery: [] 
  },
  4: {
    img: 'room4',
    description: 'There are more doors here.',
    doors: [7, 8, 9, 11],
    items: [],
    scenery: [] 
  },
  5: {
    img: 'room5',
    description: 'Why it\'s simply Redd\'s! For some reason you seem to have entered from the back.',
    doors: [12],
    items: [12, 13],
    scenery: [4] 
  },
  6: {
    img: 'room6',
    description: 'This place looks familiar. It\'s some place you haven\'t been in a long time.',
    doors: [12],
    items: [],
    scenery: [] 
  },
  7: {
    img: 'room7',
    description: 'You are delighted to find yourself outside of a friendly-looking pub resaurant.',
    doors: [12],
    items: [],
    scenery: [3] 
  }
};

const images = {
  jasonHidden: null,
  bag: null,
  scott: null,
  welcomeSign: null,
  alphaDark: null,
  alphaLight: null,
  border: null,
  cursor: null,
  door1: null,
  door2: null,
  door3: null,
  door4: null,
  door5: null,
  door6: null,
  door7: null,
  eightBallSmall: null,
  fryingPan: null,
  flame1: null,
  items: null,
  key1: null,
  line: null,
  menu: null,
  menuButton: null,
  room0: null,
  room1: null,
  room2: null,
  room3: null,
  room4: null,
  room5: null,
  room6: null,
  room7: null,
  sling: null,
  skull: null,
  sword: null,
  torch1: null,
  torch2: null,
  torch3: null,
  bottle: null
};

const playerState = {
  verb: 'LOOK',
  using: null,
  examining: null,
  room: 5,
  items: [],
  page: 0,
  bagLevel: 0
};

const gameState = {
  doors,
  items,
  rooms,
  scenery,
  images
};

const transition = {
  dest: null,
  frame: 0
};

const cursor = {
  enabled: true,
  position: {
    x: 128,
    y: 120
  }
};

const initialState = {
  playerState,
  gameState,
  transition,
  cursor,
  text: null,
  nextText: null,
  loading: false,
  menu: 'START'
};

export default initialState;
