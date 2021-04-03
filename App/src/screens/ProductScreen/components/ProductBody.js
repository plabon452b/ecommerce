import React, { useRef } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  SectionList,
} from "react-native";
import Categories from "../../HomeScreen/components/Categories";
import Animated, { Value } from "react-native-reanimated";
//Color
import Colors from "../../../utils/Colors";
import HorizontalItem from "./HorizontalItem";
import CustomText from "../../../components/UI/CustomText";
import { Header } from "./Header";
//PropTypes check
import PropTypes from "prop-types";

ITEM_HEIGHT = 100;

const AnimatedSectionList = Animated.createAnimatedComponent(SectionList);

export const ProductBody = ({
  navigation,
  productsFilter,
  searchFilterFunction,
}) => {
  const { categories } = Categories();
  const DATA = [];
  categories.map((category) => {
    DATA.push({
      title: category.name,
      data: productsFilter.filter((item) => item.category === category._id),
    });
  });
  const scrollY = new Value(0);
  const sectionListRef = useRef(null);
  const scrollToSection = (index) => {
    sectionListRef.current.scrollToLocation({
      animated: true,
      sectionIndex: index,
      itemIndex: 0,
      viewPosition: 0,
    });
  };
  // const [sectionIndex, setIndex] = useState(0);
  // const HandleScrollY = (event) => {
  //   const y = event.nativeEvent.contentOffset.y;
  //   const sectionIndex =
  //     y > bracelets.length * ITEM_HEIGHT &&
  //     y < (bracelets.length + rings.length) * ITEM_HEIGHT
  //       ? 1
  //       : y > (bracelets.length + rings.length) * ITEM_HEIGHT
  //       ? 2
  //       : 0;
  //   setIndex(sectionIndex);
  // };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Header
          navigation={navigation}
          searchFilterFunction={searchFilterFunction}
          scrollY={scrollY}
        />
      </TouchableWithoutFeedback>
      {productsFilter.length === 0 ? (
        <CustomText style={{ textAlign: "center", marginTop: 110 }}>
          Product not found
        </CustomText>
      ) : (
        <AnimatedSectionList
          sections={DATA} // REQUIRED: SECTIONLIST DATA
          keyExtractor={(item) => item._id}
          ref={sectionListRef}
          renderSectionHeader={({ section: { title, data } }) => (
            <View style={styles.header}>
              <CustomText style={styles.title}>
                {data.length > 0 && title}
              </CustomText>
            </View>
          )}
          renderItem={({ item }) => (
            <HorizontalItem item={item} navigation={navigation} />
          )}
          stickySectionHeadersEnabled={false}
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
            // { listener: HandleScrollY, useNativeDriver: false }
          )}
          contentContainerStyle={{ marginTop: 90, paddingBottom: 100 }}
        />
      )}
    </View>
  );
};

ProductBody.propTypes = {
  navigation: PropTypes.object.isRequired,
  productsFilter: PropTypes.array.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    height: 40,
    paddingHorizontal: 20,
    justifyContent: "center",
    backgroundColor: Colors.white,
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.lighter_green,
  },
});
