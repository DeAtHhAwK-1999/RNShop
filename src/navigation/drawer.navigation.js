import 'react-native-gesture-handler';
import React, { useContext } from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import { StackActions } from '@react-navigation/native';
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from '@react-navigation/drawer';
import TabBottomNavigation from './bottomTap.navigation';
import Profile from '../components/Screens/profile/profile';
import Settings from '../components/Screens/settings/settings';
import { AuthContext } from '../context/provide.context';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props, login) {
    const { user, logout, Lang } = useContext(AuthContext);
    return (
        <View style={{ flex: 1 }}>
            <View>
                <Text>Hello {user.email}</Text>
            </View>
            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
                {/* <DrawerItem label="Logout" onPress={() => props.navigation.navigate("Profile")} /> */}
            </DrawerContentScrollView>
            <TouchableOpacity
                // onPress={() => props.navigation.dispatch(StackActions.popToTop())}
                onPress={() => { logout() }}
            >
                <View style={styles.item}>
                    <View style={styles.iconContainer}>
                        <Image source={require('../../assets/images/logo.png')} style={styles.icon} />
                    </View>
                    <Text style={styles.label}>Logout</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const MyDrawer = ({ login }) => {
    return (
        <Drawer.Navigator initialRouteName='Main' screenOptions={{ drawerType: "slide", headerShown: false }} drawerContent={props => <CustomDrawerContent {...props} login={login} />}>
            <Drawer.Screen name="Main" component={TabBottomNavigation} options={{ drawerIcon: () => <Image source={require('../../assets/images/logo.png')} style={styles.icon} /> }} />
            <Drawer.Screen name="Profile" component={Profile} options={{ drawerIcon: () => <Image source={require('../../assets/images/logo.png')} style={styles.icon} /> }} />
            <Drawer.Screen name="Settings" component={Settings} options={{ drawerIcon: () => <Image source={require('../../assets/images/logo.png')} style={styles.icon} /> }} />
        </Drawer.Navigator>
    );
}

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    label: {
        margin: 16,
        fontWeight: 'bold',
        color: 'rgba(0, 0, 0, .87)',
    },
    iconContainer: {
        marginHorizontal: 16,
        width: 24,
        alignItems: 'center',
    },
    icon: {
        width: 24,
        height: 24,
    },
});

export default MyDrawer;