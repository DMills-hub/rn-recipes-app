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
  Animated
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
import { useFocusEffect, RouteProp } from "@react-navigation/native";
import Filter from "bad-words";
import onClearRecipeError from "../../helpers/onClearRecipeError";
import { scale } from "react-native-size-matters";
import onTriggerLayoutAnimation from '../../helpers/onTriggerLayoutAnimation';
import { RootState } from '../../App';
import { MyRecipeStackParamList } from '../../navigation/MyRecipesStackNavigator';
import { StackNavigationProp } from "@react-navigation/stack";

type ViewRecipeScreenNavigationProp = StackNavigationProp<
  MyRecipeStackParamList,
  'ViewRecipe'
>;

type ViewRecipeScreenRouteProp = RouteProp<MyRecipeStackParamList, 'ViewRecipe'>;

type Props = {
  navigation: ViewRecipeScreenNavigationProp,
  route: ViewRecipeScreenRouteProp
}

const ViewRecipe: React.FC<Props> = ({ navigation, route }): JSX.Element => {
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
  const isFav = useSelector((state: RootState) => state.recipes.isFavourite);
  const imageUri = useSelector((state: RootState) => state.recipes.image.uri);
  const isLoading = useSelector((state: RootState) => state.recipes.loading);
  const reviews = useSelector((state: RootState) => state.recipes.reviews);
  const myError = useSelector((state: RootState) => state.recipes.error);
  const dispatch = useDispatch();
  const [addedReview, setAddedReview] = useState(false);
  const [gettingReviews, setGettingReviews] = useState(false);
  const [review, setReview] = useState("");
  const [reviewTitle, setReviewTitle] = useState("");
  const [rating, setRating] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imgClicked, setImgClicked] = useState(false);
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
            title="Heart"
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

  const onFinishRatingHandler = (rating: number) => {
    setRating(rating);
  };

  const onChangeReviewHandler = (text: string) => {
    setReview(text);
  };

  const onChangeReviewTitleHandler = (text: string) => {
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

  const onImageClickedHandler = () => {
    onTriggerLayoutAnimation();
    setImgClicked((state) => !state);
  };


  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={20}
    >
      {imgClicked && imageLoaded && image !== `${ENVS.imagesUrl}` ? (
        <Animated.View
          style={styles.imageClickedHolder}
        >
          <View>
            <TouchableOpacity onPress={onImageClickedHandler} style={{alignItems: 'flex-end'}}>
              <Text style={{color: 'white', fontSize: scale(30)}}>X</Text>
            </TouchableOpacity>
            <Image
              source={{
                uri: `${image !== `${ENVS.imagesUrl}/` ? image : imageUri}`,
              }}
              style={styles.bigImage}
            />
          </View>
        </Animated.View>
      ) : null}
      <ScrollView>
        <TouchableWithoutFeedback onPress={onDismissKeyboard}>
          <View style={styles.screen}>
            <View style={styles.holder}>
              <Text style={styles.title}>{title}</Text>
              {!imageLoaded && image !== `${ENVS.imagesUrl}/` ? <Spinner /> : null}
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
                <TouchableOpacity onPress={onImageClickedHandler}>
                  <Image
                    source={{
                      uri: `${
                        image !== `${ENVS.imagesUrl}/` ? image : imageUri
                      }`,
                    }}
                    style={styles.smallImage}
                    onLoad={() => setImageLoaded(true)}
                  />
                </TouchableOpacity>
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
                    fontSize: scale(20),
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
    width: "70%",
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
  imageClickedHolder: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: '100%',
    zIndex: 100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  bigImage: {
    width: scale(300),
    height: scale(300),
    borderRadius: scale(150),
  },
  smallImage: { width: scale(80), height: scale(80), borderRadius: scale(40) }
});

export default ViewRecipe;
