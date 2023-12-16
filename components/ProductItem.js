import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React, { useState } from "react";
// import { useDispatch } from "react-redux";
//import { addToCart } from "../redux/CartReducer";

const ProductItem = ({ item }) => {
    //   const [addedToCart, setAddedToCart] = useState(false);
    //   const dispatch = useDispatch();
    //   const addItemToCart = (item) => {
    //     setAddedToCart(true);
    //     dispatch(addToCart(item));
    //     setTimeout(() => {
    //       setAddedToCart(false);
    //     }, 60000);
    //   };
    return (
<Pressable style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.TrendProductImage} source={{ uri: item?.image }} />
      </View>
      <Text style={styles.productText}>
        {item?.title.length > 35 ? item.title.substring(0, 35) + "..." : item.title}
      </Text>
      <View style={styles.priceContainer}>
        <Text style={styles.TextPrice}>đ{item?.price}</Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>{item?.rating?.rate}</Text>
          <Image
            source={{
              uri:
                'https://cdn-icons-png.flaticon.com/128/1828/1828884.png?ga=GA1.1.1422071810.1701969758&semt=ais',
            }}
            style={styles.ratingImage}
          />
        </View>
      </View>

            <Pressable style={styles.cartButton}
            //onPress={() => addItemToCart(item)} 
            >
                <Text style={styles.cartButtonText}>Add to Cart</Text>
                {/* {addedToCart ? (
          <View>
            <Text>Added to Cart</Text>
          </View>
        ) : (
          <Text>Add to Cart</Text>
        )} */}
            </Pressable>
        </Pressable>
    );
};

export default ProductItem;

const styles = StyleSheet.create({
    container: {
      borderWidth: 0.7,
      margin: 5,
      marginLeft: 13,
      borderRadius: 10,
      width: 170,
      height: 250,
      borderColor: 'lightgray',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 5,
    },
    imageContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    TrendProductImage: {
      width: 100,
      height: 100,
      resizeMode: 'contain',
    },
    productText: {
      marginBottom:20,
      fontSize: 14,
    },
    priceContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    TextPrice: {
      fontWeight: 'bold',
      color: '#B00406',
      marginRight: 15,
    },
    ratingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    ratingText: {
      color: '#B00406',
      marginLeft: 55,
    },
    ratingImage: {
      width: 15,
      height: 15,
    },
    cartButton: {
      backgroundColor: '#B00406',
      padding: 10,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 10,
      marginTop: 10,
      marginBottom: 5,
    },
    cartButtonText: {
      color: 'white',
    },
  });