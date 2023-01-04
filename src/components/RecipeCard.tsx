interface RecipeCardProps {
    readonly recipeName: string
    onPress(): void
}

const RecipeCard = (props: RecipeCardProps) => {
    return (
        <div className="recipe-card">
            <h3>{props.recipeName}</h3>
            <button onClick={props.onPress}>How to make this recipe ?</button>
        </div>
    )
}

export default RecipeCard
