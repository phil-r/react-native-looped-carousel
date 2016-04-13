# Looped carousel for React Native

Based on [react-native framework](https://github.com/facebook/react-native/) (as of <0.24.0) by Facebook.



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
  getInitialState: function() {
    return {
      size: {width: width, height: height}
    };
  }
  _onLayoutDidChange: function(e) {
    var layout = e.nativeEvent.layout;
    this.setState({size: {width: layout.width, height: layout.height}});
  },
  render: function() {
    return (
      <View style={{flex: 1}} onLayout={this._onLayoutDidChange}>
        <Carousel delay={500} style={this.state.size}>
            <View style={[{backgroundColor:'#BADA55'}, this.state.size]}/>
            <View style={[{backgroundColor:'red'}, this.state.size]}/>
            <View style={[{backgroundColor:'blue'}, this.state.size]}/>
        </Carousel>
      </View>
    );
  }
});

AppRegistry.registerComponent('carouselTest', () => carouselTest);
```

## Used in
 - [React Native Buyscreen](https://github.com/appintheair/react-native-buyscreen)

----

More on react-native here: http://facebook.github.io/react-native/docs/getting-started.html#content
