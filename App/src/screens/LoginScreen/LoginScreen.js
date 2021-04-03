import React from "react";
import { View, StyleSheet, ImageBackground, Dimensions } from "react-native";
import Colors from "../../utils/Colors";
//Components
import { LoginForm } from "./components";

const { height, width } = Dimensions.get("window");

export const LoginScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <LoginForm navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
