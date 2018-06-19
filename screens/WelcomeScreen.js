import _ from 'lodash';
import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Dimensions, AsyncStorage } from 'react-native';
import { Button } from 'react-native-elements';
import { AppLoading } from 'expo';

const SCREEN_WIDTH = Dimensions.get('window').width;

const WELCOME_SCREEN1_IMG = require('../assets/welcome_screen1.jpg');
const WELCOME_SCREEN2_IMG = require('../assets/welcome_screen2.jpg');
const WELCOME_SCREEN3_IMG = require('../assets/welcome_screen3.jpg');

const SLIDE_DATA = [
  { title: 'Step: 1', text: 'Add your trip memory', uri: WELCOME_SCREEN1_IMG },
  { title: 'Step: 2', text: 'All tips on the list', uri: WELCOME_SCREEN2_IMG },
  { title: 'Step: 3', text: 'See the trip detail!', uri: WELCOME_SCREEN3_IMG },
];

class WelcomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isInitialized: null,
    };
  }

  async componentWillMount() {
    let isInitializedString = await AsyncStorage.getItem('isInitialized');
    if (isInitializedString === 'true') {
      this.setState({ isInitialized: true });
      this.props.navigation.navigate('main');
    } else {
      this.setState({ isInitialized: false });
    }
  }

  onStartButtonPress = async () => {
    await AsyncStorage.setItem('isInitialized', 'true');
    this.props.navigation.navigate('main');
  }

  renderLastButton(index) {
    if (index === SLIDE_DATA.length - 1) {
      return (
        <Button
          style={{ padding: 10 }}
          buttonStyle={{ backgroundColor: 'deepskyblue' }}
          title="Let's get it started!"
          onPress={this.onStartButtonPress}
        />
      );
    }
  }

  renderSlides() {
    return SLIDE_DATA.map((slide, index) => {
      return (
        <View
          key={index}
          style={styles.slideStyle}
        >
          <View style={styles.containerStyle} >
            <Text style={styles.textStyle}>{slide.title}</Text>
            <Text style={styles.textStyle}>{slide.text}</Text>
          </View>
          <Image
            style={{ flex: 2 }}
            resizeMode="contain"
            source={slide.uri}
          />
          <View style={styles.containerStyle} >
            { this.renderLastButton(index) }
            <Text style={styles.textStyle}>{index + 1} / 3</Text>
          </View>
        </View>
      );
    });
  }

  render() {
    if (_.isNull(this.state.isInitialized)) {
      return <AppLoading />;
    }
    return (
      <ScrollView
        horizontal
        pagingEnabled
        style={{ flex: 1 }}
      >
      {this.renderSlides()}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  slideStyle: {
    flex: 1,
    backgroundColor: 'skyblue',
    width: SCREEN_WIDTH,
    alignItems: 'center',
  },
  containerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    color: 'white',
    fontSize: 20,
    padding: 5,
  },
});

export default WelcomeScreen;
