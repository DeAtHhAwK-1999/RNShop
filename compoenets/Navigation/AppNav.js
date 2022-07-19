import { NavigationContainer } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import MyDrawer from './Drawer';
import HomeNav from './HomeNavigation';
import { AuthContext } from './AuthProvider';
import auth from '@react-native-firebase/auth';

const AppNav = () => {

    const { user, setUser } = useContext(AuthContext);
    const [LoggedIn, setLoggedIn] = useState(false);

    const onAuthStateChanged = (user) => {
        console.log(user);
        if (user) {
            setUser(user);
            setLoggedIn(true);
        } else {
            setLoggedIn(false);
        }
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

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

export default AppNav;