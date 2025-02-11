import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
  View,
  Image,
} from 'react-native';
import FastImage from 'react-native-fast-image';

interface SquareProps {
  value: string | null;
  onSquareClick: () => void;
}
const {width, height} = Dimensions.get('window');
const SIZE = 10;
const squareSize = (width - 10) / SIZE;
const Square: React.FC<SquareProps> = ({value, onSquareClick}) => {
  return (
    <TouchableOpacity style={styles.square} onPress={onSquareClick}>
      {value === 'X' ? (
        <Image style={styles.icon} source={require('./assets/x.png')} />
      ) : value === 'O' ? (
        <Image style={styles.icon} source={require('./assets/o.png')} />
      ) : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  square: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    backgroundColor: '#C5D3E8',
    borderWidth: 1,
    borderColor: '#5C7285',
    width: squareSize,
    height: squareSize,
  },
  icon: {
    width: squareSize - 10,
    height: squareSize - 10,
  },
});

export default Square;
