import React, { useCallback, useEffect } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getAllRecipes, loading } from "../../store/actions/recipe";
import Recipe from "../../components/Recipe/Recipe";
import { useFocusEffect } from "@react-navigation/native";
import Spinner from "../../components/Spinner/Spinner";

const AllRecipes = (props) => {
  const recipes = useSelector((state) => state.recipes.recipes);
  const isLoading = useSelector((state) => state.recipes.loading);
  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      const getRecipes = async () => {
        dispatch(loading(true));
        try {
          await dispatch(getAllRecipes());
        } catch (err) {
          dispatch(loading(false));
        }
        dispatch(loading(false));
      };
      getRecipes();
    }, [dispatch])
  );

  return (
    <View style={styles.screen}>
      {isLoading ? (
        <Spinner />
      ) : (
        <FlatList
          keyExtractor={(item) => item.id.toString()}
          data={recipes}
          renderItem={({ item }) => (
            <Recipe title={item.title} image={item.image} />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

export default AllRecipes;
