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
}

const useGameStore = create<GameState>(
  combine(
    {
      history: [Array(9).fill(null)],
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
    }),
  ),
);

export default useGameStore;
