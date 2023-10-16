import React, { useState } from "react";
import "./TicTacToe.css";
import Cross from "../assets/CROSS.png";
import Circle from "../assets/CIRCLE.png";

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [count, setCount] = useState(0);
  const [lock, setLock] = useState(false);
  const [winner, setWinner] = useState(null);

  const checkWinner = () => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setLock(true);
        const winner = board[a];
        alert(`Player ${winner} wins!`);
        setWinner(board[a]);
        return;
      }
    }

    if (count === 9) {
      setLock(true);
      setWinner("Draw");
    }
  };

  const toggle = (num) => {
    if (lock || board[num]) {
      return;
    }

    const updatedBoard = [...board];
    updatedBoard[num] = count % 2 === 0 ? "X" : "O";

    setBoard(updatedBoard);
    setCount(count + 1);
    checkWinner();
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCount(0);
    setLock(false);
    setWinner(null);
  };

  return (
    <div className="container">
      <h1 className="title">Tic-Tac-Toe Game In React</h1>
      <div className="board">
        {board.map((value, index) => (
          <div className="boxes" key={index} onClick={() => toggle(index)}>
            {value === "X" && <img src={Cross} alt="Cross" />}
            {value === "O" && <img src={Circle} alt="Circle" />}
          </div>
        ))}
      </div>
      {winner && (
        <div className="message">
          {winner === "Draw" ? "It's a draw!" : `Player ${winner} wins!`}
        </div>
      )}
      <button className="reset" onClick={resetGame}>
        Reset
      </button>
    </div>
  );
};

export default TicTacToe;
