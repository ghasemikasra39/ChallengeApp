import React from 'react';
import {View, TextInput, Image, StyleSheet} from 'react-native';
import {AppColors} from '../globals/AppColors';
import {AppStyles} from '../globals/AppStyles';

export default function SearchInput(props) {
    const {onChangeTextHandler, searchValue, SearchInputViewRef} = props;
    return (
        <View
            ref={SearchInputViewRef}
            style={styles.container}>
            <View style={styles.leftIcon}>
                <Image
                    style={styles.leftIconImage}
                    source={require('../../assets/icons/search-normal_4x.png')}
                />
            </View>
            <View style={styles.textInputContainer}>
                <TextInput
                    style={styles.textInput}
                    maxLength={20}
                    onChangeText={onChangeTextHandler}
                    value={searchValue}
                    placeholder="Type to search"
                />
            </View>
            <View style={styles.rightIcon}>
                <Image
                    style={styles.rightIconImage}
                    source={require('../../assets/icons/Group_4x.png')}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'center',
        backgroundColor: AppColors.backgroundLight,
        width: 327,
        height: 56,
        borderRadius: 50,
        marginTop: 32,
    },
    leftIcon: {justifyContent: 'center', paddingLeft: 17},
    leftIconImage: {width: 20, height: 20},
    textInputContainer: {justifyContent: 'center', width: 200},
    textInput: {
        color: AppColors.lightGray,
        fontFamily: AppStyles.fontFamily,
        fontSize: 16,
    },
    rightIcon: {justifyContent: 'center'},
    rightIconImage: {width: 56, height: 56},
});
