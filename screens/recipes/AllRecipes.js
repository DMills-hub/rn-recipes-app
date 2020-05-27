import React, { useEffect } from "react";
import { View, Text } from "react-native";
// import ENVS from "../../env";
// import { useSelector } from "react-redux";

const AllRecipes = (props) => {
  // Authorization test
  // const token = useSelector((state) => state.auth.token);

  // useEffect(() => {
  //   const test = async () => {
  //     try {
  //       const result = await fetch(`${ENVS.url}/`, {
  //         headers: {
  //           "Content-Type": "application/json",
  //           "Authorization": token,
  //         },
  //       });
  //       const testRes = await result.json();
  //       console.log(testRes);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   test();
  // }, []);

  return (
    <View>
      <Text>All Recipes Screen</Text>
    </View>
  );
};

export default AllRecipes;
