import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Field, reduxForm } from "redux-form";
import renderField from "./RenderField";
//Colors
import Colors from "../../../utils/Colors";
import CustomText from "../../../components/UI/CustomText";
//PropTypes check
import PropTypes from "prop-types";

//Validation
const validate = (values) => {
  const errors = {};
  if (!values.phone) {
    errors.phone = "Phone number cannot be left blank";
  } else if (values.phone.length !== 11) {
    errors.phone = "Phone number must be 11 characters";
  } else {
    errors.phone = "";
  }
  if (!values.address) {
    errors.address = "Address can not be vacant";
  } else if (values.address.length < 6) {
    errors.address = "Please enter a valid address";
  } else {
    errors.address = "";
  }

  return errors;
};

const User = ({ getReceiver, checkValidation }) => {
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("es");

  useEffect(() => {
    getReceiver(phone, address);
  }, [phone, address]);

  return (
    <View style={styles.container}>
      <CustomText style={styles.title}>Shipment Details</CustomText>
      <View style={styles.inputContainer}>
        <View style={styles.inputBox}>
          <Field
            name="phone"
            maxLength={11}
            label="phone"
            component={renderField}
            onChangeText={(value) => setPhone(value)}
            keyboardType="numeric"
            returnKeyType="done"
            checkValidation={checkValidation}
          />

          <Field
            name="address"
            maxLength={50}
            label="Address"
            component={renderField}
            onChangeText={(value) => setAddress(value)}
            keyboardType="default"
            checkValidation={checkValidation}
          />
        </View>
      </View>
    </View>
  );
};

User.propTypes = {
  getReceiver: PropTypes.func.isRequired,
  checkValidation: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {},
  title: {
    fontSize: 15,
    color: Colors.text,
    fontWeight: "500",
    marginVertical: 10,
    marginHorizontal: 10,
  },
  inputContainer: {
    backgroundColor: "#fff",
    paddingHorizontal: 10,
  },
});
export const UserForm = reduxForm({
  form: "user", // a unique identifier for this form
  validate, // <--- validation function given to redux-form
})(User);
