import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  Image,
  KeyboardAvoidingView,
  TextInput,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import logoImage from '../assets/LogoRed.png';
const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigation = useNavigation();
  const [agreeTerms, setAgreeTerms] = useState(false); // State cho việc đồng ý điều khoản
  const toggleAgreeTerms = () => {
    setAgreeTerms((prevAgree) => !prevAgree); // Đảo ngược trạng thái khi người dùng chọn checkbox
  };
  const handleRegister = () => {
    const user = {
      name: name,
      email: email,
      password: password,
    };

    axios
      .post("http://192.168.43.131:8000/register", user)
      .then((response) => {
        console.log(response);
        Alert.alert(
          "Registration successful",
          "You have been registered Successfully"
        );
        setName("");
        setEmail("");
        setPassword("");
      })
      .catch((error) => {
        Alert.alert(
          "Registration Error",
          "An error occurred while registering"
        );
        console.log("registration failed", error);
      });
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
          <Ionicons name="ios-person" size={24} color="gray" style={styles.icon} />
          <TextInput
            value={name}
            onChangeText={(text) => setName(text)}
            style={styles.input}
            placeholder="UserName"
          />
        </View>

        <View style={styles.inputContainer}>
          <MaterialIcons name="email" size={24} color="gray" style={styles.icon} />
          <TextInput
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.input}
            placeholder="Email Adress"
          />
        </View>

        <View style={styles.inputContainer}>
          <AntDesign name="lock1" size={24} color="gray" style={styles.icon} />
          <TextInput
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
            style={styles.input}
            placeholder="Password"
          />
        </View>
        <View style={styles.agreeontainer}>
          <View style={styles.agree}>
            <Pressable onPress={toggleAgreeTerms} style={styles.checkbox}>
              <MaterialIcons
                name={agreeTerms ? "check-box" : "check-box-outline-blank"}
                size={24}
                color="black"
              />
            </Pressable>
            <Text style={styles.rememberText}>
              Agree with the Terms of use and Privacy policy of Weverse
            </Text>
          </View>
        </View>

        <Pressable onPress={handleRegister} style={styles.loginButton}>
          <Text style={styles.loginText}>Register</Text>
        </Pressable>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.sigText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.signUpText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

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
    //marginTop: 6,
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
  icon: {
    marginLeft: 10,
    marginRight: 5,
  },
  loginButton: {
    width: 340,
    backgroundColor: "#B00406",
    borderRadius: 6,
    padding: 15,
    marginTop: 50,
  },
  loginText: {
    textAlign: "center",
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  checkbox: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 2,

  },
  agree: {
    flexDirection: "row",
    marginTop: 22,
  },
  rememberText: {
    marginRight: 20,
    fontSize: 16,
  },
  signUpText: {
    color: "#B00406",
    fontWeight: "bold",
    fontSize: 16,
    alignItems: "center",
    marginTop: 24,
  },
  sigText: {
    fontSize: 16,
    marginTop: 25,
    alignItems: "center",
  }
});

export default RegisterScreen;