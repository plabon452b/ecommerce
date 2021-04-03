import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Platform,
} from "react-native";
// import SearchInput from "./SearchInput";
import Animated from "react-native-reanimated";
import ShareItem from "../../../components/UI/ShareItem";
//Color
import Colors from "../../../utils/Colors";
import CustomText from "../../../components/UI/CustomText";
//icon
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
//PropTypes check
import PropTypes from "prop-types";
const { width } = Dimensions.get("window");
const HEADER_HEIGHT = 160;

export const Header = ({ navigation, searchFilterFunction }) => {
  return (
    <>
      <View style={styles.topBar}>
        <View style={{ position: "absolute", left: 0, top: 40 }}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={styles.icon}
          >
            <Ionicons name="ios-arrow-back" size={25} color={Colors.white} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            position: "absolute",
            width: "100%",
            height: 40,
            bottom: HEADER_HEIGHT / 2 - 60,
          }}
        >
          <BlurView
            tint="dark"
            intensity={60}
            style={[{ width: "100%", borderRadius: 5 }]}
          >
            <TextInput
              placeholder="Search here..."
              placeholderTextColor={Colors.white}
              clearButtonMode="always"
              onChangeText={(text) => searchFilterFunction(text)}
              style={{
                height: 40,
                marginHorizontal: 20,
                color: Colors.white,
              }}
            />
          </BlurView>
        </View>
      </View>
      <View style={styles.header}>
        <View
          style={{
            height: 50,
          }}
        >
          <CustomText style={styles.title}>All products</CustomText>
        </View>
      </View>
    </>
  );
};

Header.propTypes = {
  navigation: PropTypes.object.isRequired,
  searchFilterFunction: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  topBar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 20,
    alignItems: "center",
    height: HEADER_HEIGHT,
    zIndex: 100,
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    position: "absolute",
    height: HEADER_HEIGHT,
    backgroundColor: "grey",
  },
  title: {
    marginTop: Platform.OS === "android" ? 0 : 5,
    fontSize: 30,
    color: Colors.white,
  },
  icon: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
});
