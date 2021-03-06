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
    description: 'An American contractor went to a small town in the Guatemalan mountains with an ambitious goal: to ignite the local economy, and hopefully even persuade people not to migrate north to the United States.',
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
    keyId: 0,
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
    description: 'This door probably leads someplace uninteresting',
    unlockText: 'Great, it\'s unlocked now',
    openText: 'Aaaaand you opened the door. How exciting.',
    keyId: 5
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
    dest: 15,
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
    description: 'A familiar, acrid odor emanates from the other side of of this door, as if seeping through the pores of the woods itself. There is a Buffalo Bills insignia engraved on the side.',
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
    description: 'This door probably leads someplace uninteresting',
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
    description: 'This door probably leads someplace uninteresting',
    openText: 'You keep opening doors. That\'s the spirit!'
  },
  10: {
    dest: 4,
    dir: 'RIGHT',
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
  },
  13: {
    dest: 5,
    dir: 'BACK',
    mapPosition: {
      x: 2,
      y: 3
    },
    state: 'OPEN'
  },
  14: {
    closedImg: 'door8',
    position: {
      left: 33,
      top: 40,
      width: 17,
      height: 44
    },
    dest: 12,
    dir: 'FORWARD',
    mapPosition: {
      x: 1,
      y: 0
    },
    state: 'LOCKED',
    keyId: 6,
    description: 'Sometimes the best way into Valencia Tavern is through the front door',
    openText: 'Opened Valencia Tavern',
    unlockText: 'Hell yeah! Let\'s do this! Woo!!!'
  },
  15: {
    name: 'fridge',
    closedImg: 'fridgeSmall',
    position: {
      left: 5,
      top: 76,
      width: 16,
      height: 23
    },
    mapPosition: {
      x: 0,
      y: 3
    },
    description: 'A handy little fridge',
    closedText: 'With all your might, you yank on the handle. But it won\'t budge - you are far too weak to open this fridge.',
    openText: 'Eating Garfield gave you the strength you needed to open this bad boy. Good work!',
    dir: 'DOWN',
    dest: 14,
    state: 'CLOSED',
    openCondition: 'GARFIELD'
  },
  16: {
    mapPosition: {
      x: 2,
      y: 3
    },
    description: 'Back to the outside',
    dir: 'UP',
    dest: 0,
    state: 'OPEN'
  },
  17: {
    mapPosition: {
      x: 1,
      y: 4
    },
    dir: 'BACK',
    dest: 7,
    state: 'OPEN'
  },
  18: {
    mapPosition: {
      x: 2,
      y: 4
    },
    dir: 'BACK',
    dest: 12,
    state: 'OPEN'
  },
  19: {
    mapPosition: {
      x: 4,
      y: 4
    },
    dir: 'DOWN',
    dest: 21,
    state: 'OPEN'
  },
  20: {
    mapPosition: {
      x: 2,
      y: 0
    },
    dir: 'UP',
    dest: 0,
    state: 'OPEN'
  },
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
    name: 'lockpick',
    position: {
      left: 32,
      top: 26,
      width: 10,
      height: 10
    },
    img: 'lockpick',
    description: 'Mike, here is a lockpick. It might be handy if you, the master of unlocking, take it with you.',
    itemListDescription: 'You can use this for picking locks.'
  },
  7: {
    name: 'bong',
    position: {
      left: 48,
      top: 52,
      width: 14,
      height: 20
    },
    img: 'bong',
    description: 'It\'s some kind of strange vessel. Its base is filled with a murky, dank liquid, and there is an acrid vapor emanating from its spout.',
    movesTo: 10,
    moveDir: 'RIGHT',
    moveOn: 'SMOKE'
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
    description: '_____The sign reads: ______"Welcome to" ____"Lobotomy Manor."                             But I\'m not at Lobotomy Manor!!                   I\'m at Birthday Castle... right?' ,
    itemListDescription: 'Lobotomy Manor? Boy does this sign give me the creeps!!',
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
    itemListDescription: 'Congratulations. You are the proud owner of a shiny, new frying pan',
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
      left: 46,
      top: 48,
      width: 8,
      height: 8
    },
    onTake: 'You chug the beer angrily in the hopes the bottle might come in handy later on.'
  },
  14: {
    name: 'garfield',
    img: 'garfield',
    description: 'A fearsome, rapacious cat is eating the gunk with lunatic vigor. This must be the only nearby form of nourishment. It might be best to leave him be.',
    position: {
      left: 44,
      top: 52,
      width: 68,
      height: 55
    },
    onEat: 'With a somber sense of pride and purpose, you devour the animal, as if to put it out of its misery.',
    eatEffect: 'GARFIELD'
  },
  15: {
    name: 'pie',
    img: 'pie',
    description: 'A delicious-looking pie balances perfectly on its side. Do you really want to disrupt that?',
    position: {
      left: 28,
      top: 24,
      width: 9,
      height: 9
    }
  },
  16: {
    name: 'cold gin',
    description: 'Your mouth waters just thinking about this high-quality gin.',
  },
  17: {
    name: 'warm gin',
    description: 'Real bottom-of-the-barrel stuff. But what do you care? It\'s gin, isn\'t it?',
  },
  18: {
    name: 'hamburgers',
    description: 'The hamburger. One of the most famous sandwiches of all time. You feel safe knowing you have some of these at your disposal',
  },
  19: {
    name: 'mo disk',
    img: 'floppy',
    description: 'Congratulations, you have found this game\'s MO disk. Every game has one, and you found this game\'s. That\'s awesome. Some games have more than one mo disk, but that\'s less common. Most games have exactly one.',
    position: {
      left: 58,
      top: 65,
      width: 16,
      height: 19
    }
  },
  20: {
    name: 'dan\'s hat',
    img: 'danHat',
    description: 'An irresistable hat',
    position: {
      left: 18,
      top: 11,
      width: 73,
      height: 63
    }
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
    description: 'It\'s the famous book by H. Saul Caesein, “Protocol for the Success Lover." I\'ve always wanted to read this one.',
    startPosition: {
      left: 21,
      top: 62,
      width: 15,
      height: 6
    },
    contains: [5],
    openText: '  "CHAPTER ONE: FORGET ALL PRIOR MISGIVINGS."  Huh, a rectangular hole has been cut out of the inside of the book.  You are disconcerted to also discover a steaming residue of unknown origin staining the pages.'
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
      width: 40,
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
    movesTo: 8,
    moveDir: 'FORWARD',
    moveOn: 'LOOK',
  },
  5: {
    name: 'eightBallMask',
    description: 'It appears you can shake this and receive answers to your problems.',
    useTexts: [
      'You shake the magic eight ball. It says you are doing a great job! but you knew that already :)',
      'You shake it again. It says "Sam Malone is in this castle somewhere."',
      'You shake it again. "No, seriously," it says. "Sam is here somewhere. He\'s with Norm and they\'ve consumed so much beer they\'ve nearly fallen asleep."',
      'You shake it one more time. "You will have some good luck. I guarantee it," it says.'
    ],
    useIndex: 0,
    onUseFlag: 'DANSEN',
    startPosition: {
      left: 0,
      top: 0,
      width: 112,
      height: 112
    },
    movesTo: 9,
    moveDir: 'DOWN',
    moveOn: 'EAT'
  },
  6: {
    img: 'bartender',
    description: 'Meaghan notices you. She\'ll probably offer you some gin if you talk to her.',
    speakTexts: [
      'Heyyy what\'s up. Let me guess. Gin?',
      'Sorta random question, but do you want that frying pan up there on the T.V.?',
      'It\'s for sale. But you can just go ahead and grab it.'
    ],
    speakIndex: 0,
    startPosition: {
      left: 54,
      top: 34,
      width: 13,
      height: 21
    }
  },
  7: {
    img: 'santos',
    description: 'It\'s Santos. If only you could get past him, you might be able to collect some more useful items.',
    speakTexts: [
      '"Yooo, get this. This dude over there says he\'s a fan of Mega Man but he\'s only play 3 out of the original 6 of them. Or at least only beaten 3"',
      '"This party\'s kinda random right?"',
      '"Don\'t worry about me. I can literally sleep anywhere I don\'t care. I literally don\'t care I can sleep anywhere. Like it doesn\'t matter. It literally doesn\'t matter. I know that sounds crazy right? I don\'t know. I guess it\'s basically my super power. Like how random would that be, if your superpower was just to be able to sleep anywhere. But like literally I think that would be mine. Either that or drinking tequila without flinching. Who do you know here again?"',
      '"Who\'s Scott? ohhhhh! You mean Scott. Yeah, I know him"'
    ],
    speakIndex: 0,
    startPosition: {
      left: 0,
      top: 0,
      width: 112,
      height: 112
    },
    vanishOn: 10,
    vanishText: 'With a desperate yell, you hurl Scott at Santos and shield your eyes. Scott beckons Santos with some strange incantations, and they part ways.'
  },
  8: {
    img: 'motorcycle',
    name: 'motorcycle',
    description: 'This must by one of those poorly-parked motorcycles Valencia Tavern is famous for.',
    startPosition: {
      left: 0,
      top: 64,
      width: 34,
      height: 42
    },
    contains: [17]
  },
  9: {
    name: 'tv1',
    startPosition: {
      left: 56,
      top: 20,
      width: 14,
      height: 13
    },
    movesTo: 13,
    moveDir: 'FORWARD',
    moveOn: 'LOOK',
  },
  10: {
    name: 'tv2',
    startPosition: {
      left: 45,
      top: 22,
      width: 11,
      height: 13
    },
    movesTo: 16,
    moveDir: 'FORWARD',
    moveOn: 'LOOK',
  },
  11: {
    name: 'tv3',
    startPosition: {
      left: 12,
      top: 31,
      width: 15,
      height: 9
    },
    movesTo: 13,
    moveDir: 'FORWARD',
    moveOn: 'LOOK',
  },
  12: {
    name: 'bench',
    description: 'It\'s a standard park bench.  You see a message carved in the wood: "STEVE MILLER SUCKS."  The words feel nostalgic, like you\'ve seen them somewhere before.  Hmm...I guess the statement is probably true, but that song Abracadabra isn\'t so bad, right?',
    startPosition: {
      left: 3,
      top: 75,
      width: 35,
      height: 20
    },
    contains: [],
  },
  13: {
    name: 'justin',
    img: 'justin',
    description: 'Well, would you look at that?! Justin is in the park too, just hanging out with that goose.  You can tell that he\'s pleased to see you.  He seems to be holding an unlit torch in one of his hands.',
    speakTexts: [
      '"Hey Mike!  Happy birthday!  I thought you\'d like a brief escape from all of the unhinged shit going on in the castle, so I brought you to this peaceful place.  Check out the nice waterfowl over there, or "birdbrain" as you\'d say.  Wow...you\'ve collected a lot of torches!  That\'s cool, even though they don\'t serve any functional purpose in this game at all.  Well, keep on picking them up if you want to, just for fun."'
    ],
    speakIndex: 0,
    startPosition: {
      left: 0,
      top: 0,
      width: 112,
      height: 112
    },
    vanishOn: 15,
    vanishText: '"Oh, nice.  Thanks.  I was hoping someone would have something to eat.  I brought a bag of grapes with me but ended up giving all of them to that goose over there."'
  },
  14: {
    name: 'goose',
    description: 'It\'s a beautiful Canada goose.  You watch as it quietly eats grass, occasionally letting out a soft HONK.',
    startPosition: {
      left: 72,
      top: 67,
      width: 32,
      height: 40
    },
    speakTexts: [
      '"HONK!"'
    ],
    speakIndex: 0,
    contains: [18, 18, 18, 16, 18, 18]
  },
  15: {
    name: 'jason',
    description: 'This must be Jason. You learned about him. He is totally, unmistakably jacked.',
    startPosition: {
      left: 25,
      top: 13,
      width: 51,
      height: 92
    },
    speakTexts: [
      '"I am the civilian you choose to meet. The continuity of the species depends on your ability to choose. Will you join me? Locker rentals are free. Execute wisely. Woce."',
    ],
    speakIndex: 0
  },
  16: {
    name: 'computer',
    img: 'computer',
    description: 'You laugh uncontrollably at an out-of-place computer sitting in this hallway. You nearly fall down, and can feel your bag tear a little bit as a result. Unfortunately, it won\'t boot up.',
    startPosition: {
      left: 72,
      top: 73,
      width: 24,
      height: 26
    },
    activeOn: 19,
    activeText: 'You insert the MO disk into the computer, and it boots up. Your heart pounds with anticipation as you prepare to visit your all-time favorite webpage. You feel the room shake with each keystroke - www.ebaumsworld.com___ /____________ jetsfumble.',
    activeFlag: 'COMPUTER',
    movesTo: 18,
    moveDir: 'FORWARD',
    moveOn: 'LOOK'

  },
  17: {
    name: 'locker door',
    img: 'lockerDoor',
    description: 'Succumbing to your unquenchable thirst for destruction, you decide you\'d rather break into one of these lockers with a concussive blow than ask Jason to open it for you. This locker might open if had something to violently hit it with?',
    startPosition: {
      left: 91,
      top: 0,
      width: 20,
      height: 69
    },
    onHit: 'Youch! That was a good thought, but you weren\'t able to open up the damn door. You\'ll need something better-suited to bludgeoning.',
    vanishOn: 12,
    vanishText: '"Blammo!" The damn door opened because you smacked it with a fucking frying pan. Nice fucking work.'
  },
  18: {
    name: 'rob small',
    img: 'robSmall',
    description: 'An alluring image',
    startPosition: {
      left: 93,
      top: 15,
      width: 16,
      height: 16
    },
    movesTo: 17,
    moveDir: 'FORWARD',
    moveOn: 'LOOK',
  },
  19: {
    name: 'monitor',
    img: 'monitor',
    startPosition: {
      left: 0,
      top: 0,
      width: 112,
      height: 112
    }
  },
  20: {
    name: 'pumpkin',
    img: 'pumpkin',
    description: 'You spy a comforting sight: a luscious gourd in the moonlight. Ahh, the crisp flesh of a fresh white pumpkin. Wait a minute....Oh no!! It\'s something foul!! The pumpkin has been hollowed. Someone, or some thing, has been using this for "storage." Every fiber is completely soaked with urine. You shudder with disapproval.  It\'s been "bleached."',
    startPosition: {
      left: 88,
      top: 35,
      width: 16,
      height: 16
    },
    eatText: 'You whip out a knife and fork, and cut off the juiciest part of the pumpkin you can find. You lick your lips as it slides down your gullet. No way you can eat the whole thing though.'
  },
  21: {
    name: 'malone',
    img: 'malone',
    startPosition: {
      left: 8,
      top: 34,
      width: 43,
      height: 66
    },
    onSpeak: 'Hey buddy, welcome to The Abbey! Norm is in the bathroom, but he\'ll be back soon. You can have this beer if you like, but you look like you\'re craving something else... I only have beer, but if you give me something to mix I could whip you up something else.',
    speakGood: 'Ah, now that\'s the stuff! I can make you an ice cold gin and soda with this that\'ll go down real smooth!',
    speakBad: 'Hmm, this gin looks a little funny, but if you really want, I guess I can make you a gin and soda with this...'
  },
  22: {
    name: 'badGin',
    img: 'ginAndSoda',
    startPosition: {
      left: 88,
      top: 95,
      width: 8,
      height: 13
    },
    description: 'You don\'t like the looks of this gin and soda, but there is no turning back now. There\'s no concept of save states in this game, so you might as well just drink it and see what happens.',
    movesTo: 20,
    moveDir: 'DOWN',
    moveOn: 'EAT',
  },
  23: {
    name: 'goodGin',
    img: 'ginAndSoda',
    startPosition: {
      left: 78,
      top: 95,
      width: 8,
      height: 13
    },
    description: 'Holy crap! The moment has finally arrived! You will finally drink some gin!',
    movesTo: 19,
    moveDir: 'UP',
    moveOn: 'EAT',
  },
  24: {
    name: 'jukebox',
    img: 'jukebox',
    startPosition: {
      left:0,
      top: 62,
      width: 36,
      height: 50
    },
    description: 'Someone used this jukebox to put on the xfiles theme in the bar. now that\'s funny! That\'s just good comedy.'
  },
  25: {
    name: 'oscar',
    img: 'oscar',
    startPosition: {
      left: 0,
      top: 0,
      width: 112,
      height: 112
    },
    description: 'Hi. I am Oscar.'
  },
  26: {
    name: 'glasses',
    img: 'oscarGlasses',
    startPosition: {
      left: 30,
      top: 42,
      width: 45,
      height: 8
    },
    description: 'These glasses belong to Oscar.'
  },
};

const rooms = {
  0: {
    img: 'room0',
    music: 'outdoor-ambience.mp3',
    description: 'It\'s the entrance to Birthday Castle. You can faintly hear the sound of several full grown adults chanting inside.',
    doors: [0, 15, 19],
    items: [0],
    scenery: [0]
  },
  1: {
    img: 'room1',
    music: 'spreadsheet-man.mp3',
    description: 'The lobby of Birthday Castle',
    initialDescription: 'A man stumbles toward you. "Oh shit, is that Scott?" you wonder as you pull yourself through the half-ajar door. "Why am I not shocked to find him here..."',
    doors: [1, 2, 3],
    items: [],
    scenery: [25, 26] 
  },
  // 1: {
  //   img: 'room1',
  //   music: 'spreadsheet-man.mp3',
  //   description: 'The lobby of Birthday Castle',
  //   initialDescription: 'A man stumbles toward you. "Oh shit, is that Scott?" you wonder as you pull yourself through the half-ajar door. "Why am I not shocked to find him here..."',
  //   doors: [1, 2, 3],
  //   items: [11, 3, 4, 10],
  //   scenery: [] 
  // },
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
    scenery: [7] 
  },
  4: {
    img: 'room4',
    description: 'There are more doors here.',
    doors: [7, 8, 9, 11],
    items: [],
    scenery: [16] 
  },
  5: {
    img: 'room5',
    music: 'xfiles.mp3',
    description: 'Why it\'s simply Redd\'s! For some reason you seem to have entered from the back.',
    doors: [12],
    items: [12, 13],
    scenery: [4, 6, 9, 10, 11, 24] 
  },
  6: {
    img: 'room6',
    music: 'crummy-roads.mp3',
    description: 'This place looks familiar. It\'s some place you haven\'t been in a long time.',
    doors: [12],
    items: [],
    scenery: [] 
  },
  7: {
    img: 'room7',
    music: 'coldgin.mp3',
    description: 'You are delighted to find yourself outside of a friendly-looking pub restaurant. Though it seems the surrounding area is overrun with some kind of bulbous green gunk.',
    doors: [12, 14],
    items: [14],
    scenery: [3, 8] 
  },
  8: {
    img: 'eightBallLarge',
    description: 'It\'s one of those magic 8 balls! What a treat! Maybe this will have the answer. Also, you really want gin.',
    doors: [13],
    items: [],
    scenery: [5] 
  },
  9: {
    img: 'beerman',
    description: 'You completely blew it. You tried to eat one of those magic 8 balls and it made you die.',
    gameOver: true,
    doors: [],
    items: [],
    scenery: [] 
  },
  10: {
    img: 'bed',
    description: "You take an aggressive pull out of the bong and feel nothing. Nothing for a while, really. But after a few minutes it starts to kick in and you start to feel funny. You'd never smoked weed before, so you didn't really know what to expect. Anyway, days go by and you don't stop feeling high, it just gets more and more intense. You become convinced that the weed was laced with something, except you saw other people take hits from the same stash and they were completely fine. You wonder if Scott and Santos are drug dealers who conspired against you to get you high. No matter. The feeling escalates. You begin to have an out of body experience. It's been almost a week now, and you are no longer at the castle. You're home, or at least some place that looks like home. You have no recollection of leaving the castle. Has it been weeks, months, years? All of your friends know  you are high. They must. Next thing you know, you're on a hospital bed. Everyone you know is there, giving you fist bumps and crying tears of joy. Doug is in the corner, staring at your with a warm, fatherly smirk. \"You did it, man\", he says. You die.",
    gameOver: true,
    doors: [],
    items: [],
    scenery: [] 
  },
  11: {
    img: 'beerman',
    description: 'What you feared most has happened: your bag has exploded. You slipped on some of the spillage on the floor and died from the fall.',
    gameOver: true,
    doors: [],
    items: [],
    scenery: [] 
  },
  12: {
    img: 'room8',
    music: 'blinded-by-the-light.mp3',
    description: 'You find yourself in a cool locker room. A wonderful-smelling man greets you as you walk in.',
    doors: [17],
    items: [],
    scenery: [18, 15, 17] 
  },
  13: {
    video: 'slam-city.mp4',
    description: 'An uplifting video emboldens you with newfound confidence.',
    doors: [13],
    items: [],
    scenery: [] 
  },
  14: {
    img: 'fridgeLarge',
    description: 'A smattering of items can be found here.',
    doors: [16],
    items: [15, 19],
    scenery: [] 
  },
  15: {
    img: 'park',
    music: 'cliffside.mp3',
    initialDescription: 'You find yourself in a serene park.',
    description: 'Remember this park? It\'s kind of nice.',
    doors: [11],
    items: [],
    scenery: [12, 13, 14, 20] 
  },
  16: {
    video: 'buckner.mp4',
    description: 'A fun, funny video is on display here. But you get the horrible feeling that you\'ve traveled back in time, or to some alternate reality.',
    doors: [13],
    items: [],
    scenery: [] 
  },
  17: {
    img: 'robLarge',
    description: "You begin to feel headstrong, as though you could take on anyone, from studying the remarkable image in this locker. Oh, looks like there is a poem underneath! It says: Opaque, pale cakes of fermented lard, 40 gallon drum of butter posted up in my yard. Smelling like oil for the rest of my life, air's so dank hard to cut with a knife.  Chubby rain, vacuoles of pain stifling my brain. Ludicrous lipid levels compressing my lid, rendering down fat from a P.I.G. pig.  Hot skulls baking in the summer heat; basted onion heads filled with day old bread.  Glazed doughnut & a bottle of anything,  lipid rivers in the sewer lead to Wendy's and Burger King. Hey Alopecia, nice ta meet ya. I take a ride to the hairpiece store, Can't flip my wig proper no more. Hollow-tipped biological slugs hopping in a vat of beer, rest in piece to a shelled bug.  Mayonnaise on my mind, oil on my bread, Cold cut hypnosis, olive loaf's starting to own me. Now I'm feeling lonely without fried bologna.          -RH",
    music: 'up-in-da-club.mp3',
    doors: [18],
    items: [],
    scenery: [] 
  },
  18: {
    video: 'jetsFumble.mp4',
    description: 'Hell yeah. That\'s some good fumbling. Gin. Love to see a good fumble ya hear. Gin. Gin. I like it when the Jets Fumble! I need gin.',
    doors: [12],
    items: [],
    scenery: [19] 
  },
  19: {
    video: 'good-ending.mp4',
    description: 'As you sip on your refreshing beverage, you feel your mania fading. Norm returns from the bathroom and slaps you on the back. With a jolt you have a flash of a memory of falling...a pit...pain...light... but it quickly fades. Better not to focus on that. You\'re comfortable here. In fact you feel you like you could stay here forever, sipping on this delicious gin and tonic. Surrounded by people who know your name...',
    doors: [],
    items: [],
    scenery: [] 
  },
  20: {
    video: 'bad-ending.mp4',
    description: 'Unfortunately this gin and soda is really not doing the trick. The gin must have been contaminated by sitting in that motorcycle for so long, it\'s really warm and tastes off. If only you could have found some delicious ice cold gin! You feel more sober than ever. Looking at Sam Malone, you remember that he\'s not even real. He\'s a fictional character played by Ted Danson who you\'re pretty sure is not here right now. In fact it occurs to you that nobody is here right now, and "here" isn\'t really anywhere. You look behind you and see only a void. The Abbey is fading away before your eyes. You feel cold. You remember that The Abbey is gone forever, and realize that the only piece of it left is what lives on in your memory. You\'re starting to feel sick looking at this fading simulacrum. Ugly though it may be, you\'d be better off in the real world, living with your memories of good times. It\'s time to stop playing this game and face reality.',
    doors: [],
    items: [],
    scenery: [] 
  },
  21: {
    img: 'dan',
    description: 'You found Dan.',
    doors: [20],
    items: [20],
    scenery: [] 
  },
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
  flags: new Set()
};

const transition = {
  dest: null
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
  menu: 'NONE'
};

export default initialState;
