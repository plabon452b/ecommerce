import React, { useEffect, useState, useCallback } from "react";
import { View, StyleSheet, Platform, Dimensions } from "react-native";
//Redux
import { useSelector, useDispatch } from "react-redux";
//Action
import { fetchCart } from "../../reducers";
//component
import Colors from "../../utils/Colors";
import { Header, CartBody, TotalButton } from "./components";
//Loader
import Loader from "../../components/Loaders/Loader";

const { height } = Dimensions.get("window");

export const CartScreen = (props) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const carts = useSelector((state) => state.cart.cartItems);
  const loading = useSelector((state) => state.cart.isLoading);
  const cartItems = carts.items;
  const dispatch = useDispatch();
  let total = 0;
  cartItems.map((item) => (total += +item.price * +item.quantity));
  const loadCarts = useCallback(async () => {
    setIsRefreshing(true);
    try {
      await dispatch(fetchCart());
    } catch (err) {
      alert(err);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsRefreshing]);
  useEffect(() => {
    user._id && loadCarts();
  }, [user._id]);

  return (
    <View style={styles.container}>
      <Header user={user} carts={carts} navigation={props.navigation} />
      {loading ? <Loader /> : <></>}
      <CartBody
        user={user}
        carts={carts}
        loadCarts={loadCarts}
        isRefreshing={isRefreshing}
        navigation={props.navigation}
      />
      {!user._id ? (
        <></>
      ) : cartItems.length === 0 ? (
        <View />
      ) : (
        <TotalButton
          total={total}
          cartItems={cartItems}
          navigation={props.navigation}
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    width: "100%",
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    height: Platform.OS === "android" ? 70 : height < 668 ? 70 : 90,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  centerLoader: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
    position: "absolute",
    top: Platform.OS === "android" ? 70 : height < 668 ? 70 : 90,
  },
});
