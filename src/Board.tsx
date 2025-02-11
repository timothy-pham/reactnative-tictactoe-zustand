import {Dimensions, StyleSheet, Text, View} from 'react-native';
import Square from './Square';
import {calculateWinner, calculateTurns, calculateStatus} from './utils';

interface BoardProps {
  xIsNext: boolean;
  squares: (string | null)[];
  onPlay: (nextSquares: (string | null)[]) => void;
}

const {width} = Dimensions.get('window');
const BOARD_SIZE = width - 32;
const SQUARE_SIZE = BOARD_SIZE / 3;

const Board: React.FC<BoardProps> = ({xIsNext, squares, onPlay}) => {
  const {winner, line} = calculateWinner(squares);
  const turns = calculateTurns(squares);
  const player = xIsNext ? 'X' : 'O';
  const status = calculateStatus(winner, turns, player);

  const handleClick = (i: number) => {
    if (squares[i] || winner) return;
    const nextSquares = squares.slice();
    nextSquares[i] = player;
    onPlay(nextSquares);
  };

  const renderWinningLine = () => {
    if (line.length === 0) return null;

    const [start, , end] = line;
    const startRow = Math.floor(start / 3);
    const startCol = start % 3;
    const endRow = Math.floor(end / 3);
    const endCol = end % 3;

    let lineStyle: any;
    if (startRow === endRow) {
      // Horizontal line
      lineStyle = {
        top: `${startRow * 33.33 + 16.67}%`,
        left: '0%',
        width: '100%',
        height: 3,
      };
    } else if (startCol === endCol) {
      // Vertical line
      lineStyle = {
        top: '0%',
        left: `${startCol * 33.33 + 16.67}%`,
        width: 3,
        height: '100%',
      };
    } else if (start === 0 && end === 8) {
      // Diagonal line from top-left to bottom-right
      lineStyle = {
        top: '50%',
        left: '30%',
        width: BOARD_SIZE * Math.sqrt(2),
        height: 3,
        transform: [
          {translateX: -BOARD_SIZE / 2},
          {translateY: -1.5},
          {rotate: '45deg'},
        ],
      };
    } else if (start === 2 && end === 6) {
      // Diagonal line from top-right to bottom-left
      lineStyle = {
        top: '50%',
        left: '30%',
        width: BOARD_SIZE * Math.sqrt(2),
        height: 3,
        transform: [
          {translateX: -BOARD_SIZE / 2},
          {translateY: -1.5},
          {rotate: '-45deg'},
        ],
      };
    }

    return <View style={[styles.line, lineStyle]} />;
  };

  return (
    <View style={styles.container}>
      <View style={styles.board}>
        {squares.map((value, i) => (
          <Square
            key={`square-${i}`}
            value={value}
            onSquareClick={() => handleClick(i)}
          />
        ))}
        {renderWinningLine()}
      </View>
      <Text style={styles.status}>{status}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  status: {
    marginTop: 16,
    fontSize: 24,
    fontWeight: 'bold',
    color: 'rgba(0, 0, 0, 0.8)',
  },
  board: {
    position: 'relative',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: BOARD_SIZE,
    height: BOARD_SIZE,
  },
  line: {
    position: 'absolute',
    backgroundColor: 'red',
  },
});

export default Board;
