import React, { useCallback } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import Spinner from "../../components/Spinner/Spinner";
import { useSelector, useDispatch } from "react-redux";
import Recipe from "../../components/Recipe/Recipe";
import { useFocusEffect } from '@react-navigation/native'
import { loading, getAllRecipes } from '../../store/actions/recipe';
import ENVS from '../../env';

const LoadCategory = (props) => {
  const token = useSelector((state) => state.auth.token);
  const recipes = useSelector((state) => state.recipes.recipes);
  const isLoading = useSelector((state) => state.recipes.isLoading);
  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      const getRecipes = async () => {
        dispatch(loading(true));
        try {
          await dispatch(getAllRecipes(props.route.params.category));
        } catch (err) {
          dispatch(loading(false));
        }
        dispatch(loading(false));
      };
      getRecipes();
    }, [dispatch])
  );

  const onClickRecipeHandler = async (
    recipeId,
    title,
    image,
    cookTime,
    prepTime
  ) => {
    try {
      const result = await fetch(
        `${ENVS.url}/recipes/singleRecipe/${recipeId}`,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": token,
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
        prepTime: prepTime,
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

const styles = StyleSheet.create({});

export default LoadCategory;
