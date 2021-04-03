import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Colors from "../../../utils/Colors";
//Icon

//PropTypes check
import PropTypes from "prop-types";

const { height, width } = Dimensions.get("window");

export const AuthBody = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
        <View style={styles.signinContainer}>
          <Text style={styles.text}>LOGIN</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("SignupScreen")}>
        <View
          style={[
            styles.signinContainer,
            {
              backgroundColor: Colors.leave_green,
              marginTop: 15,
              borderWidth: 0,
            },
          ]}
        >
          <Text style={[styles.text, { color: "#ffffff" }]}>SIGNUP</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

AuthBody.propTypes = {
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    width: width,
    justifyContent: "center",
    alignItems: "center",
  },
  signinContainer: {
    height: 50,
    width: width - 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  text: {
    fontSize: 20,
    fontWeight: "600",
  },
});
