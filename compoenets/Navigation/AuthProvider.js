import React, { createContext, useState } from 'react';
import auth from '@react-native-firebase/auth';
import { Alert } from 'react-native';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
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