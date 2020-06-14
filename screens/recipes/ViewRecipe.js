import React, { useLayoutEffect, useState, useCallback } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  Platform,
  Alert,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import Card from "../../components/Card/Card";
import CustomHeaderButton from "../../components/CustomHeaderButton/CustomHeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";
import {
  updateFavourite,
  updateImage,
  saveReview,
  loading,
  getAllReviews,
  setError,
} from "../../store/actions/recipe";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import ENVS from "../../env";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import { AirbnbRating } from "react-native-ratings";
import CustomTextInput from "../../components/CustomTextInput/CustomTextInput";
import CustomButton from "../../components/CustomButton/CustomButton";
import Spinner from "../../components/Spinner/Spinner";
import Review from "../../components/Review/Review";
import { useFocusEffect } from "@react-navigation/native";
import Filter from "bad-words";
import onClearRecipeError from "../../helpers/onClearRecipeError";

const ViewRecipe = ({ navigation, route }) => {
  const title = route.params.title;
  const image = route.params.image;
  const instructions = route.params.instructions;
  const ingredients = route.params.ingredients;
  const cookTime = route.params.cookTime;
  const prepTime = route.params.prepTime;
  const serves = route.params.serves;
  const recipeId = route.params.recipeId;
  const fromMyRecipe = route.params.fromMyRecipe;
  const isReviewed = route.params.isReviewed;
  const isFav = useSelector((state) => state.recipes.isFavourite);
  const imageUri = useSelector((state) => state.recipes.image.uri);
  const isLoading = useSelector((state) => state.recipes.loading);
  const reviews = useSelector((state) => state.recipes.reviews);
  const myError = useSelector((state) => state.recipes.error);
  const dispatch = useDispatch();
  const [addedReview, setAddedReview] = useState(false);
  const [gettingReviews, setGettingReviews] = useState(false);
  const [review, setReview] = useState("");
  const [reviewTitle, setReviewTitle] = useState("");
  const [rating, setRating] = useState(0);
  const filter = new Filter();

  const favouriteHandler = async () => {
    try {
      await dispatch(updateFavourite(!isFav, recipeId));
    } catch (err) {
      dispatch(setError("Sorry we couldn't update your favourite status."));
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

  useFocusEffect(
    useCallback(() => {
      const getReviews = async () => {
        setGettingReviews(true);
        dispatch(loading(true));
        try {
          await dispatch(getAllReviews(recipeId));
        } catch (err) {
          dispatch(
            setError("Sorry we couldn't get the reviews for this recipe.")
          );
          dispatch(loading(false));
        }
        dispatch(loading(false));
        setGettingReviews(false);
      };
      getReviews();
    }, [dispatch])
  );

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
      dispatch(setError("Sorry we couldn't get the permissions for this."));
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
      dispatch(setError("Sorry we couldn't process the image."));
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
      dispatch(setError("Sorry we couldn't process the image."));
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

  const onFinishRatingHandler = (rating) => {
    setRating(rating);
  };

  const onChangeReviewHandler = (text) => {
    setReview(text);
  };

  const onChangeReviewTitleHandler = (text) => {
    setReviewTitle(text);
  };

  const onDismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const onAddReviewHandler = async () => {
    dispatch(loading(true));
    try {
      const filteredReview = filter.isProfane(review);
      const filteredReviewTitle = filter.isProfane(reviewTitle);
      if (filteredReview || filteredReviewTitle)
        return Alert.alert(
          "Sorry you can't add that review.",
          "Sorry we couldn't add that review we don't condone bad language.",
          [{ text: "Okay" }]
        );
      await dispatch(saveReview(recipeId, review, rating, reviewTitle));
      setAddedReview(true);
      Alert.alert(
        "Review Added",
        "We've successfully added your review on this recipe.",
        [{ text: "Okay" }]
      );
    } catch (err) {
      dispatch(setError("Sorry we couldn't add that review to this recipe."));
    }
    dispatch(loading(false));
    setGettingReviews(false);
  };

  if (myError) {
    Alert.alert("Error", myError, [
      { text: "Okay", onPress: () => onClearRecipeError(dispatch) },
    ]);
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={20}
    >
      <ScrollView>
        <TouchableWithoutFeedback onPress={onDismissKeyboard}>
          <View style={styles.screen}>
            <View style={styles.holder}>
              <Text style={styles.title}>{title}</Text>
              {image === `${ENVS.imagesUrl}/` &&
              imageUri === null &&
              fromMyRecipe ? (
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
                  source={{
                    uri: `${image !== `${ENVS.imagesUrl}/` ? image : imageUri}`,
                  }}
                  style={{ width: 80, height: 80, borderRadius: 40 }}
                />
              )}
            </View>
            <Card style={{ ...styles.holder, alignItems: "flex-start" }}>
              <View style={{ width: "50%" }}>
                <Text style={styles.holderText}>Ingredients</Text>
                {ingredients.map((ingredient) => (
                  <View style={styles.contentsHolder} key={ingredient.id}>
                    <Text>- {ingredient.ingredient}</Text>
                  </View>
                ))}
              </View>
              <View style={{ width: "50%" }}>
                <Text style={styles.holderText}>Instructions</Text>
                {instructions.map((instruction) => (
                  <View key={instruction.id} style={styles.contentsHolder}>
                    <Text>- {instruction.instruction}</Text>
                  </View>
                ))}
              </View>
            </Card>
            <View style={styles.timeContainer}>
              <View style={styles.timeHolder}>
                <Text style={styles.timeTitle}>Cook Time</Text>
                <Text>{cookTime}</Text>
              </View>
              <View style={styles.timeHolder}>
                <Text style={styles.timeTitle}>Prep Time</Text>
                <Text>{prepTime}</Text>
              </View>
              <View style={styles.timeHolder}>
                <Text style={styles.timeTitle}>Serves</Text>
                <Text>{serves}</Text>
              </View>
            </View>
            {isReviewed || addedReview || fromMyRecipe ? null : (
              <Card
                style={{
                  width: "80%",
                  justifyContent: "center",
                  padding: 20,
                  marginBottom: 20,
                }}
              >
                <Text
                  style={{
                    fontSize: 25,
                    fontWeight: "bold",
                    textAlign: "center",
                    paddingBottom: 10,
                  }}
                >
                  Add Review
                </Text>
                <CustomTextInput
                  placeholder="Title..."
                  onChangeText={onChangeReviewTitleHandler}
                  value={reviewTitle}
                  style={{ fontSize: 25, fontWeight: "bold" }}
                />
                <CustomTextInput
                  multiline
                  placeholder="Review..."
                  onChangeText={onChangeReviewHandler}
                  value={review}
                />
                <AirbnbRating
                  defaultRating={0}
                  onFinishRating={onFinishRatingHandler}
                  size={30}
                />
                <CustomButton
                  touchStyle={styles.touch}
                  textStyle={styles.btnText}
                  text="Add Review"
                  onPress={onAddReviewHandler}
                />
              </Card>
            )}
            {reviews.length !== 0 ? (
              <Card style={{ width: "80%", padding: 20, marginBottom: 30 }}>
                <Text
                  style={{
                    fontSize: 25,
                    textAlign: "center",
                    fontWeight: "bold",
                    paddingBottom: 10,
                  }}
                >
                  Reviews
                </Text>
                {!isLoading && !gettingReviews ? (
                  reviews.map((review) => (
                    <Review
                      key={review.title}
                      username={review.username}
                      title={review.title}
                      review={review.review}
                      rating={review.rating}
                    />
                  ))
                ) : (
                  <View>
                    <Text
                      style={{
                        textAlign: "center",
                        fontWeight: "bold",
                        fontSize: 16,
                        paddingBottom: 10,
                      }}
                    >
                      Getting Reviews...
                    </Text>
                    <Spinner />
                  </View>
                )}
              </Card>
            ) : null}
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
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
    width: "100%",
    overflow: "hidden",
    marginTop: 10,
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    width: '70%'
  },
  contentsHolder: {
    marginTop: 10,
  },
  holderText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "95%",
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
  touch: {
    backgroundColor: Colors.primary,
    padding: 5,
    width: "100%",
    height: 50,
    justifyContent: "center",
    borderRadius: 10,
    marginTop: 10,
  },
  btnText: {
    fontSize: 15,
    textAlign: "center",
    fontWeight: "bold",
    color: "white",
  },
  timeHolder: {
    alignItems: "center",
  },
  timeTitle: {
    fontWeight: "bold",
  },
});

export default ViewRecipe;
