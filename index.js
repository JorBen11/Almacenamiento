/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);


// import React from 'react';
// import { Provider } from 'react-redux';
// import { AppRegistry } from 'react-native';
// import App from './App';
// import store from './store';

// const RNRedux = () => (
//   <Provider store={store}>
//     <App />
//   </Provider>
// );

// AppRegistry.registerComponent('CounterApp', () => RNRedux);