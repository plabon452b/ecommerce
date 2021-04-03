import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Platform,
  FlatList,
  AsyncStorage,
} from "react-native";
//Redux
import { useSelector, useDispatch } from "react-redux";
import { fetchCart, fetchFavorite, fetchProducts } from "../../reducers";
//Colors
//Animation
import Animated from "react-native-reanimated";
//Components
import { Carousel, Header, CategorySection, FloatButton } from "./components";
import Categories from "./components/Categories";
import Skeleton from "../../components/Loaders/SkeletonLoading";
import Snackbar from "../../components/Notification/Snackbar";
//FloatButton
import { Portal, Provider } from "react-native-paper";
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
//height
const { height } = Dimensions.get("window");

export const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  //Header Animation
  let scrollY = new Animated.Value(0);
  const user = useSelector((state) => state.auth.user);
  const products = useSelector((state) => state.store.products);
  const isLoading = useSelector((state) => state.store.isLoading);
  const notification = useSelector((state) => state.auth.notification);
  const { categories } = Categories();
  //fetch Api
  useEffect(() => {
    const fetching = async () => {
      try {
        await dispatch(fetchProducts());
        await dispatch(fetchCart());
        await dispatch(fetchFavorite());
      } catch (err) {
        alert(err);
      }
    };
    fetching();
  }, []);

  return (
    <Provider>
      {isLoading ? (
        <Skeleton />
      ) : (
        <View style={styles.container}>
          <Header
            scrollPoint={scrollY}
            navigation={navigation}
            products={products}
          ></Header>
          <Portal>
            <FloatButton />
          </Portal>
          <AnimatedFlatList
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={() => (
              <View style={styles.banner}>
                <Carousel />
              </View>
            )}
            scrollEventThrottle={1}
            onScroll={Animated.event(
              [
                {
                  nativeEvent: { contentOffset: { y: scrollY } },
                },
              ],
              { useNativeDriver: true }
            )}
            data={categories}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <CategorySection
                name={item.name}
                id={item._id}
                data={products}
                navigation={navigation}
              />
            )}
          />
          {Object.keys(notification).length === 0 ? (
            <View />
          ) : (
            <Snackbar
              checkVisible={true}
              message={
                Object.keys(user).length === 0
                  ? notification
                  : notification + " " + user.name
              }
            />
          )}
        </View>
      )}
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  list: {
    width: "100%",
    marginTop: 50,
    paddingBottom: 20,
  },
});
