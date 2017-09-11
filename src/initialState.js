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
  text: {
    content: [],
    line: 0,
    char: 0
  },
  rooms: {
    1: {
      name: 'Redd\'s: Main Room',
      text: [
        'It\'s Redd\'s Tavern.',
        'You\'ve been here a million times before,',
        'but something just doesn\'t feel right.'
      ],
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
      text: ['Redd\'s bathroom.  Looks like its been cleaned recently'],
      text: [
        'Redd\'s bathroom.  Looks like its been',
        'cleaned recently.'
      ],
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
        },
        {
          style: {
            position: 'absolute',
            left: 10,
            top: 80,
            width: 150,
            height: 200,
            background: 'url(img/toilet-1.png) no-repeat',
            'background-size': '100% 100%',
            'image-rendering': 'pixelated'
          },
          name: 'toilet'
        }
      ]
    }
  }
};
