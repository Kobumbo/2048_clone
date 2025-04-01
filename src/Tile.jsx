import React from "react";

function Tile({ value }) {
  const classes = ["tile"];
  if (value !== 0) classes.push("tile-" + value);
  if (value !== 0) classes.push("animate");

  return <div className={classes.join(" ")}>{value !== 0 ? value : ""}</div>;
}

export default Tile;
