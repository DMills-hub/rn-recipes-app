import React, { useCallback } from "react";
import { View, FlatList, Text } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { loading, getMyRecipes } from "../../store/actions/recipe";
import Recipe from "../../components/Recipe/Recipe";
import Spinner from "../../components/Spinner/Spinner";

const MyRecipes = (props) => {
  const isLoading = useSelector((state) => state.recipes.loading);
  const myRecipes = useSelector((state) => state.recipes.myRecipes);
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
            <Recipe image={item.image} title={item.title} />
          )}
        />
      ) : (
        <Spinner />
      )}
    </View>
  );
};

export default MyRecipes;
