import React, { useEffect, useState } from "react";
import Tile from "./Tile";
import {
  createEmptyBoard,
  addRandomTile,
  moveLeft,
  moveRight,
  moveUp,
  moveDown,
  hasMovesLeft,
  calculateScore,
} from "./gameLogic";

function GameBoard() {
  const [board, setBoard] = useState(createEmptyBoard());
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() =>
    parseInt(localStorage.getItem("highScore") || "0", 10)
  );

  useEffect(() => {
    let newBoard = addRandomTile([...board.map((row) => [...row])]);
    newBoard = addRandomTile(newBoard);
    setBoard(newBoard);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameOver || won) return;
      const key = e.key.toLowerCase();
      let newBoard;

      if (key === "arrowleft" || key === "a") newBoard = moveLeft(board);
      else if (key === "arrowright" || key === "d") newBoard = moveRight(board);
      else if (key === "arrowup" || key === "w") newBoard = moveUp(board);
      else if (key === "arrowdown" || key === "s") newBoard = moveDown(board);
      else return;

      if (JSON.stringify(newBoard) !== JSON.stringify(board)) {
        const updated = addRandomTile(newBoard.map((row) => [...row]));
        setBoard(updated);

        const currentScore = calculateScore(updated);
        setScore(currentScore);
        if (currentScore > highScore) {
          localStorage.setItem("highScore", currentScore.toString());
          setHighScore(currentScore);
        }

        if (!hasMovesLeft(updated)) setGameOver(true);
        if (!won && updated.flat().includes(2048)) setWon(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [board, gameOver, won]);

  return (
    <div className="game-container">
      <div className="scoreboard">
        <div>Score: {score}</div>
        <div>High Score: {highScore}</div>
      </div>

      <div className="board-wrapper" style={{ position: "relative" }}>
        <div className={`board ${gameOver || won ? "blur" : ""}`}>
          {board.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <Tile key={`${rowIndex}-${colIndex}`} value={cell} />
            ))
          )}
        </div>

        {(won || gameOver) && (
          <div className="overlay">
            <h2 className={won ? "game-won" : "game-over"}>
              {won ? "🎉 You Win!" : "Game Over!"}
            </h2>
            <button
              className="play-again"
              onClick={() => window.location.reload()}
            >
              Play Again
            </button>
          </div>
        )}
      </div>

      <div className="instructions">
        <h3>How to Play</h3>
        <p>
          Use <strong>WASD</strong> or <strong>arrow keys</strong> to move the
          tiles. When two tiles with the same number touch, they merge into one!
        </p>
        <p>
          Try to reach <strong>2048</strong> — but you can go further!
        </p>
      </div>
    </div>
  );
}

export default GameBoard;
