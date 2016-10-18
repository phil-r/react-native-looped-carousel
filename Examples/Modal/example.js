import React, { Component } from 'react';
import {
  Text,
  View,
  Modal,
  TouchableHighlight,
  Dimensions,
} from 'react-native';
import Carousel from 'react-native-looped-carousel';

const { width, height } = Dimensions.get('window');


const Page = (props) => (
  <View style={[{ backgroundColor: props.color }, { width, height }]}>
    <Text>{props.i}</Text>
    <TouchableHighlight onPress={props.onHide}>
      <Text>Hide Modal</Text>
    </TouchableHighlight>
  </View>
);

Page.propTypes = {
  i: React.PropTypes.number,
  onHide: React.PropTypes.func,
  color: React.PropTypes.string,
};


export default class CarouselExample extends Component {

  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
      carouselElements: [
        { color: '#BADA55' },
      ],
    };
  }

  showModal = () => {
    this.setState({ modalVisible: true });
  }

  hideModal = () => {
    this.setState({ modalVisible: false });
  }

  addPage = () => {
    this.setState({
      carouselElements: [
        ...this.state.carouselElements,
        { color: 'lightblue' },
      ],
    });
  }

  render() {
    return (
      <View style={{ flex: 1, marginTop: 22 }}>
        <Modal
          animationType={'slide'}
          transparent={false}
          visible={this.state.modalVisible}
        >
          <Carousel
            delay={2000}
            style={{ flex: 1 }}
            autoplay={false}
            pageInfo
            currentPage={this.state.carouselElements.length - 1}
            onAnimateNextPage={(p) => console.log(p)}
          >
            {
              this.state.carouselElements.map((el, i) =>
                <Page
                  key={i}
                  i={i}
                  color={el.color}
                  onHide={() => this.hideModal()}
                />)
            }
          </Carousel>
        </Modal>
        <TouchableHighlight
          onPress={() => this.showModal()}
        >
          <Text>Show Modal</Text>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => {
            this.addPage();
          }}
        >
          <Text>Add Page</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
