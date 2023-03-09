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
  TouchableWithoutFeedback,
  Modal,
  Pressable,
  Alert,
  Dimensions,
} from "react-native";
import { AuthContext } from "../../../context/provide.context";
import MTranslate from "../../../../Languages/multiLang";
import Colors from "../../../../assets/Themes/Colors";
import Icon from 'react-native-vector-icons/Fontisto';

const windowWidth = Dimensions.get("screen").width;
const windowHeight = Dimensions.get("screen").height;

const Register = ({ navigation }) => {

  const { register, Lang } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Cpassword, setCPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [UsernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [CpasswordError, setCPasswordError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [usernameErrorMessage, setUsernameErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [CpasswordErrorMessage, setCPasswordErrorMessage] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const EmailInput = createRef();
  const PasswordInput = createRef();
  const CpasswordInput = createRef();
  const UsernameInput = createRef();

  const RegisterSubmit = () => {
    setEmailError(true);
    setEmailErrorMessage("please_enter_your_email");
    setPasswordError(true);
    setPasswordErrorMessage("please_enter_your_password");
    setUsernameError(true);
    setUsernameErrorMessage("please_enter_your_username");
    setCPasswordError(true);
    setCPasswordErrorMessage("please_enter_your_confirm_password");
    Keyboard.dismiss();
    if (email && password && Cpassword && username) {
      setUsernameError(false);
      setUsernameErrorMessage("");
      setEmailError(false);
      setEmailErrorMessage("");
      setPasswordError(false);
      setPasswordErrorMessage("");
      setCPasswordError(false);
      setCPasswordErrorMessage("");
      console.log("we are here");
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
              password != Cpassword
                ?
                (setCPasswordErrorMessage("confirm_password_should_match_password") ?? setCPasswordError(true))
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
                  setCPasswordError(false)
                  ??
                  setCPasswordErrorMessage("")
                  ??
                  setUsernameError(false)
                  ??
                  setUsernameErrorMessage("")
                  ??
                  register(email, password)
                );
    }
    else if (username != "" || email != "" || password != "" || Cpassword != "") {
      if (username) {
        setUsernameError(false);
        setUsernameErrorMessage("");
      }
      if (password) {
        setPasswordError(false);
        setPasswordErrorMessage("");
      }
      if (email) {
        setEmailError(false);
        setEmailErrorMessage("");
      }
      if (Cpassword) {
        setCPasswordError(false);
        setCPasswordErrorMessage("");
      }
    }
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.IconLangStyle} onPress={() => {navigation.navigate("ChangeLanguage")}}>
          <Icon size={25} name='world' color={"#fff"} />
        </TouchableOpacity>
        <Image style={styles.LogoImage} source={require("../../../../assets/images/loginPic.png")} />
        <View style={styles.RegisterTitle}>
          <Text style={styles.TextRegisterHeader}>{MTranslate("create_new_account")}</Text>
          <View style={styles.RegisterContainer}>
            {/* <StatusBar style="auto" /> */}
            {UsernameError &&
              <Text style={styles.errorText}>{MTranslate(usernameErrorMessage)}</Text>
            }
            <View style={styles.inputView}>
              <TextInput
                style={styles.TextInput}
                ref={UsernameInput}
                returnKeyType="next"
                cursorColor={global.PrimaryColor}
                placeholder={MTranslate("username")}
                value={username}
                placeholderTextColor="#003f5c"
                textAlign={Lang == "arabic" ? "right" : "left"}
                onChangeText={(username) => setUsername(username)}
                keyboardType='name-phone-pad'
                onSubmitEditing={() => { EmailInput.current.focus() }}
              />
            </View>
            {emailError &&
              <Text style={styles.errorText}>{MTranslate(emailErrorMessage)}</Text>
            }
            <View style={styles.inputView}>
              <TextInput
                style={styles.TextInput}
                ref={EmailInput}
                returnKeyType="next"
                cursorColor={global.PrimaryColor}
                placeholder={MTranslate("email")}
                value={email}
                placeholderTextColor="#003f5c"
                textAlign={Lang == "arabic" ? "right" : "left"}
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
                style={styles.TextInput}
                ref={PasswordInput}
                returnKeyType="next"
                cursorColor={global.PrimaryColor}
                placeholder={MTranslate("password")}
                placeholderTextColor="#003f5c"
                textAlign={Lang == "arabic" ? "right" : "left"}
                value={password}
                keyboardType="default"
                onChangeText={(password) => setPassword(password)}
                onSubmitEditing={() => { CpasswordInput.current.focus() }}
              />
            </View>
            {CpasswordError &&
              <Text style={styles.errorText}>{MTranslate(CpasswordErrorMessage)}</Text>
            }
            <View style={styles.inputView}>
              <TextInput
                style={styles.TextInput}
                ref={CpasswordInput}
                cursorColor={global.PrimaryColor}
                placeholder={MTranslate("confirm_password")}
                placeholderTextColor="#003f5c"
                textAlign={Lang == "arabic" ? "right" : "left"}
                value={Cpassword}
                keyboardType="default"
                onChangeText={(Cpassword) => setCPassword(Cpassword)}
              />
            </View>
            <TouchableOpacity style={styles.RegisterBtn} onPress={() => { RegisterSubmit() }}>
              <Text style={styles.RegisterText}>{MTranslate("sign_up")}</Text>
            </TouchableOpacity>
            <View style={styles.RegNavText}>
              <Text>{MTranslate("already_have_an_account?")} </Text>
              <TouchableOpacity style={styles.TouchableRegNav} onPress={() => { navigation.navigate('Login') }}>
                <Text style={styles.TextSignUpStyle}>{MTranslate("sign_in")}</Text>
              </TouchableOpacity>
            </View>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>You Registered Success!</Text>
                  <Image source={require("../../../../assets/images/RegisterSuccess.png")} style={styles.ImageSuccessStyle} />
                  <Pressable
                    style={styles.buttonSuccess}
                    onPress={() => { setModalVisible(!modalVisible); }}
                  >
                    <Text style={styles.textStyle}>Okay</Text>
                  </Pressable>
                </View>
              </View>
            </Modal>
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
    justifyContent: "center",
  },
  IconLangStyle: {
    position: 'absolute',
    zIndex: 1,
    top: 20,
    left: 20,
  },
  LogoImage: {
    marginVertical: 20,
    width: windowWidth - 50,
    height: 200,
    resizeMode: 'cover',
    overflow: 'visible',
  },
  TextRegisterHeader: {
    color: '#003f5c',
    fontSize: 25,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  RegisterContainer: {
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
  inputView: {
    flexDirection: "row",
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
    justifyContent: 'center',
    flex: 1,
  },
  forgotButton: {
    height: 30,
    marginBottom: 30,
  },
  RegisterTitle: {
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
  RegisterBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    backgroundColor: Colors.SeconderyColor,
  },
  RegNavText: {
    flex: 1,
    flexDirection: "row",
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'flex-end',
    width: windowWidth,
  },
  TextSignUpStyle: {
    color: Colors.PrimaryColor,
    fontWeight: 'bold',
  },
  TouchableRegNav: {
    justifyContent: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00000099",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    backgroundColor: Colors.PrimaryColor,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20
  },
  buttonSuccess: {
    borderRadius: 20,
    padding: 10,
    width: 200,
    elevation: 2,
    backgroundColor: Colors.SeconderyColor,
  },
  RegisterText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#fff',
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  ImageSuccessStyle: {
    height: 100,
    width: 100,
    marginBottom: 50
  },
});

export default Register;