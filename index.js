import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
} from 'react-native';


const PAGE_CHANGE_DELAY = 4000;

/**
 * Animates pages in cycle
 * (loop possible if children count > 1)
*/
export default class Carousel extends Component {
  static propTypes = {
    children: React.PropTypes.node.isRequired,
    autoplay: React.PropTypes.bool,
    delay: React.PropTypes.number,
    currentPage: React.PropTypes.number,
    style: View.propTypes.style,
    pageStyle: View.propTypes.style,
    contentContainerStyle: View.propTypes.style,
    pageInfo: React.PropTypes.bool,
    pageInfoBackgroundColor: React.PropTypes.string,
    pageInfoTextStyle: Text.propTypes.style,
    pageInfoTextSeparator: React.PropTypes.string,
    bullets: React.PropTypes.bool,
    bulletsContainerStyle: Text.propTypes.style,
    bulletStyle: Text.propTypes.style,
    arrows: React.PropTypes.bool,
    arrowsContainerStyle: Text.propTypes.style,
    arrowstyle: Text.propTypes.style,
    leftArrowText: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.element,
    ]),
    rightArrowText: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.element,
    ]),
    chosenBulletStyle: Text.propTypes.style,
    onAnimateNextPage: React.PropTypes.func,
  };

  static defaultProps = {
    delay: PAGE_CHANGE_DELAY,
    autoplay: true,
    pageInfo: false,
    bullets: false,
    arrows: false,
    pageInfoBackgroundColor: 'rgba(0, 0, 0, 0.25)',
    pageInfoTextSeparator: ' / ',
    currentPage: 0,
    style: undefined,
    pageStyle: undefined,
    contentContainerStyle: undefined,
    pageInfoTextStyle: undefined,
    bulletsContainerStyle: undefined,
    chosenBulletStyle: undefined,
    bulletStyle: undefined,
    arrowsContainerStyle: undefined,
    arrowstyle: undefined,
    leftArrowText: '',
    rightArrowText: '',
    onAnimateNextPage: undefined,
  };

  constructor(props) {
    super(props);
    const size = { width: 0, height: 0 };
    if (props.children) {
      const childrenLength = props.children.length ? props.children.length : 1;
      this.state = {
        currentPage: props.currentPage,
        size,
        childrenLength,
      };
    } else {
      this.state = { size };
    }
  }

  componentDidMount() {
    if (this.state.childrenLength) {
      this._setUpTimer();
    }
  }

  componentWillUnmount() {
    this._clearTimer();
  }

  componentWillReceiveProps(nextProps) {
    let childrenLength = 0;
    if (nextProps.children) {
      childrenLength = nextProps.children.length ? nextProps.children.length : 1;
    }
    this.setState({ childrenLength });
    this._setUpTimer();
  }

  _onScrollBegin = () => {
    this._clearTimer();
  }

  _setCurrentPage = (currentPage) => {
    this.setState({ currentPage }, () => {
      if (this.props.onAnimateNextPage) {
        // FIXME: called twice on ios with auto-scroll
        this.props.onAnimateNextPage(currentPage);
      }
    });
  }

  _onScrollEnd = (event) => {
    const offset = { ...event.nativeEvent.contentOffset };
    const page = this._calculateCurrentPage(offset.x);
    this._placeCritical(page);
    this._setCurrentPage(page);
    this._setUpTimer();
  }

  _onLayout = () => {
    this.container.measure((x, y, w, h) => {
      this.setState({
        size: { width: w, height: h },
      });
      this._placeCritical(this.state.currentPage);
    });
  }

  _clearTimer = () => {
    clearTimeout(this.timer);
  }

  _setUpTimer = () => {
    // only for cycling
    if (this.props.autoplay && this.props.children.length > 1) {
      this._clearTimer();
      this.timer = setTimeout(this._animateNextPage, this.props.delay);
    }
  }

  _scrollTo = (offset, animated) => {
    if (this.scrollView) {
      this.scrollView.scrollTo({ y: 0, x: offset, animated });
    }
  }

  _animateNextPage = () => {
    const { currentPage } = this.state;
    this._animateToPage(this._normalizePageNumber(currentPage + 1));
  }

  _animateToPage = (page) => {
    let currentPage = page;
    this._clearTimer();
    const { width } = this.state.size;
    const { childrenLength } = this.state;
    if (currentPage >= childrenLength) {
      currentPage = 0;
    }
    if (currentPage === 0) {
      this._scrollTo((childrenLength - 1) * width, false);
      this._scrollTo(childrenLength * width, true);
    } else if (currentPage === 1) {
      this._scrollTo(0, false);
      this._scrollTo(width, true);
    } else {
      this._scrollTo(currentPage * width, true);
    }
    this._setCurrentPage(currentPage);
    this._setUpTimer();
  }

  _placeCritical = (page) => {
    const { childrenLength } = this.state;
    const { width } = this.state.size;
    if (childrenLength === 1) {
      this._scrollTo(0, false);
    } else if (page === 0) {
      this._scrollTo(childrenLength * width, false);
    } else if (page === 1) {
      this._scrollTo(width, false);
    } else {
      this._scrollTo(page * width, false);
    }
  }

  _normalizePageNumber = (page) => {
    const { childrenLength } = this.state;
    if (page === childrenLength) {
      return 0;
    } else if (page >= childrenLength) {
      return 1;
    }
    return page;
  }

  _calculateCurrentPage = (offset) => {
    const { width } = this.state.size;
    const page = Math.floor(offset / width);
    return this._normalizePageNumber(page);
  }

  _renderPageInfo = (pageLength) =>
    <View style={styles.pageInfoBottomContainer} pointerEvents="none">
      <View style={styles.pageInfoContainer}>
        <View
          style={[styles.pageInfoPill, { backgroundColor: this.props.pageInfoBackgroundColor }]}
        >
          <Text
            style={[styles.pageInfoText, this.props.pageInfoTextStyle]}
          >
            {`${this.state.currentPage + 1}${this.props.pageInfoTextSeparator}${pageLength}`}
          </Text>
        </View>
      </View>
    </View>

  _renderBullets = (pageLength) => {
    const bullets = [];
    for (let i = 0; i < pageLength; i += 1) {
      bullets.push(
        <TouchableWithoutFeedback onPress={() => this._animateToPage(i)} key={`bullet${i}`}>
          <View
            style={i === this.state.currentPage ?
              [styles.chosenBullet, this.props.chosenBulletStyle] :
              [styles.bullet, this.props.bulletStyle]}
          />
        </TouchableWithoutFeedback>);
    }
    return (
      <View style={styles.bullets}>
        <View style={[styles.bulletsContainer, this.props.bulletsContainerStyle]}>
          {bullets}
        </View>
      </View>
    );
  }

  _renderArrows = () => {
    let { currentPage } = this.state;
    const { childrenLength } = this.state;
    if (currentPage < 1) {
      currentPage = childrenLength;
    }
    return (
      <View style={styles.arrows}>
        <View style={[styles.arrowsContainer, this.props.arrowsContainerStyle]}>
          <TouchableOpacity onPress={() => this._animateToPage(this._normalizePageNumber(currentPage - 1))} style={this.props.arrowstyle}><Text>{this.props.leftArrowText ? this.props.leftArrowText : 'Left'}</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => this._animateToPage(this._normalizePageNumber(currentPage + 1))} style={this.props.arrowstyle}><Text>{this.props.rightArrowText ? this.props.rightArrowText : 'Right'}</Text></TouchableOpacity>
        </View>
      </View>
    );
  }


  render() {
    const { size } = this.state;
    const children = this.props.children;
    let pages = [];

    if (children && children.length > 1) {
      // add all pages
      for (let i = 0; i < children.length; i += 1) {
        pages.push(children[i]);
      }
      // We want to make infinite pages structure like this: 1-2-3-1-2
      // so we add first and second page again to the end
      pages.push(children[0]);
      pages.push(children[1]);
    } else if (children.length === 1) {
      pages.push(children[0]);
    } else if (children) {
      pages.push(children);
    } else {
      return (
        <Text style={{ backgroundColor: 'white' }}>
          You are supposed to add children inside Carousel
        </Text>
      );
    }

    pages = pages.map((page, i) => (
      <TouchableWithoutFeedback style={[{ ...size }, this.props.pageStyle]} key={`page${i}`}>
        {page}
      </TouchableWithoutFeedback>
    ));

    const containerProps = {
      ref: (c) => { this.container = c; },
      onLayout: this._onLayout,
      style: [this.props.style],
    };

    const contents = (
      <ScrollView
        ref={(c) => { this.scrollView = c; }}
        onScrollBeginDrag={this._onScrollBegin}
        onMomentumScrollEnd={this._onScrollEnd}
        alwaysBounceHorizontal={false}
        alwaysBounceVertical={false}
        contentInset={{ top: 0 }}
        automaticallyAdjustContentInsets={false}
        showsHorizontalScrollIndicator={false}
        horizontal
        pagingEnabled
        bounces={false}
        contentContainerStyle={[
          styles.horizontalScroll,
          this.props.contentContainerStyle,
          {
            width: size.width * (children.length + (children.length > 1 ? 2 : 0)),
            height: size.height,
          },
        ]}
      >
        {pages}
      </ScrollView>);

    return (
      <View {...containerProps}>
        {contents}
        {this.props.arrows && this._renderArrows(this.state.childrenLength)}
        {this.props.bullets && this._renderBullets(this.state.childrenLength)}
        {this.props.pageInfo && this._renderPageInfo(this.state.childrenLength)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  horizontalScroll: {
    position: 'absolute',
  },
  pageInfoBottomContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
  },
  pageInfoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  pageInfoPill: {
    width: 80,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pageInfoText: {
    textAlign: 'center',
  },
  bullets: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 10,
    height: 30,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  arrows: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    backgroundColor: 'transparent',
  },
  arrowsContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bulletsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  chosenBullet: {
    margin: 10,
    width: 10,
    height: 10,
    borderRadius: 20,
    backgroundColor: 'white',
  },
  bullet: {
    margin: 10,
    width: 10,
    height: 10,
    borderRadius: 20,
    backgroundColor: 'transparent',
    borderColor: 'white',
    borderWidth: 1,
  },
});
