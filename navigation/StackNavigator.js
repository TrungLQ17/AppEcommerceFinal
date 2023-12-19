import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import HomeScreen from "../screens/HomeScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import ProductInfoScreen from "../screens/ProductInfoScreen";
import AddAddressScreen from "../screens/AddAddressScreen";
import AddressScreen from "../screens/AddressScreen";
import CartScreen from "../screens/CartScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ConfirmationScreen from "../screens/ConfirmationScreen";
import OrderScreen from "../screens/OrderScreen";
import YourAccount from "../screens/YourAccount";

const StackNavigator = () => {
    const Stack = createNativeStackNavigator();
    const Tab = createBottomTabNavigator();
    function BottomTabs() {
        return (
            <Tab.Navigator>
                <Tab.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
                        tabBarLabel: "Home",
                        tabBarLabelStyle: { color: "#B00406" },
                        headerShown: false,
                        tabBarIcon: ({ focused }) =>
                            focused ? (
                                <Entypo name="home" size={24} color="#B00406" />
                            ) : (
                                <AntDesign name="home" size={24} color="gray" />
                            ),
                    }}
                />
                {/* <Tab.Screen
                    name="Notifications"
                    component={ProfileScreen}
                    options={{
                        tabBarLabel: "Notifications",
                        tabBarLabelStyle: { color: "#B00406" },
                        headerShown: false,
                        tabBarIcon: ({ focused }) =>
                            focused ? (
                                <Ionicons name="notifications" size={24} color="#B00406" />
                            ) : (
                                <Ionicons name="notifications-outline" size={24} color="gray" />
                            ),
                    }}
                /> */}

                <Tab.Screen
                    name="Profile"
                    component={ProfileScreen}
                    options={{
                        tabBarLabel: "Profile",
                        tabBarLabelStyle: { color: "#B00406" },
                        tabBarIcon: ({ focused }) =>
                            focused ? (
                                <Ionicons name="person" size={24} color="#B00406" />
                            ) : (
                                <Ionicons name="person-outline" size={24} color="gray" />
                            ),
                    }}
                />

                <Tab.Screen
                    name="Cart"
                    component={CartScreen}
                    options={{
                        tabBarLabel: "Cart",
                        tabBarLabelStyle: { color: "#B00406" },
                        headerShown: false,
                        tabBarIcon: ({ focused }) =>
                            focused ? (
                                <AntDesign name="shoppingcart" size={24} color="#B00406" />
                            ) : (
                                <AntDesign name="shoppingcart" size={24} color="gray" />
                            ),
                    }}
                />
            </Tab.Navigator>
        );
    }
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Register"
                    component={RegisterScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Main"
                    component={BottomTabs}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Info"
                    component={ProductInfoScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Address"
                    component={AddAddressScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Add"
                    component={AddressScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Confirm"
                    component={ConfirmationScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Order"
                    component={OrderScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Account"
                    component={YourAccount}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default StackNavigator;

const styles = StyleSheet.create({});
