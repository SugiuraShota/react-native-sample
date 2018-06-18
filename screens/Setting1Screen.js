import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';

class Setting1Screen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text>This is Setting1Screen</Text>
        <Button
          title="Go to setting2 screen"
          onPress={() => this.props.navigation.navigate('setting2')}
        />
      </View>
    );
  }
}

export default Setting1Screen;
