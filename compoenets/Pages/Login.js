// import { StatusBar } from "expo-status-bar";
import React, { useContext, useState } from "react";
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
} from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { AuthContext } from "../Navigation/AuthProvider";

const Login = ({ navigation }) => {

    const {login} = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const LoginSubmit = () => {
        Keyboard.dismiss();
        login(email, password);
        // if (email == "test" && password == "test") {
        //     navigation.navigate('Home');
        // }
        // else if (email == "" && password != "") {
        //     setEmailError(true);
        //     setPasswordError(false);
        // }
        // else if (password == "" && email != "") {
        //     setEmailError(false);
        //     setPasswordError(true);
        // }
        // else if (email == "" && password == "") {
        //     setEmailError(true);
        //     setPasswordError(true);
        // }
        // else if (email != "" && password != "") {
        //     setEmail("");
        //     setEmailError(false);
        //     setPassword("");
        //     setPasswordError(false);
        // }
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.KeyboardView}
        >
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={styles.container}>
                    <Image style={styles.image} source={require("../../assets/Images/logo.png")} />

                    {/* <StatusBar style="auto" /> */}
                    {emailError &&
                        <Text style={styles.errorText}>Please enter your address.</Text>
                    }
                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.TextInput}
                            placeholder="Email."
                            value={email}
                            placeholderTextColor="#003f5c"
                            onChangeText={(email) => setEmail(email)}
                            keyboardType="email-address"
                        />
                    </View>

                    {passwordError &&
                        <Text style={styles.errorText}>Please enter your address.</Text>
                    }
                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.TextInput}
                            placeholder="Password."
                            placeholderTextColor="#003f5c"
                            value={password}
                            secureTextEntry={true}
                            onChangeText={(password) => setPassword(password)}
                        />
                    </View>

                    <TouchableOpacity>
                        <Text style={styles.forgotButton}>Forgot Password?</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.loginBtn} onPress={() => login(email, password)}>
                        <Text style={styles.loginText}>LOGIN</Text>
                    </TouchableOpacity>

                    <View style={styles.RegNavText}>
                        <Text>You Don't Have An Account? </Text>
                        <TouchableOpacity style={styles.TouchableRegNav} onPress={() => { navigation.navigate('Register') }}>
                            <Text>Register Now!</Text>
                        </TouchableOpacity>
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
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },

    image: {
        marginBottom: 40,
        width: 80,
        height: 100,
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
        flex: 1,
        padding: 10,
        marginLeft: 20,
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
    RegNavText: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
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