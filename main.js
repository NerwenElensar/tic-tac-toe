// Factory function for Players

const Player = (name, token) => {
  const setToken = function (event) {
    const index = event.target.dataset.index;
    if (
      !event.target.classList.contains("occupied") &&
      gameController.getGameOverStatus() == false
    ) {
      gameboard.board.splice(index, 1, token);
      gameboard.renderGameboard();
      gameController.checkGameIsOver();
      gameController.switchToNextPlayer();
    }
    gameboard.renderGameboard();
  };
  return { name, token, setToken };
};

// create two players
const player1 = Player("Player1", "X");
const player2 = Player("Player2", "O");

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

  const allFieldsOcc = () => {
    const gameCellsHTMLElems = document.querySelectorAll(".game-cell");
    const allOcc = Array.from(gameCellsHTMLElems).every((gameCell) => {
      return gameCell.classList.contains("occupied");
    });
    return allOcc;
  };

  return { board, renderGameboard, threeInARow, threeInACol, threeInADiag, allFieldsOcc };
})();

const gameController = (() => {
  let gameOver = false;
  let currentPlayer = player1;

  const switchToNextPlayer = () => {
    currentPlayer = currentPlayer == player1 ? player2 : player1;
  };

  const checkGameIsOver = () => {
    if (gameboard.threeInARow() || gameboard.threeInACol() || gameboard.threeInADiag()) {
      setGameOverStatus(true);
      announce(currentPlayer.name);
    } else if (gameboard.allFieldsOcc()) {
      setGameOverStatus(true);
      announce("tie");
    }
  };

  const announce = (winner) => {
    const announceDiv = document.querySelector(".announcement");

    const announceText = winner === "tie" ? "This is a tie!" : `${winner} has won!`;
    announceDiv.textContent = announceText;
  };

  const getGameOverStatus = () => {
    return gameOver;
  };

  const setGameOverStatus = (status) => {
    gameOver = status;
  };

  const gameCellsHTMLElems = document.querySelectorAll(".game-cell");
  Array.from(gameCellsHTMLElems).forEach((gameCell) => {
    console.log("how often do I add eventlisteners?");
    gameCell.addEventListener("click", function (e) {
      currentPlayer.setToken(e);
    });
  });

  return { switchToNextPlayer, checkGameIsOver, getGameOverStatus };
})();
