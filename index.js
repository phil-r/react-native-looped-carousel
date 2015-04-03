'use strict';

var React = require('react-native');
var TimerMixin = require('react-timer-mixin');
var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');

var {
  AppRegistry,
  StyleSheet,
  Image,
  Text,
  ScrollView,
  View
} = React;


var PAGE_CHANGE_DELAY = 4000;

/**
 * Animates pages in cycle
 * (loop possible if children count > 1)
*/
var Carousel = React.createClass({
    propTypes:{
        children: React.PropTypes.node.isRequired,
        delay: React.PropTypes.number,
        style: View.propTypes.style
    },
    mixins: [TimerMixin],
    getDefaultProps: function() {
      return {delay: PAGE_CHANGE_DELAY};
    },
    getInitialState: function() {
      if (!!this.props.children) {
        var childrenCount = this.props.children.length;
        return {
          contentOffset: {x: childrenCount > 1 ? width : 0, y: 0},
          currentPage: childrenCount > 1 ? 1 : 0,
          hasChildren: true,
        };
      } else {
        return {
          hasChildren: false,
        }
      }
    },
    componentDidMount:function(){
      if (this.state.hasChildren) {
        this._setUpTimer();
      }
    },
    _onScrollBegin: function(event) {
      clearTimeout(this.timer);
    },
    _onScrollEnd: function(event) {
      this._setUpTimer();

      var offset = event.nativeEvent.contentOffset;

      var childrenCount = this.props.children.length;
      if (offset.x == 0) {
        offset = {x: childrenCount*width, y: 0};
      } else if (offset.x == (childrenCount+1)*width) {
        offset = {x: width, y: 0};
      }

      this._calculateCurrentPage(offset.x);
      this.setState({contentOffset: offset});
    },
    _setUpTimer: function() {
      //only for cycling
      if (this.props.children.length > 1) {
        clearTimeout(this.timer);
        this.timer = this.setTimeout(this._animateNextPage, this.props.delay);
      }
    },
    _animateNextPage: function() {
      var k = this.state.currentPage;
      k++;

      this.setState({currentPage: k});
      this.refs.scrollView.scrollTo(0, k*width);
      this._setUpTimer();
    },
    _calculateCurrentPage: function(offset) {
      var page = Math.floor((offset - width/2) / width) + 1;
      this.setState({currentPage: page});
    },
    //TODO: add optional `dots` for displaying current page (like pageControl)
    render: function() {
      var pages = [];

      if (!this.state.hasChildren) {
        return (
          <Text style={{backgroundColor: 'white'}}>
            You are supposed to add children inside Carousel
          </Text>
        );
      }

      var children = this.props.children;

      //to make infinite pages structure like this is needed: 3-1-2-3-1
      //add last one at the 1st place
      if (children.length > 1) {
        pages.push(children[children.length-1]);
      }

      //add all pages
      for (var i=0; i<children.length; i++) {
        pages.push(children[i]);
      }

      //add first one at the last place
      if (children.length > 1) {
        pages.push(children[0]);
      }

      pages = pages.map((page, i) => {
        return <View style={{width: width}} key={"page"+i}>{page}</View>;
      });

      return (
        <ScrollView
          ref='scrollView'
          onScrollBeginDrag={this._onScrollBegin}
          onMomentumScrollEnd={this._onScrollEnd}
          alwaysBounceHorizontal={false}
          alwaysBounceVertical={false}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          pagingEnabled={true}
          bounces={false}
          contentOffset={this.state.contentOffset}
          contentContainerStyle={[
            styles.horizontalScroll,
            this.props.style,
            {width: width*(this.props.children.length+(this.props.children.length>1?2:0))}
          ]}
        >
          {pages}
        </ScrollView>
      );
    },
});

var styles = StyleSheet.create({
  horizontalScroll: {
    height: height,
    position:'absolute'
  }
});

module.exports = Carousel;
