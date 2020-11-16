const doors = {
  0: {
    name: 'door1',
    position: {
      left: 40,
      top: 17,
      width: 50,
      height: 50
    },
    dest: 1,
    dir: 'FORWARD',
    mapPosition: {
      x: 3,
      y: 0
    },
    state: 'LOCKED',
    lockedText: 'Darn it, the thing\'s locked.  Now where could that key be???',
    need: 'key-1',
  },
  1: {
    dest: 0,
    dir: 'DOWN',
    mapPosition: {
      x: 3,
      y: 5
    }
  }
};

const items = {
  0: {
    position: {
      left: 52,
      top: 8,
      width: 74,
      height: 53,
    },
    name: 'key1',
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
    name: 'plunger',
    description: 'Your average, run of the mill plunger. How boring.'
  },
  2: {
    position: {
      left: 99,
      top: 75,
      width: 72,
      height: 150
    },
    name: 'toilet',
    description: 'Welp, so much for using this toilet'
  }
};

const rooms = {
  0: {
    name: 'entryway',
    text: 'It\'s the entrance to Shadowgate. You can hear wolves howling deep in the forest behind you',
    doors: [0],
    items: [0],
    scenery: [0]
  },
  1: {
    name: 'Redd\'s: Bathroom',
    text: 'Redd\'s bathroom.  Looks like its been cleaned recently, which is odd.',
    doors: [3],
    items: [
    ]
  },
};

const scenery = {
  0: {
    name: 'skull',
    text: 'It\'s the skull of some creature. Its meaning seems quite clear: death lurks inside',
    position: {
      left: 49,
      top: 4,
      width: 10,
      height: 10
    },
    endPosition: {
      left: 50,
      top: -8,
      width: 10,
      height: 10
    },
    trigger: 'OPEN'
  }
};

const images = {
  alpha: null,
  border: null,
  door1: null,
  entryway: null,
  items: null,
  key1: null,
  line: null,
  menuButton: null,
  menu: null,
  skull: null
};

const playerState = {
  verb: null,
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

const initialState = {
  playerState,
  gameState,
  text: null,
  nextText: null,
  loading: false
};

export default initialState;