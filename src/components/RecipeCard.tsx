interface RecipeCardProps {
  readonly recipeName: string
  readonly disabled: boolean
  /* This function allows to emit data from this
  component to parent component (App.tsx) */
  onDataEmit: (recipeName: string) => void
}

const RecipeCard = (props: RecipeCardProps) => {
  const emitData = () => {
    props.onDataEmit(props.recipeName)
  }

  return (
    <div className="recipe-card">
      <h3>{props.recipeName}</h3>
      <button onClick={emitData} disabled={props.disabled}>
        How to make this recipe ?
      </button>
    </div>
  )
}

export default RecipeCard
