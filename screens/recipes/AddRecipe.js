import React, { useRef, useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Platform,
  Alert,
  Image,
  Text,
  Picker,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import CustomTextInput from "../../components/CustomTextInput/CustomTextInput";
import CustomButton from "../../components/CustomButton/CustomButton";
import Colors from "../../constants/Colors";
import Holder from "../../components/Holder/Holder";
import { useSelector, useDispatch } from "react-redux";
import {
  addIngredient,
  updateIngredient,
  deleteIngredient,
  updateTitle,
  addInstruction,
  deleteInstruction,
  updateInstruction,
  addImage,
  saveRecipe,
  clearRecipe,
  updateCookTime,
  updatePrepTime,
  updateCategory,
  loading,
  updateServes,
  setError,
  clearImage,
} from "../../store/actions/recipe";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import Card from "../../components/Card/Card";
import Spinner from "../../components/Spinner/Spinner";
import onClearRecipeError from "../../helpers/onClearRecipeError";

const AddRecipe = (props) => {
  const dispatch = useDispatch();
  const ingredients = useSelector((state) => state.recipes.ingredients);
  const instructions = useSelector((state) => state.recipes.instructions);
  const title = useSelector((state) => state.recipes.title);
  const imageUri = useSelector((state) => state.recipes.image.uri);
  const base64 = useSelector((state) => state.recipes.image.base64);
  const cookTime = useSelector((state) => state.recipes.cookTime);
  const prepTime = useSelector((state) => state.recipes.prepTime);
  const serves = useSelector((state) => state.recipes.serves);
  const category = useSelector((state) => state.recipes.category);
  const isLoading = useSelector((state) => state.recipes.loading);
  const myError = useSelector((state) => state.recipes.error);
  const ingScroll = useRef();
  const insScroll = useRef();
  const [showBtns, setShowBtns] = useState(true);

  Keyboard.addListener("keyboardDidShow", () => {
    if (Platform.OS === "android") return setShowBtns(false);
  });

  Keyboard.addListener("keyboardDidHide", () => {
    if (Platform.OS === "android") return setShowBtns(true);
  });

  const onAddIngredientHandler = () => {
    if (
      ingredients.length > 0 &&
      ingredients[ingredients.length - 1].ing === ""
    )
      return Alert.alert(
        "Can't add new Ingredient!",
        "Previous ingredients must not be empty!",
        [{ text: "Okay" }]
      );
    dispatch(addIngredient());
  };

  const onAddInstructionHandler = () => {
    if (
      instructions.length > 0 &&
      instructions[instructions.length - 1].instruction === ""
    )
      return Alert.alert(
        `Can't add new Instruction!`,
        "Previous Instruction must not be empty.",
        [{ text: "Okay" }]
      );
    dispatch(addInstruction());
  };

  const onChangeInstructionHandler = (index, text) => {
    dispatch(updateInstruction(text, index));
  };

  const onChangeTitleHandler = (text) => {
    dispatch(updateTitle(text));
  };

  const onChangeIngredientTextHandler = (index, text) => {
    dispatch(updateIngredient(index, text));
  };

  const onDeleteIngredientHandler = (id) => {
    dispatch(deleteIngredient(id));
  };

  const onDeleteInstructionHandler = (instruction) => {
    dispatch(deleteInstruction(instruction));
  };

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
      if (err)
        dispatch(setError("Sorry we had an issue asking for permissons."));
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
      dispatch(addImage(image.uri, image.base64));
    } catch (err) {
      if (err)
        dispatch(setError("Sorry we had an issue processing the picture."));
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
      dispatch(addImage(image.uri, image.base64));
    } catch (err) {
      if (err)
        dispatch(setError("Sorry we had an issue processing the picture."));
    }
  };

  const validateRecipe = () => {
    if (
      title === "" ||
      ingredients.length === 0 ||
      instructions.length === 0 ||
      cookTime === "" ||
      prepTime === "" ||
      serves === ""
    )
      return false;
    return true;
  };

  const onChoosePublishHandler = () => {
    return Alert.alert(
      "Do you want everyone to see your recipe?",
      "If you make this publishable everyone will be able to see your recipe. Click Yes to make this happen or No if you want to keep it private.",
      [
        { text: "Yes", onPress: async () => await onSaveHandler(true) },
        { text: "No", onPress: async () => await onSaveHandler(false) },
      ]
    );
  };

  const onSaveHandler = async (publishable) => {
    const checkReicpeValidity = validateRecipe();
    if (!checkReicpeValidity)
      return Alert.alert(
        "Couldn't save your recipe.",
        "Please make sure all of the fields have something entered in them and you have a picture.",
        [{ text: "Okay" }]
      );
    dispatch(loading(true));
    try {
      await dispatch(
        saveRecipe(
          title,
          ingredients,
          base64,
          instructions,
          cookTime,
          prepTime,
          category,
          serves,
          publishable
        )
      );
      props.navigation.navigate("My Recipes");
    } catch (err) {
      if (err) dispatch(setError("Sorry we had an issue saving your recipe."));
    }
    dispatch(loading(false));
  };

  const onClearHandler = () => {
    dispatch(clearRecipe());
  };

  const onCookTimeChangeHandler = (text) => {
    dispatch(updateCookTime(text));
  };

  const onPrepTimeChangeHandler = (text) => {
    dispatch(updatePrepTime(text));
  };

  const onServingChangeHandler = (text) => {
    dispatch(updateServes(text));
  };

  const onChangeCategoryHandler = (itemValue) => {
    dispatch(updateCategory(itemValue));
  };

  const onRemovePictureHandler = () => {
    dispatch(clearImage());
  };

  if (myError) {
    Alert.alert("Error", myError, [
      { text: "Okay", onPress: () => onClearRecipeError(dispatch) },
    ]);
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.screen}>
        <View style={styles.title}>
          <View style={styles.titleHolder}>
            <CustomTextInput
              onChangeText={onChangeTitleHandler}
              placeholder="Title..."
              style={styles.customText}
              value={title}
              multiline
            />
          </View>
          {imageUri ? (
            <View>
              <View style={styles.imageHolder}>
                <Image source={{ uri: imageUri }} style={styles.image} />
              </View>
              <View style={{marginTop: 3}}>
              <CustomButton
                  touchStyle={styles.touch}
                  text="Remove"
                  textStyle={styles.btnText}
                  onPress={onRemovePictureHandler}
                />
              </View>
            </View>
          ) : null}
        </View>
        {imageUri ? null : (
          <View style={styles.button}>
            <View style={styles.btnContainer}>
              <CustomButton
                touchStyle={styles.touch}
                text="Take Picture"
                textStyle={styles.btnText}
                onPress={onTakePictureHandler}
              />
            </View>
            <View style={styles.btnContainer}>
              <CustomButton
                touchStyle={styles.touch}
                text="Choose from Gallery"
                textStyle={styles.btnText}
                onPress={onChooseFromGalleryHandler}
              />
            </View>
          </View>
        )}
        <View style={styles.controlsContainer}>
          <View style={styles.ingredientAddContainer}>
            <CustomButton
              touchStyle={{ ...styles.touch, ...{ marginBottom: 10 } }}
              text="Add Ingredient"
              textStyle={styles.btnText}
              onPress={onAddIngredientHandler}
            />

            <ScrollView
              ref={ingScroll}
              onContentSizeChange={() =>
                ingScroll.current.scrollToEnd({ animated: true })
              }
            >
              <Card
                style={{
                  shadowColor: "white",
                  shadowOpacity: 0,
                  shadowOffset: { width: 0, height: 0 },
                  shadowRadius: 0,
                  elevation: 0,
                }}
              >
                {ingredients.map((ing, index) => (
                  <Holder
                    key={ing.id}
                    onChangeText={onChangeIngredientTextHandler.bind(
                      this,
                      index
                    )}
                    delete={onDeleteIngredientHandler.bind(this, ing.id)}
                    customPlaceholder="Ingredient..."
                    value={ing.ing}
                  />
                ))}
              </Card>
            </ScrollView>
          </View>
          <View style={styles.ingredientAddContainer}>
            <CustomButton
              touchStyle={{ ...styles.touch, ...{ marginBottom: 10 } }}
              text="Add Method"
              textStyle={styles.btnText}
              onPress={onAddInstructionHandler}
            />
            <ScrollView
              ref={insScroll}
              onContentSizeChange={() =>
                insScroll.current.scrollToEnd({ animated: true })
              }
            >
              <Card
                style={{
                  shadowColor: "white",
                  shadowOpacity: 0,
                  shadowOffset: { width: 0, height: 0 },
                  shadowRadius: 0,
                  elevation: 0,
                }}
              >
                {instructions.map((ins, index) => (
                  <Holder
                    key={ins.id}
                    value={ins.instruction}
                    delete={onDeleteInstructionHandler.bind(this, ins.id)}
                    onChangeText={onChangeInstructionHandler.bind(this, index)}
                    customPlaceholder="Method..."
                  />
                ))}
              </Card>
            </ScrollView>
          </View>
        </View>
        <View style={styles.time}>
          <View
            style={{
              ...styles.time,
              width: "33%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={styles.smallText}>Cook Time </Text>
            <CustomTextInput
              onChangeText={onCookTimeChangeHandler}
              value={cookTime}
              placeholder="10mins..."
              style={styles.smallText}
            />
          </View>
          <View
            style={{
              ...styles.time,
              width: "33%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={styles.smallText}>Prep Time </Text>
            <CustomTextInput
              onChangeText={onPrepTimeChangeHandler}
              value={prepTime}
              placeholder="10mins..."
              style={styles.smallText}
            />
          </View>
          <View
            style={{
              ...styles.time,
              justifyContent: "center",
              alignItems: "center",
              width: '33%'
            }}
          >
            <Text style={styles.smallText}>Serves </Text>
            <CustomTextInput
              onChangeText={onServingChangeHandler}
              value={serves}
              placeholder="6 people..."
              style={styles.smallText}
            />
          </View>
        </View>
        <View style={{ alignItems: "center", marginTop: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>Category</Text>
          <Picker
            onValueChange={onChangeCategoryHandler}
            selectedValue={category}
            style={{ width: 120 }}
          >
            <Picker.Item label="Starter" value="starter" />
            <Picker.Item label="Main" value="main" />
            <Picker.Item label="Dessert" value="dessert" />
            <Picker.Item label="Baking" value="baking" />
            <Picker.Item label="Other" value="other" />
          </Picker>
        </View>
        {showBtns && !isLoading ? (
          <View style={styles.submitBtns}>
            <View style={styles.submitBtnHolder}>
              <CustomButton
                onPress={onChoosePublishHandler}
                text="Save"
                touchStyle={{ ...styles.touch, ...{ marginBottom: 10 } }}
                textStyle={styles.btnText}
              />
            </View>
            <View style={styles.submitBtnHolder}>
              <CustomButton
                onPress={onClearHandler}
                text="Clear"
                touchStyle={{ ...styles.touch, ...{ marginBottom: 10 } }}
                textStyle={styles.btnText}
              />
            </View>
          </View>
        ) : (
          <Spinner />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screen: {
    alignItems: "center",
    flex: 1,
  },
  customText: {
    fontSize: 25,
  },
  addRecipeContainer: {
    height: "100%",
    alignItems: "center",
  },
  imageHolder: { borderRadius: 40, overflow: "hidden" },
  image: { width: 80, height: 80 },
  title: {
    width: "85%",
    paddingTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  titleText: {
    fontWeight: "bold",
    fontSize: 17,
  },
  titleHolder: {
    width: "75%",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "45%",
  },
  btnContainer: {
    width: "100%",
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 10,
  },
  controlsContainer: {
    flexDirection: "row",
    height: "35%",
    marginVertical: 10,
  },
  btn: {
    fontSize: 5,
  },
  btnText: {
    fontSize: 15,
    textAlign: "center",
    fontWeight: "bold",
    color: "white",
  },
  touch: {
    backgroundColor: Colors.primary,
    padding: 5,
    width: "100%",
    height: 50,
    justifyContent: "center",
    borderRadius: 10,
  },
  ingredientAddContainer: {
    width: "45%",
    padding: 10,
    height: "100%",
  },
  submitBtns: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
    width: "95%",
    position: "absolute",
    bottom: 0,
  },
  submitBtnHolder: {
    marginLeft: 10,
    marginRight: 10,
    width: 100,
  },
  time: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "95%",
  },
  smallText: {
    fontSize: 11,
    width: '50%',
  },
});

export default AddRecipe;
