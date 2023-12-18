import {
    Image,
    StyleSheet,
    Text,
    View,
    ScrollView,
    Pressable,
    SafeAreaView,
} from "react-native";
import React, { useLayoutEffect, useEffect, useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import axios from "axios";
import { UserType } from "../UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const OrderDetailScreen = ({ route }) => {
    const { userId, setUserId } = useContext(UserType);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();
    const { orderId } = route.params;
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(
                    `http://192.168.1.10:8000/orders/${userId}`
                );
                const orders = response.data.orders;
                setOrders(orders);

                setLoading(false);
            } catch (error) {
                console.log("error", error);
            }
        };

        fetchOrders();
    }, []);
    console.log("orders", orders);
    return (
        <SafeAreaView style={styles.notifications}>
            <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
                {orders.map((order) => (
                    <Pressable
                        key={order._id}
                    >
                        {order._id === route.params.orderId && (
                            <View style={{ fontSize: 15}}>
                                <View style={{ borderBottomWidth: 2, borderBottomColor: "#F3F3F3" }}>
                                    <Text style={{ margin: 10,fontWeight: "bold" }}>
                                        <Text>Order Total </Text>                           {order._id}
                                    </Text>
                                </View>
                                <Text style={styles.address}>
                                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>Delivery Address{'\n'}</Text>
                                    {order.shippingAddress.fullName}{'\n'}
                                    {order.shippingAddress.phoneNumber}{'\n'}
                                    {order.shippingAddress.addressLine1}{'\n'}
                                    {order.shippingAddress.city}
                                </Text>
                                <View>
                                    {order.products.map((product) => (
                                        <View style={{ borderBottomWidth: 10, borderBottomColor: "#F3F3F3", }} key={product._id}>
                                            <View style={styles.infor} >
                                                <Image
                                                    source={{ uri: product.image }}
                                                    style={{ width: 70, height: 70 }}
                                                />
                                                <Text style={{ marginLeft: 20, margin: 10 }}>
                                                    {product.name.length > 40 ? `${product.name.substring(0, 40)}...` : product.name}{'\n'}{'\n'}
                                                    x{product.quantity}{'\n'}{'\n'}
                                                    đ{product.price}{'\n'}
                                                </Text>
                                            </View>
                                            <View style={{ borderTopWidth: 2, borderTopColor: "#F3F3F3" }}>
                                                <Text style={{ margin: 10 }}>
                                                    <Text style={{ fontWeight: "bold" }}>Order Total </Text>                                                                 đ{order.totalPrice}
                                                </Text>
                                            </View>
                                        </View>

                                    ))}

                                </View>
                                <Text style={{ padding: 15 }}><Text style={{ fontSize: 15, fontWeight: "bold" }}>Payment Method{'\n'}{'\n'}</Text>{order.paymentMethod}</Text>
                            </View>
                        )}
                    </Pressable>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

export default OrderDetailScreen;


const styles = StyleSheet.create({
    notifications: {
        backgroundColor: "white",
    },
    dividing_line: {
        height: 6,
        borderColor: "#F3F3F3",
        borderWidth: 9.5,
        marginTop: 15,
    },
    address: {
        borderBottomWidth: 10,
        borderBottomColor: "#F3F3F3",
        padding: 10
    },
    infor: {
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 10
    },
});
