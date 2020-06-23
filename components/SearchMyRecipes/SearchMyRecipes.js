import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { SearchBar } from "react-native-elements";
import { getMyRecipes, searchMyRecipes } from "../../store/actions/recipe";

const Search = (props) => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");
  const [searching, setSearching] = useState(false);

  const onSubmitSearch = async () => {
    setSearching(true);
    try {
      if (searchValue === "") {
        await dispatch(getMyRecipes());
        setSearching(false);
        return;
      }
      await dispatch(searchMyRecipes(searchValue));
    } catch (err) {
      if (err) console.log(err);
    }
    setSearching(false);
  };

  const onClearSearch = async () => {
    setSearchValue("");
    setSearching(true);
    try {
      await dispatch(getMyRecipes());
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
