import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Provider } from 'react-redux';
import { store } from './app/redux/store';

import Sprites from './app/screens/Sprites';

export default function App() {
  return (
    <Provider store={store}>
      <Sprites />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 50
  },
  text: {
    color: '#000'
  }
});
