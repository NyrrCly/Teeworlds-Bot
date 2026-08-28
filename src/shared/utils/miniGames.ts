export function coinFlip() {
  const words = ["Heads", "Tails"];
  return words[Math.floor(Math.random() * words.length)];
}

export function eightBall() {
  const words = [
    "Yes",
    "No",
    "Probably yes",
    "Probably no",
    "Maybe",
    "Not quite",
  ];
  return words[Math.floor(Math.random() * words.length)];
}
