import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import Colors from "../../../utils/Colors";
import { FontAwesome5 } from "@expo/vector-icons";
//PropTypes check
import PropTypes from "prop-types";

export const EditButton = ({ navigation, user }) => {
  return (
    <View style={styles.editButton}>
      <TouchableOpacity
        onPress={() => navigation.navigate("ProfileEdit", { user })}
      >
        <View style={{ flexDirection: "row" }}>
          <FontAwesome5 name="user-edit" size={20} color="black" />
          <Text style={{ marginLeft: 5 }}>edit profile</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

EditButton.propTypes = {
  user: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  editButton: {},
});
