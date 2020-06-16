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
} from "react-native";
import CustomTextInput from "../../components/CustomTextInput/CustomTextInput";
import CustomButton from "../../components/CustomButton/CustomButton";
import Card from "../../components/Card/Card";
import Colors from "../../constants/Colors";
import Holder from "../../components/Holder/Holder";
import ENVS from "../../env";

const guidGenerator = () => {
  var S4 = function() {
     return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
  };
  return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

const EditRecipe = ({ navigation, route }) => {
  const recipeId = route.params.recipeId;
  const [title, setTitle] = useState(route.params.title);
  const [image, setImage] = useState(route.params.image);
  const [cookTime, setCooktime] = useState(route.params.cooktime);
  const [prepTime, setPreptime] = useState(route.params.preptime);
  const [serves, setServes] = useState(route.params.serving);
  const [ingredients, setIngredient] = useState(route.params.ingredients);
  const [instructions, setInstructions] = useState(route.params.instructions);
  const [addNewIngredients, setAddNewIngredients] = useState([]);
  const [addNewInstructions, setAddNewInstructions] = useState([]);
  const [category, setCategory] = useState(route.params.category);
  const ingScroll = useRef();
  const insScroll = useRef();

  const checkEmpty = (checkString) => {
    if (checkString === "") return true;
    return false;
  }

  const onAddNewIngredientHandler =  () => {
    if (addNewIngredients.length !== 0) {
      if (checkEmpty(addNewIngredients[addNewIngredients.length - 1].ingredient)) return Alert.alert("Sorry we couldn't add a new ingredient.", "Make sure your most recent ingredient has some text in it.", [{text: 'Okay'}])
    }
      const addIngredient = addNewIngredients.concat({
        id: guidGenerator(),
        ingredient: "",
      });
      setAddNewIngredients(addIngredient);
  };


  const onAddNewInstructionHandler =  () => {
    if (addNewInstructions.length !== 0) {
      if (checkEmpty(addNewInstructions[addNewInstructions.length - 1].instruction)) return Alert.alert("Sorry we couldn't add a new method.", "Make sure your most recent method has some text in it.", [{text: 'Okay'}])
    }
      const addInstruction = addNewInstructions.concat({
        id: guidGenerator(),
        instruction: "",
      });
      setAddNewInstructions(addInstruction);
  };

  const onChangeInstructionHandler = (id, text) => {
    const newInstructions = [...instructions];
    const index = instructions.findIndex((ins) => ins.id === id);
    const updateInstruction = { ...instructions[index], instruction: text };
    newInstructions[index] = updateInstruction;
    setInstructions(newInstructions);
  };

  const onEndInstructionEdit = async (id) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const findInstruction = instructions.find((ins) => ins.id === id);
      if (checkEmpty(findInstruction.instruction)) Alert.alert("Sorry we couldn't save your method", "Please make sure that your method contains some text.", [{text: 'Okay'}])
      await fetch(`${ENVS.url}/recipes/updateInstruction`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": token,
        },
        method: "POST",
        body: JSON.stringify({
          id: id,
          instruction: findInstruction.instruction,
        }),
      });
    } catch (err) {
      if (err)
        Alert.alert(
          "Sorry we couldn't edit your instruction",
          "We had an issue trying to update your instruction.",
          [{ text: "Okay" }]
        );
    }
  };

  const onChangeNewIngredientHandler = (id, text) => {
    const newAddIngredients = [...addNewIngredients];
    const index = newAddIngredients.findIndex((ing) => ing.id === id);
    const updateNewIngredient = {
      ...newAddIngredients[index],
      ingredient: text,
    };
    newAddIngredients[index] = updateNewIngredient;
    setAddNewIngredients(newAddIngredients);
  };
  const onChangeNewInstructionHandler = (id, text) => {
    const newAddInstructions = [...addNewInstructions];
    const index = newAddInstructions.findIndex((ins) => ins.id === id);
    const updateNewInstruction = {
      ...newAddInstructions[index],
      instruction: text,
    };
    newAddInstructions[index] = updateNewInstruction;
    setAddNewInstructions(newAddInstructions);
  }

  const onEndNewInstructionEdit = async (id) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const findNewInstruction = addNewInstructions.find((ins) => ins.id === id);
      if (checkEmpty(findNewInstruction.instruction)) Alert.alert("We couldn't save your ingredient.", "Sorry we couldn't save your ingredient, make sure that it's not empty", [{text: 'Okay'}])
      const getId = await fetch(`${ENVS.url}/recipes/addInstruction`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": token,
        },
        method: "POST",
        body: JSON.stringify({
          recipeId: recipeId,
          instruction: findNewInstruction.instruction,
          id: id
        }),
      });
      const addId = await getId.json();
      const findIndex = addNewInstructions.findIndex(ins => ins.id === id);
      const newInstructions = [...addNewInstructions];
      const newId = { ...addNewInstructions[findIndex], id: addId.id };
      newInstructions[findIndex] = newId;
      setAddNewInstructions(newInstructions);
    } catch (err) {
      if (err)
        Alert.alert(
          "Sorry we couldn't add your instruction.",
          "Sorry we couldn't add your instruction.",
          [{ text: "Okay" }]
        );
    }
  };

  const onEndNewIngredientEdit = async (id) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const findNewIngredient = addNewIngredients.find((ing) => ing.id === id);
      if (checkEmpty(findNewIngredient.ingredient)) Alert.alert("We couldn't save your ingredient.", "Sorry we couldn't save your ingredient, make sure that it's not empty", [{text: 'Okay'}])
      const getId = await fetch(`${ENVS.url}/recipes/addIngredient`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": token,
        },
        method: "POST",
        body: JSON.stringify({
          recipeId: recipeId,
          ingredient: findNewIngredient.ingredient,
          id: id
        }),
      });
      const addId = await getId.json();
      const findIndex = addNewIngredients.findIndex(ing => ing.id === id);
      const newIngredients = [...addNewIngredients];
      const newId = { ...addNewIngredients[findIndex], id: addId.id };
      newIngredients[findIndex] = newId;
      setAddNewIngredients(newIngredients);
    } catch (err) {
      if (err)
        Alert.alert(
          "Sorry we couldn't add your ingredient.",
          "Sorry we couldn't add your ingredient.",
          [{ text: "Okay" }]
        );
    }
  };

  const onChangeIngredientHandler = (id, text) => {
    const newIngredients = [...ingredients];
    const index = ingredients.findIndex((ing) => ing.id === id);
    const updateIngredient = { ...ingredients[index], ingredient: text };
    newIngredients[index] = updateIngredient;
    setIngredient(newIngredients);
  };

  const onEndIngredientEdit = async (id) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const findIngredient = ingredients.find((ing) => ing.id === id);
      if (checkEmpty(findIngredient.ingredient)) return Alert.alert("Sorry we can't update your ingredient", "Please make sure your last ingredient contains some text.", [{text: 'Okay'}])
      await fetch(`${ENVS.url}/recipes/updateIngredient`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": token,
        },
        method: "POST",
        body: JSON.stringify({ id: id, ingredient: findIngredient.ingredient }),
      });
    } catch (err) {
      console.log(err);
    }
  };

  const onEndTitleHandler = async () => {
    try {
      if (checkEmpty(title)) return Alert.alert("Sorry we couldn't update your title", "Please make sure that your title has some text in it.", [{text: 'Okay'}])
      const token = await AsyncStorage.getItem("token");
      await fetch(`${ENVS.url}/recipes/updateTitle`, {
        headers: {
          'Content-Type': 'application/json',
          "Authorization": token
        },
        method: 'POST',
        body: JSON.stringify({ recipeId: recipeId, title: title })
      })
    } catch (err) {
      if (err) Alert.alert("Sorry we couldn't update your title", "Sorry we couldn't update your title", [{text: 'Okay'}])
    }
  }

  return (
    <ScrollView contentContainerStyle={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.screen}>
          <Text
            style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}
          >
            Anything you edit here will automatically update for you!
          </Text>
          <View style={styles.title}>
            <View style={styles.titleHolder}>
              <CustomTextInput
                placeholder="Title..."
                style={styles.customText}
                value={title}
                multiline
                onChangeText={(text) => setTitle(text)}
                onEndEditing={onEndTitleHandler}
              />
            </View>
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
                      onEndEditing={onEndIngredientEdit.bind(this, ing.id)}
                    />
                  ))}
                  {addNewIngredients.map((ing) => (
                    <Holder
                      key={ing.id}
                      customPlaceholder="Ingredient..."
                      value={ing.ingredient}
                      onChangeText={onChangeNewIngredientHandler.bind(
                        this,
                        ing.id
                      )}
                      onEndEditing={onEndNewIngredientEdit.bind(this, ing.id)}
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
                  {instructions.map((ins, index) => (
                    <Holder
                      key={ins.id}
                      value={ins.instruction}
                      customPlaceholder="Method..."
                      onChangeText={onChangeInstructionHandler.bind(
                        this,
                        ins.id
                      )}
                      onEndEditing={onEndInstructionEdit.bind(this, ins.id)}
                    />
                  ))}
                  {addNewInstructions.map((ins) => (
                    <Holder
                      key={ins.id}
                      customPlaceholder="Instruction..."
                      value={ins.instruction}
                      onChangeText={onChangeNewInstructionHandler.bind(this, ins.id)}
                      onEndEditing={onEndNewInstructionEdit.bind(this, ins.id)}
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
              />
            </View>
          </View>
          <View style={{ alignItems: "center", marginTop: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>Category</Text>
            <Picker selectedValue={category} style={{ width: 120 }}>
              <Picker.Item label="Starter" value="starter" />
              <Picker.Item label="Main" value="main" />
              <Picker.Item label="Dessert" value="dessert" />
              <Picker.Item label="Baking" value="baking" />
              <Picker.Item label="Other" value="other" />
            </Picker>
          </View>
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
