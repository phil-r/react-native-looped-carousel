# Looped carousel for React Native
[![NPM version](https://img.shields.io/npm/v/react-native-looped-carousel.svg)](https://www.npmjs.com/package/react-native-looped-carousel)
[![Build Status](https://travis-ci.org/phil-r/react-native-looped-carousel.svg?branch=master)](https://travis-ci.org/phil-r/react-native-looped-carousel)
[![Dependency Status](https://david-dm.org/phil-r/react-native-looped-carousel.svg)](https://david-dm.org/phil-r/react-native-looped-carousel)
[![devDependency Status](https://david-dm.org/phil-r/react-native-looped-carousel/dev-status.svg)](https://david-dm.org/phil-r/react-native-looped-carousel?type=dev)

Full-fledged "infinite" carousel for your next [react-native](https://github.com/facebook/react-native/) project. Supports iOS and Android.

Based on [react-native framework](https://github.com/facebook/react-native/) by Facebook.

## Demo
![demo gif](https://user-images.githubusercontent.com/577316/37863420-40c62c8c-2f5e-11e8-8eb4-23b8e7ea499e.gif)

## Install

```sh
npm install react-native-looped-carousel --save
```

## Examples

 - [Simple](https://snack.expo.io/@phil/carousel-simple-example)
 - [Modal](https://snack.expo.io/@phil/carousel-modal-example)
 - [Arrows](https://snack.expo.io/@phil/carousel-arrow-example)
 - [Dynamic content](https://snack.expo.io/@phil/carousel-dynamic-content-example)
 - [Animate to page](https://snack.expo.io/@phil/carousel-animate-to-page-example)

## Props

Name | propType | default value | description
--- | --- | --- | ---
autoplay | boolean | true | enables auto animations
delay | number | 4000 | number in milliseconds between auto animations
currentPage | number | 0 | allows you to set initial page
pageStyle | style | null | style for pages
contentContainerStyle | style | null | `contentContainerStyle` for the scrollView
onAnimateNextPage | func | null | callback that is called with 0-based Id of the current page
onPageBeingChanged | func | null | callback that is called when scroll start with 0-based Id of the next page
swipe | bool | true | motion control for Swipe
isLooped | bool | true | if it's possible to scroll infinitely
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
chosenBulletStyle | style | null | style for the selected bullet
**Arrows** | --- | --- | ---
arrows | bool | false | wether to show navigation arrows for the carousel
arrowStyle | style | null | style for navigation arrows
leftArrowStyle | style | null | style for left navigation arrow
rightArrowStyle | style | null | style for right navigation arrow
arrowsContainerStyle | style | null | style for the navigation arrows container
leftArrowText | string | 'Left' | label for left navigation arrow
rightArrowText | string | 'Right' | label for right navigation arrow

## Change the page

Three options :
- Go to a specific page
- Go to the next page
- Go to the previous page

```js
// assuming ref is set up on the carousel as (ref) => this._carousel = ref
onPress={() => {this._carousel.animateToPage(page)}}
onPress={() => {this._carousel._animateNextPage()}}
onPress={() => {this._carousel._animatePreviousPage()}}
```


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

## Used in
 - [React Native Buyscreen](https://github.com/appintheair/react-native-buyscreen)

## See also
 - [React Native Grid Component](https://github.com/phil-r/react-native-grid-component)

----

More on react-native here: https://facebook.github.io/react-native/docs/getting-started.html
