type RecipeItemProps = {
  imageUrl: string;
  title: string;
  onClick: () => void;
};

const RecipeItemCard = ({ imageUrl, title, onClick }: RecipeItemProps) => {
  return (
    <div className="recipe-item" onClick={onClick}>
      <img src={imageUrl} alt={title} />
      <h2>{title}</h2>
    </div>
  );
};

export default RecipeItemCard;
