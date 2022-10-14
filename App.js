/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import AppNav from './components/Navigation/AppNav';
import AuthProvider from './components/Navigation/AuthProvider';

const App = () => {
  return (
    <AuthProvider>
      <AppNav />
    </AuthProvider>
  );
};

export default App;