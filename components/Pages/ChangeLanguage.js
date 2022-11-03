import React from 'react';
import { View, TouchableOpacity, Text, Image, I18nManager } from 'react-native';

const ChangeLanguage = ({ navigation }) => {

    const setLanguageEn = async () => {
        await AsyncStorage.setItem("language", "english");
        I18nManager.forceRTL(true);
        setLang("english");
    }

    const setLanguageAr = async () => {
        await AsyncStorage.setItem("language", "arabic");
        I18nManager.forceRTL(false);
        setLang("arabic");
    }

    return (
        <View>
            <TouchableOpacity style={styles.loginBtn} onPress={() => { setLanguageEn() }}>
                <Text style={styles.loginText}>{MTranslate("password")}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.loginBtn} onPress={() => { setLanguageAr() }}>
                <Text style={styles.loginText}>{MTranslate("password")}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    loginBtn: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        backgroundColor: "#FF1493",
    },
});

export default ChangeLanguage;