import React, {FC} from 'react';
import OnboardingScreen from './screens/OnboardingScreen';
import {useGetDataQuery} from './store/slices/OnboardingSlice';

const AppMain: FC = () => {
  const {data, isLoading} = useGetDataQuery(null);

  if (isLoading) return <></>;

  return <OnboardingScreen data={data.data} />;
};

export default AppMain;
