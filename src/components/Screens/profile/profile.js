import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const Profile = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text>This is the Profile</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Profile;