import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text>This is HomeScreen</Text>
        <Button
          title="Go to detail screen"
          onPress={() => this.props.navigation.navigate('detail')}
        />
      </View>
    );
  }
}

export default HomeScreen;
