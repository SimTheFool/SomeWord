// Game device
export const ON_MOBILE = "ON_MOBILE";
export const ON_DESKTOP = "ON_DESKTOP";

// Game keyboard
export const KEYBOARD_QWERTY = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L", "BACK"],
    ["Z", "X", "C", "V", "B", "N", "M", "ENTER"]
  ];
export const KEYBOARD_AZERTY = [
    ["A", "Z", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["Q", "S", "D", "F", "G", "H", "J", "K", "L", "M", "BACK"],
    ["W", "X", "C", "V", "B", "N", "ENTER"]
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
export const INFINITE = [-1, -1];
export const VERY_SLOW = [4000, 7000];
export const SLOW = [3500, 5500];
export const MEDIUM = [3000, 4500];
export const FAST = [2500, 3500];
export const VERY_FAST = [2000, 3000];
export const EXTREME = [1500, 2500];