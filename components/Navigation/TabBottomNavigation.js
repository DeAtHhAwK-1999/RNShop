import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import Nav from './Navigation';
import Products from '../Pages/Products';
import Offers from '../Pages/Offers';

const Tab = createBottomTabNavigator();

function TabBottomNavigation() {
    return (
        <Tab.Navigator
            initialRouteName="Nav"
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
                name="Offers"
                component={Offers}
                options={{
                    tabBarLabel: 'Offers',
                    tabBarIcon: ({ color, size }) => (
                        <Icons name="bell" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Products"
                component={Products}
                options={{
                    tabBarLabel: 'Products',
                    tabBarIcon: ({ color, size }) => (
                        <Icons name="alpha-x-circle" color={color} size={size} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

export default TabBottomNavigation;
