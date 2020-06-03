import React, { useRef } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Platform,
  Alert,
  Image,
  AsyncStorage,
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
} from "../../store/actions/recipe";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

const AddRecipe = (props) => {
  const dispatch = useDispatch();
  const ingredients = useSelector((state) => state.recipes.ingredients);
  const instructions = useSelector((state) => state.recipes.instructions);
  const title = useSelector((state) => state.recipes.title);
  const imageUri = useSelector((state) => state.recipes.image.uri);
  const base64 = useSelector((state) => state.recipes.image.base64);
  const ingScroll = useRef();
  const insScroll = useRef();

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
      dispatch(addImage(image.uri, image.base64));
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
      dispatch(addImage(image.uri, image.base64));
    } catch (err) {
      console.log(err);
    }
  };

  const onSaveHandler = async () => {
    try {
      await dispatch(saveRecipe(title, ingredients, base64, instructions));
      props.navigation.navigate("My Recipes");
    } catch (err) {
      console.log(err);
    }
  };

  const onClearHandler = () => {
    dispatch(clearRecipe());
  };

  return (
    <View style={styles.screen}>
      <View style={styles.title}>
        <View style={styles.titleHolder}>
          <CustomTextInput
            onChangeText={onChangeTitleHandler}
            placeholder="Title..."
            style={styles.customText}
            value={title}
          />
        </View>
        {imageUri ? (
          <View style={styles.imageHolder}>
            <Image source={{ uri: imageUri }} style={styles.image} />
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
            {ingredients.map((ing, index) => (
              <Holder
                key={ing.id}
                onChangeText={onChangeIngredientTextHandler.bind(this, index)}
                delete={onDeleteIngredientHandler.bind(this, ing.id)}
                customPlaceholder="Ingredient..."
                value={ing.ing}
              />
            ))}
          </ScrollView>
        </View>
        <View style={styles.ingredientAddContainer}>
          <CustomButton
            touchStyle={{ ...styles.touch, ...{ marginBottom: 10 } }}
            text="Add Instruction"
            textStyle={styles.btnText}
            onPress={onAddInstructionHandler}
          />
          <ScrollView
            ref={insScroll}
            onContentSizeChange={() =>
              insScroll.current.scrollToEnd({ animated: true })
            }
          >
            {instructions.map((ins, index) => (
              <Holder
                key={ins.id}
                value={ins.instruction}
                delete={onDeleteInstructionHandler.bind(this, ins.id)}
                onChangeText={onChangeInstructionHandler.bind(this, index)}
                customPlaceholder="Instruction..."
              />
            ))}
          </ScrollView>
        </View>
      </View>
      <View style={styles.submitBtns}>
        <View style={styles.submitBtnHolder}>
          <CustomButton
            onPress={onSaveHandler}
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
    </View>
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
});

export default AddRecipe;
