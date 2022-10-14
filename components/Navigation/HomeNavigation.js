import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../Pages/Login';
import Home from '../Pages/Home';
import Register from '../Pages/Register';
import Profile from '../Pages/Profile';
import MyDrawer from './Drawer';

const Stack = createNativeStackNavigator();

const HomeNav = () => {
  return (
    <Stack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false }}>
      <Stack.Group screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
      </Stack.Group>
      <Stack.Group screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={MyDrawer} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default HomeNav;