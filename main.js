// Factory function for Players

const Player = (name, token) => {
  const setToken = function (event) {
    const index = event.target.dataset.index;
    if (!event.target.classList.contains("occupied")) {
      gameboard.board.splice(index, 1, token);
      gameController.checkGameIsOver();
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
        boardCell.classList.add("occupied", "o");
      } else if (board[i] == "X") {
        boardCell.classList.add("occupied", "x");
      }
    }
  };

  const hasSameToken = (x, y, z) => {
    if (board[x] == "" || board[y] == "" || board[z] == "") {
      return false;
    }
    return board[x] == board[y] && board[y] == board[z];
  };

  const threeInARow = () => {
    return hasSameToken(0, 1, 2) || hasSameToken(3, 4, 5) || hasSameToken(6, 7, 8);
  };

  const threeInACol = () => {
    return hasSameToken(0, 3, 6) || hasSameToken(1, 4, 7) || hasSameToken(2, 5, 8);
  };

  const threeInADiag = () => {
    return hasSameToken(0, 4, 8) || hasSameToken(2, 4, 6);
  };

  return { board, renderGameboard, threeInARow, threeInACol, threeInADiag };
})();

const gameController = (() => {
  let currentPlayer = player1;
  const switchToNextPlayer = () => {
    currentPlayer = currentPlayer == player1 ? player2 : player1;
  };

  // Things to consider: Where do I check that the game is over? How do I implement game loop? setToken in Player does way more than setting only the token.
  const checkGameIsOver = () => {
    if (gameboard.threeInARow() || gameboard.threeInACol() || gameboard.threeInADiag()) {
      console.log("row" + gameboard.threeInARow());
      console.log("col" + gameboard.threeInACol());
      console.log("diag" + gameboard.threeInADiag());

      console.log("the winner is: " + currentPlayer.name);
      //check who is winner -> should be currentPlayer if player is not swapped yet
      //stop game, disable game fields
      gameboard.disableBoard();
      //announce winner
      announceWinner();
    }
    //else if (allFieldsOcc()) {}
  };

  const gameCellsHTMLElems = document.querySelectorAll(".game-cell");
  Array.from(gameCellsHTMLElems).forEach((gameCell) => {
    gameCell.addEventListener("click", function (e) {
      currentPlayer.setToken(e);
    });
  });

  return { switchToNextPlayer, checkGameIsOver };
})();
