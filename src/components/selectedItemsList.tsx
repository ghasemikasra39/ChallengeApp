import React, {FC} from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
} from 'react-native';
import {AppColors} from '../globals/AppColors';
import {AppStyles} from '../globals/AppStyles';
import {crossIcon} from '../globals/images';
import {laureatesInterface} from '../../assets/data';

interface Props {
  removeItem: (item: laureatesInterface) => void;
  selectedItems: laureatesInterface[];
}

const SelectedItemsList: FC<Props> = props => {
  const {removeItem, selectedItems} = props;

  const renderSelectedItems = ({item}: {item: laureatesInterface}) => {
    const onRemoveItem = () => {
      removeItem(item);
    };
    return (
      <TouchableOpacity style={styles.container} onPress={onRemoveItem}>
        <Text style={styles.text}>{item.firstname}</Text>
        <Image style={styles.image} source={crossIcon} />
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <FlatList
        showsHorizontalScrollIndicator={false}
        style={styles.flatList}
        contentContainerStyle={{justifyContent: 'flex-start'}}
        renderItem={renderSelectedItems}
        data={selectedItems}
        horizontal
      />
    </View>
  );
};

export default SelectedItemsList;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: AppColors.gray,
    height: 32,
    borderRadius: 50,
    marginRight: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  text: {
    fontFamily: AppStyles.fontFamily,
    fontSize: 14,
    color: AppColors.textLight,
  },
  image: {width: 8, height: 8, marginLeft: 10},
  flatList: {marginTop: 8, alignSelf: 'center', width: 320},
});
