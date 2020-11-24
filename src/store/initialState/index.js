const doors = {
  0: {
    img: 'door1',
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
    openText: 'You open the door. It\'s the door leading into castle shadowgate.'
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
    img: 'door2',
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
    // img: 'door3',
    position: {
      left: 40,
      top: 17,
      width: 32,
      height: 79
    },
    dest: 3,
    dir: 'FORWARD',
    mapPosition: {
      x: 4,
      y: 2
    },
    state: 'LOCKED'
  },
  4: {
    dest: 1,
    dir: 'BACK',
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
    movedText: 'Well I\'ll be dipped in shit and rolled in breadcrumbs. That skull just moved!'
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
    /**
     * TODO:
     * Differentiate between a room's initial text and text for subsequent visits
     */
    description: '"That pitiful wizard Lakmir was a fool to send a buffoon like you to stop me. You will surely regret it for the only thing here for you is a horrible death!" The sound of maniacal laughter echoes in your ears.',
    doors: [1, 2, 3],
    items: [3, 4],
    scenery: [] 
  },
  2: {
    img: 'room2',
    description: 'The stone passage winds to an unseen end.',
    doors: [4],
    items: [],
    scenery: [1] 
  }
};

const images = {
  alpha: null,
  border: null,
  cursor: null,
  door1: null,
  door2: null,
  flame1: null,
  items: null,
  key1: null,
  line: null,
  menu: null,
  menuButton: null,
  room0: null,
  room1: null,
  room2: null,
  skull: null,
  torch1: null
};

const playerState = {
  verb: 'LOOK',
  using: null,
  examining: null,
  room: 0,
  items: [],
  page: 0
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
  loading: false
};

export default initialState;
