import { NavigationContainer } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import MyDrawer from './Drawer';
import HomeNav from './HomeNavigation';
import {AuthContext} from './AuthProvider';
import auth from '@react-native-firebase/auth';

const AppNav = () => {

    const { user, setUser } = useContext(AuthContext);
    const [LoggedIn, setLoggedIn] = useState(true);

    const onAuthStateChanged = (user) => {
        setUser(user);
        if (LoggedIn) setLoggedIn(false);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        console.log(subscriber);
        return subscriber; // unsubscribe on unmount
    }, []);

    if (LoggedIn) {
        return null;
    }

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