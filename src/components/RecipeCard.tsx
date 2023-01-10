interface RecipeCardProps {
  readonly recipeName: string
  readonly disabled: boolean
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const RecipeCard = (props: RecipeCardProps) => {
  return (
    <div className="recipe-card">
      <h3>{props.recipeName}</h3>
      <button onClick={props.onClick} disabled={props.disabled}>
        How to make this recipe ?
      </button>
    </div>
  )
}

export default RecipeCard
