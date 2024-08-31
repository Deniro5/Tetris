import { Board, Row } from "../types/Board";

export const handleTetris = (board: Board, start: number, end: number) => {
  let tetrises = 0;
  const boardClone = cloneBoard(board);
  for (let row = start; row <= end; row++) {
    if (boardClone[row].every((item) => !!item)) {
      removeRow(boardClone, row);
      tetrises++;
    }
  }
  return { tetrises, boardAfterTetris: boardClone };
};

const removeRow = (board: Board, rowIndex: number) => {
  while (rowIndex >= 1) {
    if (rowIsEmpty(board[rowIndex])) break;
    board[rowIndex] = board[rowIndex - 1];
    rowIndex--;
  }
  return board;
};

const rowIsEmpty = (row: Row) => row.every((item) => !item);

export const cloneBoard = (board: Board) => board.map((row) => [...row]);

//valid position is a position thats empty and not out of bounds
export const isValidPosition = (board: Board, position: [number, number]) => {
  const x = position[0];
  const y = position[1];

  return x >= 0 && x < 10 && y >= 0 && y < 20 && !board[y][x];
};

export const getNewBoard = () =>
  Array.from({ length: 20 }, () => Array(10).fill(null));
