import {Dimensions, StyleSheet, Text, View} from 'react-native';
import Square from './Square';
import {calculateWinner, calculateTurns, calculateStatus} from './utils';
import useGameStore from './state';

interface BoardProps {
  xIsNext: boolean;
  squares: (string | null)[];
  onPlay: (nextSquares: (string | null)[]) => void;
}

const {width} = Dimensions.get('window');
const BOARD_SIZE = width - 10;
const SIZE = 10;
const SQUARE_SIZE = BOARD_SIZE / SIZE;

const Board: React.FC<BoardProps> = ({xIsNext, squares, onPlay}) => {
  const currentMove = useGameStore(state => state.currentMove);
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
    if (!line || line.length < 5) return null;

    const start = line[0];
    const end = line[line.length - 1];

    const startRow = Math.floor(start / SIZE);
    const startCol = start % SIZE;
    const endRow = Math.floor(end / SIZE);
    const endCol = end % SIZE;

    // Calculate distance
    const dx = endCol - startCol;
    const dy = endRow - startRow;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const widthLine = (distance + 1) * (100 / SIZE) - 10;
    let lineStyle: any = {
      position: 'absolute',
      backgroundColor: 'yellow',
      height: 3, // Line thickness
      width: `${widthLine}%`, // Extend through all winning cells
    };
    // Positioning based on the first cell in the line
    const topOffset = (startRow + 0.5) * (100 / SIZE);
    const leftOffset = (startCol + 0.5) * (100 / SIZE);
    if (dy === 0) {
      // Horizontal
      lineStyle = {
        ...lineStyle,
        top: `${topOffset}%`,
        left: '0%',
        width: '100%',
      };
    } else if (dx === 0) {
      // Vertical
      lineStyle = {
        ...lineStyle,
        top: '0%',
        left: `${leftOffset}%`,
        height: '100%',
        width: 3,
      };
    } else {
      // Diagonal cases
      const angle = Math.atan2(dy, dx) * (180 / Math.PI);
      lineStyle = {
        ...lineStyle,
        top: `${topOffset}%`,
        left: `${leftOffset}%`,
        transform: [{rotate: `${angle}deg`}],
        transformOrigin: 'top left',
      };
    }
    return <View style={lineStyle} />;
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
    flex: 2,
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
});

export default Board;
