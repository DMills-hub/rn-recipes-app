import { updateFavourite, setError } from '../store/actions/recipe';
import ENVS from '../env';

const onClickRecipe = async (navigation: any, dispatch: any, recipeId: number | string, userId: number | string, token: string, title: string, image: string, cookTime: string, prepTime: string, serving: string, fromMyRecipe: boolean) => {
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
    navigation.navigate("ViewRecipe", {
      title: title,
      image: `${ENVS.imagesUrl}/${image}`,
      ingredients: contents.ingredients,
      instructions: contents.instructions,
      cookTime: cookTime,
      prepTime: prepTime,
      serves: serving,
      recipeId: recipeId,
      fromMyRecipe: fromMyRecipe,
      reviews: contents.reviews,
      isReviewed: contents.isReviewed
    });
  } catch (err) {
    dispatch(setError("Sorry we coudln't get that recipe"))
  }
}

export default onClickRecipe;