import React, { useEffect } from "react";
import GameBoard from "./GameBoard";

function App() {
  useEffect(() => {
    const preventZoom = (e) => {
      if (e.ctrlKey || e.metaKey) e.preventDefault();
    };
    window.addEventListener("wheel", preventZoom, { passive: false });
    window.addEventListener("keydown", preventZoom);
    return () => {
      window.removeEventListener("wheel", preventZoom);
      window.removeEventListener("keydown", preventZoom);
    };
  }, []);

  return (
    <div className="app">
      <h1>2048 Clone</h1>
      <GameBoard />
    </div>
  );
}

export default App;
