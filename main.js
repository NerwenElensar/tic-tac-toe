// Factory function for Players

const Player = (name, token) => {
  const getName = () => {
    return name;
  };

  const setToken = function (event) {
    const index = event.target.dataset.index;
    if (
      !event.target.classList.contains("occupied") &&
      gameController.getGameOverStatus() == false
    ) {
      gameboard.addToken(index, token);
      gameboard.renderGameboard();
      gameController.checkGameIsOver();
      gameController.switchToNextPlayer();
    }
    gameboard.renderGameboard();
  };
  return { getName, setToken };
};

// create two players
const player1 = Player("Player1", "X");
const player2 = Player("Player2", "O");

// Module pattern for gameboard and Controller
const gameboard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];

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

  const resetGameboard = () => {
    board.splice(0, board.length);
    board.length = 9;
    board.fill("");
  };

  const addToken = (index, token) => {
    board.splice(index, 1, token);
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

  return {
    addToken,
    renderGameboard,
    threeInARow,
    threeInACol,
    threeInADiag,
    allFieldsOcc,
    resetGameboard,
  };
})();

const gameController = (() => {
  let gameOver = false;
  let currentPlayer = player1;
  const announceDiv = document.querySelector(".announcement");
  const buttonDiv = document.querySelector(".restart-btn");

  const switchToNextPlayer = () => {
    currentPlayer = currentPlayer == player1 ? player2 : player1;
  };

  const checkGameIsOver = () => {
    if (
      gameboard.threeInARow() ||
      gameboard.threeInACol() ||
      gameboard.threeInADiag() ||
      gameboard.allFieldsOcc()
    ) {
      setGameOverStatus(true);
      gameboard.allFieldsOcc()
        ? announceAndAddRestartButton("tie")
        : announceAndAddRestartButton(currentPlayer.getName());
    }
  };

  const announceAndAddRestartButton = (winner) => {
    const announceText = winner === "tie" ? "This is a tie!" : `${winner} has won!`;
    announceDiv.textContent = announceText;
    addRestartButton();
  };

  const addRestartButton = () => {
    const button = document.createElement("button");
    button.textContent = "Restart Game";
    buttonDiv.appendChild(button);
  };

  const removeRestartButton = () => {
    buttonDiv.removeChild(document.querySelector("button"));
  };

  const restartGame = () => {
    gameCellsHTMLElems.forEach((gameCell) => {
      removeHtmlClass(gameCell, "occupied");
      removeHtmlClass(gameCell, "o");
      removeHtmlClass(gameCell, "x");
    });
    gameboard.resetGameboard();
    gameOver = false;
    announceDiv.textContent = "";
    removeRestartButton();
  };

  const removeHtmlClass = (elem, className) => {
    if (elem.classList.contains(className)) {
      elem.classList.remove(className);
    }
  };

  const getGameOverStatus = () => {
    return gameOver;
  };

  const setGameOverStatus = (status) => {
    gameOver = status;
  };

  const gameCellsHTMLElems = document.querySelectorAll(".game-cell");
  Array.from(gameCellsHTMLElems).forEach((gameCell) => {
    gameCell.addEventListener("click", function (e) {
      currentPlayer.setToken(e);
    });
  });

  buttonDiv.addEventListener("click", restartGame);

  return { switchToNextPlayer, checkGameIsOver, getGameOverStatus, restartGame };
})();
