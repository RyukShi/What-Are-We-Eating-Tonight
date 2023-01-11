interface RecipeCardProps {
  readonly recipeName: string
  readonly disabled: boolean
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
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
      <div className="container">
        <button onClick={props.onClick} disabled={props.disabled}>
          How to make this recipe ?
        </button>
        <button onClick={emitData}>
          Show YouTube Videos!
        </button>
      </div>
    </div>
  )
}

export default RecipeCard
