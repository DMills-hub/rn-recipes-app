import React, { useState, useEffect, useRef } from "react";
import { View, Text, Image, StyleSheet, Animated } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import ENVS from "../../env";
import Colors from "../../constants/Colors";
import Spinner from "../Spinner/Spinner";
import { scale } from "react-native-size-matters";

const Recipe = (props) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const recipeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(recipeAnim, {
      toValue: 1,
      duration: 600,
    }).start();
  }, []);

  return (
    <Animated.View
      style={{
        opacity: recipeAnim,
        transform: [
          { scale: recipeAnim },
          {
            rotate: recipeAnim.interpolate({
              inputRange: [0, 1],
              outputRange: ["30deg", "0deg"],
              extrapolate: "clamp",
            }),
          },
        ],
      }}
    >
      <TouchableOpacity
        onPress={props.onClick}
        activeOpacity={0.6}
        style={styles.recipeHolder}
      >
        {!imageLoaded && props.image !== "" ? <Spinner /> : null}
        <View
          style={props.image !== "" ? styles.imageHolder : styles.letterHolder}
        >
          {props.image !== "" ? (
            <Image
              style={styles.image}
              source={{ uri: `${ENVS.imagesUrl}/${props.image}` }}
              onLoad={() => setImageLoaded(true)}
            />
          ) : (
            <Text style={styles.letterText}>{props.title.charAt(0)}</Text>
          )}
        </View>
        <View style={styles.titleHolder}>
          <Text style={styles.title}>{props.title}</Text>
        </View>
        <View style={styles.timeContainer}>
          <View style={styles.timeContainerFlex}>
            <Text style={styles.bold}>Cook Time </Text>
            <Text>{props.cookTime}</Text>
          </View>
          <View style={styles.timeContainerFlex}>
            <Text style={styles.bold}>Prep Time </Text>
            <Text>{props.prepTime}</Text>
          </View>
          <View style={styles.timeContainerFlex}>
            <Text style={styles.bold}>Serves </Text>
            <Text>{props.serves}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  recipeHolder: {
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
    paddingBottom: 5,
    borderBottomColor: "lightgrey",
    borderBottomWidth: 1,
  },
  imageHolder: {
    width: 60,
    height: 60,
    overflow: "hidden",
    borderRadius: 30,
    marginRight: 10,
    justifyContent: "center",
  },
  titleHolder: {
    width: "40%",
    marginRight: 20,
  },
  letterHolder: {
    width: 60,
    height: 60,
    overflow: "hidden",
    borderRadius: 30,
    marginRight: 10,
    justifyContent: "center",
    backgroundColor: Colors.primary,
  },
  letterText: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: scale(30),
    color: "white",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  title: {
    fontWeight: "bold",
    fontSize: scale(16),
  },
  timeContainer: {
    marginHorizontal: 10,
    width: "30%",
    alignItems: "center",
    paddingRight: 30,
  },
  timeContainerFlex: {
    flexDirection: "row",
    marginVertical: 5,
  },
  bold: {
    fontWeight: "bold",
    fontSize: scale(12),
  },
});

export default Recipe;
