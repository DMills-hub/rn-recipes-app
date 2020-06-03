import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Card from "../../components/Card/Card";

const ViewRecipe = (props) => {
  const title = props.route.params.title;
  const image = props.route.params.image;
  const instructions = props.route.params.instructions;
  const ingredients = props.route.params.ingredients;
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
        <FlatList
          data={ingredients}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.contentsHolder}>
              <Text style={styles.holderText}>- {item.ingredient}</Text>
            </View>
          )}
        />
        <FlatList
          data={instructions}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.contentsHolder}>
              <Text style={styles.holderText}>- {item.instruction}</Text>
            </View>
          )}
        />
      </Card>
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
});

export default ViewRecipe;
