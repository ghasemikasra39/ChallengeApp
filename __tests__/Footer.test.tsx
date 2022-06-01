import React from 'react';
import {render} from '@testing-library/react-native';
import Footer from '../src/components/Footer';

it('Should render without errors', () => {
  render(<Footer />);
});

test('Renders the default elements', () => {
  const {getAllByText} = render(<Footer />);
  expect(getAllByText('Continue').length).toBe(1);
  expect(getAllByText('Back').length).toBe(1);
});

test('Finding a text with the content `Back`', () => {
  const {getByText} = render(<Footer />);
  const element = getByText('Back');
  expect(element.props.children).toBe('Back');
});
