import React from 'react';
import {View, Text, TouchableOpacity, Platform} from 'react-native';

export default function Footer(props) {
    return (
        <View
            style={{
                position: 'absolute',
                // justifyContent: 'space-between',
                bottom: 0,
                paddingBottom: Platform.OS === 'ios' ? 40 : Platform.OS === 'web' ? 20 : 100,
                left: 0,
                right: 0,
                borderTopColor: '#F0F2F4',
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
                        backgroundColor: '#F0F2F4',
                        borderRadius: 12,
                        width: 81,
                        height: 44,
                        paddingVertical: 6,
                        paddingHorizontal: 12,
                    }}>
                    <Text style={{
                        fontFamily: 'Inter-Regular',
                        fontSize: 14,
                        color: '#1E293B',
                    }}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => console.log('Continue')}
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#040FD9',
                        borderRadius: 12,
                        width: 109,
                        height: 44,
                        paddingVertical: 6,
                        paddingHorizontal: 12,
                    }}>
                    <Text style={{
                        fontFamily: 'Inter-Regular',
                        fontSize: 14,
                        color: '#FFFFFF',
                    }}>Continue</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
