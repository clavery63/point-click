export default {
  player: {
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
    page: 0,
    transition: {
      enabled: false,
      text: '',
      toRoom: 0,
      transition: ''
    }
  },
  text: {
    content: [],
    line: 0,
    char: 0
  },
  rooms: {
    current: 2,
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
          dest: 2,
          dir: 'UP',
          mapPosition: {
            x: 1,
            y: 1
          }
        },
        {
          style: {
            position: 'absolute',
            left: 300,
            top: 100,
            width: 50,
            height: 50,
            'background-color': 'black'
          },
          dest: 3,
          dir: 'RIGHT',
          mapPosition: {
            x: 4,
            y: 4
          }
        }
      ],
      items: [
        {
          style: {
            position: 'absolute',
            left: 100,
            top: 100,
            width: 90,
            height: 130,
            background: 'url(img/bong.png) no-repeat',
            'background-size': '100% 100%',
            'image-rendering': 'pixelated'
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
          dest: 1,
          dir: 'DOWN',
          mapPosition: {
            x: 4,
            y: 1
          }
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
    },
    3: {
      name: 'Redd\'s: Back Yard',
      text: [
        'The backyard at Redd\'s.',
        'You\'re relieved to see that it\'s empty.',
        'Oh shit wait nevermind it\'s a bunch of',
        'dogs..'
      ],
      doors: [
        {
          style: {
            position: 'absolute',
            left: 100,
            top: 300,
            width: 50,
            height: 50,
            'background-color': 'black'
          },
          dest: 1,
          dir: 'LEFT',
          mapPosition: {
            x: 4,
            y: 4
          }
        },
      ],
      items: [
        {
          style: {
            position: 'absolute',
            left: 10,
            top: 300,
            width: 40,
            height: 20,
            'background-color': 'brown'
          },
          name: 'dog1'
        },
        {
          style: {
            position: 'absolute',
            left: 300,
            top: 150,
            width: 20,
            height: 40,
            'background-color': 'brown'
          },
          name: 'dog2'
        },
        {
          style: {
            position: 'absolute',
            left: 300,
            top: 200,
            width: 20,
            height: 40,
            'background-color': 'brown'
          },
          name: 'dog3'
        }
      ]
    },
  }
};
