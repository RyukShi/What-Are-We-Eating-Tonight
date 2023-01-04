const recipeSuggestions = (ingredients: string) => {
    return `Suggest me 5 names of recipes that I can make with this list of ingredients : ${ingredients} !`
}

const recipeInstructions = (recipeName: string) => {
    return `Give me detailed instructions to make ${recipeName} !`
}

const toList = (text: string) => {
    return text.trim().split('\n')
}

const generateHTML = (text: string) => {
    return text
        .split('\n')
        .map((str: string, i: number) => (str) ? <p key={`p${i}`}>{str}</p> : null)
}

export { recipeSuggestions, recipeInstructions, toList, generateHTML }
