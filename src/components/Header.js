import React from 'react';
import {View, Text} from 'react-native';

export default function Header(props) {
    return (
        <View style={{alignItems: 'flex-start', width: 320, alignSelf: 'center'}}>
            <Text
                style={{
                    fontFamily: 'Inter-Regular',
                    fontSize: 30,
                    color: '#334155',
                    paddingBottom: 8,
                }}>
                Category
            </Text>
            <Text
                style={{fontFamily: 'Inter-Regular', fontSize: 14, color: '#94A3B8'}}>
                Choose a topic best describes you
            </Text>
        </View>
    )
}
