import React from "react";
import {
  ScrollView,
  StyleSheet,
} from "react-native";
import Category from "../../components/Category/Category";
import { AllRecipesStackParamList } from '../../navigation/AllRecipesStackNavigator';
import { StackNavigationProp } from "@react-navigation/stack";

type AllRecipesScreenNavigationProp = StackNavigationProp<AllRecipesStackParamList, 'AllRecipes'>;

type AllRecipesProps = {
  navigation: AllRecipesScreenNavigationProp
}

const AllRecipes: React.FC<AllRecipesProps> = ({navigation}): JSX.Element => {
  const onLoadCategoryHandler = async (category: string, name: string) => {
    navigation.navigate('Category', {
      category: category,
      name: name
    });
  };

  return (
    <ScrollView style={styles.screen}>
      <Category
        onPress={() => onLoadCategoryHandler("starter", "Starters")}
        text="Starters"
        source={require("../../assets/starter.jpg")}
      />
      <Category
        onPress={() => onLoadCategoryHandler("main", "Mains")}
        text="Mains"
        source={require("../../assets/main.jpg")}
      />
      <Category
        onPress={() => onLoadCategoryHandler("dessert", "Desserts")}
        text="Desserts"
        source={require("../../assets/desert.jpg")}
      />
      <Category
        onPress={() => onLoadCategoryHandler("baking", "Baking")}
        text="Baking"
        source={require("../../assets/baking.jpg")}
      />
      <Category
        onPress={() => onLoadCategoryHandler("other", "Other")}
        text="Other"
        source={require("../../assets/other.jpg")}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

export default AllRecipes;
