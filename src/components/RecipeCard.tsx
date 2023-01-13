interface RecipeCardProps {
  readonly recipeName: string
  /* This function allows to emit data from this
  component to parent component (App.tsx) */
  onDataEmit: (recipeName: string) => void
}

const RecipeCard = (props: RecipeCardProps) => {
  const emitData = () => {
    props.onDataEmit(props.recipeName)
  }

  return (
    <div className="recipe-card" onClick={emitData}>
      <h3>{props.recipeName}</h3>
    </div>
  )
}

export default RecipeCard
