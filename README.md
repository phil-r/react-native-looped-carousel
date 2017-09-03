# Looped carousel for React Native
[![NPM version](http://img.shields.io/npm/v/react-native-looped-carousel.svg?style=flat)](https://www.npmjs.com/package/react-native-looped-carousel)
[![Build Status](https://travis-ci.org/appintheair/react-native-looped-carousel.svg)](https://travis-ci.org/appintheair/react-native-looped-carousel)
[![Dependency Status](https://david-dm.org/appintheair/react-native-looped-carousel.svg)](https://david-dm.org/appintheair/react-native-looped-carousel)
[![devDependency Status](https://david-dm.org/appintheair/react-native-looped-carousel/dev-status.svg)](https://david-dm.org/appintheair/react-native-looped-carousel#info=devDependencies)

Full-fledged "infinite" carousel for your next [react-native](https://github.com/facebook/react-native/) project. Supports iOS and Android.

Based on [react-native framework](https://github.com/facebook/react-native/) by Facebook.

## Demo
![](http://spronin.github.io/img/react.gif)

## Install

```sh
npm install react-native-looped-carousel --save
```

## Props

Name | propType | default value | description
--- | --- | --- | ---
autoplay | boolean | true | enables auto animations
delay | number | 4000 | number in milliseconds between auto animations
currentPage | number | 0 | allows you to set initial page
pageStyle | style | null | style for pages
contentContainerStyle | style | null | `contentContainerStyle` for the scrollView
onAnimateNextPage | func | null | callback that is called with 0-based Id of the current page
swipe | bool | true | motion control for Swipe
isLooped | bool | true | whether the carousel is looped / infinite
**Pagination** | --- | --- | ---
pageInfo | boolean | false | shows `{currentPage} / {totalNumberOfPages}` pill at the bottom
pageInfoBackgroundColor | string | 'rgba(0, 0, 0, 0.25)' | background color for pageInfo
pageInfoBottomContainerStyle | style | null | style for the pageInfo container
pageInfoTextStyle | style | null | style for text in pageInfo
pageInfoTextSeparator | string | ' / ' | separator for `{currentPage}` and `{totalNumberOfPages}`
**Bullets** | --- | --- | ---
bullets | bool | false | wether to show "bullets" at the bottom of the carousel
bulletStyle | style | null | style for each bullet
bulletsContainerStyle | style | null | style for the bullets container
chosenBulletStyle | stlye | null | style for the selected bullet
**Arrows** | --- | --- | ---
arrows | bool | false | wether to show navigation arrows for the carousel
arrowsStyle | style | null | style for navigation arrows
arrowsContainerStyle | style | null | style for the navigation arrows container
leftArrowText | string / element | 'Left' | label / icon for left navigation arrow
rightArrowText | string / element | 'Right' | label / icon for right navigation arrow

## Usage
```js
import React, { Component } from 'react';
import {
  Text,
  View,
  Dimensions,
} from 'react-native';
import Carousel from 'react-native-looped-carousel';

const { width, height } = Dimensions.get('window');

export default class CarouselExample extends Component {

  constructor(props) {
    super(props);

    this.state = {
      size: { width, height },
    };
  }

  _onLayoutDidChange = (e) => {
    const layout = e.nativeEvent.layout;
    this.setState({ size: { width: layout.width, height: layout.height } });
  }

  render() {
    return (
      <View style={{ flex: 1 }} onLayout={this._onLayoutDidChange}>
        <Carousel
          delay={2000}
          style={this.state.size}
          autoplay
          pageInfo
          onAnimateNextPage={(p) => console.log(p)}
        >
          <View style={[{ backgroundColor: '#BADA55' }, this.state.size]}><Text>1</Text></View>
          <View style={[{ backgroundColor: 'red' }, this.state.size]}><Text>2</Text></View>
          <View style={[{ backgroundColor: 'blue' }, this.state.size]}><Text>3</Text></View>
        </Carousel>
      </View>
    );
  }
}
```

[Full example code](Examples/Simple)

## Used in
 - [React Native Buyscreen](https://github.com/appintheair/react-native-buyscreen)

## See also
 - [React Native Grid Component](https://github.com/phil-r/react-native-grid-component)

----

More on react-native here: http://facebook.github.io/react-native/docs/getting-started.html#content
