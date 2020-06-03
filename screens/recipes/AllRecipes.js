import React from "react";
import {
  ScrollView,
  StyleSheet,
} from "react-native";
import Category from "../../components/Category/Category";

const AllRecipes = (props) => {
  const onLoadCategoryHandler = async (category) => {
    props.navigation.navigate("Category", {
      category: category,
    });
  };

  return (
    <ScrollView style={styles.screen}>
      <Category
        onPress={onLoadCategoryHandler.bind(this, "starter")}
        text="Starters"
        source={require("../../assets/starter.jpg")}
      />
      <Category
        onPress={onLoadCategoryHandler.bind(this, "main")}
        text="Mains"
        source={require("../../assets/main.jpg")}
      />
      <Category
        onPress={onLoadCategoryHandler.bind(this, "desert")}
        text="Deserts"
        source={require("../../assets/desert.jpg")}
      />
      <Category
        onPress={onLoadCategoryHandler.bind(this, "baking")}
        text="Baking"
        source={require("../../assets/baking.jpg")}
      />
      <Category
        onPress={onLoadCategoryHandler.bind(this, "other")}
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
