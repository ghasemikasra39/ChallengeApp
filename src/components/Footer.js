import React from 'react';
import {View, Text, TouchableOpacity, Platform, StyleSheet} from 'react-native';
import {AppColors} from '../globals/AppColors';
import {AppStyles} from '../globals/AppStyles';

export default function Footer(props) {
  return (
    <View style={styles.container}>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          onPress={() => console.log('go back')}
          style={styles.backButton}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => console.log('Continue')}
          style={styles.continueButton}>
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    paddingBottom:
      Platform.OS === 'ios' ? 40 : Platform.OS === 'web' ? 20 : 100,
    left: 0,
    right: 0,
    borderTopColor: AppColors.backgroundLight,
    backgroundColor: AppColors.white,
    borderTopWidth: 1,
    paddingTop: 16,
    paddingHorizontal: 24,
  },
  backButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppColors.backgroundLight,
    borderRadius: 12,
    width: 81,
    height: 44,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
    width: 320,
  },
  backButtonText: {
    fontFamily: AppStyles.fontFamily,
    fontSize: 14,
    color: AppColors.textDark,
  },
  continueButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppColors.blue,
    borderRadius: 12,
    width: 109,
    height: 44,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  continueButtonText: {
    fontFamily: AppStyles.fontFamily,
    fontSize: 14,
    color: AppColors.white,
  },
});
