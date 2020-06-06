import React, { useCallback } from "react";
import { View, FlatList, Text, Animated, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { loading, getMyRecipes, deleteRecipe } from "../../store/actions/recipe";
import Recipe from "../../components/Recipe/Recipe";
import Spinner from "../../components/Spinner/Spinner";
import onClickRecipe from "../../helpers/onClickRecipe";
import Swipeable from "react-native-gesture-handler/Swipeable";

const MyRecipes = (props) => {
  const isLoading = useSelector((state) => state.recipes.loading);
  const myRecipes = useSelector((state) => state.recipes.myRecipes);
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.userId);
  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      const getRecipes = async () => {
        dispatch(loading(true));
        try {
          await dispatch(getMyRecipes());
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
      await onClickRecipe(
        props.navigation,
        dispatch,
        recipeId,
        userId,
        token,
        title,
        image,
        cookTime,
        prepTime
      );
    } catch (err) {
      console.log(err);
    }
  };

  const onDeleteRecipeHandler = async (id) => {
    try {
      await dispatch(deleteRecipe(id));
    } catch (err) {
      console.log(err);
    }
  }

  const RightActions = (id, progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [0.7, 0],
      extrapolate: 'clamp'
    });
    return (
      <TouchableOpacity onPress={onDeleteRecipeHandler.bind(this, id)}>
       <View
         style={{ flex: 1, backgroundColor: 'red', justifyContent: 'center', marginBottom: 10 }}>
         <Animated.Text
           style={{
             color: 'white',
             paddingHorizontal: 10,
             fontWeight: '600',
             transform: [{ scale }],
             fontSize: 24
           }}>
           Delete
         </Animated.Text>
       </View>
     </TouchableOpacity>
    )
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
            <Swipeable friction={1} renderRightActions={RightActions.bind(this, item.id.toString())}>
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
