import React, { useEffect, useState } from "react";
import { AsyncStorage, YellowBox } from "react-native";
import { useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { navigationRef } from "./RootNavigation";
import { DrawerNavigator, IntroStackScreen } from "./StoneNavigator";
import { useDispatch } from "react-redux";
import { Logout } from "../reducers";
//Modalize
import { Host } from "react-native-portalize";
//Deep Link
import { urlRedirect } from "../utils/Tools";
import * as Linking from "expo-linking";

YellowBox.ignoreWarnings(["Setting a timer"]);

export const AppNavigator = () => {
  const carts = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  useEffect(() => {
    // listen for new url events coming from Expo
    Linking.addEventListener(
      "url",
      (event) => {
        urlRedirect(event.url);
      },
      [urlRedirect]
    );
    Linking.getInitialURL().then(urlRedirect);
    Linking.removeEventListener(
      "url",
      (event) => {
        urlRedirect(event.url);
      },
      [urlRedirect]
    );
  }, [urlRedirect]);

  useEffect(() => {
    console.log(carts);

    const autoLogout = async () => {
      const getUser = await AsyncStorage.getItem("user");
      if (getUser) {
        const user = await JSON.parse(getUser);
        if (!user) {
          dispatch(Logout());
        }
      }
      return;
    };
    autoLogout();
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      <Host>
        <DrawerNavigator />
      </Host>
    </NavigationContainer>
  );
};
