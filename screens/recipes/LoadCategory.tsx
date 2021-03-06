import React, { useCallback, useLayoutEffect, useState, useEffect } from "react";
import { View, Text, FlatList, Alert, RefreshControl } from "react-native";
import Spinner from "../../components/Spinner/Spinner";
import { useSelector, useDispatch } from "react-redux";
import Recipe from "../../components/Recipe/Recipe";
import { loading, getAllRecipes, setError } from '../../store/actions/recipe';
import onClickRecipe from '../../helpers/onClickRecipe';
import onClearRecipeError from "../../helpers/onClearRecipeError";
import Search from '../../components/SearchCategory/SearchCategory';
import { RootState } from '../../App';
import { StackNavigationProp } from "@react-navigation/stack";
import { AllRecipesStackParamList } from '../../navigation/AllRecipesStackNavigator';
import { RouteProp } from "@react-navigation/native";

type LoadCategoryScreenNavigationProps = StackNavigationProp<AllRecipesStackParamList, 'Category'>;

type LoadCategoryScreenRouteProps = RouteProp<AllRecipesStackParamList, 'Category'>;

type LoadCategoryProps = {
  navigation: LoadCategoryScreenNavigationProps,
  route: LoadCategoryScreenRouteProps
}

const LoadCategory: React.FC<LoadCategoryProps> = ({navigation, route}): JSX.Element => {
  const token = useSelector((state: RootState) => state.auth.token);
  const userId = useSelector((state: RootState) => state.auth.userId);
  const recipes = useSelector((state: RootState) => state.recipes.recipes);
  const isLoading = useSelector((state: RootState) => state.recipes.loading);
  const myError = useSelector((state: RootState) => state.recipes.error);
  const [initialLoad, setInitialLoad] = useState(true);
  const [ refreshing, setRefreshing ] = useState(false);
  const category = route.params.category;
  const dispatch = useDispatch();
  
 useLayoutEffect(() => {
   navigation.setOptions({
     headerTitle: route.params.name
   })
 }, [route.params.name])

  useEffect(() => {
    const getRecipes = async () => {
      dispatch(loading(true));
      try {
        await dispatch(getAllRecipes(category));
        setInitialLoad(false);
      } catch (err) {
        dispatch(setError("Sorry we couldn't get the recipes."))
        dispatch(loading(false));
      }
      dispatch(loading(false));
    };
    getRecipes();
  }, [dispatch])

  const onClickRecipeHandler = async (
    recipeId: string | number,
    title: string,
    image: string,
    cookTime: string,
    prepTime: string,
    serving: string
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

  const onRefreshHandler = async () => {
    setRefreshing(true);
    try {
      await dispatch(getAllRecipes(category));
    } catch (err) {
      dispatch(setError("Sorry we couldn't get the recipes."))
    }
    setRefreshing(false);
  }

  return (
    <View>
      <Search category={category} />
      {!isLoading && recipes.length === 0 && !initialLoad ? (
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
          refreshing={refreshing}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={async () => await onRefreshHandler()} />}
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
      )}
    </View>
  );
};


export default LoadCategory;
