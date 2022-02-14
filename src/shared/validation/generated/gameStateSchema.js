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
      "type": "array",
      "items": {
        "type": "string"
      }
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
          "type": "object",
          "additionalProperties": false,
          "patternProperties": {
            "^[0-9]+$": {
              "$ref": "#/definitions/Door"
            }
          }
        },
        "items": {
          "type": "object",
          "additionalProperties": false,
          "patternProperties": {
            "^[0-9]+$": {
              "$ref": "#/definitions/Item"
            }
          }
        },
        "scenery": {
          "type": "object",
          "additionalProperties": false,
          "patternProperties": {
            "^[0-9]+$": {
              "$ref": "#/definitions/Scenery"
            }
          }
        },
        "rooms": {
          "type": "object",
          "additionalProperties": false,
          "patternProperties": {
            "^[0-9]+$": {
              "$ref": "#/definitions/Room"
            }
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
        "dest",
        "dir",
        "id",
        "mapPosition",
        "state",
        "type"
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
        }
      },
      "required": [
        "left",
        "top"
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
        "type"
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
        "size": {
          "$ref": "#/definitions/Size"
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
          "anyOf": [
            {
              "type": "array",
              "items": {
                "type": "number"
              }
            },
            {
              "type": "null"
            }
          ]
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
        "id",
        "startPosition",
        "type"
      ]
    },
    "Size": {
      "type": "object",
      "properties": {
        "width": {
          "type": "number"
        },
        "height": {
          "type": "number"
        }
      },
      "required": [
        "height",
        "width"
      ]
    },
    "Room": {
      "type": "object",
      "properties": {
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
        "entities": {
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
        "entities"
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
    }
  },
  "$schema": "http://json-schema.org/draft-07/schema#"
};

export default gameStateSchema;
