import { create } from "zustand";
import { Board } from "../types/Board";
import { Shape, shapes } from "../shapes";
import { getRandomShape } from "../utils";

interface BoardState {
  board: Board; // should be 'colors'
  setBoard: (newBoard: Board) => void;
  currentShape: Shape | null;
  setCurrentShape: (newCurrentShape: Shape) => void;
}

export const useBoardStore = create<BoardState>((set) => ({
  board: Array.from({ length: 20 }, () => Array(10).fill(null)),
  setBoard: (newBoard) => set(() => ({ board: newBoard })),
  currentShape: null,
  setCurrentShape: (newCurrentShape) =>
    set(() => ({ currentShape: newCurrentShape })),
}));
