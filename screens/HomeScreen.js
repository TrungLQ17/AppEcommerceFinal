import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Image,
    KeyboardAvoidingView,
    TextInput,
    Pressable,
    Platform,
    ScrollView,
} from "react-native";
import React, { useState, useEffect, useCallback, useContext } from "react";
//import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { SliderBox } from "react-native-image-slider-box";
import axios from "axios";
import DropDownPicker from "react-native-dropdown-picker";
import ProductItem from "../components/ProductItem";
import { useNavigation } from "@react-navigation/native";
import { BottomModal, SlideAnimation, ModalContent } from "react-native-modals";
import { useSelector } from "react-redux";
import { UserType } from "../UserContext";
import jwt_decode from "jwt-decode";

const HomeScreen = () => {

    const list1ProductPortfolio = [
        {
            id: "0",
            image: "https://cdn-icons-png.flaticon.com/128/1000/1000662.png?ga=GA1.1.1422071810.1701969758&semt=ais",
            name: "Home",
        },
        {
            id: "1",
            image:
                "https://cdn-icons-png.flaticon.com/128/811/811148.png?ga=GA1.1.1422071810.1701969758&semt=ais",
            name: "Deals",
        },
        {
            id: "2",
            image:
                "https://cdn-icons-png.flaticon.com/128/4860/4860001.png?ga=GA1.1.1422071810.1701969758&semt=ais",
            name: "Electronics",
        },
        {
            id: "3",
            image:
                "https://cdn-icons-png.flaticon.com/128/6350/6350852.png?ga=GA1.1.1422071810.1701969758&semt=ais",
            name: "Mobiles",
        },
        {
            id: "4",
            image:
                "https://cdn-icons-png.flaticon.com/128/8539/8539214.png?ga=GA1.1.1422071810.1701969758&semt=ais",
            name: "Music",
        },
        {
            id: "5",
            image: "https://cdn-icons-png.flaticon.com/128/8917/8917977.png?ga=GA1.1.1422071810.1701969758&semt=ais",
            name: "Fashion",
        },
    ];
    const list2ProductPortfolio = [

        {
            id: "0",
            image: "https://cdn-icons-png.flaticon.com/128/10086/10086538.png?ga=GA1.1.1422071810.1701969758&semt=ais",
            name: "Fashion",
        },
        {
            id: "1",
            image: "https://cdn-icons-png.flaticon.com/128/8381/8381214.png?ga=GA1.1.1422071810.1701969758&semt=ais",
            name: "Fashion",
        },
        {
            id: "2",
            image: "https://cdn-icons-png.flaticon.com/128/4325/4325957.png?ga=GA1.1.1422071810.1701969758&semt=ais",
            name: "Fashion",
        },
    ];
    const imagesSlider = [
        "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/retail-store-facebook-shop-cover-design-template-3b90163b24d7f9c789c1be51b5a3951d_screen.jpg?ts=1700638520",
        "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/black-friday-design-template-fd86427fe033e38b544433fb535aa9d4_screen.jpg?ts=1698383409",
        "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/merry-christmas-design-template-fc0a5f7d85db7d397c497da226a7088e_screen.jpg?ts=1701434987",
        "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/pink-cosmetic-store-facebook-shop-cover-design-template-c0f60562054ad1d1af934b0897bdf3d3_screen.jpg?ts=1590736715",
        "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/cosmetic-store-discount-facebook-shop-cover-design-template-bb990e1c8f92d85d9d05f74b1abc6267_screen.jpg?ts=1590736715",
        "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/car-rental-design-template-93cb7cfb6fff3f74819cbea6eea51320_screen.jpg?ts=1656318403",
    ];
    const deals = [
        {
            id: "20",
            title: "OnePlus Nord CE 3 Lite 5G (Pastel Lime, 8GB RAM, 128GB Storage)",
            oldPrice: 25000,
            price: 19000,
            image:
                "https://images-eu.ssl-images-amazon.com/images/G/31/wireless_products/ssserene/weblab_wf/xcm_banners_2022_in_bau_wireless_dec_580x800_once3l_v2_580x800_in-en.jpg",
            carouselImages: [
                "https://m.media-amazon.com/images/I/61QRgOgBx0L._SX679_.jpg",
                "https://m.media-amazon.com/images/I/61uaJPLIdML._SX679_.jpg",
                "https://m.media-amazon.com/images/I/510YZx4v3wL._SX679_.jpg",
                "https://m.media-amazon.com/images/I/61J6s1tkwpL._SX679_.jpg",
            ],
            color: "Stellar Green",
            size: "6 GB RAM 128GB Storage",
        },
        {
            id: "30",
            title:
                "Samsung Galaxy S20 FE 5G (Cloud Navy, 8GB RAM, 128GB Storage) with No Cost EMI & Additional Exchange Offers",
            oldPrice: 74000,
            price: 26000,
            image:
                "https://images-eu.ssl-images-amazon.com/images/G/31/img23/Wireless/Samsung/SamsungBAU/S20FE/GW/June23/BAU-27thJune/xcm_banners_2022_in_bau_wireless_dec_s20fe-rv51_580x800_in-en.jpg",
            carouselImages: [
                "https://m.media-amazon.com/images/I/81vDZyJQ-4L._SY879_.jpg",
                "https://m.media-amazon.com/images/I/61vN1isnThL._SX679_.jpg",
                "https://m.media-amazon.com/images/I/71yzyH-ohgL._SX679_.jpg",
                "https://m.media-amazon.com/images/I/61vN1isnThL._SX679_.jpg",
            ],
            color: "Cloud Navy",
            size: "8 GB RAM 128GB Storage",
        },
        {
            id: "40",
            title:
                "Samsung Galaxy M14 5G (ICY Silver, 4GB, 128GB Storage) | 50MP Triple Cam | 6000 mAh Battery | 5nm Octa-Core Processor | Android 13 | Without Charger",
            oldPrice: 16000,
            price: 14000,
            image:
                "https://images-eu.ssl-images-amazon.com/images/G/31/img23/Wireless/Samsung/CatPage/Tiles/June/xcm_banners_m14_5g_rv1_580x800_in-en.jpg",
            carouselImages: [
                "https://m.media-amazon.com/images/I/817WWpaFo1L._SX679_.jpg",
                "https://m.media-amazon.com/images/I/81KkF-GngHL._SX679_.jpg",
                "https://m.media-amazon.com/images/I/61IrdBaOhbL._SX679_.jpg",
            ],
            color: "Icy Silver",
            size: "6 GB RAM 64GB Storage",
        },
        {
            id: "40",
            title:
                "realme narzo N55 (Prime Blue, 4GB+64GB) 33W Segment Fastest Charging | Super High-res 64MP Primary AI Camera",
            oldPrice: 12999,
            price: 10999,
            image:
                "https://images-eu.ssl-images-amazon.com/images/G/31/tiyesum/N55/June/xcm_banners_2022_in_bau_wireless_dec_580x800_v1-n55-marchv2-mayv3-v4_580x800_in-en.jpg",
            carouselImages: [
                "https://m.media-amazon.com/images/I/41Iyj5moShL._SX300_SY300_QL70_FMwebp_.jpg",
                "https://m.media-amazon.com/images/I/61og60CnGlL._SX679_.jpg",
                "https://m.media-amazon.com/images/I/61twx1OjYdL._SX679_.jpg",
            ],
        },
    ];
    const offers = [
        {
            id: "0",
            title:
                "Oppo Enco Air3 Pro True Wireless in Ear Earbuds with Industry First Composite Bamboo Fiber, 49dB ANC, 30H Playtime, 47ms Ultra Low Latency,Fast Charge,BT 5.3 (Green)",
            offer: "72% off",
            oldPrice: 7500,
            price: 4500,
            image:
                "https://m.media-amazon.com/images/I/61a2y1FCAJL._AC_UL640_FMwebp_QL65_.jpg",
            carouselImages: [
                "https://m.media-amazon.com/images/I/61a2y1FCAJL._SX679_.jpg",
                "https://m.media-amazon.com/images/I/71DOcYgHWFL._SX679_.jpg",
                "https://m.media-amazon.com/images/I/71LhLZGHrlL._SX679_.jpg",
                "https://m.media-amazon.com/images/I/61Rgefy4ndL._SX679_.jpg",
            ],
            color: "Green",
            size: "Normal",
        },
        {
            id: "1",
            title:
                "Fastrack Limitless FS1 Pro Smart Watch|1.96 Super AMOLED Arched Display with 410x502 Pixel Resolution|SingleSync BT Calling|NitroFast Charging|110+ Sports Modes|200+ Watchfaces|Upto 7 Days Battery",
            offer: "40%",
            oldPrice: 7955,
            price: 3495,
            image: "https://m.media-amazon.com/images/I/41mQKmbkVWL._AC_SY400_.jpg",
            carouselImages: [
                "https://m.media-amazon.com/images/I/71h2K2OQSIL._SX679_.jpg",
                "https://m.media-amazon.com/images/I/71BlkyWYupL._SX679_.jpg",
                "https://m.media-amazon.com/images/I/71c1tSIZxhL._SX679_.jpg",
            ],
            color: "black",
            size: "Normal",
        },
        {
            id: "2",
            title: "Aishwariya System On Ear Wireless On Ear Bluetooth Headphones",
            offer: "40%",
            oldPrice: 7955,
            price: 3495,
            image: "https://m.media-amazon.com/images/I/41t7Wa+kxPL._AC_SY400_.jpg",
            carouselImages: ["https://m.media-amazon.com/images/I/41t7Wa+kxPL.jpg"],
            color: "black",
            size: "Normal",
        },
        {
            id: "3",
            title:
                "Fastrack Limitless FS1 Pro Smart Watch|1.96 Super AMOLED Arched Display with 410x502 Pixel Resolution|SingleSync BT Calling|NitroFast Charging|110+ Sports Modes|200+ Watchfaces|Upto 7 Days Battery",
            offer: "40%",
            oldPrice: 24999,
            price: 19999,
            image: "https://m.media-amazon.com/images/I/71k3gOik46L._AC_SY400_.jpg",
            carouselImages: [
                "https://m.media-amazon.com/images/I/41bLD50sZSL._SX300_SY300_QL70_FMwebp_.jpg",
                "https://m.media-amazon.com/images/I/616pTr2KJEL._SX679_.jpg",
                "https://m.media-amazon.com/images/I/71wSGO0CwQL._SX679_.jpg",
            ],
            color: "Norway Blue",
            size: "8GB RAM, 128GB Storage",
        },
    ];
    const [products, setProducts] = useState([]);
    const [open, setOpen] = useState(false);
    const [addresses, setAddresses] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("jewelery");
    const { userId, setUserId } = useContext(UserType);
    const [selectedAddress, setSelectedAdress] = useState("");
    console.log(selectedAddress)
    const [items, setItems] = useState([
        { label: "Jewelery", value: "jewelery" },
        { label: "Men's clothing", value: "men's clothing" },
        { label: "Electronics", value: "electronics" },
        { label: "Women's clothing", value: "women's clothing" },
    ]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("https://fakestoreapi.com/products");
                setProducts(response.data);
            } catch (error) {
                console.log("error message", error);
            }
        };

        fetchData();
    }, []);
    console.log("product", products);
    const onGenderOpen = useCallback(() => {
        setCompanyOpen(false);
    }, []);
    const navigation = useNavigation();
    const cart = useSelector((state) => state.cart.cart);
    console.log(cart);
    const [modalVisible, setModalVisible] = useState(false);
    useEffect(() => {
        if (userId) {
            fetchAddresses();
        }
    }, [userId, modalVisible]);
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
    useEffect(() => {
        const fetchUser = async () => {
            const token = await AsyncStorage.getItem("authToken");
            const decodedToken = jwt_decode(token);
            const userId = decodedToken.userId;
            setUserId(userId);
        };

        fetchUser();
    }, []);
    console.log("address", addresses);

    return (
        <>
            <SafeAreaView style={styles.homescreen}>
                <ScrollView>
                    <View style={styles.header}>
                        <View style={styles.tabSearch}>
                            <Pressable style={styles.tabSearchIcon}>
                                <AntDesign name="search1" size={20} color="gray" marginLeft={10} />
                                <TextInput placeholder="Search product" />
                            </Pressable>
                        </View>

                        <Pressable onPress={setModalVisible} style={styles.tabAddress}>
                            <Ionicons name="location-outline" size={24} color="white" />
                            <MaterialIcons name="keyboard-arrow-down" size={24} color="white" />
                        </Pressable>
                    </View>
                    <SliderBox
                        images={imagesSlider}
                        autoplay
                        circleLoop
                        dotColor="#B00406"
                        inactiveDotColor="#90A4AE"
                        ImageComponentStyle={{ width: '100%' }}
                    />
                    <View style={{ backgroundColor: 'white' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                {list1ProductPortfolio.map((item, index) => (
                                    <View key={index} style={styles.productContainer}>
                                        <View style={styles.imageContainer}>
                                            <Image style={styles.productImage} source={{ uri: item.image }} />
                                        </View>
                                        <Text style={styles.iconText}>{item?.name}</Text>
                                    </View>
                                ))}
                            </ScrollView>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                {list2ProductPortfolio.map((item, index) => (
                                    <View key={index} style={styles.productContainer}>
                                        <View style={styles.imageContainer}>
                                            <Image style={styles.productImage} source={{ uri: item.image }} />
                                        </View>
                                        <Text style={styles.iconText}>{item?.name}</Text>
                                    </View>
                                ))}
                            </ScrollView>
                        </View>

                        <Text style={styles.dividing_line} />

                        <View style={styles.titleContainer}>
                            <Text style={styles.TitleComponents}> RECOMMENDED FOR YOU </Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={styles.seeAllDetail}>See All Detail</Text>
                                <MaterialIcons name="keyboard-arrow-right" size={20} color="black" style={{ marginRight: 15 }} />
                            </View>
                        </View>

                        {/* sản phẩm hot-trend */}
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            <View style={styles.TrendProduct}>
                                {deals.map((item, index) => (
                                    <Pressable
                                        key={index}
                                        onPress={() =>
                                            navigation.navigate("Info", {
                                                id: item.id,
                                                title: item.title,
                                                price: item?.price,
                                                carouselImages: item.carouselImages,
                                                color: item?.color,
                                                size: item?.size,
                                                oldPrice: item?.oldPrice,
                                                item: item,
                                            })
                                        }
                                        style={styles.TrendProductBox}
                                    >
                                        <View>
                                            <Image style={styles.TrendProductImage} source={{ uri: item?.image }} />
                                            <Text style={styles.productText}>
                                                {item?.title.length > 35 ? item.title.substring(0, 35) + "..." : item.title}
                                            </Text>
                                            <View><Text style={styles.TextPrice}>  đ{item?.price} </Text></View>
                                        </View>
                                    </Pressable>
                                ))}
                            </View>
                        </ScrollView>


                        {/* đường phân cách */}
                        <Text style={styles.dividing_line} />

                        <View style={styles.titleContainer}>
                            <Text style={styles.TitleComponents}> FLASH SALE </Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={styles.seeAllDetail}>See All Detail</Text>
                                <MaterialIcons name="keyboard-arrow-right" size={20} color="black" style={{ marginRight: 15 }} />
                            </View>

                        </View>

                        {/* HotDeal - Today */}
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {offers.map((item, index) => (
                                <Pressable
                                    onPress={() =>
                                        navigation.navigate("Info", {
                                            id: item.id,
                                            title: item.title,
                                            price: item?.price,
                                            carouselImages: item.carouselImages,
                                            color: item?.color,
                                            size: item?.size,
                                            oldPrice: item?.oldPrice,
                                            item: item,
                                        })
                                    }
                                    style={styles.DealToday}>
                                    <Image style={styles.DealTodayImage} source={{ uri: item?.image }} />
                                    <View><Text style={styles.price}>  đ{item?.price} </Text></View>
                                    <View style={styles.DealTodayProduct}>
                                        <Text style={styles.DealTodayText}> Upto {item?.offer} </Text>
                                    </View>
                                </Pressable>
                            ))}
                        </ScrollView>

                        {/* đường phân cách */}
                        <Text style={styles.dividing_line} />
                        <View style={styles.titleContainer}>
                            <Text style={styles.TitleComponents}> DAILY DISCOVER </Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={styles.seeAllDetail}>See All Detail</Text>
                                <MaterialIcons name="keyboard-arrow-right" size={20} color="black" style={{ marginRight: 15 }} />
                            </View>
                        </View>
                        <View>
                            <View style={{ marginHorizontal: 10, marginTop: 20, marginBottom: 20 }}>
                                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                    {items.map((item) => (
                                        <Pressable
                                            key={item.value}
                                            style={[
                                                styles.categoryOption,
                                                selectedCategory === item.value && styles.selectedCategoryOption,
                                            ]}
                                            onPress={() => setSelectedCategory(item.value)}
                                        >
                                            <Text
                                                style={[
                                                    styles.categoryText,
                                                    selectedCategory === item.value && styles.selectedCategoryText,
                                                ]}
                                            >
                                                {item.label}
                                            </Text>
                                        </Pressable>
                                    ))}
                                </ScrollView>
                            </View>

                            <View style={styles.ListProduct}>
                                {products
                                    ?.filter((item) => item.category === selectedCategory)
                                    .map((item, index) => (
                                        <ProductItem
                                            item={item}
                                            key={index}
                                            style={StyleSheet.flatten([styles.customProductItem, item.additionalStyles])}
                                        />
                                    ))}
                            </View>
                        </View>

                    </View>
                </ScrollView>
            </SafeAreaView>
            <BottomModal
                onBackdropPress={() => setModalVisible(!modalVisible)}
                swipeDirection={["up", "down"]}
                swipeThreshold={200}
                modalAnimation={
                    new SlideAnimation({
                        slideFrom: "bottom",
                    })
                }
                onHardwareBackPress={() => setModalVisible(!modalVisible)}
                visible={modalVisible}
                onTouchOutside={() => setModalVisible(!modalVisible)}
            >
                <ModalContent style={styles.ModalContent_location}>
                    <View style={{ marginBottom: 8 }}>
                        <Text style={{ fontSize: 16, fontWeight: "500" }}>
                            Địa chỉ giao hàng của bạn
                        </Text>

                        <Text style={{ marginTop: 5, fontSize: 15, color: "gray" }}>
                            Chọn địa điểm giao hàng của bạn
                        </Text>
                    </View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {addresses?.map((item, index) => (
                            <Pressable
                                onPress={() => setSelectedAdress(item)}

                                style={styles.location_image1}>
                                <View
                                    style={{ flexDirection: "row", alignItems: "center", gap: 3 }}
                                >
                                    <Text style={{ fontSize: 13, fontWeight: "bold" }}>
                                        {item?.fullName}
                                    </Text>
                                    <Entypo name="location-pin" size={24} color="red" />
                                </View>
                                <Text
                                    numberOfLines={1}
                                    style={{ width: 130, fontSize: 13, textAlign: "center" }}
                                >
                                    {item?.phoneNumber}
                                </Text>
                                <Text
                                    numberOfLines={1}
                                    style={{ width: 130, fontSize: 13, textAlign: "center" }}
                                >
                                    {item?.addressLine1}
                                </Text>
                                <Text
                                    numberOfLines={1}
                                    style={{ width: 130, fontSize: 13, textAlign: "center" }}
                                >
                                    {item?.city}
                                </Text>
                            </Pressable>
                        ))}

                        <Pressable style={styles.location_image2}
                            onPress={() => {
                                setModalVisible(false);
                                navigation.navigate("Address");
                            }}
                        >
                            <Text style={{ textAlign: "center", color: "#0066b2", fontWeight: "500", }}>
                                Thêm địa chỉ giao hàng
                            </Text>
                        </Pressable>
                    </ScrollView>
                    <View style={styles.location_list_view}>
                        <View style={styles.location_list_view_1}>
                            <Entypo name="location-pin" size={22} color="#0066b2" />
                            <Text style={styles.location_list_view_1text}> Enter an Viet Nam pincode</Text>
                        </View>

                        <View style={styles.location_list_view_1}>
                            <Ionicons name="locate-sharp" size={22} color="#0066b2" />
                            <Text style={styles.location_list_view_1text}> Use My Currect location </Text>
                        </View>

                        <View style={styles.location_list_view_1}>
                            <AntDesign name="earth" size={22} color="#0066b2" />
                            <Text style={styles.location_list_view_1text}> Deliver outside Viet Nam </Text>
                        </View>
                    </View>
                </ModalContent>
            </BottomModal>
        </>
    )
}

export default HomeScreen;

const styles = StyleSheet.create({
    homescreen: {
        paddingTop: Platform.OS === "android" ? 40 : 0,
        flex: 1,
        backgroundColor: "#B00406"
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginRight: 60,
        marginBottom: 10,
    },
    tabSearch: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 10,
    },
    tabSearchIcon: {
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 7,
        gap: 10,
        backgroundColor: "white",
        borderRadius: 6,
        height: 38,
        flex: 1,
    },
    tabAddress: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "#B00406",
        height: 50,

    },
    productContainer: {
        marginTop: 15,
        alignItems: 'center',
        margin: 10,
        width: 80,
        height: 60,

    },
    imageContainer: {
        borderWidth: 1,
        borderColor: 'lightgray',
        padding: 5,
        borderRadius: 10,
    },
    productImage: {
        width: 30,
        height: 30,
        resizeMode: 'cover',
        borderWidth: 1,

    },
    iconText: {
        fontSize: 12,
    },
    productText: {
        fontSize: 14,
        margin: 10,
    },

    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    TitleComponents: {
        padding: 10,
        fontSize: 17,
        fontWeight: "bold",
        color: "#B00406",
    },
    seeAllDetail: {
        color: "#979797",

    },
    TrendProduct: {
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap",

    },
    TrendProductBox: {
        justifyContent: 'space-between',
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 0.7,
        margin: 5,
        marginLeft: 13,
        borderRadius: 10,
        width: 170,
        height: 250,
        borderColor: "lightgray",
    },
    TrendProductImage: {
        width: 150,
        height: 150,
        resizeMode: "contain",

    },
    TextPrice: {
        margin: 5,
        fontWeight: "bold",
        color: "#B00406",
    },
    price: {
        fontWeight: "bold",
        color: "#B00406",
    },
    dividing_line: {
        height: 8,
        borderColor: "#F5F4F4",
        borderWidth: 7,
        marginTop: 15,
    },
    DealToday: {
        marginVertical: 10,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 0.7,
        margin: 5,
        marginLeft: 13,
        borderRadius: 10,
        width: 170,
        height: 220,
        borderColor: "lightgray",
    },
    DealTodayImage: {
        width: 120,
        height: 120,
        resizeMode: "contain",
        marginBottom: 5,
    },
    DealTodayProduct: {
        backgroundColor: "#B00406",
        paddingVertical: 5,
        width: 130,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
        borderRadius: 4

    },
    DealTodayText: {
        textAlign: "center",
        color: "white",
        fontSize: 13,
        fontWeight: "bold",
    },
    categoryOption: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginRight: 10,
        borderRadius: 40,
        backgroundColor: "#E9E7E7",
        borderColor: "transparent",
        borderWidth: 1,
    },
    selectedCategoryOption: {
        backgroundColor: "#B00406",
        borderColor: "#B00406",
    },
    categoryText: {
        fontWeight: "bold",
        color: "black",
    },
    selectedCategoryText: {
        color: "white",
    },
    ListProduct: {
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap",
        marginBottom: 5,

    },
    /*     customProductItem:{
            borderWidth: 1,
            margin: 5,
            marginRight: 8,
            borderRadius: 10,
            width: 170,
            height:220,
            borderColor: "lightgray",
        }, */
    ModalContent_location: {
        width: "100%",
        height: 400
    },
    location_image1: {
        width: 140,
        height: 140,
        borderColor: "#D0D0D0",
        borderWidth: 1,
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
        gap: 3,
        marginRight: 15,
        marginTop: 10,
        //backgroundColor: selectedAddress === item ? "#FBCEB1" : "white"
    },
    location_image2: {
        width: 140,
        height: 140,
        borderColor: "#D0D0D0",
        marginTop: 10,
        borderWidth: 1,
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    location_list_view: {
        flexDirection: "column",
        gap: 7,
        marginBottom: 30
    },
    location_list_view_1: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5
    },
    location_list_view_1text: {
        color: "#0066b2",
        fontWeight: "400"
    },
});