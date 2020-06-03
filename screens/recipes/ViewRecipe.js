import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Card from "../../components/Card/Card";

const ViewRecipe = (props) => {
  const title = props.route.params.title;
  const image = props.route.params.image;
  const instructions = props.route.params.instructions;
  const ingredients = props.route.params.ingredients;
  const cookTime = props.route.params.cookTime;
  const prepTime = props.route.params.prepTime;
  return (
    <View style={styles.screen}>
      <View style={styles.holder}>
        <Text style={styles.title}>{title}</Text>
        <Image
          source={{ uri: image }}
          style={{ width: 80, height: 80, borderRadius: 40 }}
        />
      </View>
      <Card style={{ ...styles.holder, alignItems: "flex-start" }}>
        <View>
          <Text>Ingredients</Text>
          <FlatList
            data={ingredients}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.contentsHolder}>
                <Text style={styles.holderText}>- {item.ingredient}</Text>
              </View>
            )}
          />
        </View>
        <View>
          <Text>Instructions</Text>
          <FlatList
            data={instructions}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.contentsHolder}>
                <Text style={styles.holderText}>- {item.instruction}</Text>
              </View>
            )}
          />
        </View>
      </Card>
      <View style={styles.timeContainer}>
        <Text>Cook Time - {cookTime}</Text>
        <Text>Prep Time - {prepTime}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
  },
  holder: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "80%",
    overflow: "hidden",
    marginTop: 10,
    padding: 10,
    maxHeight: "60%",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  contentsHolder: {
    alignItems: "center",
    marginTop: 10,
  },
  holderText: {
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    paddingHorizontal: 5,
    marginVertical: 20,
  },
});

export default ViewRecipe;
