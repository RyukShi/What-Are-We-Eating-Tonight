const recipeSuggestions = (
    ingredients: string,
    expertMode: boolean = false,
    language: string = 'en'
) => {
    if (language === 'en') {
        if (expertMode) {
            return (`You are an experienced chef, I give you this list 
            of ingredients: (${ingredients}), and you have to concoct me 
            with originality 5 gastronomic recipes, just give me the 
            name of these 5 recipes !`)
        } else {
            return (`I'm a novice cooker, suggest me 5 names of recipes 
            that I can make easily and quickly with this list of 
            ingredients : ${ingredients} !`)
        }
    } else {
        if (expertMode) {
            return (`Tu es un cuisinier expérimenté, je te donne cette 
            liste d'ingrédients : (${ingredients}), et tu dois me 
            concocter avec originalité 5 recettes gastronomiques, donne 
            moi uniquement l'intitulé de ces 5 recettes !`)
        } else {
            return (`Je suis un cuisiner débutant, suggérez-moi 5 intitulés 
            de recettes que je peux faire facilement et rapidement avec 
            cette liste d'ingrédients : ${ingredients} !`)
        }
    }
}

const recipeInstructions = (recipeName: string, language: string = 'en') => {
    if (language === 'en') {
        return (`Give me detailed instructions to make ${recipeName} !`)
    } else {
        return (`Donne moi les instructions détaillées afin de réaliser 
        cette recette : ${recipeName} !`)
    }
}

const toList = (text: string) => {
    return text.trim().split('\n')
}

const generateHTML = (text: string) => {
    return text
        .split('\n')
        .map((str: string) => (str) ? <p key={str}>{str}</p> : null)
}

export { recipeSuggestions, recipeInstructions, toList, generateHTML }
