import React, { createContext, useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [Lang, setLang] = useState("");
    const [image, setImage] = useState("");

    useEffect(() => {
        getLanguage();
    }, []);

    const getLanguage = async () => {
        await AsyncStorage.getItem("language").then(res => {
            setLang(res);
        });
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                Lang,
                setLang,
                image,
                setImage,
                login: async (email, password) => {
                    try {
                        await auth().signInWithEmailAndPassword(email, password);
                    } catch (error) {
                        console.log(error);
                        Alert.alert("something went wrong!");
                    }
                },
                register: async (email, password) => {
                    try {
                        await auth().createUserWithEmailAndPassword(email, password);
                    } catch (error) {
                        console.log(error);
                        Alert.alert("something went wrong!");
                    }
                },
                logout: async () => {
                    try {
                        await auth().signOut();
                    } catch (error) {
                        console.log(error);
                    }
                },
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;