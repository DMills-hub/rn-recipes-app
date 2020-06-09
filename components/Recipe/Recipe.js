import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import ENVS from "../../env";
import Colors from "../../constants/Colors";

const Recipe = (props) => {
  return (
    <TouchableOpacity
      onPress={props.onClick}
      activeOpacity={0.6}
      style={styles.recipeHolder}
    >
      <View
        style={props.image !== "" ? styles.imageHolder : styles.letterHolder}
      >
        {props.image !== "" ? (
          <Image
            style={styles.image}
            source={{ uri: `${ENVS.imagesUrl}/${props.image}` }}
          />
        ) : (
          <Text style={styles.letterText}>{props.title.charAt(0)}</Text>
        )}
      </View>
      <Text style={styles.title}>{props.title}</Text>
      <View style={styles.timeContainer}>
        <View style={styles.timeContainerFlex}>
          <Text>Cook Time - </Text>
          <Text>{props.cookTime}</Text>
        </View>
        <View style={styles.timeContainerFlex}>
          <Text>Prep Time - </Text>
          <Text>{props.prepTime}</Text>
        </View>
      </View>
    </TouchableOpacity>
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
    fontSize: 30,
    color: "white",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
  },
  timeContainer: {
    marginHorizontal: 10,
    flex: 1,
    alignItems: "flex-end",
  },
  timeContainerFlex: {
    flexDirection: "row",
    marginVertical: 5,
  },
});

export default Recipe;
