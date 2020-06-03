import React, { useCallback, useEffect } from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getAllRecipes, loading } from "../../store/actions/recipe";
import Recipe from "../../components/Recipe/Recipe";
import { useFocusEffect } from "@react-navigation/native";
import Spinner from "../../components/Spinner/Spinner";
import ENVS from "../../env";

const AllRecipes = (props) => {
  const recipes = useSelector((state) => state.recipes.recipes);
  const isLoading = useSelector((state) => state.recipes.loading);
  const token = useSelector((state) => state.auth.token);
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

  const onClickRecipeHandler = async (recipeId, title, image, cookTime, prepTime) => {
    try {
      const result = await fetch(
        `${ENVS.url}/recipes/singleRecipe/${recipeId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
      const contents = await result.json();
      props.navigation.navigate("View Recipe", {
        title: title,
        image: `${ENVS.url}/${image}`,
        ingredients: contents.ingredients,
        instructions: contents.instructions,
        cookTime: cookTime,
        prepTime: prepTime
      });
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <View style={styles.screen}>
      {!isLoading && recipes.length === 0 ? (
        <Text
          style={{
            textAlign: "center",
            padding: 10,
            fontWeight: "bold",
            color: "grey",
          }}
        >
          Sorry no recipes found...
        </Text>
      ) : null}
      {isLoading ? (
        <Spinner />
      ) : (
        <FlatList
          keyExtractor={(item) => item.id.toString()}
          data={recipes}
          renderItem={({ item }) => (
            <Recipe
              onClick={onClickRecipeHandler.bind(
                this,
                item.id.toString(),
                item.title,
                item.image,
                item.cooktime,
                item.preptime
              )}
              title={item.title}
              image={item.image}
              cookTime={item.cooktime}
              prepTime={item.preptime}
            />
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
