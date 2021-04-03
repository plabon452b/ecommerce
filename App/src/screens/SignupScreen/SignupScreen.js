import React from "react";
import { View, StyleSheet, Dimensions, ImageBackground } from "react-native";
//Components
import { SignupForm } from "./components";

const { height, width } = Dimensions.get("window");

export const SignupScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <SignupForm navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
