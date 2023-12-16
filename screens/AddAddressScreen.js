import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Pressable,
    TextInput,
} from "react-native";
import React, { useEffect, useContext, useState, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import { UserType } from "../UserContext";
import { FontAwesome } from '@expo/vector-icons';

const AddAddressScreen = () => {

    const navigation = useNavigation();
    const [selectedAddressId, setSelectedAddressId] = useState(null);
    const [addresses, setAddresses] = useState([]);
    const { userId, setUserId } = useContext(UserType);
    console.log("userId", userId);
    useEffect(() => {
        fetchAddresses();
    }, []);
    const fetchAddresses = async () => {
        try {
            const response = await axios.get(
                `http://192.168.43.131:8000/addresses/${userId}`
            );
            const { addresses } = response.data;

            setAddresses(addresses);
        } catch (error) {
            console.log("error", error);
        }
    };
    useFocusEffect(
        useCallback(() => {
            fetchAddresses();
        }, [])
    );

    const handleSelectAddress = (addressId) => {
        if (selectedAddressId === addressId) {
            setSelectedAddressId(null);
        } else {
            setSelectedAddressId(addressId);
        }
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 50 }}>
            <View style={styles.header}>
                <Pressable style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => navigation.goBack()}>
                    <MaterialIcons name="keyboard-arrow-left" size={25} color="#B00406" style={{ marginRight: 5 }} />
                    <Text style={{ fontSize: 20 }}>My Addresses</Text>
                </Pressable>
            </View>
            <Text style={styles.dividing_line} />
            <Pressable>
                {addresses?.map((item, index) => (
                    <Pressable
                        key={index}
                        onPress={() => handleSelectAddress(item._id)}
                        style={{
                            marginTop: 10,
                            borderColor: "#D0D0D0",
                            borderWidth: 1,
                            borderLeftWidth: 0,
                            borderRightWidth: 0,
                            paddingVertical: 7,
                            paddingHorizontal: 5,
                        }}
                    >
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <View style={{ marginLeft: 20, marginRight: 20 }}>
                                {selectedAddressId === item._id ? (
                                    <FontAwesome name="dot-circle-o" size={24} color="#B00406" />
                                ) : (
                                    <FontAwesome name="dot-circle-o" size={24} color="lightgray" />
                                )}
                            </View>
                            <View >
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                                        {item?.fullName}
                                    </Text>

                                    <Text style={{ fontSize: 15, color: "#181818", margin: 5 }}>
                                        | {item?.phoneNumber}
                                    </Text>
                                    <Entypo name="location-pin" size={24} color="red" />
                                </View>
                                <Text style={{ fontSize: 15, color: "#181818", margin: 5 }}>
                                    {item?.addressLine1}
                                </Text>
                                <Text style={{ fontSize: 15, color: "#181818", margin: 5 }}>
                                    {item?.city}
                                </Text>
                                <View style={styles.setting_address}>
                                    <Pressable style={styles.setting_address_option}>
                                        <Text>Edit</Text>
                                    </Pressable>

                                    <Pressable style={styles.setting_address_option}>
                                        <Text>Remove</Text>
                                    </Pressable>

                                    <Pressable style={styles.setting_address_option}>
                                        <Text>Set as Default</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                    </Pressable>

                ))}
            </Pressable>
            <Pressable style={styles.AddNewAdress}
                onPress={() => navigation.navigate("Add")}
            >
                <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 70 }}>
                    <Ionicons name="add-circle-outline" size={24} color="#B00406" margin={10} />
                    <Text style={{ fontSize: 16, color: "#B00406" }}>Add a new Address</Text>
                    <MaterialIcons name="keyboard-arrow-right" size={24} color="#B00406" />
                </View>
            </Pressable>
        </ScrollView>
    );
};

export default AddAddressScreen;

const styles = StyleSheet.create({
    header: {
        padding: 10,
    },
    AddNewAdress: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 10,
        borderColor: "#D0D0D0",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        paddingVertical: 7,
        paddingHorizontal: 5,
    },
    dividing_line: {
        height: 0.5,
        borderColor: "lightgray",
        borderWidth: 1,
        marginBottom: 30,
    },
    selectedDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: 'red',
        position: 'absolute',
        left: -15,
        top: '50%',
        marginTop: -5,
        display: 'none',
    },
    setting_address: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        marginTop: 7,
      },
      setting_address_option: {
        backgroundColor: "#F5F5F5",
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 5,
        borderWidth: 0.9,
        borderColor: "#D0D0D0",
      },
});