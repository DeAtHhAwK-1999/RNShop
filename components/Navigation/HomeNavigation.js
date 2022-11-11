import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../Pages/Login';
import Register from '../Pages/Register';
import ChangeLanguage from '../Pages/ChangeLanguage';
import Colors from '../../assets/Themes/Colors';

const Stack = createNativeStackNavigator();

const HomeNav = () => {
  return (
    <Stack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false }}>
      <Stack.Group screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
      </Stack.Group>
      <Stack.Group screenOptions={{ headerShown: true }}>
        <Stack.Screen name="ChangeLanguage" component={ChangeLanguage} options={{
          title: "Application Language",
          headerTintColor: "#fff",
          headerStyle: { backgroundColor: Colors.PrimaryColor }
        }} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default HomeNav;