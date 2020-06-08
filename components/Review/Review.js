import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { AirbnbRating } from "react-native-ratings";

const Review = (props) => {
  return (
    <View>
      <Text style={{fontSize: 20, fontWeight: 'bold'}}>{props.title}</Text>
      <Text>{props.review}</Text>
      <AirbnbRating size={20} isDisabled defaultRating={props.rating} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default Review;
