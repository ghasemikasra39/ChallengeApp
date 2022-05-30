import React from 'react';
import {View, Text, TouchableOpacity, Platform} from 'react-native';
import {AppColors} from '../globals/AppColors';

export default function Footer(props) {
    return (
        <View
            style={{
                position: 'absolute',
                bottom: 0,
                paddingBottom: Platform.OS === 'ios' ? 40 : Platform.OS === 'web' ? 20 : 100,
                left: 0,
                right: 0,
                borderTopColor: AppColors.backgroundLight,
                backgroundColor: 'white',
                borderTopWidth: 1,
                paddingTop: 16,
                paddingHorizontal: 24,
            }}>
            <View style={{
                flexDirection: 'row',
                alignSelf: 'center',
                justifyContent: 'space-between',
                width: 320,
            }}>
                <TouchableOpacity
                    onPress={() => console.log('go back')}
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: AppColors.backgroundLight,
                        borderRadius: 12,
                        width: 81,
                        height: 44,
                        paddingVertical: 6,
                        paddingHorizontal: 12,
                    }}>
                    <Text style={{
                        fontFamily: 'Inter-Regular',
                        fontSize: 14,
                        color: AppColors.textDark,
                    }}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => console.log('Continue')}
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: AppColors.blue,
                        borderRadius: 12,
                        width: 109,
                        height: 44,
                        paddingVertical: 6,
                        paddingHorizontal: 12,
                    }}>
                    <Text style={{
                        fontFamily: 'Inter-Regular',
                        fontSize: 14,
                        color: AppColors.white,
                    }}>Continue</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
