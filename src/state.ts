import {create} from 'zustand';
import {combine} from 'zustand/middleware';

interface GameState {
  history: (string | null)[][];
  currentMove: number;
  setHistory: (
    nextHistory:
      | (string | null)[][]
      | ((history: (string | null)[][]) => (string | null)[][]),
  ) => void;
  setCurrentMove: (
    nextCurrentMove: number | ((currentMove: number) => number),
  ) => void;
  reset: () => void;
}

const SIZE = 10;

const useGameStore = create<GameState>(
  combine(
    {
      history: [Array(SIZE * SIZE).fill(null)],
      currentMove: 0,
    },
    (set, get) => ({
      setHistory: nextHistory => {
        set(state => ({
          history:
            typeof nextHistory === 'function'
              ? nextHistory(state.history)
              : nextHistory,
        }));
      },
      setCurrentMove: nextCurrentMove => {
        set(state => ({
          currentMove:
            typeof nextCurrentMove === 'function'
              ? nextCurrentMove(state.currentMove)
              : nextCurrentMove,
        }));
      },
      reset: () => {
        set({history: [Array(SIZE * SIZE).fill(null)], currentMove: 0});
      },
    }),
  ),
);

export default useGameStore;
