import React, {useEffect} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import Game from './Game';

const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Game />
    </SafeAreaView>
  );
};

export default App;
