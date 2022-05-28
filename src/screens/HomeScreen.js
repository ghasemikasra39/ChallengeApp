import React, {useState} from 'react';
import {View, Text, TextInput} from 'react-native';

export default function HomeScreen(props) {
  const [searchValue, setSearchValue] = useState();

  const onChangeTextHander = value => {
    setSearchValue(value);
  };

  return (
    <>
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
      <TextInput
        style={{color: '#94A3B8', fontFamily: 'Inter-Regular', fontSize: 16}}
        onChangeText={onChangeTextHander}
        value={searchValue}
        placeholder="Type to search"
      />
    </>
  );
}
