import React from 'react';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';

const MyRecipes = props => {
  const myRecipes = useSelector(state => state.recipes.myRecipes);
  return (
    <View>
      <Text>My Recipes Screen</Text>
    </View>
  )
}

export default MyRecipes;