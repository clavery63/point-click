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
    dest: 4,
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
  }
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
    openText: 'The book is opened and examined. A rectangular hole has been cut out of the inside of the book'
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
    initialDescription: 'A man stumbles toward you. "Oh shit is that Scott?" you wonder yourself as you pull yourself through the half-ajar door. "Why am I not shocked to find him here..."',
    doors: [1, 2, 3],
    items: [11, 3, 4, 10],
    scenery: [] 
  },
  2: {
    img: 'room2',
    description: 'The stone passage winds to an unseen end.',
    doors: [4, 6],
    items: [8, 9],
    scenery: [1] 
  },
  3: {
    img: 'room3',
    description: 'It\'s nothing but a closet. An ordinary, run-of-the-mill closet. Oh, and some items.',
    doors: [5],
    items: [6, 7],
    scenery: [] 
  }
};

const images = {
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
  sling: null,
  skull: null,
  sword: null,
  torch1: null,
  torch2: null,
  torch3: null
};

const playerState = {
  verb: 'LOOK',
  using: null,
  examining: null,
  room: 0,
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
