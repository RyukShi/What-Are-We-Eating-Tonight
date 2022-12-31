import React from "react"

interface Props {
    readonly recipeName: string
}

const RecipeCard: React.FC<Props> = ({ recipeName }) => {
    return (
        <div className="recipe-card" onClick={() => { console.log("Click!") }}>
            <h3>{recipeName}</h3>
        </div>
    )
}

export default RecipeCard
