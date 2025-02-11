import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
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

interface SquareProps {
  value: string | null;
  onSquareClick: () => void;
}

const Square: React.FC<SquareProps> = ({value, onSquareClick}) => {
  return (
    <TouchableOpacity style={styles.square} onPress={onSquareClick}>
      <Text style={styles.squareText}>{value}</Text>
    </TouchableOpacity>
  );
};

interface BoardProps {
  xIsNext: boolean;
  squares: (string | null)[];
  onPlay: (nextSquares: (string | null)[]) => void;
}

const Board: React.FC<BoardProps> = ({xIsNext, squares, onPlay}) => {
  const winner = calculateWinner(squares);
  const turns = calculateTurns(squares);
  const player = xIsNext ? 'X' : 'O';
  const status = calculateStatus(winner, turns, player);

  const handleClick = (i: number) => {
    if (squares[i] || winner) return;
    const nextSquares = squares.slice();
    nextSquares[i] = player;
    onPlay(nextSquares);
  };

  return (
    <>
      <Text style={styles.status}>{status}</Text>
      <View style={styles.board}>
        {squares.map((value, i) => (
          <Square
            key={`square-${i}`}
            value={value}
            onSquareClick={() => handleClick(i)}
          />
        ))}
      </View>
    </>
  );
};

const Game: React.FC = () => {
  const history = useGameStore(state => state.history);
  const setHistory = useGameStore(state => state.setHistory);
  const currentMove = useGameStore(state => state.currentMove);
  const setCurrentMove = useGameStore(state => state.setCurrentMove);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  const handlePlay = (nextSquares: (string | null)[]) => {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  };

  const jumpTo = (nextMove: number) => {
    setCurrentMove(nextMove);
  };

  return (
    <View style={styles.container}>
      <View>
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </View>
      <View style={styles.history}>
        {history.map((_, historyIndex) => {
          const description =
            historyIndex > 0
              ? `Go to move #${historyIndex}`
              : 'Go to game start';
          return (
            <TouchableOpacity
              key={historyIndex}
              onPress={() => jumpTo(historyIndex)}>
              <Text style={styles.historyText}>{description}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const calculateWinner = (squares: (string | null)[]): string | null => {
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

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
};

const calculateTurns = (squares: (string | null)[]): number => {
  return squares.filter(square => !square).length;
};

const calculateStatus = (
  winner: string | null,
  turns: number,
  player: string,
): string => {
  if (!winner && !turns) return 'Draw';
  if (winner) return `Winner ${winner}`;
  return `Next player: ${player}`;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    fontFamily: 'monospace',
  },
  status: {
    marginBottom: 8,
  },
  board: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 152,
    height: 152,
    borderWidth: 1,
    borderColor: '#999',
  },
  square: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#999',
    width: 50,
    height: 50,
  },
  squareText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  history: {
    marginLeft: 16,
  },
  historyText: {
    marginBottom: 8,
  },
});

export default Game;
