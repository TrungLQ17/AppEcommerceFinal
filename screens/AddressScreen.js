import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TextInput,
    Pressable,
    Alert,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import "core-js/stable/atob";
import {jwtDecode} from 'jwt-decode';
import { UserType } from "../UserContext";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";


const AddressScreen = () => {
    const navigation = useNavigation();
    const [fullName, setName] = useState("");
    const [phoneNumber, setMobileNo] = useState("");
    const [addressLine1, setHouseNo] = useState("");
    const [city, setCity] = useState("");
     const {userId,setUserId} = useContext(UserType)

     useEffect(() => {
       const fetchUser = async() => {
        const token = await AsyncStorage.getItem("authToken");
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.userId;
        setUserId(userId);
       }

       fetchUser();
     },[]);

     console.log(userId)

const handleAddAddress = async () => {
  const addressData = {
    userId,
    address: {
      fullName,
      phoneNumber,
      addressLine1,
      city,
    }
  };

        try {
            const token = await AsyncStorage.getItem("authToken");
            const response = await axios.post("http://192.168.43.131:8000/addresses", addressData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            // Nếu response status là 200 hoặc thành công, xử lý thành công ở đây
            Alert.alert("Success", "Address added successfully");
            setName("");
            setMobileNo("");
            setHouseNo("");
            setCity("");
            
            setTimeout(() => {
                navigation.goBack();
            }, 500);
        } catch (error) {
            // Xử lý lỗi ở đây
            Alert.alert("Error", "Failed to add address");
            console.error("Error adding address", error);
        }
    };
    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Pressable style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => navigation.goBack()}>
                    <MaterialIcons name="keyboard-arrow-left" size={25} color="#B00406" style={{ marginRight: 5 }} />
                    <Text style={{ fontSize: 20 }}>New Addresses</Text>
                </Pressable>
            </View>
            <Text style={styles.dividing_line} />
            <View style={styles.formContainer}>
                <Text style={styles.title}>Contact</Text>
                <TextInput
                    value ={fullName}
                    onChangeText={(text) => setName (text)}
                    style={styles.inputField}
                    placeholderTextColor={"gray"}
                    placeholder="Full Name"
                />
                <TextInput
                value ={phoneNumber}
                onChangeText={(text) => setMobileNo (text)}
                    style={styles.inputField}
                    placeholderTextColor={"gray"}
                    placeholder="Phone Number"
                />

                <Text style={styles.title}>Address</Text>
                <TextInput
                value ={addressLine1}
                onChangeText={(text) => setHouseNo (text)}
                    style={styles.inputField}
                    placeholderTextColor={"gray"}
                    placeholder="City, District, Ward"
                />
                <TextInput
                value ={city}
                onChangeText={(text) => setCity (text)}
                    style={styles.inputField}
                    placeholderTextColor={"gray"}
                    placeholder="Street Name, Building, House No."
                />

                <Pressable
                onPress={handleAddAddress}
                 style={styles.addButton}>
                    <Text style={styles.addButtonText}>Add Address</Text>
                </Pressable>
            </View>
        </ScrollView >
    );
};

export default AddressScreen;

const styles = StyleSheet.create({
    container: {
        marginTop: 50,
    },
    header: {
        padding: 10,

    },
    formContainer: {
        padding: 10,
    },
    title: {
        fontSize: 17,
        fontWeight: "bold",
        marginTop: 10,
    },
    inputField: {
        padding: 10,
        borderColor: "lightgray",
        borderWidth: 1,
        marginTop: 10,
        borderRadius: 5,
    },
    label: {
        fontSize: 15,
        fontWeight: "bold",
    },
    addButton: {
        backgroundColor: "#B00406",
        borderRadius: 6,
        padding: 15,
        marginTop: 40,
        alignItems: "center",
        marginBottom: 30,
    },
    addButtonText: {
        fontWeight: "bold",
        color: "white",
        fontSize: 16,
    },
    dividing_line: {
        height: 0.5,
        borderColor: "lightgray",
        borderWidth: 1,
    },
});