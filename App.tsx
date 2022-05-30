import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import OnboardingScreen from './src/screens/OnboardingScreen';

const {height} = Dimensions.get('screen');

console.log('some console here');
const App = () => {
  return (
    <View style={styles.container}>
      <View style={styles.center}>
        <OnboardingScreen />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height,
  },
  center: {
    flex: 1,
    paddingTop: 48,
    paddingHorizontal: 24,
  },
});

export default App;
