import React, { useEffect } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getAllRecipes } from "../../store/actions/recipe";
import Recipe from "../../components/Recipe/Recipe";

const AllRecipes = (props) => {
  const recipes = useSelector((state) => state.recipes.recipes);
  const dispatch = useDispatch();

  useEffect(() => {
    const getRecipes = async () => {
      try {
        await dispatch(getAllRecipes());
      } catch (err) {
        console.log(err);
      }
    };
    getRecipes();
  }, [dispatch]);

  return (
    <View style={styles.screen}>
      <FlatList
        keyExtractor={(item) => item.id.toString()}
        data={recipes}
        renderItem={({ item }) => (
          <Recipe title={item.title} imageUri={item.image} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

export default AllRecipes;
