export const createEmptyBoard = () => {
  return Array(4)
    .fill(null)
    .map(() => Array(4).fill(0));
};

export const getEmptyTiles = (board) => {
  const empty = [];
  board.forEach((row, i) => {
    row.forEach((cell, j) => {
      if (cell === 0) empty.push([i, j]);
    });
  });
  return empty;
};

export const addRandomTile = (board) => {
  const empty = getEmptyTiles(board);
  if (empty.length === 0) return board;

  const [i, j] = empty[Math.floor(Math.random() * empty.length)];
  board[i][j] = Math.random() < 0.9 ? 2 : 4;
  return board;
};

export const slide = (row) => {
  const filtered = row.filter((n) => n !== 0);
  const zeros = Array(4 - filtered.length).fill(0);
  return [...filtered, ...zeros];
};

export const combine = (row) => {
  for (let i = 0; i < 3; i++) {
    if (row[i] !== 0 && row[i] === row[i + 1]) {
      row[i] *= 2;
      row[i + 1] = 0;
    }
  }
  return row;
};

export const moveLeft = (board) => {
  return board.map((row) => {
    row = slide(row);
    row = combine(row);
    return slide(row);
  });
};

export const moveRight = (board) => {
  return board.map((row) => {
    row = row.reverse();
    row = slide(row);
    row = combine(row);
    return slide(row).reverse();
  });
};

export const moveUp = (board) => {
  const newBoard = transpose(board);
  const moved = moveLeft(newBoard);
  return transpose(moved);
};

export const moveDown = (board) => {
  const newBoard = transpose(board);
  const moved = moveRight(newBoard);
  return transpose(moved);
};

const transpose = (board) => {
  return board[0].map((_, i) => board.map((row) => row[i]));
};

export const hasMovesLeft = (board) => {
  if (getEmptyTiles(board).length > 0) return true;

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === board[i][j + 1]) return true;
      if (board[j][i] === board[j + 1][i]) return true;
    }
  }

  return false;
};

export const calculateScore = (board) => {
  return board.flat().reduce((acc, val) => acc + val, 0);
};
