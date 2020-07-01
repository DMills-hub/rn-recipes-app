import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { scale } from "react-native-size-matters";

const Faq: React.FC = (): JSX.Element => {
  return (
    <ScrollView contentContainerStyle={{ flex: 1 }}>
      <View style={styles.questionContainer}>
        <Text style={styles.title}>How do I edit or Delete?</Text>
        <Text style={styles.generalText}>
          To edit or delete a recipe you must visit the My Recipe tab. You then
          can swipe left on any recipe and you will get 2 options to either edit
          or delete the Recipe.
        </Text>
      </View>
      <View style={styles.questionContainer}>
        <Text style={styles.title}>Can I enlarge the image for a recipe?</Text>
        <Text style={styles.generalText}>
          Yes you can. Simply go into the Detailed page of the Recipe and click
          on the Image itself and you will get an enlarged image pop-up on your
          screen.
        </Text>
      </View>
      <View style={styles.questionContainer}>
        <Text style={styles.title}>How to Favourite a Recipe?</Text>
        <Text style={styles.generalText}>
          To favourite a recipe, simply go on to the Detailed page of any Recipe
          and click on the Heart in the top-right hand corner. This will then
          add the Recipe to your Favourites screen.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  questionContainer: {
    width: "100%",
    height: scale(100),
    marginVertical: 10,
    marginLeft: 3
  },
  title: {
    fontSize: scale(16),
    fontWeight: "bold",
    marginRight: 5,
    marginBottom: 10,
  },
  generalText: {
    fontSize: scale(14),
    marginRight: 10,
  },
});

export default Faq;
