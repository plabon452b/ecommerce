import React from "react";
import {
  View,
  StyleSheet,
  Image,
  StatusBar,
  Alert,
  Text,
  Platform,
} from "react-native";
//Drawer
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useDispatch, useSelector } from "react-redux";
import { Drawer } from "react-native-paper";
//Color
import Colors from "../utils/Colors";
import CustomText from "../components/UI/CustomText";
//Icon
import { MaterialCommunityIcons } from "@expo/vector-icons";
// Action
import { Logout as LogoutAction } from "../reducers";
//Link
import { TouchableOpacity } from "react-native-gesture-handler";

//custom drawer content
export default (props) => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const Logout = () => {
    Alert.alert("Log Out", "are you sure?", [
      {
        text: "cancel",
        style: "cancel",
      },
      {
        text: "yes",
        onPress: () => {
          dispatch(LogoutAction());
          props.navigation.navigate("Home");
        },
      },
    ]);
  };
  const { state, ...rest } = props;
  const newState = { ...state };

  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props}>
        {!user._id ? (
          <View style={{ alignItems: "center", marginVertical: 20 }}></View>
        ) : (
          <>
            <View style={styles.profileContainer}>
              <TouchableOpacity
                onPress={() => props.navigation.navigate("Profile")}
              >
                <Image
                  style={styles.profilePic}
                  source={require("../assets/Images/profilee.png")}
                />
              </TouchableOpacity>
              <View style={{ justifyContent: "center" }}>
                <Text
                  style={{
                    fontSize: 18,
                    paddingHorizontal: 10,
                    paddingVertical: 0,
                  }}
                >
                  {user && user.name}
                </Text>
              </View>
            </View>
          </>
        )}
        <View>
          <DrawerItemList state={newState} {...rest} />
          <Drawer.Section style={styles.drawerSection}></Drawer.Section>
        </View>
      </DrawerContentScrollView>
      {user._id && (
        <DrawerItem
          onPress={Logout}
          label={() => (
            <View style={styles.logout}>
              <MaterialCommunityIcons
                name="logout"
                size={25}
                style={{ marginRight: 30 }}
                color={Colors.dark}
              />
              <CustomText
                style={{
                  fontSize: 14,
                  color: Colors.dark,
                  fontWeight: "500",
                  fontFamily: "Roboto-Medium",
                }}
              >
                Log Out
              </CustomText>
            </View>
          )}
        />
      )}

      <View style={styles.version}>
        <DrawerItem
          label={() => (
            <CustomText
              style={{ color: Colors.grey, fontFamily: "Roboto-LightItalic" }}
            >
              Ecommerce App Version 1.0
            </CustomText>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical: 20,
  },
  profilePic: {
    resizeMode: Platform.OS === "android" ? "cover" : "contain",
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  logo: {
    resizeMode: "contain",
    width: "80%",
    height: 100,
  },
  logoutSection: {
    backgroundColor: Colors.lighter_green,
    borderRadius: 5,
    marginHorizontal: 10,
    height: 50,
    marginVertical: 20,
  },
  actionButton: {
    flexDirection: "row",
    marginHorizontal: 10,
    height: 40,
    marginBottom: 10,
  },
  drawerSection: {
    marginTop: 10,
  },

  logout: {
    flexDirection: "row",
    alignItems: "center",
  },
  version: {
    height: 60,
    borderTopWidth: 1,
    borderTopColor: Colors.light_grey,
  },
});
