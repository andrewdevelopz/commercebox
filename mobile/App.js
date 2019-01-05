import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default class App extends React.Component {
  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Commerce Utility Box</Text>
        <Text>
          Welcome to the Commerce Utility Box Mobile experience! 🙏
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
  title: {
    fontSize: 30,
    fontWeight: '600',
    marginBottom: 30,
  },
});
