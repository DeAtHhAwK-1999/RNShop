import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import MIcons from 'react-native-vector-icons/MaterialIcons';
import Nav from './navigation';
import Products from '../components/Screens/products/products';
import Offers from '../components/Screens/offers/offers';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Colors from '../../assets/Themes/Colors';
import Profile from '../components/Screens/profile/profile';
import Settings from '../components/Screens/settings/settings';

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

function MyTabBar({ state, descriptors, navigation }) {
    return (
        <View style={styles.mainContainer}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const icon = options.tabBarIcon;
                const label = options.tabBarLabel;
                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        // The `merge: true` option makes sure that the params inside the tab screen are preserved
                        navigation.navigate({ name: route.name, merge: true });
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <TouchableOpacity
                        key={index}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={label != "Settings" ? styles.mainItemContainer : styles.CustomButtonStyle}
                    >
                        {
                            label == "Offers"
                                ?
                                <MIcons name={icon} size={35} color={label != "Settings" ? isFocused ? Colors.SeconderyColor : '#fff' : Colors.SeconderyColor} />
                                :
                                <Icons name={icon} size={35} color={label != "Settings" ? isFocused ? Colors.SeconderyColor : '#fff' : Colors.SeconderyColor} />
                        }
                        {
                            label != "Settings"
                                ?
                                <Text style={{ color: isFocused ? Colors.SeconderyColor : '#fff' }}>
                                    {label}
                                </Text>
                                :
                                null
                        }
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

const Tab = createBottomTabNavigator();

function TabBottomNavigation() {
    return (
        <Tab.Navigator
            initialRouteName="Nav"
            screenOptions={{
                tabBarActiveTintColor: '#e91e63',
                headerShown: false
            }}
            tabBar={props => <MyTabBar {...props} />}
        >
            <Tab.Screen
                name="Nav"
                component={Nav}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: "home"
                }}
            />
            <Tab.Screen
                name="Offers"
                component={Offers}
                options={{
                    tabBarLabel: 'Offers',
                    tabBarIcon: "local-offer"
                }}
            />
            <Tab.Screen
                name="Settings"
                component={Settings}
                options={{
                    tabBarLabel: 'Settings',
                    tabBarIcon: "store-settings"
                }}
            />
            <Tab.Screen
                name="Products"
                component={Products}
                options={{
                    tabBarLabel: 'Products',
                    tabBarIcon: "format-list-text"
                }}
            />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: "face-man-shimmer",
                }}
            />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: 'row',
        backgroundColor: Colors.PrimaryColor,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
    },
    mainItemContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        borderRadius: 1,
        borderColor: "#333B42"
    },
    CustomButtonStyle: {
        top: -20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        height: 60,
        width: 80,
        borderRadius: 50,
        borderWidth: 5,
        borderColor: Colors.SeconderyColor,
    },
})

export default TabBottomNavigation;
