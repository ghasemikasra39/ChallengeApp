import React, {FC} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OnboardingScreen from '../screens/OnboardingScreen';

const Stack = createNativeStackNavigator();

const AppNavigator: FC = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
