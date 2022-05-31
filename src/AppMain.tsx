import React, {FC} from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import OnboardingScreen from './screens/OnboardingScreen';
import {useGetDataQuery} from './store/slices/OnboardingSlice';
import {AppColors} from './globals/AppColors';

const AppMain: FC = () => {
  const {data, isLoading} = useGetDataQuery(null);

  if (isLoading)
    return (
      <View style={styles.activityIndicator}>
        <ActivityIndicator size="large" color={AppColors.blue} />
      </View>
    );

  return <OnboardingScreen data={data.data} />;
};

export default AppMain;

const styles = StyleSheet.create({
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
