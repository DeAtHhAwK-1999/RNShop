/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import { NavigationContainer } from '@react-navigation/native';
import React, { useState } from 'react';
import MyDrawer from './compoenets/Navigation/Drawer';
import HomeNav from './compoenets/Navigation/HomeNavigation';

const App = () => {
  const [LoggedIn, setLoggedIn] = useState(true);
  return (
    <NavigationContainer>
      {
        LoggedIn ?
          <MyDrawer />
          :
          <HomeNav />
      }
    </NavigationContainer>
  );
};

export default App;