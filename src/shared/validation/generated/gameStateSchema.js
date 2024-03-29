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
    },
    "config": {
      "type": "object",
      "properties": {
        "verbs": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "name": {
                "type": "string"
              },
              "defaultText": {
                "type": "string"
              },
              "defaultBehavior": {
                "$ref": "#/definitions/VerbBehavior"
              }
            },
            "required": [
              "defaultBehavior",
              "name"
            ]
          }
        },
        "positions": {
          "type": "object",
          "properties": {
            "verbs": {
              "type": "array",
              "items": [
                {
                  "$ref": "#/definitions/Position"
                },
                {
                  "$ref": "#/definitions/Position"
                },
                {
                  "$ref": "#/definitions/Position"
                },
                {
                  "$ref": "#/definitions/Position"
                },
                {
                  "$ref": "#/definitions/Position"
                },
                {
                  "$ref": "#/definitions/Position"
                },
                {
                  "$ref": "#/definitions/Position"
                },
                {
                  "$ref": "#/definitions/Position"
                },
                {
                  "$ref": "#/definitions/Position"
                }
              ],
              "minItems": 9,
              "maxItems": 9
            },
            "pageDown": {
              "$ref": "#/definitions/Position"
            },
            "pageUp": {
              "$ref": "#/definitions/Position"
            },
            "self": {
              "$ref": "#/definitions/Position"
            },
            "save": {
              "$ref": "#/definitions/Position"
            },
            "miniMap": {
              "$ref": "#/definitions/Position"
            }
          },
          "required": [
            "miniMap",
            "pageDown",
            "pageUp",
            "save",
            "self",
            "verbs"
          ]
        },
        "img": {
          "type": "object",
          "properties": {
            "cursor": {
              "type": "string"
            },
            "menu": {
              "type": "string"
            },
            "itemList": {
              "type": "string"
            }
          }
        },
        "colors": {
          "type": "object",
          "properties": {
            "background": {
              "type": "string"
            }
          },
          "required": [
            "background"
          ]
        },
        "friendlyName": {
          "type": "string"
        }
      },
      "required": [
        "colors",
        "friendlyName",
        "img",
        "positions",
        "verbs"
      ]
    }
  },
  "required": [
    "config",
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
        "entities": {
          "type": "object",
          "additionalProperties": false,
          "patternProperties": {
            "^[0-9]+$": {
              "anyOf": [
                {
                  "$ref": "#/definitions/Item"
                },
                {
                  "$ref": "#/definitions/Scenery"
                }
              ]
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
        },
        "dialogs": {
          "type": "object",
          "additionalProperties": false,
          "patternProperties": {
            "^[0-9]+$": {
              "type": "object",
              "properties": {
                "id": {
                  "type": "number"
                },
                "avatar": {
                  "type": "string"
                },
                "pages": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "properties": {
                      "question": {
                        "type": "string"
                      },
                      "answers": {
                        "type": "array",
                        "items": [
                          {
                            "type": "object",
                            "properties": {
                              "text": {
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
                              }
                            },
                            "required": [
                              "text"
                            ]
                          },
                          {
                            "type": "object",
                            "properties": {
                              "text": {
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
                              }
                            },
                            "required": [
                              "text"
                            ]
                          },
                          {
                            "type": "object",
                            "properties": {
                              "text": {
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
                              }
                            },
                            "required": [
                              "text"
                            ]
                          },
                          {
                            "type": "object",
                            "properties": {
                              "text": {
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
                              }
                            },
                            "required": [
                              "text"
                            ]
                          }
                        ],
                        "minItems": 4,
                        "maxItems": 4
                      },
                      "prereqFlags": {
                        "type": "array",
                        "items": {
                          "type": "string"
                        }
                      },
                      "prereqUsing": {
                        "type": "number"
                      }
                    },
                    "required": [
                      "answers",
                      "question"
                    ]
                  }
                }
              },
              "required": [
                "avatar",
                "id",
                "pages"
              ]
            }
          }
        }
      },
      "required": [
        "dialogs",
        "doors",
        "entities",
        "rooms"
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
        "name": {
          "type": "string"
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
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "verbs": {
          "type": "object",
          "properties": {
            "0": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/VerbLogic"
              }
            },
            "1": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/VerbLogic"
              }
            },
            "2": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/VerbLogic"
              }
            },
            "3": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/VerbLogic"
              }
            },
            "4": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/VerbLogic"
              }
            },
            "5": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/VerbLogic"
              }
            },
            "6": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/VerbLogic"
              }
            },
            "7": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/VerbLogic"
              }
            },
            "8": {
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
            "anyOf": [
              {
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
              {
                "type": "object",
                "properties": {
                  "action": {
                    "type": "string",
                    "enum": [
                      "SET_MUSIC"
                    ]
                  },
                  "value": {
                    "type": "object",
                    "properties": {
                      "text": {
                        "type": "string"
                      },
                      "fileName": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "fileName"
                    ]
                  }
                },
                "required": [
                  "action",
                  "value"
                ]
              }
            ]
          }
        },
        "condition": {
          "type": "object",
          "properties": {
            "field": {
              "$ref": "#/definitions/ValidPathsFor"
            },
            "operator": {
              "$ref": "#/definitions/Operator"
            },
            "value": {
              "type": "number"
            }
          },
          "required": [
            "field",
            "operator",
            "value"
          ]
        }
      }
    },
    "ValidPathsFor": {
      "enum": [
        "dialog",
        "id",
        "time"
      ],
      "type": "string"
    },
    "Operator": {
      "enum": [
        "EQ",
        "GT",
        "LT"
      ],
      "type": "string"
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
        "imgSet": {
          "$ref": "#/definitions/ImgSet"
        },
        "onTake": {
          "type": "string"
        },
        "takeableFlags": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "visibleFlags": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "requiresPrecision": {
          "type": "boolean"
        },
        "verbs": {
          "type": "object",
          "properties": {
            "0": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/VerbLogic"
              }
            },
            "1": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/VerbLogic"
              }
            },
            "2": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/VerbLogic"
              }
            },
            "3": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/VerbLogic"
              }
            },
            "4": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/VerbLogic"
              }
            },
            "5": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/VerbLogic"
              }
            },
            "6": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/VerbLogic"
              }
            },
            "7": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/VerbLogic"
              }
            },
            "8": {
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
        "isStatic": {
          "type": "boolean"
        },
        "time": {
          "type": "number"
        },
        "timeEffect": {
          "$ref": "#/definitions/TimeEffect"
        },
        "dialog": {
          "type": "number"
        },
        "capabilities": {
          "type": "array",
          "items": {
            "type": "string",
            "enum": [
              "RAND_HORIZ"
            ]
          }
        }
      },
      "required": [
        "contains",
        "description",
        "id",
        "name",
        "type"
      ]
    },
    "ImgSet": {
      "type": "object",
      "properties": {
        "img": {
          "type": "string"
        },
        "width": {
          "type": "number"
        },
        "conditions": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "index": {
                "type": "number"
              },
              "condition": {
                "type": "object",
                "properties": {
                  "field": {
                    "$ref": "#/definitions/ValidPathsFor"
                  },
                  "operator": {
                    "$ref": "#/definitions/Operator"
                  },
                  "value": {
                    "type": "number"
                  }
                },
                "required": [
                  "field",
                  "operator",
                  "value"
                ]
              }
            },
            "required": [
              "condition",
              "index"
            ]
          }
        }
      },
      "required": [
        "conditions",
        "img",
        "width"
      ]
    },
    "TimeEffect": {
      "type": "object",
      "properties": {
        "time": {
          "type": "number"
        },
        "effect": {
          "$ref": "#/definitions/VerbLogic"
        }
      },
      "required": [
        "effect",
        "time"
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
        "position": {
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
            "0": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/VerbLogic"
              }
            },
            "1": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/VerbLogic"
              }
            },
            "2": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/VerbLogic"
              }
            },
            "3": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/VerbLogic"
              }
            },
            "4": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/VerbLogic"
              }
            },
            "5": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/VerbLogic"
              }
            },
            "6": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/VerbLogic"
              }
            },
            "7": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/VerbLogic"
              }
            },
            "8": {
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
          "enum": [
            0,
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8
          ],
          "type": "number"
        },
        "movedText": {
          "type": "string"
        },
        "takeableFlags": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "visibleFlags": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "isStatic": {
          "type": "boolean"
        },
        "time": {
          "type": "number"
        },
        "timeEffect": {
          "$ref": "#/definitions/TimeEffect"
        },
        "dialog": {
          "type": "number"
        }
      },
      "required": [
        "contains",
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
        "name": {
          "type": "string"
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
          "enum": [
            0,
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8
          ],
          "type": "number"
        },
        "using": {
          "type": [
            "null",
            "number"
          ]
        },
        "dialog": {
          "type": "number"
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
        }
      },
      "required": [
        "items",
        "page",
        "room",
        "verb"
      ]
    },
    "VerbBehavior": {
      "enum": [
        "LOOK",
        "MOVE",
        "NONE",
        "OPEN",
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
