// Game device
export const ON_MOBILE = "ON_MOBILE";
export const ON_DESKTOP = "ON_DESKTOP";

// Game keyboard
export const KEYBOARD_QWERTY = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["EMPTY", "EMPTY", "Z", "X", "C", "V", "B", "N", "M", "EMPTY", "EMPTY"],
    ["BACK", "ENTER"]
  ];
export const KEYBOARD_AZERTY = [
    ["A", "Z", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["Q", "S", "D", "F", "G", "H", "J", "K", "L", "M"],
    ["EMPTY", "EMPTY", "W", "X", "C", "V", "B", "N", "EMPTY", "EMPTY"],
    ["BACK", "ENTER"]
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