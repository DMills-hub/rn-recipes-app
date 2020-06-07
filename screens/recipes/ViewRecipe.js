import React, { useLayoutEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  Platform,
  Button,
  Alert,
} from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import Card from "../../components/Card/Card";
import CustomHeaderButton from "../../components/CustomHeaderButton/CustomHeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";
import { updateFavourite, updateImage } from "../../store/actions/recipe";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import ENVS from "../../env";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

const ViewRecipe = ({ navigation, route }) => {
  const title = route.params.title;
  const image = route.params.image;
  const instructions = route.params.instructions;
  const ingredients = route.params.ingredients;
  const cookTime = route.params.cookTime;
  const prepTime = route.params.prepTime;
  const recipeId = route.params.recipeId;
  const fromMyRecipe = route.params.fromMyRecipe;
  const isFav = useSelector((state) => state.recipes.isFavourite);
  const imageUri = useSelector((state) => state.recipes.image.uri);
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
      headerTitle: title,
    });
  }, [navigation, isFav, title]);

  const getPermissions = async () => {
    try {
      if (Platform.OS === "ios") {
        const { granted } = await Permissions.askAsync(
          Permissions.CAMERA_ROLL,
          Permissions.CAMERA
        );
        if (!granted) {
          Alert.alert(
            "We need camera permissions to make this work!",
            "Sorry we need camera permissions for you to be able to use this app.",
            [{ text: "Okay" }]
          );
          return false;
        }
        return true;
      }
      return true;
    } catch (err) {
      console.log(err);
    }
  };

  const onTakePictureHandler = async () => {
    try {
      const getPermission = await getPermissions();
      if (!getPermission) return;
      const image = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [16, 9],
        quality: 0.5,
        base64: true,
      });
      if (image.cancelled) return;
      dispatch(updateImage(recipeId, image.uri, image.base64));
    } catch (err) {
      console.log(err);
    }
  };

  const onChooseFromGalleryHandler = async () => {
    try {
      const getPermission = await getPermissions();
      if (!getPermission) return;
      const image = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [16, 9],
        quality: 0.5,
        base64: true,
      });
      if (image.cancelled) return;
      dispatch(updateImage(recipeId, image.uri, image.base64));
    } catch (err) {
      console.log(err);
    }
  };

  const onAddNewImageHandler = () => {
    return Alert.alert(
      "Do you want to take a picture or choose from gallery?",
      "",
      [
        { text: "Take Picture", onPress: onTakePictureHandler },
        { text: "Gallery", onPress: onChooseFromGalleryHandler },
      ]
    );
  };

  return (
    <View style={styles.screen}>
      <View style={styles.holder}>
        <Text style={styles.title}>{title}</Text>
        {image === `${ENVS.url}/` && imageUri === null && fromMyRecipe ? (
          <View style={styles.addImage}>
            <TouchableOpacity onPress={onAddNewImageHandler}>
              <Ionicons
                color="white"
                name={Platform.OS === "android" ? "md-add" : "ios-add"}
                size={60}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <Image
            source={{ uri: `${image !== `${ENVS.url}/` ? image : imageUri}` }}
            style={{ width: 80, height: 80, borderRadius: 40 }}
          />
        )}
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
  addImage: {
    backgroundColor: Colors.primary,
    height: 60,
    width: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ViewRecipe;
