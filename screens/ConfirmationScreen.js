import { StyleSheet, Text, View, ScrollView, Pressable, Alert } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserType } from "../UserContext";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { cleanCart } from "../redux/CardReducer";
import { useNavigation } from "@react-navigation/native";

const ConfirmationScreen = () => {
  const steps = [
    { title: "Address", content: "Address Form" },
    { title: "Delivery", content: "Delivery Options" },
    { title: "Payment", content: "Payment Details" },
    { title: "Place Order", content: "Order Summary" },
  ];
  const navigation = useNavigation();
  const [currentStep, setCurrentStep] = useState(0);
  const [addresses, setAddresses] = useState([]);
  const { userId, setUserId } = useContext(UserType);
  const cart = useSelector((state) => state.cart.cart);
  const total = cart
    ?.map((item) => item.price * item.quantity)
    .reduce((curr, prev) => curr + prev, 0);
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
  const dispatch = useDispatch();
  const [selectedAddress, setSelectedAdress] = useState("");
  const [option, setOption] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const handlePlaceOrder = async () => {
    try {
      const orderData = {
        userId: userId,
        cartItems: cart,
        totalPrice: total,
        shippingAddress: selectedAddress,
        paymentMethod: selectedOption,
      };

      const response = await axios.post(
        "http://192.168.43.131:8000/orders",
        orderData
      );
      if (response.status === 200) {
        navigation.navigate("Order");
        dispatch(cleanCart());
        console.log("order created successfully", response.data);
      } else {
        console.log("error creating order", response.data);
      }
    } catch (error) {
      console.log("errror", error);
    }
  };
  const pay = async () => {
    try {
      const options = {
        description: "Adding To Wallet",
        amount: total * 100,
        theme: { color: "#F37254" },
      };

      //const data = await RazorpayCheckout.open(options);

      console.log(data)

      const orderData = {
        userId: userId,
        cartItems: cart,
        totalPrice: total,
        shippingAddress: selectedAddress,
        paymentMethod: "card",
      };

      const response = await axios.post(
        "http://192.168.43.131:8000/orders",
        orderData
      );
      if (response.status === 200) {
        navigation.navigate("Order");
        dispatch(cleanCart());
        console.log("order created successfully", response.data);
      } else {
        console.log("error creating order", response.data);
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <ScrollView style={{ marginTop: 55 }}>
      <View style={styles.step}>
        <View style={styles.stepbystep}>
          {steps?.map((step, index) => (
            <View style={styles.stepmap}>
              {index > 0 && (
                <View
                  style={[
                    { flex: 1, height: 2, backgroundColor: "green" },
                    index <= currentStep && { backgroundColor: "green" },
                  ]}
                />
              )}
              <View
                style={[
                  {
                    width: 30,
                    height: 30,
                    borderRadius: 15,
                    backgroundColor: "#ccc",
                    justifyContent: "center",
                    alignItems: "center",
                  },
                  index < currentStep && { backgroundColor: "green" },
                ]}
              >
                {index < currentStep ? (
                  <Text style={styles.currentstep}> &#10003; </Text>
                ) : (
                  <Text style={styles.currentstep}> {index + 1} </Text>
                )}
              </View>
              <Text style={styles.stepTitle}>
                {step.title}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {currentStep == 0 && (
        <View style={{ marginHorizontal: 20 }}>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}> Select Delivery Address </Text>

          <Pressable>
            {addresses?.map((item, index) => (
              <Pressable style={styles.addressMap}>
                {selectedAddress && selectedAddress._id === item?._id ? (
                  <FontAwesome5 name="dot-circle" size={20} color="#B00406" />
                ) : (
                  <Entypo
                    onPress={() => setSelectedAdress(item)}
                    name="circle"
                    size={20}
                    color="gray"
                  />
                )}

                <View style={{ marginLeft: 6 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 3,
                    }}
                  >
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                      {item?.fullName}
                    </Text>
                    <Entypo name="location-pin" size={24} color="red" />
                  </View>

                  <Text style={styles.adressInFo}>
                    {item?.phoneNumber}
                  </Text>

                  <Text style={styles.adressInFo}>
                    {item?.addressLine1}
                  </Text>

                  <Text style={styles.adressInFo}>
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

                  <View>
                    {selectedAddress && selectedAddress._id === item?._id && (
                      <Pressable
                        onPress={() => setCurrentStep(1)}
                        style={styles.choose_address}>
                        <Text style={{ textAlign: "center", color: "white" }}>Deliver to this Address</Text>
                      </Pressable>
                    )}
                  </View>
                </View>
              </Pressable>
            ))}
          </Pressable>
        </View>
      )}

      {currentStep == 1 && (
        <View style={{ marginHorizontal: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Choose your delivery options</Text>

          <View style={styles.step2}>
            {option ? (
              <FontAwesome5 name="dot-circle" size={20} color="#B00406" />
            ) : (
              <Entypo
                onPress={() => setOption(!option)}
                name="circle"
                size={20}
                color="gray"
              />
            )}

            <Text style={{ flex: 1 }}>
              <Text style={{ color: "green", fontWeight: "500" }}> Thời gian giao hàng dự kiến: Tuần tới</Text>{" "}FREE-SHIP
            </Text>
          </View>

          <Pressable
            onPress={() => setCurrentStep(2)}
            style={styles.chooseStep2}>
            <Text style={{color:"white"}}>Continue</Text>
          </Pressable>
        </View>
      )}

      {currentStep == 2 && (
        <View style={{ marginHorizontal: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Select your payment Method</Text>

          <View style={styles.step3}>
            {selectedOption === "cash" ? (
              <FontAwesome5 name="dot-circle" size={20} color="#B00406" />
            ) : (
              <Entypo
                onPress={() => setSelectedOption("cash")}
                name="circle"
                size={20}
                color="gray"
              />
            )}
            <Text>Thanh toán khi nhận hàng</Text>
          </View>

          <View style={styles.step3}>
          {selectedOption === "card" ? (
              <FontAwesome5 name="dot-circle" size={20} color="#B00406" />
            ) : (
              <Entypo
                onPress={() => setSelectedOption("card")}
                name="circle"
                size={20}
                color="gray"
              />
            )}
            <Text>Thẻ tín dụng/ Thẻ ghi nợ</Text>
          </View>
          <Pressable
            onPress={() => setCurrentStep(3)}
            style={styles.chooseStep2}>
            <Text style={{color:"white"}}>Continue</Text>
          </Pressable>
        </View>
      )}

      {currentStep === 3 && selectedOption === "cash" && (
        <View style={{ marginHorizontal: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Order Now</Text>

          <View style={styles.addVoucher}>
            <View>
              <Text style={{ fontSize: 17, fontWeight: "bold" }}>
                Save 3% and never run out
              </Text>
              <Text style={{ fontSize: 15, color: "gray", marginTop: 5 }}>
                Turn on auto deliveries
              </Text>
            </View>

            <MaterialIcons
              name="keyboard-arrow-right"
              size={24}
              color="black"
            />
          </View>

          <View style={styles.shipping}>
            <Text>Shipping to {selectedAddress?.fullName}</Text>

            <View style={styles.item}>
              <Text style={styles.itemTitle}>Items</Text>
              <Text style={styles.itemCost}>đ{total}</Text>
            </View>

            <View style={styles.item}>
              <Text style={styles.itemTitle}>Delivery</Text>
              <Text style={styles.itemCost}>đ1500</Text>
            </View>

            <View style={styles.order_total}>
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>Order Total</Text>
              <Text style={{ color: "#C60C30", fontSize: 17, fontWeight: "bold" }}>đ{total}</Text>
            </View>
          </View>

          <View style={styles.shipping}>
            <Text style={{ fontSize: 16, color: "gray" }}>Pay With</Text>

            <Text style={{ fontSize: 16, fontWeight: "600", marginTop: 7 }}>Pay on delivery (Cash)</Text>
          </View>

          <Pressable
            onPress={handlePlaceOrder}
            style={styles.chooseStep4}>
            <Text style={{color:"white"}}>Place your order</Text>
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
};

export default ConfirmationScreen;

const styles = StyleSheet.create({
  step: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40
  },
  stepbystep: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    justifyContent: "space-between",
  },
  stepmap: {
    justifyContent: "center",
    alignItems: "center"
  },
  currentstep: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white"
  },
  stepTitle: {
    textAlign: "center",
    marginTop: 8
  },
  addressMap: {
    borderWidth: 1,
    borderColor: "#D0D0D0",
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingBottom: 17,
    marginVertical: 7,
    borderRadius: 6,
  },
  adressInFo: {
    fontSize: 15,
    color: "#181818"
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
  choose_address: {
    backgroundColor: "#B00406",
    padding: 10,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  step2: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 8,
    gap: 7,
    borderColor: "#D0D0D0",
    borderWidth: 1,
    marginTop: 10,
  },
  chooseStep2: {
    backgroundColor: "#B00406",
    padding: 10,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  step3: {
    backgroundColor: "white",
    padding: 8,
    borderColor: "#D0D0D0",
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    marginTop: 12,
  },
  addVoucher: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    backgroundColor: "white",
    padding: 8,
    borderColor: "#D0D0D0",
    borderWidth: 1,
    marginTop: 10,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 8,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "gray"
  },
  itemCost: {
    color: "gray",
    fontSize: 16
  },
  shipping: {
    backgroundColor: "white",
    padding: 8,
    borderColor: "#D0D0D0",
    borderWidth: 1,
    marginTop: 10,
  },
  order_total:{
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 8,
  },
  chooseStep4:{
    backgroundColor: "#B00406",
    padding: 10,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  }
});
