import React, { useCallback, useLayoutEffect } from "react";
import { View, FlatList, Text, Animated, TouchableOpacity, Alert, AsyncStorage } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import {
  loading,
  getMyRecipes,
  deleteRecipe,
  clearImage,
  setError,
} from "../../store/actions/recipe";
import Recipe from "../../components/Recipe/Recipe";
import Spinner from "../../components/Spinner/Spinner";
import onClickRecipe from "../../helpers/onClickRecipe";
import Swipeable from "react-native-gesture-handler/Swipeable";
import CustomHeaderButton from "../../components/CustomHeaderButton/CustomHeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import onClearRecipeError from "../../helpers/onClearRecipeError";
import ENVS from '../../env';

const MyRecipes = ({ navigation }) => {
  const isLoading = useSelector((state) => state.recipes.loading);
  const myRecipes = useSelector((state) => state.recipes.myRecipes);
  const myError = useSelector((state) => state.recipes.error);
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.userId);
  const dispatch = useDispatch();

  const onAddRecipeHandler = () => {
    dispatch(clearImage());
    navigation.navigate("Add Recipe");
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            iconName={Platform.OS === "android" ? "md-add" : "ios-add"}
            onPress={() => onAddRecipeHandler()}
          />
        </HeaderButtons>
      ),
    });
  }, [navigation]);

  useFocusEffect(
    useCallback(() => {
      const getRecipes = async () => {
        dispatch(loading(true));
        try {
          await dispatch(getMyRecipes());
        } catch (err) {
          dispatch(setError("Sorry we couldn't get your recipes."))
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
      await onClickRecipe(
        navigation,
        dispatch,
        recipeId,
        userId,
        token,
        title,
        image,
        cookTime,
        prepTime,
        serving,
        true
      );
    } catch (err) {
      dispatch(setError("Sorry we couldn't load that recipe."))
    }
  };

  const onDeleteRecipeHandler = async (id) => {
    try {
      await dispatch(deleteRecipe(id));
    } catch (err) {
      dispatch(setError("Sorry we coudln't delete that recipe."))
    }
  };

  const onEditRecipeHandler = async (recipeId, title, image, cooktime, preptime, serving) => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      const token = await AsyncStorage.getItem('token');
      const getRecipe = await fetch(`${ENVS.url}/recipes/singleRecipe/${recipeId}/${userId}`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": token,
        },
      })
      const getRecipeResult = await getRecipe.json();
      navigation.navigate("Edit Recipe", {
        recipeId: recipeId,
        title: title,
        image: `${ENVS.imagesUrl}/${image}`,
        cooktime: cooktime,
        preptime: preptime,
        serving: serving,
        instructions: getRecipeResult.instructions,
        ingredients: getRecipeResult.ingredients,
        category: getRecipeResult.category
      })
    } catch (err) {
      return
    }
  }

  const RightActions = (id, title, image, cooktime, preptime, serving, progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [0.7, 0],
      extrapolate: "clamp",
    });
    return (
      <>
        <TouchableOpacity onPress={onDeleteRecipeHandler.bind(this, id)}>
        <View
          style={{
            width: 100,
            backgroundColor: "red",
            justifyContent: "center",
            marginBottom: 10,
            height: '90%',
            alignItems: 'center'
          }}
        >
          <Animated.Text
            style={{
              color: "white",
              paddingHorizontal: 10,
              fontWeight: "600",
              transform: [{ scale }],
              fontSize: 24,
            }}
          >
            Delete
          </Animated.Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={onEditRecipeHandler.bind(this, id, title, image, cooktime, preptime, serving)}>
        <View
          style={{
            backgroundColor: "blue",
            justifyContent: "center",
            alignItems: 'center',
            marginBottom: 10,
            width: 100,
            height: '90%'
          }}
        >
          <Animated.Text
            style={{
              color: "white",
              paddingHorizontal: 10,
              fontWeight: "600",
              transform: [{ scale }],
              fontSize: 24,
            }}
          >
            Edit
          </Animated.Text>
        </View>
      </TouchableOpacity>
      </>
      
    );
  };

  if (myError) {
    Alert.alert("Error", myError, [{text: 'Okay', onPress: () => onClearRecipeError(dispatch)}])
  }

  return (
    <View>
      {!isLoading && myRecipes.length === 0 ? (
        <Text
          style={{
            textAlign: "center",
            padding: 10,
            fontWeight: "bold",
            color: "grey",
          }}
        >
          Sorry no recipes found... add one with the + button.
        </Text>
      ) : null}
      {!isLoading ? (
        <FlatList
          keyExtractor={(item) => item.id.toString()}
          data={myRecipes}
          renderItem={({ item }) => (
            <Swipeable
              friction={1}
              renderRightActions={RightActions.bind(this, item.id.toString(), item.title, item.image, item.cooktime, item.preptime, item.serving)}
            >
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
            </Swipeable>
          )}
        />
      ) : (
        <Spinner />
      )}
    </View>
  );
};

export default MyRecipes;
