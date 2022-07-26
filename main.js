// Factory function for Players

const Player = (token) => {
  const setToken = (event) => {
    const index = event.target.dataset.index;
    if (!event.target.classList.contains("occupied")) {
      gameboard.board.splice(index, 1, token);
    }
    gameboard.renderGameboard();
  };
  return { token, setToken };
};

// create two players
const player1 = Player("X");
const player2 = Player("O");

// Module pattern for gameboard and Controller

const gameboard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];

  const renderGameboard = () => {
    for (let i = 0; i < board.length; i++) {
      const boardCell = document.querySelector(`[data-index="${i}"]`);
      if (board[i] == "O") {
        boardCell.classList.add("occupied", "o");
      } else if (board[i] == "X") {
        boardCell.classList.add("occupied", "x");
      }
    }
  };

  return { board, renderGameboard };
})();

const gameController = (() => {
  //toggle whose turn it is after each token was set
  const gameCellsHTMLElems = document.querySelectorAll(".game-cell");
  Array.from(gameCellsHTMLElems).forEach((gameCell) => {
    gameCell.addEventListener("click", player1.setToken);
  });
})();
