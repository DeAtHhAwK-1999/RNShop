import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'
import Home from '../Pages/Home';
import Login from '../Pages/Login';
import Register from '../Pages/Register';
import Nav from '../Navigation/Navigation';

const Tab = createBottomTabNavigator();

function Test() {
    return (
        <Tab.Navigator
            initialRouteName="Login"
            screenOptions={{
                tabBarActiveTintColor: '#e91e63',
                headerShown: false
            }}
        >
            <Tab.Screen
                name="Nav"
                component={Nav}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <Icons name="home" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Login"
                component={Login}
                options={{
                    tabBarLabel: 'Login',
                    tabBarIcon: ({ color, size }) => (
                        <Icons name="bell" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Register"
                component={Register}
                options={{
                    tabBarLabel: 'Register',
                    tabBarIcon: ({ color, size }) => (
                        <Icons name="alpha-x-circle" color={color} size={size} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

export default Test;
