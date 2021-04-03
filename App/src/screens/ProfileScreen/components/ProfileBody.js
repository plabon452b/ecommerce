import React from "react";
import { View, StyleSheet } from "react-native";
import CustomText from "../../../components/UI/CustomText";
import Detail from "./Detail";
//PropTypes check
import PropTypes from "prop-types";

export const ProfileBody = ({ user }) => {
  return (
    <View style={styles.footer}>
      <View style={styles.titleContainer}>
        <CustomText style={styles.title}>Personal information</CustomText>
      </View>
      <Detail icon="person" content={user.name} />
      <Detail icon="email-outline" content={user.email} />
      <Detail
        icon="location-on"
        content={user.address ? user.address : "Not added yet"}
      />
    </View>
  );
};

ProfileBody.propTypes = {
  user: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  footer: {
    width: "100%",
    marginTop: 20,
    paddingHorizontal: 20,
  },
  titleContainer: {
    height: 30,
  },

  title: {
    fontWeight: "600",
    textTransform: "uppercase",
  },
});
