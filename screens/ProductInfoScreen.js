import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Pressable,
    TextInput,
    ImageBackground,
    Dimensions,
} from "react-native";
import React, { useState } from "react";
import { AntDesign, Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/CardReducer";

const ProductInfoScreen = () => {
    const route = useRoute();
    const { width } = Dimensions.get("window");
    const height = (width * 100) / 100;
    const dispatch = useDispatch();
    const [addedToCart, setAddedToCart] = useState(false);
    const navigation = useNavigation();
    const addItemToCart = (item) => {
        setAddedToCart(true);
        dispatch(addToCart(item));
        setTimeout(() => {
          setAddedToCart(false);
        }, 60000);
      };
    const cart = useSelector((state) => state.cart.cart);
    console.log(cart);
    return (
        <ScrollView style={styles.homescreen} showsVerticalScrollIndicator={false}>

            {/* thanh tìm kiếm */}
            <View style={styles.tabSearch}>
                <Pressable style={styles.tabSearchIcon}>
                    <AntDesign style={{ paddingLeft: 10 }} name="search1" size={22} color="black" />
                    <TextInput placeholder="Search product " />
                </Pressable>
                <Feather name="mic" size={24} color="white" />
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {route.params.carouselImages.map((item, index) => (
                    <ImageBackground style={{ width, height, marginTop: 25, resizeMode: "contain" }} source={{ uri: item }} key={index}>
                        <View style={styles.ImageBackgroundItem}>
                            <View style={styles.Circle}>
                                <Text style={styles.Text_SaleOff}> 20% off </Text>
                            </View>

                            <View style={styles.Share}>
                                <MaterialCommunityIcons name="share-variant" size={24} color="black" />
                            </View>
                        </View>

                        <View style={styles.love}>
                            <AntDesign name="hearto" size={24} color="black" />
                        </View>
                    </ImageBackground>
                ))}
            </ScrollView>

            <View style={styles.content}>
                <Text style={styles.describe}> {route?.params?.title} </Text>

                <Text style={styles.price}>{route?.params?.price}đ</Text>
            </View>

            <Text style={styles.dividing_line} />

            <View style={styles.describe_color}>
                <Text>Color: </Text>
                <Text style={styles.colorPr}> {route?.params?.color} </Text>
            </View>

            <View style={styles.describe_size}>
                <Text>Size: </Text>
                <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                    {route?.params?.size}
                </Text>
            </View>

            <Text style={styles.dividing_line} />

            <View style={{ padding: 10 }}>
                <Text style={styles.priceTotal}> Total : {route.params.price}đ </Text>
                <Text style={{ color: "#00CED1" }}> ĐẶT NGAY! ĐỂ ĐƯỢC HƯỞNG NHIỀU ƯU ĐÃI </Text>
                <View style={styles.Location_ship}>
                    <Ionicons name="location" size={24} color="black" />
                    <Text style={styles.Location_ship_text}> Giao hàng tới - Thành phố Hồ Chí Minh </Text>
                </View>
            </View>

            <Text style={styles.in_stock}> Còn hàng </Text>

            <Pressable style={styles.AddToCart}
            onPress={() => addItemToCart(route?.params?.item)}
            >
                {addedToCart ? (
                    <View>
                        <Text style={{color: "white"}}>Đã thêm vào giỏ hàng</Text>
                    </View>
                ) : (
                    <Text style={{color: "white"}} >Thêm vào giỏ hàng</Text>
                )}
            </Pressable>
            <Pressable style={styles.buynow}>
                <Text style={{color: "white"}}>Mua ngay</Text>
            </Pressable>

        </ScrollView>
    );
};

export default ProductInfoScreen;

const styles = StyleSheet.create({
    homescreen: {
        marginTop: 35,
        flex: 1,
        backgroundColor: "white"
        //backgroundColor: "#B00406"
    },
    tabSearch: {
        backgroundColor: "#B00406",
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
    },
    tabSearchIcon: {
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 7,
        gap: 10,
        backgroundColor: "white",
        borderRadius: 3,
        height: 38,
        flex: 1,
    },
    ImageBackgroundItem: {
        padding: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    Circle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#C60C30",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    },
    Text_SaleOff: {
        color: "white",
        textAlign: "center",
        fontWeight: "600",
        fontSize: 12,
    },
    Share: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#E0E0E0",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    },
    love: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#E0E0E0",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        marginTop: "auto",
        marginLeft: 20,
        marginBottom: 20,
    },
    content: {
        padding: 10
    },
    describe: {
        fontSize: 15,
        fontWeight: "500"
    },
    price: {
        fontSize: 18,
        fontWeight: "600",
        marginTop: 6
    },
    dividing_line: {
        height: 1,
        borderColor: "#D0D0D0",
        borderWidth: 1
    },
    describe_color: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10
    },
    colorPr: {
        fontSize: 15,
        fontWeight: "bold"
    },
    describe_size: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10
    },
    priceTotal: {
        fontSize: 15,
        fontWeight: "bold",
        marginVertical: 5
    },
    Location_ship: {
        flexDirection: "row",
        marginVertical: 5,
        alignItems: "center",
        gap: 5,
    },
    Location_ship_text: {
        fontSize: 15,
        fontWeight: "500",
    },
    in_stock: {
        color: "green",
        marginHorizontal: 10,
        fontWeight: "500"
    },
    AddToCart: {
        backgroundColor: "#B00406",
        padding: 10,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 10,
        marginVertical: 10,
    },
    buynow: {
        backgroundColor: "red",
        padding: 10,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 10,
        marginVertical: 10,
    }
});
