import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Keyboard,
  Picker,
  TouchableWithoutFeedback,
  AsyncStorage,
  Alert,
  Platform,
} from "react-native";
import CustomTextInput from "../../components/CustomTextInput/CustomTextInput";
import CustomButton from "../../components/CustomButton/CustomButton";
import Card from "../../components/Card/Card";
import Colors from "../../constants/Colors";
import Holder from "../../components/Holder/Holder";
import ENVS from "../../env";
import Spinner from '../../components/Spinner/Spinner';
import * as Permissions from "expo-permissions";
import * as ImagePicker from 'expo-image-picker';
import Filter from 'bad-words';

const guidGenerator = () => {
  var S4 = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return (
    S4() +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    S4() +
    S4()
  );
};

const EditRecipe = ({ navigation, route }) => {
  const recipeId = route.params.recipeId;
  const [title, setTitle] = useState(route.params.title);
  const [image, setImage] = useState(route.params.image);
  const [sendImage, setSendImage] = useState("");
  const [cookTime, setCooktime] = useState(route.params.cooktime);
  const [prepTime, setPreptime] = useState(route.params.preptime);
  const [serves, setServes] = useState(route.params.serving);
  const [ingredients, setIngredients] = useState(route.params.ingredients);
  const [instructions, setInstructions] = useState(route.params.instructions);
  const [category, setCategory] = useState(route.params.category);
  const [ isLoading, setIsLoading ] = useState(false);
  const ingScroll = useRef();
  const insScroll = useRef();
  const filter = new Filter();

  const checkEmpty = (checkString) => {
    if (checkString === "") return true;
    return false;
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
        Alert.alert(
          "Had an issue getting permissions.",
          "Sorry we had an issue getting permissions.",
          [{ text: "Okay" }]
        );
    }
  };

  const onChangeCategoryHandler = (category) => {
    setCategory(category);
  }

   const onDeleteInstructionHandler = (id) => {
     const oldInstructions = instructions.filter((ing) => ing.id !== id);
     setInstructions(oldInstructions);
  };

  const onDeleteIngredientHandler = (id) => {
    const oldIngredients = ingredients.filter((ing) => ing.id !== id);
    setIngredients(oldIngredients);
  };

  const onAddNewIngredientHandler = () => {
    const addIngredient = ingredients.concat({
      id: guidGenerator(),
      ingredient: "",
    });
    setIngredients(addIngredient);
  };

  const onAddNewInstructionHandler = () => {
    const addInstruction = instructions.concat({
      id: guidGenerator(),
      instruction: "",
    });
    setInstructions(addInstruction);
  };

  const onChangeInstructionHandler = (id, text) => {
    const newInstructions = [...instructions];
    const index = instructions.findIndex((ins) => ins.id === id);
    const updateInstruction = { ...instructions[index], instruction: text };
    newInstructions[index] = updateInstruction;
    setInstructions(newInstructions);
  };

  const onChangeIngredientHandler = (id, text) => {
    const newIngredients = [...ingredients];
    const index = ingredients.findIndex((ing) => ing.id === id);
    const updateIngredient = { ...ingredients[index], ingredient: text };
    newIngredients[index] = updateIngredient;
    setIngredients(newIngredients);
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
      setImage(image.uri);
      setSendImage(image.base64);
    } catch (err) {
      if (err) Alert.alert("Sorry we had an issue adding your image.", "Sorry we had an issue adding you image.", [{text: 'Okay'}])
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
      setImage(image.uri);
      setSendImage(image.base64)
    } catch (err) {
      if (err) Alert.alert("Sorry we had an issue adding your image.", "Sorry we had an issue adding you image.", [{text: 'Okay'}])
    }
  };

  const onAddNewImageHandler = () => {
      Alert.alert("New Picture or from your Gallery.", "Would you like to access your gallery or take a new picture.", [{text: 'Gallery', onPress: async () => await onChooseFromGalleryHandler()}, {text: 'New Picture', onPress: async () => await onTakePictureHandler()}])
  };

  const onClearHandler = () => {
    setTitle(route.params.title);
    setImage(route.params.image);
    setCategory(route.params.category);
    setPreptime(route.params.preptime);
    setCooktime(route.params.cooktime);
    setServes(route.params.serving);
    setInstructions(route.params.instructions);
    setIngredients(route.params.ingredients);
  }

  const onSaveEditRecipe = async () => {
    for (let i = 0; i < ingredients.length; i++) {
      if (filter.isProfane(ingredients[i].ingredient)) return Alert.alert("No bad language!", "Make sure there's no bad language in your ingredients.", [{text: 'Okay'}])
      if (checkEmpty(ingredients[i].ingredient)) return Alert.alert("Ingredients must all be filled.", "Make sure there's no empty values in your ingredients.", [{text: 'Okay'}])
    }
    for (let i = 0; i < instructions.length; i++) {
      if (filter.isProfane(instructions[i].instruction)) return Alert.alert("No bad language!", "Make sure there's no bad language in your instructions.", [{text: 'Okay'}])
      if (checkEmpty(instructions[i].instruction)) return Alert.alert("Instructions must all be filled.", "Make sure there's no empty values in your instructions.", [{text: 'Okay'}])
    }
    if (checkEmpty(title) || checkEmpty(category) || checkEmpty(serves) || checkEmpty(prepTime) || checkEmpty(cookTime)) return Alert.alert("Make sure no values are empty.", "Please make sure there are no empty values.", [{text: 'Okay'}])
    if (filter.isProfane(title) || filter.isProfane(category) || filter.isProfane(serves) || filter.isProfane(prepTime) || filter.isProfane(cookTime)) return Alert.alert("No bad language!", "Please make sure there is no bad language used.", [{text: 'Okay'}])
    setIsLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");
      await fetch(`${ENVS.url}/recipes/updateRecipe`, {
        headers: {
          "Authorization": token,
          "Content-Type": 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
          title: title,
          image: sendImage,
          newIngredients: ingredients,
          newInstructions: instructions,
          cookTime: cookTime,
          prepTime: prepTime,
          serves: serves,
          category: category,
          id: recipeId
        })
      })
      navigation.navigate("My Recipes")
    } catch (err) {
      if (err) Alert.alert("Sorry we had an issue updating your recipe.", "Sorry we had an issue updating your recipe.", [{text: 'Okay'}])
    }
    setIsLoading(false);
  }

  return (
    <ScrollView contentContainerStyle={{ flex: 1, paddingBottom: 80 }}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.screen}>
          <View style={styles.title}>
            <View style={styles.titleHolder}>
              <CustomTextInput
                placeholder="Title..."
                style={styles.customText}
                value={title}
                multiline
                onChangeText={(text) => setTitle(text)}
              />
            </View>
            <View style={{alignItems: 'center'}}>
              <View
                style={{
                  width: 80,
                  height: 80,
                  overflow: "hidden",
                  borderRadius: 40,
                }}
              >
                <Image
                  style={{ width: "100%", height: "100%" }}
                  source={{ uri: image }}
                />
              </View>
              <CustomButton
                touchStyle={{...styles.touch, marginTop: 10}}
                text="Change Image"
                textStyle={styles.btnText}
                onPress={onAddNewImageHandler}
              />
            </View>
          </View>

          <View style={styles.controlsContainer}>
            <View style={styles.ingredientAddContainer}>
              <CustomButton
                touchStyle={{ ...styles.touch, ...{ marginBottom: 10 } }}
                text="Add Ingredient"
                textStyle={styles.btnText}
                onPress={onAddNewIngredientHandler}
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
                  {ingredients.map((ing) => (
                    <Holder
                      key={ing.id}
                      customPlaceholder="Ingredient..."
                      value={ing.ingredient}
                      onChangeText={onChangeIngredientHandler.bind(
                        this,
                        ing.id
                      )}
                      delete={onDeleteIngredientHandler.bind(this, ing.id)}
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
                onPress={onAddNewInstructionHandler}
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
                  {instructions.map((ins) => (
                    <Holder
                      key={ins.id}
                      value={ins.instruction}
                      customPlaceholder="Method..."
                      onChangeText={onChangeInstructionHandler.bind(
                        this,
                        ins.id
                      )}
                      delete={onDeleteInstructionHandler.bind(this, ins.id)}
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
                value={cookTime}
                placeholder="10mins..."
                style={styles.smallText}
                onChangeText={(text) => setCooktime(text)}
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
                value={prepTime}
                placeholder="10mins..."
                style={styles.smallText}
                onChangeText={(text) => setPreptime(text)}
              />
            </View>
            <View
              style={{
                ...styles.time,
                justifyContent: "center",
                alignItems: "center",
                width: "33%",
              }}
            >
              <Text style={styles.smallText}>Serves </Text>
              <CustomTextInput
                value={serves}
                placeholder="6 people..."
                style={styles.smallText}
                onChangeText={(text) => setServes(text)}
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
          {!isLoading ? (
          <View style={styles.submitBtns}>
            <View style={styles.submitBtnHolder}>
              <CustomButton
                onPress={async () => await onSaveEditRecipe()}
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
    </ScrollView>
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
    width: "50%",
  },
});

export default EditRecipe;
