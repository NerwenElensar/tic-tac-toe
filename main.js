// Factory function for Players

const Player = (name, token) => {
  const setToken = function (event) {
    const index = event.target.dataset.index;
    if (!event.target.classList.contains("occupied")) {
      gameboard.board.splice(index, 1, token);
      gameController.switchToNextPlayer();
    }
    gameboard.renderGameboard();
  };
  return { name, token, setToken };
};

// create two players
const player1 = Player("player1", "X");
const player2 = Player("player2", "O");

// Module pattern for gameboard and Controller

const gameboard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];

  const renderGameboard = () => {
    for (let i = 0; i < board.length; i++) {
      const boardCell = document.querySelector(`[data-index="${i}"]`);
      if (board[i] == "O") {
        console.log("hello I am OOOOO");
        boardCell.classList.add("occupied", "o");
      } else if (board[i] == "X") {
        console.log("booh");
        boardCell.classList.add("occupied", "x");
      }
    }
  };

  return { board, renderGameboard };
})();

const gameController = (() => {
  //toggle whose turn it is after each token was set
  let currentPlayer = player1;
  const switchToNextPlayer = () => {
    console.log("switchfrom" + currentPlayer.name);
    currentPlayer = currentPlayer == player1 ? player2 : player1;
    console.log("switchto" + currentPlayer.name);
  };
  const gameCellsHTMLElems = document.querySelectorAll(".game-cell");
  Array.from(gameCellsHTMLElems).forEach((gameCell) => {
    gameCell.addEventListener("click", function (e) {
      currentPlayer.setToken(e);
    });
  });

  return { switchToNextPlayer };
})();
