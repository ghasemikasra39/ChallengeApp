import React, {FC} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AppMain from '../AppMain';

const Stack = createNativeStackNavigator();

const AppNavigator: FC = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="AppMain" component={AppMain} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
