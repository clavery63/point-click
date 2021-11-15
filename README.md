# Point & Click

Welcome to an attempted point & click game engine written in React/Redux. This repo includes code for both playing and creating games, with a well-defined format for describing games. Games are represented by a single configuration file that adheres to this format as well as any assets referenced by this file (image, audio and video).

## Quickstart

1. Ensure you have `node` and `npm` installed (they both come packaged together here: https://nodejs.org/en/download/)
2. Clone this repo and go to its root directory
3. run `npm install`
4. run `npm start`
5. To run the game, visit http://localhost:3000/play/test-game
6. To run the editor, visit http://localhost:3000/admin/test-game/rooms

## The Config File

The core feature of this game engine is the config file and its lifecycle during game creation and gameplay. If you understand how that works, understanding the code will follow.

### Mutability

The config file is a bit overloaded--it represents both the game _definition_ and the game _state_. While it definitely possible to think of these things as separate concepts entirely, I've found it easier to think of the game definition as a single _instance_ of a game state. It just so happens to be the first state a game is in when you start playing.

The biggest ramification of this is that the config interweaves mutable and immutable data, with no particular guidelines as to what should be immutable.

For example, a `room` in the config contains a list of `items` that are ids. This list is meant to be mutable--if the player collects an item, it is removed from that list and added to their inventory.

However, a `room` also contains a `description`. This is meant to be immutable. The game engine is not supposed to alter this value. That is, nothing the player does can change it. It can only be edited during game creation, not gameplay.

You will find that most of the data in the config file is conceptually immutable. I'm making a concerted effort to have the mutable (player-affected) state be as minimal as possible to do its job.

### Lifecycle

There are basically three places a config can "live" at a given time, which I think are illuminating to go over. They are (1) stored someplace on the Internet (currently on S3), (2) in local memory (i.e. the player's browser until someone ports this to native), and (3) in local storage.

**(1) On the Internet:** When a person first goes to play the game, their browser downloads the game engine, which then goes to download the config from some server. Currently this is represented by the game name in the URL. This config effectively _is_ the game. It contains all of the immutable data and references the assets, as well as the initial state of the game.

**(2) In the browser:** As the player progresses through the game, they are continually updating the config on their machine. The visual state of the game is nothing but a reflection of these updates. So effectively what has happened is, you got a copy of the config when the game engine downloaded it, and then the engine is free to alter it as it pleases without affecting the version on the Internet. Someone else could download that and start the game from the beginning. This version of the config is more of a game _state_ than a _definition_.

**(3) In local storage:** It's nearly trivial to "save" a game the way this is set up--the engine just saves whatever the current config is in a local file (i.e. the browser's Local Storage). To load from that save file, the engine just needs to load that particular config into memory.

### The Format

I've kept sample copy of the config around in this repo here: https://github.com/clavery63/point-click/blob/master/public/gamedata.json. It might be helpful to reference that as you read through these docs.

#### Top level

There are three top-level concepts, each taking up their own section of the config. They are **world state**, **player state**, and **flags**. World state contains four entities--**rooms**, **doors**, **scenery** and **items** (although scenery and items are conceptually fairly similar and might get combined).

There is a fundamental design decision here that is important to point out. All entities must have an id, and therefore must live in their respective place in the config. If one entity has to reference another (e.g. a room contains items), then it must represent this as an id, which is then dereferenced in the appropriate part of the config.

If this seems weird or confusing, let me know. But the summary of why I'm doing it this way is ease of maintenance.

I'll try to illustate the difference here:

```javascript
// BAD
{
  rooms: {
    1: {
      description: 'hi',
      items: [
        {
          name: 'torch'
        },
        {
          name: 'pipe'
        }
      ]
    }
  }
}

// GOOD
{
  rooms: {
    1: {
      description: 'hi',
      items: [1, 2]
    }
  },
  items: {
    1: {
      name: 'torch'
    },
    2: {
      name: 'pipe'
    }
  }
}
```

### Detailed Breakdown

*Note that a "?" denotes an optional type*

#### Player State

| Field Name | Type      | Description
| -----------| --------- | ----- 
| verb       |  String   | Current action the player is taking
| using      |  ?ID      | Item the player is using (selected "using" then clicked the item)
| examining  |  ?ID      | Item or scenery the player has "opened"
| room       |  ID       | Player's current location
| items      |  List[ID] | Items in player's inventory
| page       |  Int      | Item list page
| timer      |  Int      | Tracks number of room visits (for timed events like the torch)

#### Room

| Field Name         | Type      | Description
| -------------------| --------- | ----------- 
| img                |  ?String  | The file name of the room's background image
| music              |  ?String  | The file name of the room's background audio
| video              |  ?String  | The file name of the room's background video
| initialDescription |  ?String  | Text that displays only on the first visit
| description        |  String   | Text that displays when visiting the room
| doors              |  List[ID] | Entities from `doors` collection
| items              |  List[ID] | Entities from `items` collection
| scenery            |  List[ID] | Entities from `scenery` collection
| gameOver           |  Bool     | Denotes that this room is a game over screen

#### Door

| Field Name    | Type      | Description
| --------------| --------- | -----------
| dest          |  ID       | The room this door leads to
| dir           |  String   | The implied physical direction the door leads. Used for transitions.
| mapPosition   |  Coords   | Where to display the door in the minimap
| state         |  String   | Determines if the player can open or walk through the door
| closedImg     |  ?String  | Image to display if the door is closed
| openImg       |  ?String  | Image to display if the door is open
| position      |  Position | Where to display the door in the viewport
| description   |  String   | Text to display when examining the door
| lockedText    |  ?String  | Text to display when trying to open the locked door
| openText      |  ?String  | Text to display after opening the door
| unlockText    |  ?String  | Text to display after unlocking the door
| keyId         |  ?ID      | Item ID the player must use on door to unlock
| openCondition |  ?Flag    | Flag that must be on for door to be openable

#### Item

| Field Name        | Type       | Description
| ------------------| ---------- | -----------
| requiresPrecision | Boolean    | Tells the renderer that only opaque pixels should be clickable
| name              | ?String    | File name of the item image (if it's ever rendered)
| position          | Position   | Where to display the item in the viewport
| description       | String     | Text to display when examining the item
| verbs             | Map[Verb]  | See `Verb` for more details on this
| onTake            | ?String    | Special text to display after taking the item
| takeableFlag      | ?Flag      | Flag whose presence allows the player to take the item
| visibleFlag       | ?Flag      | Flag whose presence makes the item visible

#### Scenery

| Field Name        | Type       | Description
| ------------------| ---------- | -----------
| name              | ?String    | File name of the scenery image (if it's ever rendered)
| startPosition     | Position   | Where to display the scenery in the viewport initially
| endPosition       | ?Position  | Where the scenery moves in the viewport, if it animates
| description       | String     | Text to display when examining the item
| verbs             | Map[Verb]  | See `Verb` for more details on this
| contains          | List[ID]   | Items that are inside the scenery (after OPENing it)
| trigger           | ?String    | The verb the player uses to begin animation
| movedText         | ?String    | Text to display after animation completes
| visibleFlag       | ?Flag      | Flag whose presence makes the scenery visible
