import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../components/Screens/home/home';
import Profile from '../components/Screens/profile/profile';
import Settings from '../components/Screens/settings/settings';
import ChangeLanguage from '../components/Screens/changeLanguage/changeLanguage';

const Stack = createNativeStackNavigator();

const Nav = () => {
  return (
    <Stack.Navigator initialRouteName='Home' screenOptions={{ headerShown: false }}>
      <Stack.Group>
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="ChangeLanguage" component={ChangeLanguage} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default Nav;