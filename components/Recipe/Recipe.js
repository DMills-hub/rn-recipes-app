import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import ENVS from "../../env";

const Recipe = (props) => {
  return (
    <TouchableOpacity
      onPress={props.onClick}
      activeOpacity={0.6}
      style={styles.recipeHolder}
    >
      <View style={styles.imageHolder}>
        <Image
          style={styles.image}
          source={{ uri: `${ENVS.url}/${props.image}` }}
        />
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
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1
  },
  imageHolder: {
    width: 60,
    height: 60,
    overflow: "hidden",
    borderRadius: 30,
    marginRight: 10,
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
    alignItems: 'flex-end',
  },
  timeContainerFlex: {
    flexDirection: 'row',
    marginVertical: 5
  }
});

export default Recipe;
