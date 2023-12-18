import {
    Image,
    StyleSheet,
    Text,
    View,
    ScrollView,
    Pressable,
    SafeAreaView,
} from "react-native";
import React, { useEffect, useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { UserType } from "../UserContext";
import { MaterialIcons } from "@expo/vector-icons";

const NoticeScreen = () => {
    const { userId, setUserId } = useContext(UserType);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

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
                <View style={styles.header}>
                    <Pressable style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => navigation.goBack()}>
                        <Text style={{ fontSize: 20, marginLeft: 10 }}>Notifications</Text>
                    </Pressable>
                </View>
                <Text style={styles.dividing_line} />
                <View style={{ backgroundColor: "#F3F3F3", marginTop: 10 }}>
                    {loading ? (
                        <Text style={styles.tam}>Bạn chưa có đơn hàng nào</Text>
                    ) : orders.length > 0 ? (
                        orders.map((order) => (
                            <Pressable
                                onPress={() => navigation.navigate('OrderDetail', { orderId: order._id })}
                                style={styles.pressable}
                                key={order._id}
                            >
                                {order.products.slice(0, 1)?.map((product) => (
                                    <View style={styles.productContainer} key={product._id}>
                                        <Image
                                            source={{ uri: product.image }}
                                            style={{ width: 40, height: 40, padding: 5 }}
                                        />
                                        <Text style={{ marginLeft: 20, marginVertical: 10 }}><Text style={{ fontWeight: "bold" }}>Payment Confirmed{'\n'}{'\n'}</Text>Your order <Text style={styles.boldText}>{product?._id}</Text> has been comfirmed and we've notified the seller. Kindly wait for your shipment. Click here to see order details and track parcel {'\n'}{'\n'}<Text style={{ fontSize: 12 }}>{order.createdAt}</Text></Text>

                                    </View>
                                ))}
                            </Pressable>
                        ))
                    ) : (
                        <Text style={styles.noOrderText}>No orders found</Text>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    notifications: {
        backgroundColor: "white",
    },
    container: {
        marginTop: 40,
    },
    header: {
        padding: 10,
    },
    dividing_line: {
        height: 6,
        borderColor: "#F3F3F3",
        borderWidth:9.5,
        marginTop: 15,
    },
    tam: {
        //marginTop: 20,
        //padding: 15,
        borderWidth: 1,
        borderColor: "white",
        //marginHorizontal: 10,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        marginTop: 10
    },
    pressable: {
        borderWidth: 0.5,
        borderColor: "white",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        marginBottom: 10,
        flexDirection: "row",
        alignItems: "center",
    },
    productContainer: {
        marginHorizontal: 30,
        flexDirection: "row",
        alignItems: "center",
        marginRight: 70,
    },
    boldText: {
        fontSize: 15,
        fontWeight: "bold",
        color: "#2FA78C",
    },
    noOrderText: {
        textAlign: "center",
    },
});

export default NoticeScreen;
