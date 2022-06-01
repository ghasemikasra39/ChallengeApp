import React from 'react';
import {render} from '@testing-library/react-native';
import Footer from '../src/components/Footer';

const {getByText} = render(<Footer />);
const element = getByText('Back');

test('finding a text with the content `Back`', () => {
  expect(element.props.children).toBe('Back');
});
