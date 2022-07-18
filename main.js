// Factory function for Players

const Player = (token) => {
  return { token };
};

// create two players
const player1 = Player("X");
const player2 = Player("O");

// Module pattern for gameboard and Controller

const gameboard = (() => {
  const board = ["O", "", "X", "", "", "O", "", "", ""];

  const renderGameboard = () => {
    //take array, run through it with loop, if it has O or X place it in the field, with correlates with the index, should be in html the data index
    for (let i = 0; i < board.length; i++) {
      // get html div that correlates with the index
      const boardCell = document.querySelector(`[data-index="${i}"]`);
      if (board[i] == "O") {
        boardCell.textContent = "O";
      } else if (board[i] == "X") {
        boardCell.textContent = "X";
      }
    }
  };

  return { renderGameboard };
})();

const gameController = (() => {})();
