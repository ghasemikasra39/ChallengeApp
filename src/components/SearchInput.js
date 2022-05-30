import React from 'react';
import {View, TextInput, Image} from 'react-native';
import {AppColors} from '../globals/AppColors';

export default function SearchInput(props) {
    const {onChangeTextHander, searchValue, SearchInputViewRef} = props
    return (
        <View
            ref={SearchInputViewRef}
            style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignSelf: 'center',
                backgroundColor: AppColors.backgroundLight,
                width: 327,
                height: 56,
                borderRadius: 50,
                marginTop: 32,
            }}>
            <View style={{justifyContent: 'center', paddingLeft: 17}}>
                <Image
                    style={{width: 20, height: 20}}
                    source={require('../../assets/icons/search-normal_4x.png')}
                />
            </View>
            <View style={{justifyContent: 'center', width: 200}}>
                <TextInput
                    style={{
                        color: AppColors.lightGray,
                        fontFamily: 'Inter-Regular',
                        fontSize: 16,
                    }}
                    maxLength={20}
                    onChangeText={onChangeTextHander}
                    value={searchValue}
                    placeholder="Type to search"
                />
            </View>
            <View style={{justifyContent: 'center'}}>
                <Image
                    style={{width: 56, height: 56}}
                    source={require('../../assets/icons/Group_4x.png')}
                />
            </View>
        </View>
    )
}
