// import { StatusBar } from "expo-status-bar";
import React, { createRef, useContext, useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    Keyboard,
    Platform,
    TouchableWithoutFeedback,
    Alert,
    Dimensions
} from "react-native";
import { AuthContext } from "../Navigation/AuthProvider";
import Icon from 'react-native-vector-icons/FontAwesome';
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
        setPasswordErrorMessage("");
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

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
                <Image style={styles.LogoImage} source={require("../../assets/Images/loginPic.png")} />
                <View style={styles.LoginTitle}>
                    <Text style={styles.TextLoginHeader}>{MTranslate("login_to_your_account")}</Text>
                    <View style={styles.LoginContainer}>
                        {/* <StatusBar style="auto" /> */}
                        {emailError &&
                            <Text style={styles.errorText}>{MTranslate(emailErrorMessage)}</Text>
                        }
                        <View style={styles.inputView}>
                            <Icon name="user" size={25} color={Colors.SeconderyColor} />
                            <TextInput
                                ref={EmailInput}
                                style={styles.TextInput}
                                placeholder={MTranslate("email")}
                                returnKeyType="next"
                                cursorColor={global.PrimaryColor}
                                textAlign={Lang == "arabic" ? "right" : "left"}
                                value={email}
                                placeholderTextColor={Colors.SeconderyColor}
                                onChangeText={(email) => setEmail(email)}
                                keyboardType="email-address"
                                onSubmitEditing={() => { PasswordInput.current.focus() }}
                            />
                        </View>
                        {passwordError &&
                            <Text style={styles.errorText}>{MTranslate(passwordErrorMessage)}</Text>
                        }
                        <View style={styles.inputView}>
                            <Icon name="lock" size={25} color={Colors.SeconderyColor} />
                            <TextInput
                                ref={PasswordInput}
                                style={styles.TextInput}
                                placeholder={showPassword ? MTranslate("password") : "**********"}
                                textAlign={Lang == "arabic" ? "right" : "left"}
                                cursorColor={global.PrimaryColor}
                                placeholderTextColor={Colors.SeconderyColor}
                                value={password}
                                secureTextEntry={showPassword}
                                onChangeText={(password) => setPassword(password)}
                            />
                            {
                                showPassword
                                    ?
                                    <TouchableOpacity onPress={() => { setShowPassword(false) }}>
                                        <Icon name="eye" size={20} color={Colors.SeconderyColor} />
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity onPress={() => { setShowPassword(true) }}>
                                        <Icon name="eye-slash" size={20} color={Colors.SeconderyColor} />
                                    </TouchableOpacity>
                            }
                        </View>
                        <TouchableOpacity>
                            <Text style={styles.forgotButton}>{MTranslate("forgot_password?")}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.loginBtn} onPress={LoginSubmit}>
                            <Text style={styles.loginText}>{MTranslate("sign_in")}</Text>
                        </TouchableOpacity>
                        <Text style={styles.OrSingInText}>{MTranslate("or_sign_in_with")}</Text>
                        <View style={styles.signinWithStyle}>
                            <TouchableOpacity style={styles.singinWithIconStyle}>
                                <Icon name="facebook" size={25} color="#3b5998" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.singinWithIconStyle}>
                                <Icon name="twitter" size={25} color="#00acee" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.singinWithIconStyle}>
                                <Icon name="google-plus" size={25} color="#DB4437" />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.RegNavText}>
                            <TouchableOpacity style={styles.TouchableRegNav} onPress={() => { navigation.navigate('Register') }}>
                                <Text style={styles.TextSignUpStyle}>{MTranslate("sign_up")}</Text>
                            </TouchableOpacity>
                            <Text>{MTranslate("you_don't_have_an_account?")} </Text>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
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
    LoginTitle: {
        flex: 1,
        width: windowWidth,
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E7F7F8',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 50,
    },
    TextLoginHeader: {
        color: '#003f5c',
        fontSize: 25,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    LoginContainer: {
        flex: 1,
        width: windowWidth,
        paddingTop: 30,
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    LogoImage: {
        marginVertical: 20,
        width: windowWidth - 50,
        height: 200,
        resizeMode: 'cover',
        overflow: 'visible',
    },
    inputView: {
        flexDirection: global.lang == "english" ? "row" : "row-reverse",
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#003f5c',
        borderWidth: 1,
        borderRadius: 10,
        width: windowWidth - 75,
        height: 45,
        marginBottom: 20,
        paddingHorizontal: 10,
        alignItems: "center",
    },
    TextInput: {
        height: 50,
        width: '90%',
        flex: 1,
        padding: 10,
        // marginLeft: 20,
    },
    forgotButton: {
        height: 30,
        fontSize: 15,
        fontWeight: 'bold',
        color: Colors.SeconderyColor,
    },
    OrSingInText: {
        fontSize: 15,
        color: Colors.SeconderyColor,
        marginVertical: 10,
    },
    loginBtn: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        backgroundColor: Colors.SeconderyColor,
    },
    loginText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#fff',
    },
    RegNavText: {
        flex: 1,
        flexDirection: global.ang == "english" ? "row-reverse" : "row",
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
    TextSignUpStyle: {
        color: Colors.PrimaryColor,
        fontWeight: 'bold',
    },
    signinWithStyle: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: windowWidth - 75,
        justifyContent: 'center',
        alignItems: 'center',
    },
    singinWithIconStyle: {
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'lightgray',
        height: 42,
        width: 42,
        marginHorizontal: 10,
        borderRadius: 50,
    },
});

export default Login;