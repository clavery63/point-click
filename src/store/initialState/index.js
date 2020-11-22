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
    openText: 'You open the door. It\'s the door leading into castle shadowgate.',
    need: 'key1'
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
    state: 'LOCKED'
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
  }
};

const items = {
  0: {
    name: 'key1',
    position: {
      left: 52,
      top: 8,
      width: 8,
      height: 6,
    },
    img: 'key1',
    description: 'This is a nice-looking key.',
    itemListDescription: 'I wonder what it\'s used for'
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
      top: -8,
      width: 14,
      height: 15
    },
    trigger: 'OPEN',
    movedText: 'Well I\'ll be dipped in shit and rolled in breadcrumbs. That skull just moved!'
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
    description: '"That pitiful wizard Lakmir was a fool to send a buffoon like you to stop me. You will surely regret it for the only thing here for you is a horrible death!" The sound of maniacal laughter echoes in your ears.',
    doors: [1, 2, 3],
    items: [3, 4],
    scenery: [] 
  },
};

const images = {
  alpha: null,
  border: null,
  door1: null,
  door2: null,
  items: null,
  key1: null,
  line: null,
  menu: null,
  menuButton: null,
  room0: null,
  room1: null,
  skull: null,
  torch1: null,
  cursor: null
};

const playerState = {
  verb: 'LOOK',
  using: null,
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
