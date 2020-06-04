import React, { useLayoutEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  Alert,
  Button,
  Platform,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Card from "../../components/Card/Card";
import CustomHeaderButton from "../../components/CustomHeaderButton/CustomHeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";
import { updateFavourite } from "../../store/actions/recipe";

const ViewRecipe = ({ navigation, route }) => {
  const title = route.params.title;
  const image = route.params.image;
  const instructions = route.params.instructions;
  const ingredients = route.params.ingredients;
  const cookTime = route.params.cookTime;
  const prepTime = route.params.prepTime;
  const recipeId = route.params.recipeId;
  const isFav = useSelector((state) => state.recipes.isFavourite);
  const dispatch = useDispatch();

  const favouriteHandler = async () => {
    try {
      await dispatch(updateFavourite(!isFav, recipeId));
    } catch (err) {
      console.log(err);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            onPress={favouriteHandler}
            iconName={
              Platform.OS === "android"
                ? `md-heart${!isFav ? "-empty" : ""}`
                : `ios-heart${!isFav ? "-empty" : ""}`
            }
          />
        </HeaderButtons>
      ),
    });
  }, [navigation, isFav]);

  return (
    <View style={styles.screen}>
      <View style={styles.holder}>
        <Text style={styles.title}>{title}</Text>
        <Image
          source={{ uri: image }}
          style={{ width: 80, height: 80, borderRadius: 40 }}
        />
      </View>
      <Card style={{ ...styles.holder, alignItems: "flex-start" }}>
        <View>
          <Text>Ingredients</Text>
          <FlatList
            data={ingredients}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.contentsHolder}>
                <Text style={styles.holderText}>- {item.ingredient}</Text>
              </View>
            )}
          />
        </View>
        <View>
          <Text>Instructions</Text>
          <FlatList
            data={instructions}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.contentsHolder}>
                <Text style={styles.holderText}>- {item.instruction}</Text>
              </View>
            )}
          />
        </View>
      </Card>
      <View style={styles.timeContainer}>
        <Text>Cook Time - {cookTime}</Text>
        <Text>Prep Time - {prepTime}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
  },
  holder: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "80%",
    overflow: "hidden",
    marginTop: 10,
    padding: 10,
    maxHeight: "60%",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  contentsHolder: {
    alignItems: "center",
    marginTop: 10,
  },
  holderText: {
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    paddingHorizontal: 5,
    marginVertical: 20,
  },
});

export default ViewRecipe;
