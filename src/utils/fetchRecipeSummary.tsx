type FetchRecipeSummaryProps = {
  id: string | undefined;
};

export const fetchRecipeSummary = async function ({
  id,
}: FetchRecipeSummaryProps) {
  let data;
  const apiKey = localStorage.getItem("apiKey");

  await Promise.all([
    fetch(`https://api.spoonacular.com/recipes/${id}/summary?apiKey=${apiKey}`),
    fetch(
      `https://api.spoonacular.com/recipes/${id}/ingredientWidget.json?apiKey=${apiKey}`
    ),
  ])
    .then((responses) =>
      Promise.all(responses.map((response) => response.json()))
    )
    .then((d) => {
      data = d;
    })
    .catch((err) => {
      console.log("error fetching data", err);
    });

  return data;
};
