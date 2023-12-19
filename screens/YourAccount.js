import {
    Image,
    StyleSheet,
    Text,
    View,
    Button,
    TextInput,
    ScrollView,
    Pressable,
    Alert,
    SafeAreaView,
    TouchableOpacity,
} from "react-native";
import React, { useLayoutEffect, useEffect, useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import axios from "axios";
import { UserType } from "../UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const YourAccount = () => {
    const { userId, setUserId } = useContext(UserType);
    const [newPassword, setNewPassword] = useState('');
    const navigation = useNavigation();
    const [user, setUser] = useState();
    const [changePasswordVisible, setChangePasswordVisible] = useState(false);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await axios.get(
                    `http://192.168.43.131:8000/profile/${userId}`
                );
                const { user } = response.data;
                setUser(user);
            } catch (error) {
                console.log("error", error);
            }
        };
        fetchUserProfile();
    }, []);

    const handleChangePassword = async () => {
        try {
            const response = await axios.post(
                `http://192.168.43.131:8000/setAccount/${userId}`,
                {
                    newPassword,
                }
            );
            setUser(prevUser => ({ ...prevUser }));
            setChangePasswordVisible(false);
            Alert.alert('Success', 'Đổi mật khẩu thành công');
            navigation.navigate("Profile");
        } catch (error) {
            Alert.alert('Error', 'Error updating password');
            console.error('Error updating password:', error);
        }
    };
    return (
        <SafeAreaView style={{ paddingTop: 50, padding: 15, flex: 1, backgroundColor: "white" }}>
            <View>
                <View style={styles.ViewYourAcc}>
                    <Text style={styles.yourACC}>Your Account</Text>
                </View>
                <View>
                    <Text style={styles.text}>Name: {user?.name}</Text>
                    <Text style={styles.text}>Email: {user?.email}</Text>
                    <Text style={styles.text}>password: {user?.password}</Text>
                </View>
                {!changePasswordVisible && (
                    <TouchableOpacity
                        style={[styles.button]}
                        onPress={() => setChangePasswordVisible(true)}>
                        <Text style={styles.buttonText}>Đổi mật khẩu</Text>
                    </TouchableOpacity>)}

                {changePasswordVisible && (
                    <View>
                        <Text style={{ marginTop: 15, marginBottom:10 }}>Enter new password:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="New Password"
                            secureTextEntry
                            value={newPassword}
                            onChangeText={setNewPassword}
                        />
                        <TouchableOpacity
                            style={[styles.button]}
                            onPress={handleChangePassword}>
                            <Text style={styles.buttonText}>Save</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
};

export default YourAccount;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    text: {
        fontSize: 20,
        //textAlign: 'center',
        marginTop: 20,
        fontWeight: "300",
        borderWidth: 0.5,
        padding: 7,

    },
    yourACC: {
        fontSize: 25,
        color: '#B00406',
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        backgroundColor: "#B00406",
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 8
    }
});
