import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { AirbnbRating } from "react-native-ratings";

interface ReviewProps {
  username: string,
  title: string,
  review: string,
  rating: number
}

const Review: React.FC<ReviewProps> = (props): JSX.Element => {
  return (
    <View style={styles.review}>
      <Text>By - {props.username}</Text>
      <Text style={styles.title}>{props.title}</Text>
      <Text>{props.review}</Text>
      <AirbnbRating size={20} isDisabled defaultRating={props.rating} />
    </View>
  );
};

const styles = StyleSheet.create({
  review: {
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    marginBottom: 3,
    paddingBottom: 3,
  },
  title: { fontSize: 20, fontWeight: "bold" },
});

export default Review;
