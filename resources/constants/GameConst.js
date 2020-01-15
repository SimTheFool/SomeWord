// Game device
export const ON_MOBILE = "ON_MOBILE";
export const ON_DESKTOP = "ON_DESKTOP";

// Game keyboard
export const KEYBOARD_QWERTY = [
    [{name: "Q"}, {name: "W"}, {name: "E"}, {name: "R"}, {name: "T"}, {name: "Y"}, {name: "U"}, {name: "I"}, {name: "O"}, {name: "P"}],
    [{name: "A"}, {name: "S"}, {name: "D"}, {name: "F"}, {name: "G"}, {name: "H"}, {name: "J"}, {name: "K"}, {name: "L"}],
    [{name: "EMPTY", symbol: ""}, {name: "EMPTY", symbol: ""}, {name: "Z"}, {name: "X"}, {name: "C"}, {name: "V"}, {name: "B"}, {name: "N"}, {name: "M"}, {name: "EMPTY", symbol: ""}, {name: "EMPTY", symbol: ""},],
    [{name: "BACK", symbol: "←"}, {name: "ENTER", symbol: "↲"}]
  ];
export const KEYBOARD_AZERTY = [
    [{name: "A"}, {name: "Z"}, {name: "E"}, {name: "R"}, {name: "T"}, {name: "Y"}, {name: "U"}, {name: "I"}, {name: "O"}, {name: "P"}],
    [{name: "Q"}, {name: "S"}, {name: "D"}, {name: "F"}, {name: "G"}, {name: "H"}, {name: "J"}, {name: "K"}, {name: "L"}, {name: "M"}],
    [{name: "EMPTY", symbol: ""}, {name: "EMPTY", symbol: ""}, {name: "W"}, {name: "X"}, {name: "C"}, {name: "V"}, {name: "B"}, {name: "N"}, {name: "EMPTY", symbol: ""}, {name: "EMPTY", symbol: ""},],
    [{name: "BACK", symbol: "←"}, {name: "ENTER", symbol: "↲"}]
];

// Game type
export const MULTI = "MULTI";
export const SOLO = "SOLO";

// Game status
export const NOT_PLAYING = "NOT_PLAYING";
export const WAITING = "WAITING";
export const BEGINNING = "BEGINNING";
export const PLAYING = "PLAYING";
export const WINNING = "WINNING";
export const LOOSING = "LOOSING";

// Game speed
export const INFINITE = {
  unspawnDelay: -1,
  name: "INFINITE"
};
export const VERY_SLOW = {
  unspawnDelay: 12000,
  name: "VERY SLOW"
};
export const SLOW = {
  unspawnDelay: 9000,
  name: "SLOW"
};
export const MEDIUM = {
  unspawnDelay: 8000,
  name: "MEDIUM"
};
export const FAST = {
  unspawnDelay: 6000,
  name: "FAST"
};
export const VERY_FAST = {
  unspawnDelay: 4500,
  name: "VERY FAST"
};
export const EXTREME = {
  unspawnDelay: 2750,
  name: "EXTREME"
};

export const SPEEDS = [VERY_SLOW, SLOW, MEDIUM, FAST, VERY_FAST, EXTREME];
export const CHANGE_SPEED_DELAY = 20000;
export const MIN_SPAWN_DELAY = 1000;
export const MAX_SPAWN_DELAY = 3700;


// Game score
export const SCORE_PER_CHAR = 10;
export const CHAIN_FACTOR = (chain) => {
  return Math.pow(chain + 1, 2) / 125;
};

// Word number per game type
export const WORD_NB_SOLO = 9;
export const WORD_NB_MULTI = 6;