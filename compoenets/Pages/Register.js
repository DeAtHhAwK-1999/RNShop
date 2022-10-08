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
  Modal,
  Pressable,
  Alert,
} from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { AuthContext } from "../Navigation/AuthProvider";

const Register = ({ navigation }) => {

  const { register } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Cpassword, setCPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [UsernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [CpasswordError, setCPasswordError] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const RegisterSubmit = () => {
    Keyboard.dismiss();
    if (username == "" || email == "" || password == "" || Cpassword == "") {
      if (username == "") {
        setUsernameError(true);
      } else {
        setUsernameError(false);
      }
      if (email == "") {
        setEmailError(true);
      } else {
        setEmailError(false);
      }
      if (password == "") {
        setPasswordError(true);
      } else {
        setPasswordError(false);
      }
      if (Cpassword == "") {
        setCPasswordError(true);
      } else {
        setCPasswordError(false);
      }
    } else {
      setUsernameError(false);
      setEmailError(false);
      setPasswordError(false);
      setCPasswordError(false);
      if (password == Cpassword) {
        register(email, password);
      } else {
        Alert.alert("Your confirm password not match the password");
      }
    }
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
          {UsernameError &&
            <Text style={styles.errorText}>Please enter your username.</Text>
          }
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Username."
              value={username}
              placeholderTextColor="#003f5c"
              onChangeText={(username) => setUsername(username)}
              keyboardType='name-phone-pad'
            />
          </View>
          {emailError &&
            <Text style={styles.errorText}>Please enter your email.</Text>
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
            <Text style={styles.errorText}>Please enter your password.</Text>
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
          {CpasswordError &&
            <Text style={styles.errorText}>Please enter your confirm password.</Text>
          }
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Confirm Password."
              placeholderTextColor="#003f5c"
              value={Cpassword}
              secureTextEntry={true}
              onChangeText={(Cpassword) => setCPassword(Cpassword)}
            />
          </View>

          <TouchableOpacity>
            <Text style={styles.forgotButton}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.RegisterBtn} onPress={() => { RegisterSubmit() }}>
            <Text style={styles.RegisterText}>Register</Text>
          </TouchableOpacity>

          <View style={styles.RegNavText}>
            <Text>Already Have An Account? </Text>
            <TouchableOpacity style={styles.TouchableRegNav} onPress={() => { navigation.navigate('Login') }}>
              <Text>Login!</Text>
            </TouchableOpacity>
          </View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>You Registered Success!</Text>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => { setModalVisible(!modalVisible); }}
                >
                  <Text style={styles.textStyle}>Okay</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
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
    justifyContent: 'center',
    flex: 1,
  },

  forgotButton: {
    height: 30,
    marginBottom: 30,
  },

  RegisterBtn: {
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
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
    elevation: 5
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
});

export default Register;