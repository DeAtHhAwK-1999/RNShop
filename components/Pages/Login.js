// import { StatusBar } from "expo-status-bar";
import React, { createRef, useContext, useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Button,
    TouchableOpacity,
    Keyboard,
    Platform,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Alert,
    Dimensions
} from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { AuthContext } from "../Navigation/AuthProvider";
import MTranslate from "../../Languages/multiLang";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Colors from "../../assets/Themes/Colors";

const windowWidth = Dimensions.get("screen").width;
const windowHeight = Dimensions.get("screen").height;

const Login = ({ navigation }) => {

    const { login, Lang, setLang } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = useState("");
    const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
    const EmailInput = createRef();
    const PasswordInput = createRef();

    const LoginSubmit = () => {
        setEmailError(false);
        setEmailErrorMessage("");
        setPasswordError(false);
        setEmailErrorMessage("");
        Keyboard.dismiss();
        if (email && password) {
            email.includes(" ")
                ?
                (setEmailErrorMessage("email_cannot_contain_spaces") ?? setEmailError(true))
                :
                !email.includes("@")
                    ?
                    (setEmailErrorMessage("enter_valid_email_with_@") ?? setEmailError(true))
                    :
                    password.includes(" ")
                        ?
                        (setPasswordErrorMessage("password_cannot_contain_spaces") ?? setPasswordError(true))
                        :
                        password.length < 6
                            ?
                            (setPasswordErrorMessage("password_should_be_6_characters_or_more") ?? setPasswordError(true))
                            :
                            (
                                setEmailError(false)
                                ??
                                setEmailErrorMessage("")
                                ??
                                setPasswordError(false)
                                ??
                                setPasswordErrorMessage("")
                                ??
                                login(email, password)
                            );
        }
        else if (email == "" && password != "") {
            setEmailError(true);
            setEmailErrorMessage("please_enter_your_email");
            setPasswordError(false);
            setPasswordErrorMessage("");
        }
        else if (password == "" && email != "") {
            setEmailError(false);
            setEmailErrorMessage("");
            setPasswordError(true);
            setPasswordErrorMessage("please_enter_your_password");
        }
        else if (email == "" && password == "") {
            setEmailError(true);
            setEmailErrorMessage("please_enter_your_email");
            setPasswordError(true);
            setPasswordErrorMessage("please_enter_your_password");
        }
    }

    const setLanguageEn = async () => {
        await AsyncStorage.setItem("language", "english");
        setLang("english");
    }
    
    const setLanguageAr = async () => {
        await AsyncStorage.setItem("language", "arabic");
        setLang("arabic");
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.KeyboardView}
        >
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={styles.container}>
                    <Image style={styles.image} source={require("../../assets/Images/loginPic.png")} />

                    {/* <StatusBar style="auto" /> */}
                    {emailError &&
                        <Text style={styles.errorText}>{MTranslate(emailErrorMessage)}</Text>
                    }
                    <View style={styles.inputView}>
                        <TextInput
                            ref={EmailInput}
                            style={styles.TextInput}
                            placeholder={MTranslate("email")}
                            returnKeyType="next"
                            cursorColor={global.PrimaryColor}
                            textAlign="center"
                            value={email}
                            placeholderTextColor="#003f5c"
                            onChangeText={(email) => setEmail(email)}
                            keyboardType="email-address"
                            onSubmitEditing={() => { PasswordInput.current.focus() }}
                        />
                    </View>

                    {passwordError &&
                        <Text style={styles.errorText}>{MTranslate(passwordErrorMessage)}</Text>
                    }
                    <View style={styles.inputView}>
                        <TextInput
                            ref={PasswordInput}
                            style={styles.TextInput}
                            placeholder={MTranslate("password")}
                            textAlign="center"
                            cursorColor={global.PrimaryColor}
                            placeholderTextColor="#003f5c"
                            value={password}
                            secureTextEntry={showPassword}
                            onChangeText={(password) => setPassword(password)}
                        />
                    </View>

                    <TouchableOpacity>
                        <Text style={styles.forgotButton}>{MTranslate("forgot_password?")}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.loginBtn} onPress={LoginSubmit}>
                        <Text style={styles.loginText}>{MTranslate("sign_in")}</Text>
                    </TouchableOpacity>

                    <View style={Lang == "english" ? styles.EnRegNavText : styles.ArRegNavText}>
                        <TouchableOpacity style={styles.TouchableRegNav} onPress={() => { navigation.navigate('Register') }}>
                            <Text>{MTranslate("sign_up")}</Text>
                        </TouchableOpacity>
                        <Text>{MTranslate("you_don't_have_an_account?")} </Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    KeyboardView: {
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: Colors.PrimaryColor,
        alignItems: "center",
    },
    image: {
        marginVertical: 40,
        width: windowWidth - 50,
        height: 200,
        resizeMode: 'stretch',
        overflow: 'visible',
    },
    inputView: {
        backgroundColor: "#FFC0CB",
        borderRadius: 30,
        width: "70%",
        height: 45,
        marginBottom: 20,

        alignItems: "center",
    },
    TextInput: {
        height: 50,
        width: '100%',
        flex: 1,
        padding: 10,
        // marginLeft: 20,
    },
    forgotButton: {
        height: 30,
        marginBottom: 30,
    },
    loginBtn: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        backgroundColor: "#FF1493",
    },
    ArRegNavText: {
        flex: 1,
        flexDirection: "row",
        marginVertical: 10,
        justifyContent: 'center',
        alignItems: 'flex-end',
        width: windowWidth,
    },
    EnRegNavText: {
        flex: 1,
        flexDirection: "row-reverse",
        marginVertical: 10,
        justifyContent: 'center',
        alignItems: 'flex-end',
        width: windowWidth,
    },
    TouchableRegNav: {
        justifyContent: 'center',
    },
    errorText: {
        color: 'red',
        fontSize: 10,
    },
});

export default Login;