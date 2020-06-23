import React, { useCallback, useLayoutEffect } from "react";
import { View, Text, StyleSheet, FlatList, Alert } from "react-native";
import Spinner from "../../components/Spinner/Spinner";
import { useSelector, useDispatch } from "react-redux";
import Recipe from "../../components/Recipe/Recipe";
import { useFocusEffect } from '@react-navigation/native'
import { loading, getAllRecipes, setError } from '../../store/actions/recipe';
import onClickRecipe from '../../helpers/onClickRecipe';
import onClearRecipeError from "../../helpers/onClearRecipeError";
import Search from '../../components/SearchCategory/SearchCategory';

const LoadCategory = ({navigation, route}) => {
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.userId);
  const recipes = useSelector((state) => state.recipes.recipes);
  const isLoading = useSelector((state) => state.recipes.isLoading);
  const myError = useSelector((state) => state.recipes.error);
  const category = route.params.category;
  const dispatch = useDispatch();
  
 useLayoutEffect(() => {
   navigation.setOptions({
     headerTitle: route.params.name
   })
 }, [route.params.name])

  useFocusEffect(
    useCallback(() => {
      const getRecipes = async () => {
        dispatch(loading(true));
        try {
          await dispatch(getAllRecipes(category));
        } catch (err) {
          dispatch(setError("Sorry we couldn't get the reviews for this recipe."))
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
    prepTime,
    serving
  ) => {
    try {
      await onClickRecipe(navigation, dispatch, recipeId, userId, token, title, image, cookTime, prepTime, serving, false);
    } catch (err) {
      dispatch(setError("Sorry we couldn't load that recipe."))
    }
  };

  if (myError) {
    Alert.alert("Error", myError, [{text: 'Okay', onPress: () => onClearRecipeError(dispatch)}])
  }

  



  return (
    <View style={styles.screen}>
      <Search category={category} />
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
                item.preptime,
                item.serving
              )}
              title={item.title}
              image={item.image}
              cookTime={item.cooktime}
              prepTime={item.preptime}
              serves={item.serving}
            />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({});

export default LoadCategory;
