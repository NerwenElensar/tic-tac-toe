// Factory function for Players

const Player = (token) => {
  return { token };
};

// create two players
const player1 = player("X");
const player2 = player("O");

// Module pattern for gameboard and displayController

const gameboard = (() => {
  const _board = [];
})();

const displayController = (() => {})();
