import React from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import Card from "../../components/Card/Card";
import Colors from "../../constants/Colors";

const ConversionChart = (props) => {
  return (
    <Card style={styles.screen}>
      <View style={styles.holder}>
        <View style={styles.titleHolder}>
          <Text style={styles.title}>
            Cup to Tablespoon to Teaspoon to Millilitres
          </Text>
        </View>
        <View style={styles.textHolder}>
          <Text style={styles.text}>1 cup - 16 tbsp - 48 tsp - 240ml</Text>
        </View>
        <View style={styles.textHolder}>
          <Text style={styles.text}>3/4 cup - 12 tbsp - 36 tsp - 180ml</Text>
        </View>
        <View style={styles.textHolder}>
          <Text style={styles.text}>2/3 cup - 11 tbsp - 32 tsp - 160ml</Text>
        </View>
        <View style={styles.textHolder}>
          <Text style={styles.text}>1/2 cup - 8 tbsp - 24 tsp - 120ml</Text>
        </View>
        <View style={styles.textHolder}>
          <Text style={styles.text}>1/3 cup - 5 tbsp - 16 tsp - 80ml</Text>
        </View>
        <View style={styles.textHolder}>
          <Text style={styles.text}>1/4 cup - 4 tbsp - 12 tsp - 60ml</Text>
        </View>
        <View style={styles.textHolder}>
          <Text style={styles.text}>1 tablespoon - 15ml</Text>
        </View>
        <View style={styles.textHolder}>
          <Text style={styles.text}>1 teaspoon - 5ml</Text>
        </View>
      </View>
      <View style={styles.holder}>
        <View style={styles.titleHolder}>
          <Text style={styles.title}>Farenheit to Celsius</Text>
        </View>
        <View style={styles.textHolder}>
          <Text style={styles.text}>475°F - 240°C</Text>
        </View>
        <View style={styles.textHolder}>
          <Text style={styles.text}>450°F - 230°C</Text>
        </View>
        <View style={styles.textHolder}>
          <Text style={styles.text}>425°F - 220°C</Text>
        </View>
        <View style={styles.textHolder}>
          <Text style={styles.text}>400°F - 200°C</Text>
        </View>
        <View style={styles.textHolder}>
          <Text style={styles.text}>375°F - 190°C</Text>
        </View>
        <View style={styles.textHolder}>
          <Text style={styles.text}>350°F - 180°C</Text>
        </View>
        <View style={styles.textHolder}>
          <Text style={styles.text}>325°F - 170°C</Text>
        </View>
        <View style={styles.textHolder}>
          <Text style={styles.text}>300°F - 150°C</Text>
        </View>
        <View style={styles.textHolder}>
          <Text style={styles.text}>275°F - 140°C</Text>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    margin: 40,
    alignItems: "center",
    justifyContent: "center",
    overflow: 'hidden'
  },
  title: {
    fontSize: Dimensions.get('screen').height < 750 ? 16 : 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
    color: "white",
  },
  holder: {
    width: "90%",
    alignItems: "center",
  },
  textHolder: {
    marginVertical: Dimensions.get('screen').height < 750 ? 3 : 5,
  },
  titleHolder: {
    backgroundColor: Colors.primary,
    width: "90%",
    padding: 10,
    borderRadius: 10,
  },
  text: {
    fontSize: Dimensions.get('screen').height < 750 ? 10 : 14
  }
});

export default ConversionChart;
