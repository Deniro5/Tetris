import { create } from "zustand";
import { Shape } from "../shapes";

interface GameState {
  score: number;
  level: number;
  nextShape: Shape | null;
  isPlaying: boolean;
  setScore: (newScore: number) => void;
  setIsPlaying: (newIsPlaying: boolean) => void;
  setNextShape: (newNextShape: Shape | null) => void;
}

export const useGameStore = create<GameState>((set) => ({
  score: 0,
  level: 1,
  isPlaying: false,
  nextShape: null,
  setScore: (newScore) =>
    set(() => ({ score: newScore, level: Math.floor(newScore / 1000) + 1 })),
  setIsPlaying: (newIsPlaying) => set(() => ({ isPlaying: newIsPlaying })),
  setNextShape: (newNextShape) => set(() => ({ nextShape: newNextShape })),
}));
