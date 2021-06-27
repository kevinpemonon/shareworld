import React from 'react';
import MyDonnationScreen from '../src/screens/profile/MyDonnationsScreen';
import renderer from 'react-test-renderer';

test('renders correctly', () => {
    const tree = renderer.create(<MyDonnationScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  