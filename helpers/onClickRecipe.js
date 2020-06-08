import { updateFavourite, addRating, addReview } from '../store/actions/recipe';1
import ENVS from '../env';

const onClickRecipe = async (navigation, dispatch, recipeId, userId, token, title, image, cookTime, prepTime, fromMyRecipe) => {
  try {
    const result = await fetch(
      `${ENVS.url}/recipes/singleRecipe/${recipeId}/${userId}`,
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": token,
        },
      }
    );
    const contents = await result.json();
    dispatch(updateFavourite(contents.isFav, null));
    navigation.navigate("View Recipe", {
      title: title,
      image: `${ENVS.url}/${image}`,
      ingredients: contents.ingredients,
      instructions: contents.instructions,
      cookTime: cookTime,
      prepTime: prepTime,
      recipeId: recipeId,
      fromMyRecipe: fromMyRecipe,
      reviews: contents.reviews,
      isReviewed: contents.isReviewed
    });
  } catch (err) {
    console.log(err);
  }
}

export default onClickRecipe;