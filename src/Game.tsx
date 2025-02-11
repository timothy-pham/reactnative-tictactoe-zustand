import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Board from './Board';
import useGameStore from './state';

const Game: React.FC = () => {
  const history = useGameStore(state => state.history);
  const setHistory = useGameStore(state => state.setHistory);
  const currentMove = useGameStore(state => state.currentMove);
  const setCurrentMove = useGameStore(state => state.setCurrentMove);
  const reset = useGameStore(state => state.reset);
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

  console.log('History: ', history);
  return (
    <View style={styles.container}>
      <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      <TouchableOpacity onPress={reset}>
        <Text style={styles.resetBtn}>RESET GAME</Text>
      </TouchableOpacity>
      <ScrollView style={styles.history}>
        {history.map((_, historyIndex) => {
          const description =
            historyIndex > 0
              ? `Go to move #${historyIndex}`
              : 'Go to game start';
          if (historyIndex === 0) {
            return null;
          }
          return (
            <TouchableOpacity
              key={historyIndex}
              onPress={() => jumpTo(historyIndex)}>
              <Text style={styles.historyText}>{description}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    fontFamily: 'monospace',
  },
  history: {
    flex: 1,
  },
  historyText: {
    marginBottom: 8,
    fontSize: 14,
    backgroundColor: '#C5D3E8',
    marginHorizontal: 16,
    padding: 8,
    borderRadius: 8,
  },
  resetBtn: {
    backgroundColor: 'red',
    margin: 16,
    color: 'white',
    padding: 8,
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Game;
