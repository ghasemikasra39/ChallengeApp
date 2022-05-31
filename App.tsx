import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import OnboardingScreen from './src/screens/OnboardingScreen';

const {height} = Dimensions.get('screen');

const App = () => {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <View style={styles.center}>
          <OnboardingScreen />
        </View>
      </View>
    </NavigationContainer>
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
