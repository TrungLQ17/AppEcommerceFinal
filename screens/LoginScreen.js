//import React from "react";
import * as Google from 'expo-auth-session/providers/google';
import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Image,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Button,
  TouchableOpacity, 
  Alert
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import logoImage from '../assets/LogoRed.png';
import axios from 'axios';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberAccount, setRememberAccount] = useState(false);
  const navigation = useNavigation();

  const handleLogin = () => {
    const user = {
      email: email,
      password: password,
    };

    axios
      .post("http://192.168.43.131:8000/login", user)
      .then((response) => {
        console.log(response);
        const token = response.data.token;
        AsyncStorage.setItem("authToken", token);
        navigation.replace("Main");
      })
      .catch((error) => {
        Alert.alert("Login Error", "Invalid Email");
        console.log(error);
      });
  };
  //////////////////////////////////////////////////////////////////////////////////////////
  const [token, setToken] = useState("");
  const [userInfo, setUserInfo] = useState(null);

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: "918902758716-n4bbjmf8r4t59jegl832sr1pldsni3rs.apps.googleusercontent.com",
    iosClientId: "918902758716-284q1mb55t6qmdepgaovm80fed00ir8e.apps.googleusercontent.com",
    expoClientId: "918902758716-c2akb0gam2cdv5b5sgvdlmc1u30arh2d.apps.googleusercontent.com",
  });

  useEffect(() => {
    handleEffect();
  }, [response, token]);

  async function handleEffect() {
    const user = await getLocalUser();
    console.log("user", user);
    if (!user) {
      if (response?.type === "success") {
        getUserInfo(response.authentication.accessToken);
        setShowCongratulations(true);
      }
    } else {
      setUserInfo(user);
      console.log("loaded locally");
      setShowCongratulations(true);
    }
  }

  const getLocalUser = async () => {
    const data = await AsyncStorage.getItem("@user");
    if (!data) return null;
    return JSON.parse(data);
  };

  const getUserInfo = async (token) => {
    if (!token) return;
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const user = await response.json();
      await AsyncStorage.setItem("@user", JSON.stringify(user));
      setUserInfo(user);
    } catch (error) {
      // Add your own error handler here
    }
  };

  const closeModal = () => {
    setShowCongratulations(false);
    // Nếu bạn muốn hiển thị màn hình UserInfo sau khi đóng modal, thêm mã ở đây.
  };
  /////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    loadRememberAccount();
  }, []);

  useEffect(() => {
    saveRememberAccount();
  }, [rememberAccount]);

  const loadRememberAccount = async () => {
    try {
      const rememberAccountValue = await AsyncStorage.getItem(
        "rememberAccount"
      );
      if (rememberAccountValue !== null) {
        setRememberAccount(JSON.parse(rememberAccountValue));
      }
    } catch (e) {
      console.error("Error loading Remember Account state:", e);
    }
  };

  const saveRememberAccount = async () => {
    try {
      await AsyncStorage.setItem(
        "rememberAccount",
        JSON.stringify(rememberAccount)
      );
    } catch (e) {
      console.error("Error saving Remember Account state:", e);
    }
  };

  const toggleRememberAccount = () => {
    setRememberAccount((prevState) => !prevState);
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={logoImage}
        />
        <Text style={styles.logoText}>Veverse</Text>
        <View style={styles.inputContainer}>
          <MaterialIcons style={{ marginLeft: 10, marginRight: 5 }} name="email" size={24} color="gray" />
          <TextInput
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.input}
            placeholder="Email address"
          />
        </View>
        <View style={styles.inputContainer}>
          <AntDesign name="lock1" size={24} color="gray" style={{ marginLeft: 10, marginRight: 5 }} />
          <TextInput
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
            style={styles.input}
            placeholder="Password"
          />
        </View>
        <View style={styles.rememberContainer}>
          <View style={styles.remember}>
            <Pressable onPress={toggleRememberAccount} style={styles.checkbox}>
              <MaterialIcons
                name={rememberAccount ? "check-box" : "check-box-outline-blank"}
                size={24}
                color="black"
              />
            </Pressable>
            <Text style={styles.rememberText}>Remember account</Text>
          </View>
          <View style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </View>
        </View>
        <Pressable
          onPress={handleLogin}
          style={styles.loginButton}
        >
          <Text style={styles.loginText}>Login</Text>
        </Pressable>
        <View>
          <Text style={styles.fwith}>-------- Login with ----------</Text>
        </View>
        <View>
          <TouchableOpacity onPress={() => promptAsync()}>
            <Image
              source={require('../assets/gglogo.png')} // Thay đổi đường dẫn hình ảnh tương ứng
              style={styles.logo}
            />
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.sigText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={styles.signUpText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  container: {
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 80,
  },
  logo: {
    width: 80,
    height: 80,
  },
  logoText: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 20,
    color: "black",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#E2E2E2",
    paddingVertical: 5,
    borderRadius: 10,
    marginTop: 30,
  },
  input: {
    flex: 1,
    color: "gray",
    marginVertical: 8,
    //width: 300,
  },
  rememberContainer: {
    marginTop: 18,
    marginBottom: 18,
    flexDirection: "row",
    justifyContent: "space-between", // Để cách xa nhau về hai phía
    alignItems: "center", // Để căn giữa theo chiều dọc
    fontSize: 16,
  },
  remember: {
    flexDirection: "row",
    marginRight: 40,
  },
  checkbox: {
    marginRight: 6,
  },
  rememberText: {
    marginTop: 2,
  },
  forgotPassword: {
    marginLeft: 40,
  },
  forgotPasswordText: {
    color: "#DF1F1F",
  },
  loginButton: {
    width: 340,
    backgroundColor: "#B00406",
    borderRadius: 6,
    padding: 15,
    marginTop: 20,
    alignItems: "center",
    marginBottom: 30,
  },
  loginText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  signUpText: {
    color: "#B00406",
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 25,
    alignItems: "center",
    marginTop: 22,
  },
  sigText: {
    fontSize: 16,
    marginTop: 25,
    alignItems: "center",
    marginTop: 22,
  },
  logo: {
    marginTop: 25,
    marginBottom: 15,
    width: 40, // Adjust the width and height to fit your logo
    height: 40,
  },
});

export default LoginScreen;

