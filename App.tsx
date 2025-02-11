import React, {useEffect} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import Game from './src/Game';

const App = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <Game />
    </SafeAreaView>
  );
};

export default App;
