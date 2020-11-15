const doors = {
  1: {
    position: {
      left: 200,
      top: 100,
      width: 50,
      height: 50
    },
    dest: 2,
    dir: 'FORWARD',
    mapPosition: {
      x: 3,
      y: 0
    },
    state: 'LOCKED',
    lockedText: 'Darn it, the thing\'s locked.  Now where could that key be???',
    need: 'key-1',
  },
  2: {
    dest: 1,
    dir: 'DOWN',
    mapPosition: {
      x: 3,
      y: 5
    }
  }
};

const items = {
  1: {
    position: {
      left: 70,
      top: 280,
      width: 74,
      height: 53,
    },
    name: 'key-1',
    description: 'This is a nice-looking key.',
    itemListDescription: 'I wonder what it\'s used for'
  },
  2: {
    position: {
      left: 80,
      top: 108,
      width: 28,
      height: 60,
    },
    name: 'plunger',
    description: 'Your average, run of the mill plunger. How boring.'
  },
  3: {
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
  1: {
    name: 'entryway',
    text: 'It\'s the entrance to Shadowgate. You can hear wolves howling deep in the forest behind you',
    doors: [1, 2],
    items: [1],
  },
  2: {
    name: 'Redd\'s: Bathroom',
    text: 'Redd\'s bathroom.  Looks like its been cleaned recently, which is odd.',
    doors: [3],
    items: [
    ]
  },
}

const scenery = {
  1: {
    name: 'Skull',
    text: 'It\'s the skull of some creature. Its meaning seems quite clear: death lurks inside',
    position: {
      left: 50,
      top: 0,
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
  scenery
};

const initialState = {
  playerState,
  gameState,
  text: null,
  nextText: null,
  loading: false
};

export default initialState;
