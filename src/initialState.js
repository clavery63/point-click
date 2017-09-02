export default {
  player: {
    currentRoom: 1,
    items: [
      'torch',
      'key1',
      'pot roast',
      'key2',
      'key3'
    ]
  },
  menu: 'NONE',
  ui: {
    page: 0
  },
  rooms: {
    1: {
      name: 'Redd\'s: Main Room',
      doors: [
        {
          style: {
            position: 'absolute',
            left: 200,
            top: 100,
            width: 50,
            height: 50,
            'background-color': 'black'
          },
          dest: 2
        },
      ],
      items: [
        {
          style: {
            position: 'absolute',
            left: 100,
            top: 100,
            width: 50,
            height: 50,
            'background-color': 'yellow'
          },
          name: 'bong'
        },
        {
          style: {
            position: 'absolute',
            left: 100,
            top: 300,
            width: 70,
            height: 70,
            'background-color': 'purple'
          },
          name: 'grape'
        },
        {
          style: {
            position: 'absolute',
            left: 300,
            top: 250,
            width: 20,
            height: 100,
            'background-color': 'red'
          },
          name: 'gun'
        }
      ]
    },
    2: {
      name: 'Redd\'s: Bathroom',
      doors: [
        {
          style: {
            position: 'absolute',
            left: 200,
            top: 200,
            width: 50,
            height: 50,
            'background-color': 'black'
          },
          dest: 1
        },
      ],
      items: [
        {
          style: {
            position: 'absolute',
            left: 300,
            top: 250,
            width: 40,
            height: 40,
            'background-color': 'purple'
          },
          name: 'small grape'
        }
      ]
    }
  }
};
