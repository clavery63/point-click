const gameStateSchema = {
  "type": "object",
  "properties": {
    "worldState": {
      "$ref": "#/definitions/WorldState"
    },
    "playerState": {
      "$ref": "#/definitions/PlayerState"
    },
    "flags": {
      "$ref": "#/definitions/Flags"
    }
  },
  "required": [
    "flags",
    "playerState",
    "worldState"
  ],
  "definitions": {
    "WorldState": {
      "type": "object",
      "properties": {
        "doors": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/Door"
          }
        },
        "items": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/Item"
          }
        },
        "scenery": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/Scenery"
          }
        },
        "rooms": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/Room"
          }
        }
      },
      "required": [
        "doors",
        "items",
        "rooms",
        "scenery"
      ]
    },
    "Door": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string",
          "enum": [
            "doors"
          ]
        },
        "id": {
          "type": "number"
        },
        "closedImg": {
          "type": "string"
        },
        "openImg": {
          "type": "string"
        },
        "position": {
          "$ref": "#/definitions/Position"
        },
        "mapPosition": {
          "$ref": "#/definitions/MapPosition"
        },
        "dest": {
          "type": "number"
        },
        "dir": {
          "$ref": "#/definitions/DoorDir"
        },
        "state": {
          "$ref": "#/definitions/DoorState"
        },
        "description": {
          "type": "string"
        },
        "closedText": {
          "type": "string"
        },
        "lockedText": {
          "type": "string"
        },
        "unlockText": {
          "type": "string"
        },
        "openText": {
          "type": "string"
        },
        "keyId": {
          "type": "number"
        },
        "hidden": {
          "type": "boolean"
        },
        "openCondition": {
          "type": "string"
        },
        "verbs": {
          "type": "object",
          "properties": {
            "MOVE": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/VerbLogic"
              }
            },
            "LOOK": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/VerbLogic"
              }
            },
            "OPEN": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/VerbLogic"
              }
            },
            "USE": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/VerbLogic"
              }
            },
            "SMOKE": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/VerbLogic"
              }
            },
            "TAKE": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/VerbLogic"
              }
            },
            "EAT": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/VerbLogic"
              }
            },
            "HIT": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/VerbLogic"
              }
            },
            "SPEAK": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/VerbLogic"
              }
            }
          }
        }
      },
      "required": [
        "description",
        "dest",
        "dir",
        "id",
        "mapPosition",
        "state",
        "type",
        "verbs"
      ]
    },
    "Position": {
      "type": "object",
      "properties": {
        "left": {
          "type": "number"
        },
        "top": {
          "type": "number"
        },
        "width": {
          "type": "number"
        },
        "height": {
          "type": "number"
        }
      },
      "required": [
        "height",
        "left",
        "top",
        "width"
      ]
    },
    "MapPosition": {
      "type": "object",
      "properties": {
        "x": {
          "enum": [
            0,
            1,
            2,
            3,
            4
          ],
          "type": "number"
        },
        "y": {
          "enum": [
            0,
            1,
            2,
            3,
            4
          ],
          "type": "number"
        }
      },
      "required": [
        "x",
        "y"
      ]
    },
    "DoorDir": {
      "enum": [
        "BACK",
        "DOWN",
        "FORWARD",
        "LEFT",
        "RIGHT",
        "UP"
      ],
      "type": "string"
    },
    "DoorState": {
      "enum": [
        "CLOSED",
        "LOCKED",
        "OPEN"
      ],
      "type": "string"
    },
    "VerbLogic": {
      "type": "object",
      "properties": {
        "text": {
          "type": "string"
        },
        "moveTo": {
          "type": "number"
        },
        "moveDir": {
          "enum": [
            "BACK",
            "DOWN",
            "FORWARD",
            "LEFT",
            "RIGHT",
            "UP"
          ],
          "type": "string"
        },
        "addFlags": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "removeFlags": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "prereqFlags": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "prereqUsing": {
          "type": "number"
        },
        "effects": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/Effect"
          }
        }
      }
    },
    "Effect": {
      "type": "object",
      "properties": {
        "action": {
          "type": "string",
          "enum": [
            "SET_NUMBER_VALUE"
          ]
        },
        "path": {
          "type": "string",
          "ValuePath": "number"
        },
        "value": {
          "type": "number"
        }
      },
      "required": [
        "action",
        "path",
        "value"
      ]
    },
    "Item": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string",
          "enum": [
            "items"
          ]
        },
        "id": {
          "type": "number"
        },
        "name": {
          "type": "string"
        },
        "description": {
          "type": "string"
        },
        "position": {
          "$ref": "#/definitions/Position"
        },
        "img": {
          "type": "string"
        },
        "onTake": {
          "type": "string"
        },
        "takeableFlag": {
          "type": "string"
        },
        "visibleFlag": {
          "type": "string"
        },
        "requiresPrecision": {
          "type": "boolean"
        },
        "verbs": {
          "type": "object",
          "properties": {
            "MOVE": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/VerbLogic"
              }
            },
            "LOOK": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/VerbLogic"
              }
            },
            "OPEN": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/VerbLogic"
              }
            },
            "USE": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/VerbLogic"
              }
            },
            "SMOKE": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/VerbLogic"
              }
            },
            "TAKE": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/VerbLogic"
              }
            },
            "EAT": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/VerbLogic"
              }
            },
            "HIT": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/VerbLogic"
              }
            },
            "SPEAK": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/VerbLogic"
              }
            }
          }
        }
      },
      "required": [
        "description",
        "id",
        "name",
        "type",
        "verbs"
      ]
    },
    "Scenery": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string",
          "enum": [
            "scenery"
          ]
        },
        "id": {
          "type": "number"
        },
        "name": {
          "type": "string"
        },
        "description": {
          "type": "string"
        },
        "startPosition": {
          "$ref": "#/definitions/Position"
        },
        "endPosition": {
          "$ref": "#/definitions/Position"
        },
        "currentPosition": {
          "$ref": "#/definitions/Position"
        },
        "img": {
          "type": "string"
        },
        "openText": {
          "type": "string"
        },
        "verbs": {
          "type": "object",
          "properties": {
            "MOVE": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/VerbLogic"
              }
            },
            "LOOK": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/VerbLogic"
              }
            },
            "OPEN": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/VerbLogic"
              }
            },
            "USE": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/VerbLogic"
              }
            },
            "SMOKE": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/VerbLogic"
              }
            },
            "TAKE": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/VerbLogic"
              }
            },
            "EAT": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/VerbLogic"
              }
            },
            "HIT": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/VerbLogic"
              }
            },
            "SPEAK": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/VerbLogic"
              }
            }
          }
        },
        "contains": {
          "type": "array",
          "items": {
            "type": "number"
          }
        },
        "trigger": {
          "type": "string"
        },
        "movedText": {
          "type": "string"
        },
        "visibleFlag": {
          "type": "string"
        }
      },
      "required": [
        "contains",
        "description",
        "id",
        "name",
        "startPosition",
        "type",
        "verbs"
      ]
    },
    "Room": {
      "type": "object",
      "properties": {
        "id": {
          "type": "number"
        },
        "img": {
          "type": "string"
        },
        "music": {
          "type": "string"
        },
        "video": {
          "type": "string"
        },
        "initialDescription": {
          "type": [
            "null",
            "string"
          ]
        },
        "description": {
          "type": "string"
        },
        "doors": {
          "type": "array",
          "items": {
            "type": "number"
          }
        },
        "items": {
          "type": "array",
          "items": {
            "type": "number"
          }
        },
        "scenery": {
          "type": "array",
          "items": {
            "type": "number"
          }
        },
        "gameOver": {
          "type": "boolean"
        }
      },
      "required": [
        "description",
        "doors",
        "id",
        "items",
        "scenery"
      ]
    },
    "PlayerState": {
      "type": "object",
      "properties": {
        "verb": {
          "$ref": "#/definitions/VerbIndex"
        },
        "using": {
          "type": [
            "null",
            "number"
          ]
        },
        "examining": {
          "type": [
            "null",
            "number"
          ]
        },
        "room": {
          "type": "number"
        },
        "items": {
          "type": "array",
          "items": {
            "type": "number"
          }
        },
        "page": {
          "type": "number"
        },
        "timer": {
          "type": "number"
        }
      },
      "required": [
        "items",
        "page",
        "room",
        "timer",
        "verb"
      ]
    },
    "VerbIndex": {
      "enum": [
        "EAT",
        "HIT",
        "LOOK",
        "MOVE",
        "OPEN",
        "SMOKE",
        "SPEAK",
        "TAKE",
        "USE"
      ],
      "type": "string"
    },
    "Flags": {
      "type": "object",
      "properties": {
        "size": {
          "type": "number"
        },
        "__@toStringTag@24": {
          "type": "string"
        }
      },
      "required": [
        "__@toStringTag@24",
        "size"
      ]
    }
  },
  "$schema": "http://json-schema.org/draft-07/schema#"
};

export default gameStateSchema;
