import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { SearchBar } from "react-native-elements";
import { getAllRecipes, searchRecipes } from "../../store/actions/recipe";

const Search = (props) => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");
  const [searching, setSearching] = useState(false);

  const onSubmitSearch = async () => {
    setSearching(true);
    try {
      if (searchValue === "") {
        await dispatch(getAllRecipes(props.category));
        setSearching(false);
        return;
      }
      await dispatch(searchRecipes(props.category, searchValue));
    } catch (err) {
      if (err) console.log(err);
    }
    setSearching(false);
  };

  const onClearSearch = async () => {
    setSearchValue("");
    setSearching(true);
    try {
      await dispatch(getAllRecipes(props.category));
    } catch (err) {
      if (err) console.log(err);
    }
    setSearching(false);
  };

  return (
    <SearchBar
      onClear={onClearSearch}
      onCancel={onClearSearch}
      showLoading={searching}
      onSubmitEditing={onSubmitSearch}
      value={searchValue}
      onChangeText={(text) => setSearchValue(text)}
      placeholder="Search by Title..."
      platform={Platform.OS === "android" ? "android" : "ios"}
    />
  );
};

export default Search;
