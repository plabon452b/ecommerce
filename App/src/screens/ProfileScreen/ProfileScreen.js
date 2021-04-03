import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Dimensions, Alert } from "react-native";
//Redux
import { useDispatch, useSelector } from "react-redux";
//Action
import { EditButton, ProfileBody } from "./components";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
//Loader
import Loader from "../../components/Loaders/Loader";

const { width, height } = Dimensions.get("window");

export const ProfileScreen = (props) => {
  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.auth.isLoading);

  const dispatch = useDispatch();
  const unmounted = useRef(false);
  useEffect(() => {
    return () => {
      unmounted.current = true;
    };
  }, []);

  return (
    <ActionSheetProvider>
      <View style={styles.container}>
        <View style={styles.header}></View>
        {loading ? <Loader /> : <></>}
        <View style={styles.profileContainer}>
          <View style={styles.profileBox}>
            <ProfileBody user={user} loading={loading} />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <EditButton navigation={props.navigation} user={user} />
        </View>
      </View>
    </ActionSheetProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    width,
    flexDirection: "row",
    height: 0.1 * height,
    justifyContent: "center",
  },
  profileContainer: {
    width,
    justifyContent: "center",
    alignItems: "center",
  },
  profileBox: {
    borderRadius: 20,
    width,
    alignItems: "center",
  },
  buttonContainer: {
    padding: 20,
  },
});
