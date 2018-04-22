import { Text, View } from 'react-native';

import React from 'react';
import Carousel from '../index';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(
    <Carousel delay={2000} autoplay={false} pageInfo currentPage={2}>
      <View style={[{ backgroundColor: '#BADA55' }]}>
        <Text>1</Text>
      </View>
      <View style={[{ backgroundColor: 'red' }]}>
        <Text>2</Text>
      </View>
      <View style={[{ backgroundColor: 'blue' }]}>
        <Text>3</Text>
      </View>
    </Carousel>
  );

  // If at any moment we'll want to use snapshot testing,
  // uncomment the line below
  // expect(tree).toMatchSnapshot();

  // tree.unmount();
});
