import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import SearchInput from '../src/components/SearchInput';

jest.spyOn(console, 'error').mockImplementation(() => {});

test('Renders default elements', () => {
  const onChangeTextHandlerMock = jest.fn((text: string) => {
    console.log('The entered text is: ', text);
  });
  const {getByPlaceholderText} = render(
    <SearchInput
      onChangeTextHandler={onChangeTextHandlerMock}
      searchValue={'static value'}
      SearchInputViewRef={jest.fn()}
    />,
  );
  const searchInputElm = getByPlaceholderText('Type to search');
  fireEvent(searchInputElm, 'onChangeText', 'ab');
  expect(onChangeTextHandlerMock).toHaveBeenCalledWith('ab');
});
