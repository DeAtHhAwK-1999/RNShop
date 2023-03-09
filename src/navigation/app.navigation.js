import { NavigationContainer } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import MyDrawer from './drawer.navigation';
import HomeNav from './home.navigation';
import { AuthContext } from '../context/provide.context';
import auth from '@react-native-firebase/auth';

const AppNav = () => {

    const { user, setUser, Lang } = useContext(AuthContext);
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
    global.lang = Lang ? Lang : "english";
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