import React from 'react';
import {View, FlatList, TouchableOpacity, Text, Image} from 'react-native';
import {AppColors} from '../globals/AppColors';

export default function SelectedItemsList(props) {

    const {removeItem, selectedItems} = props

    const renderSelectedItems = ({item}) => {
        const onRemoveItem = () => {
            removeItem(item);
        };
        return (
            <TouchableOpacity
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: AppColors.gray,
                    height: 32,
                    borderRadius: 50,
                    marginRight: 8,
                    paddingVertical: 6,
                    paddingHorizontal: 12,
                }}
                onPress={onRemoveItem}>
                <Text style={{fontFamily: 'Inter-Regular', fontSize: 14, color: AppColors.textLight}}>{item.firstname}</Text>
                <Image
                    style={{width: 8, height: 8, marginLeft: 10}}
                    source={require('../../assets/icons/close.png')}
                />
            </TouchableOpacity>
        );
    };

    return (
        <View>
            <FlatList
                showsHorizontalScrollIndicator={false}
                style={{marginTop: 8, alignSelf: 'center', width: 320}}
                contentContainerStyle={{justifyContent: 'flex-start'}}
                renderItem={renderSelectedItems}
                data={selectedItems}
                horizontal
            />
        </View>
    )
}
