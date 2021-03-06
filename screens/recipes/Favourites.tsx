import React, { useCallback } from "react";
import { View, FlatList, Text, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { loading, getFavouriteRecipes, setError } from "../../store/actions/recipe";
import Recipe from "../../components/Recipe/Recipe";
import Spinner from "../../components/Spinner/Spinner";
import onClickRecipe from '../../helpers/onClickRecipe';
import onClearRecipeError from '../../helpers/onClearRecipeError';
import { RootState } from '../../App';
import { FavouriteRecipesRouteParamList } from '../../navigation/FavouriteRecipesStackNavigator';
import { StackNavigationProp } from "@react-navigation/stack";

type FavouriteRecipeScreenNavigationProp = StackNavigationProp<FavouriteRecipesRouteParamList, 'Favourites'>;

type FavouriteRecipeProps = {
  navigation: FavouriteRecipeScreenNavigationProp
}

const Favourites: React.FC<FavouriteRecipeProps> = (props): JSX.Element => {
  const isLoading = useSelector((state: RootState) => state.recipes.loading);
  const favouriteRecipes = useSelector((state: RootState) => state.recipes.favouriteRecipes);
  const myError = useSelector((state: RootState) => state.recipes.error);
  const userId = useSelector((state: RootState) => state.auth.userId);
  const token = useSelector((state: RootState) => state.auth.token);
  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      const getRecipes = async () => {
        dispatch(loading(true));
        try {
          await dispatch(getFavouriteRecipes());
        } catch (err) {
          dispatch(setError("Sorry we couldn't get your favourite recipes."))
          dispatch(loading(false));
        }
        dispatch(loading(false));
      };
      getRecipes();
    }, [dispatch])
  );

  const onClickRecipeHandler = async (
    recipeId: string | number,
    title: string,
    image: string,
    cookTime: string,
    prepTime: string,
    serving: string
  ) => {
    try {
      await onClickRecipe(props.navigation, dispatch, recipeId, userId, token, title, image, cookTime, prepTime, serving, false);
    } catch (err) {
      dispatch(setError("Sorry we couldn't get that recipe."))
    }
  };

  if (myError) {
    Alert.alert("Error", myError, [{text: 'Okay', onPress: () => onClearRecipeError(dispatch)}])
  }

  return (
    <View>
      {!isLoading && favouriteRecipes.length === 0 ? (
        <Text
          style={{
            textAlign: "center",
            padding: 10,
            fontWeight: "bold",
            color: "grey",
          }}
        >
          Sorry no favourites found. To add one click on the Heart in the top right hand corner of one of the Recipes.
        </Text>
      ) : null}
      {!isLoading ? (
        <FlatList
          keyExtractor={(item) => item.id.toString()}
          data={favouriteRecipes}
          renderItem={({ item }) => (
            <Recipe
              onClick={() => onClickRecipeHandler(
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
      ) : (
        <Spinner />
      )}
    </View>
  );
};

export default Favourites;