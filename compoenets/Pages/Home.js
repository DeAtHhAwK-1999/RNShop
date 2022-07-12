import React from 'react';
import {
    TouchableOpacity,
    Text,
    View,
} from 'react-native';

const Home = ({ navigation }) => {
    return (
        <View>
            <TouchableOpacity onPress={() => {navigation.push('Settings')}}>
                <Text>Login Page</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {navigation.push('Profile')}}>
                <Text>Login Page</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Home;