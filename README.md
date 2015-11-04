# Looped carousel for React Native

Based on [react-native framework](https://github.com/facebook/react-native/) (as of 0.13.0) by Facebook.



## Demo
![](http://spronin.github.io/img/react.gif)

## Install

```sh
$ npm install react-native-looped-carousel --save
```

## Usage
```js
'use strict';

var React = require('react-native');
var Carousel = require('react-native-looped-carousel');
var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View
} = React;

var carouselTest = React.createClass({
  render: function() {
    return (
      <Carousel delay={500} style={{width: width, height: height}}>
          <View style={{backgroundColor:'#BADA55',width:width,height:height}}/>
          <View style={{backgroundColor:'red',width:width,height:height}}/>
          <View style={{backgroundColor:'blue',width:width,height:height}}/>
      </Carousel>
    );
  }
});

AppRegistry.registerComponent('carouselTest', () => carouselTest);
```

## Used in
 - [React Native Buyscreen](https://github.com/appintheair/react-native-buyscreen)

----

More on react-native here: http://facebook.github.io/react-native/docs/getting-started.html#content
