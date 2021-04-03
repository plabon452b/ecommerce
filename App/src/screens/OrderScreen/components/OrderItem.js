import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, FlatList } from "react-native";
//Colors
import Colors from "../../../utils/Colors";
//Item
import ItemList from "../../PreOrderScreen/components/PreOrderItem";
//Number format
import NumberFormat from "../../../components/UI/NumberFormat";
//Moment
import moment from "moment";
import "moment/min/locales";
//PropTypes check
import PropTypes from "prop-types";
import CustomText from "../../../components/UI/CustomText";

moment.locale("en");

export const OrderItem = ({ order }) => {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.summary}>
        <View style={styles.textContainer}>
          <CustomText style={styles.text}>Payment ID: </CustomText>
          <CustomText style={styles.detail}>{order.paymentID}</CustomText>
        </View>

        <View style={styles.textContainer}>
          <CustomText style={styles.text}>Order date: </CustomText>
          <CustomText style={styles.detail}>
            {moment(order.date).format("Do MMMM  YYYY, hh:mm a ")}
          </CustomText>
        </View>
        <View style={styles.detailButtom}>
          <TouchableOpacity onPress={() => setShowDetails((prev) => !prev)}>
            <CustomText style={{ fontSize: 15, color: "#fff" }}>
              {showDetails ? "Hide" : "Order details"}
            </CustomText>
          </TouchableOpacity>
        </View>
        {showDetails ? (
          <View>
            <View style={styles.textContainer}>
              <CustomText style={styles.text}>Recipient's name: </CustomText>
              <CustomText style={styles.detail}>{order.name}</CustomText>
            </View>

            <View style={styles.textContainer}>
              <CustomText style={styles.text}>Address: </CustomText>
              <CustomText style={styles.detail}>{order.address}</CustomText>
            </View>
            <View style={styles.textContainer}>
              <CustomText style={styles.text}>Email: </CustomText>
              <CustomText style={styles.detail}>{order.email}</CustomText>
            </View>

            <CustomText style={styles.lastText}>Products ordered:</CustomText>
            <FlatList
              data={order.cart}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => {
                return <ItemList item={item} />;
              }}
            />
            <View
              style={{
                ...styles.textContainer,
                marginTop: 10,
                justifyContent: "space-between",
              }}
            ></View>
          </View>
        ) : (
          <View />
        )}
      </View>
    </View>
  );
};

OrderItem.propTypes = {
  order: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.grey,
    backgroundColor: Colors.white,
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  detailButtom: {
    backgroundColor: Colors.lighter_green,
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 5,
    marginVertical: 15,
  },
  textContainer: {
    flexDirection: "row",
    marginVertical: 5,
  },
  detail: {
    color: Colors.lighter_green,
  },
  steps: {
    width: "100%",
    height: 100,
  },
  lastText: { marginTop: 3 },
});

export default OrderItem;
