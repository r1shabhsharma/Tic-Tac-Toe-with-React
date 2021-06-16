import { useState, useEffect } from 'react';
import './App.css';
import { Patterns } from './components/Patterns';
import Square from './components/Square';

function App() {

  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""])
  const [player, setPlayer] = useState("O");
  const [result, setResult] = useState({ winner: "none", state: "none" });

  //check for winning patterns on every chnage
  useEffect(() => {
    checkIfTie();
    checkWin();

    //we change it here because if we dont
    //whenever the user will win, it will change the player nad then show reuslt
    //that is always wrong result
    //Moreover initially when the user has not entered any value
    //we check for winning
    //and it will change the player
    // to start with x, we initially assigned value o
    // and then it will start with x
    if (player === "X") {
      setPlayer("O")
    }
    else {
      setPlayer("X");
    }

  }, [board]);

  useEffect(() => {
    if (result.state !== "none") {
      alert(`Game finished! ${result.winner} won`)
    }
  }, [result]);

  const chooseSquare = (index) => {
    if (board[index] === "") {
      setBoard(board.map((val, idx) => {
        if (idx === index && val === "") {
          return player;
        }

        return val;
      })
      );
    }

  }

  const checkWin = () => {
    Patterns.forEach((currPtrn) => {
      //Iterate through patterns
      const firstPlayer = board[currPtrn[0]];

      //check if game started. If not, dont move forward
      if (firstPlayer === "") return;

      let foundWinningPattern = true;

      currPtrn.forEach((idx) => {
        if (board[idx] !== firstPlayer) {
          foundWinningPattern = false;
        }
      })

      if (foundWinningPattern) {
        setResult({ winner: player, state: "won" });
        restartGame();
      }
    })
  }

  const checkIfTie = () => {
    let filled = true;
    board.forEach((index) => {
      if (index === "") {
        filled = false;
      }
    })

    if (filled) {
      setResult({ winner: "No One", state: "Tie" });
    }
  }

  const restartGame = () => {
    setBoard(["", "", "", "", "", "", "", "", ""]);
    setPlayer("X");
  }

  return (
    <div className="App">
      <nav>Tic Tac Toe</nav>
      <div className="Board">
        <div className="row">
          <Square value={board[0]} chooseSquare={() => { chooseSquare(0) }} />
          <Square value={board[1]} chooseSquare={() => { chooseSquare(1) }} />
          <Square value={board[2]} chooseSquare={() => { chooseSquare(2) }} />
        </div>
        <div className="row">
          <Square value={board[3]} chooseSquare={() => { chooseSquare(3) }} />
          <Square value={board[4]} chooseSquare={() => { chooseSquare(4) }} />
          <Square value={board[5]} chooseSquare={() => { chooseSquare(5) }} />
        </div>
        <div className="row">
          <Square value={board[6]} chooseSquare={() => { chooseSquare(6) }} />
          <Square value={board[7]} chooseSquare={() => { chooseSquare(7) }} />
          <Square value={board[8]} chooseSquare={() => { chooseSquare(8) }} />
        </div>
      </div>
    </div>
  );
}

export default App;
