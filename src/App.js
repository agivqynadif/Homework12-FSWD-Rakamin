import * as React from "react";
import "./App.css";

function Board() {
  const [squares, setSquares] = React.useState(Array(9).fill(null));
  const [nextValue, setNextValue] = React.useState(true);

  function calculateNextValue(square) {
    if (squares[square] || calculateWinner(squares)) {
      return;
    }
    const newSquares = squares.slice();
    newSquares[square] = nextValue ? "X" : "O";
    setSquares(newSquares);
    setNextValue(!nextValue);
  }

  function restart() {
    setSquares(Array(9).fill(null));
    setNextValue(true);
  }

  function renderSquare(i) {
    return (
      <button className="square bg-blue-500 hover:bg-blue-600 text-white font-bold p-4" onClick={() => calculateNextValue(i)}>
        {squares[i]}
      </button>
    );
  }

  const winner = calculateWinner(squares);
  const status = calculateStatus(winner, squares, nextValue);

  return (
    <div className="w-64 mx-auto text-center">
      <h1 className="font-mono text-3xl animate-bounce duration-300 my-7 font-bold">TIC-TAC-TOE GAME</h1>
      <div className="status font-bold text-2xl mb-4">{status}</div>
      <div className="grid ">
        <div className="board-row grid gap-x-8 gap-y-4 grid-cols-3 my-3">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row grid gap-x-8 gap-y-4 grid-cols-3 my-3">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row grid gap-x-8 gap-y-4 grid-cols-3 my-3">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
      <button className="transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 text-white font-bold py-2 px-4 mt-4 rounded-md" onClick={restart}>
        Restart
      </button>
    </div>
  );
}

function Game() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="game-board">
        <Board />
      </div>
    </div>
  );
}

function calculateStatus(winner, squares, xIsNext) {
  return winner ? `Winner: ${winner}` : squares.every(Boolean) ? `Scratch: Cat's game` : `Next turn: ${xIsNext ? "X" : "O"}`;
}

function calculateWinner(squares) {
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
  for (const element of lines) {
    const [a, b, c] = element;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function App() {
  return <Game />;
}

export default App;
