import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const Profile = ({ navigation }) => {
    return (
        <View>
            <Text>This is the Profile</Text>
            <TouchableOpacity onPress={() => {navigation.popToTop()}}>
                <Text>Login Page</Text>
            </TouchableOpacity>
        </View>
    );
}

export default Profile;