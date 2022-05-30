import React from 'react';
import {View, Text} from 'react-native';
import {AppColors} from '../globals/AppColors';

export default function Header(props) {
    return (
        <View style={{alignItems: 'flex-start', width: 320, alignSelf: 'center'}}>
            <Text
                style={{
                    fontFamily: 'Inter-Regular',
                    fontSize: 30,
                    color: AppColors.gray,
                    paddingBottom: 8,
                }}>
                Category
            </Text>
            <Text
                style={{fontFamily: 'Inter-Regular', fontSize: 14, color: AppColors.lightGray}}>
                Choose a topic best describes you
            </Text>
        </View>
    )
}
