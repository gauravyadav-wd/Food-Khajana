type IngredientProps = {
  data: any;
  values: string;
};

const Ingredient = ({ data, values }: IngredientProps) => {
  console.log(values, data);

  const weight =
    values === "us" ? data.amount.us.value : data.amount.metric.value;
  const unit = values === "us" ? data.amount.us.unit : data.amount.metric.unit;

  return (
    <div className="ingredient">
      <p>
        {weight} {unit}
      </p>
      <img
        src={`https://spoonacular.com/recipeImages/${data.image}`}
        width="60"
        alt="ing1"
      />
      <p>{data.name}</p>
    </div>
  );
};

export default Ingredient;
