import React from "react";
import {
  ScrollView,
  StyleSheet,
} from "react-native";
import Category from "../../components/Category/Category";

const AllRecipes = (props) => {
  const onLoadCategoryHandler = async (category, name) => {
    props.navigation.navigate("Category", {
      category: category,
      name: name
    });
  };

  return (
    <ScrollView style={styles.screen}>
      <Category
        onPress={onLoadCategoryHandler.bind(this, "starter", "Starters")}
        text="Starters"
        source={require("../../assets/starter.jpg")}
      />
      <Category
        onPress={onLoadCategoryHandler.bind(this, "main", "Mains")}
        text="Mains"
        source={require("../../assets/main.jpg")}
      />
      <Category
        onPress={onLoadCategoryHandler.bind(this, "dessert", "Desserts")}
        text="Deserts"
        source={require("../../assets/desert.jpg")}
      />
      <Category
        onPress={onLoadCategoryHandler.bind(this, "baking", "Baking")}
        text="Baking"
        source={require("../../assets/baking.jpg")}
      />
      <Category
        onPress={onLoadCategoryHandler.bind(this, "other", "Other")}
        text="Other"
        source={require("../../assets/other.jpg")}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

export default AllRecipes;
