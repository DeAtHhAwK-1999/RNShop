import React, { useContext, useState } from 'react';
import { View, TouchableOpacity, Text, Image, I18nManager, StyleSheet, DevSettings, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../Navigation/AuthProvider';
import Colors from '../../assets/Themes/Colors';

const ChangeLanguage = ({ navigation }) => {
    const { setLang, Lang, user } = useContext(AuthContext);
    const [language, setLanguage] = useState(Lang);
    const [langRTL, setLangRTL] = useState(false);

    const setLanguageEn = async () => {
        setLanguage("english");
        setLangRTL(false);
    }

    const setLanguageAr = async () => {
        setLanguage("arabic");
        setLangRTL(true);
    }

    const ChooseLang = async () => {
        if (language != Lang) {
            await AsyncStorage.setItem("language", language);
            I18nManager.forceRTL(langRTL);
            setLang(language);
            DevSettings.reload();
        } else {
            user
                ?
                navigation.reset({
                    index: 0,
                    routes: [{ name: "Home" }]
                })
                :
                navigation.reset({
                    index: 0,
                    routes: [{ name: "Login" }]
                })
        }
    }

    return (
        <View style={styles.container}>
            <ImageBackground style={styles.ImageBackgroundStyle} source={require("../../assets/Images/backgroundImage.jpg")}>
                <View style={styles.languageContainerStyle}>
                    <TouchableOpacity style={language == "arabic" ? styles.LangBtn : styles.ActiveLangBtn} onPress={() => { setLanguageEn() }}>
                        <Text style={styles.LangText}>English</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={language == "english" ? styles.LangBtn : styles.ActiveLangBtn} onPress={() => { setLanguageAr() }}>
                        <Text style={styles.LangText}>العربية</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.LangBtn} onPress={() => { ChooseLang() }}>
                    <Text style={styles.LangText}>Choose</Text>
                </TouchableOpacity>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    ImageBackgroundStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    languageContainerStyle: {
        flexDirection: 'row',
    },
    LangBtn: {
        width: 150,
        height: 150,
        borderRadius: 100,
        marginHorizontal: 10,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.SeconderyColor,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 50,
    },
    ActiveLangBtn: {
        width: 150,
        height: 150,
        borderRadius: 100,
        marginHorizontal: 10,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.PrimaryColor,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 50,
    },
    LangText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 25,
    },
});

export default ChangeLanguage;