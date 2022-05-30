import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {AppColors} from '../globals/AppColors';
import {AppStyles} from '../globals/AppStyles';

export default function Header(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Category</Text>
      <Text style={styles.subtitle}>Choose a topic best describes you</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {alignItems: 'flex-start', width: 320, alignSelf: 'center'},
  title: {
    fontFamily: AppStyles.fontFamily,
    fontSize: 30,
    color: AppColors.gray,
    paddingBottom: 8,
  },
  subtitle: {
    fontFamily: AppStyles.fontFamily,
    fontSize: 14,
    color: AppColors.lightGray,
  },
});
