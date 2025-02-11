const calculateWinner = (
  squares: (string | null)[],
): {
  winner: string | null;
  line: number[];
} => {
  const size = 10;
  const winLength = 5;

  const checkLine = (indices: number[]): any => {
    const [a, b, c, d, e] = indices;
    return (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c] &&
      squares[a] === squares[d] &&
      squares[a] === squares[e]
    );
  };

  // Check horizontal, vertical, and diagonal lines
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (col <= size - winLength) {
        const horizontalLine = [
          row * size + col,
          row * size + col + 1,
          row * size + col + 2,
          row * size + col + 3,
          row * size + col + 4,
        ];
        if (checkLine(horizontalLine)) {
          return {winner: squares[horizontalLine[0]], line: horizontalLine};
        }
      }

      if (row <= size - winLength) {
        const verticalLine = [
          row * size + col,
          (row + 1) * size + col,
          (row + 2) * size + col,
          (row + 3) * size + col,
          (row + 4) * size + col,
        ];
        if (checkLine(verticalLine)) {
          return {winner: squares[verticalLine[0]], line: verticalLine};
        }

        if (col <= size - winLength) {
          const diagonalRightLine = [
            row * size + col,
            (row + 1) * size + col + 1,
            (row + 2) * size + col + 2,
            (row + 3) * size + col + 3,
            (row + 4) * size + col + 4,
          ];
          if (checkLine(diagonalRightLine)) {
            return {
              winner: squares[diagonalRightLine[0]],
              line: diagonalRightLine,
            };
          }
        }

        if (col >= winLength - 1) {
          const diagonalLeftLine = [
            row * size + col,
            (row + 1) * size + col - 1,
            (row + 2) * size + col - 2,
            (row + 3) * size + col - 3,
            (row + 4) * size + col - 4,
          ];
          if (checkLine(diagonalLeftLine)) {
            return {
              winner: squares[diagonalLeftLine[0]],
              line: diagonalLeftLine,
            };
          }
        }
      }
    }
  }

  return {winner: null, line: []};
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

export {calculateWinner, calculateTurns, calculateStatus};
