import { FormEvent, useState } from 'react'
import './App.css'
import RecipeCard from './components/RecipeCard'
import { recipeInstructions, recipeSuggestions, toList, generateHTML } from './utils'

function App() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [recipes, setRecipes] = useState<string[]>([])
  const [ingredients, setIngredients] = useState("")
  const [instructions, setInstructions] = useState("")

  const fetchOpenAI = async (prompt: string, getRecipes: boolean = true) => {
    setLoading(true)
    fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(
        {
          prompt: prompt,
          max_tokens: 2000,
          model: 'text-davinci-003',
          temperature: 0.6
        }
      )
    }).then(
      async (response) => {
        let d = await response.json()
        if (getRecipes) setRecipes(toList(d?.choices[0].text))
        else setInstructions(d?.choices[0].text)
      }
    ).catch(
      (err) => setError(err)
    ).finally(() => setLoading(false))
  }

  const showRecipes = recipes.map((name: string, i: number) => {
    return (<RecipeCard recipeName={name} key={i}
      onPress={() => fetchOpenAI(recipeInstructions(name), false)} />)
  })

  return (
    <div className="App">
      <h1>What are we eating tonight ?</h1>
      <p>I'm a person who doesn't like food waste, so I came up with the idea of creating a
        little app that allows us to get suggestions for recipe ideas by simply filling in
        the food scraps that are in our fridge.</p>
      <form onSubmit={(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        fetchOpenAI(recipeSuggestions(ingredients))
      }}>
        <label htmlFor="ingredients">Ingredients : </label>
        <input
          onChange={(e) => setIngredients(e.target.value)}
          type="text" id="ingredients"
          value={ingredients}
          placeholder="3 eggs, milk, flour, sugar, butter..." />
        <button
          disabled={loading}
          style={{ display: (ingredients) ? "block" : "none" }}
          type="submit">
          Cook the leftovers
        </button>
      </form>

      {error && (<h1>A problem occurred when fetching data</h1>)}

      {loading && (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div aria-label="Orange and tan hamster running in a metal wheel" role="img" className="wheel-and-hamster">
            <div className="wheel"></div>
            <div className="hamster">
              <div className="hamster__body">
                <div className="hamster__head">
                  <div className="hamster__ear"></div>
                  <div className="hamster__eye"></div>
                  <div className="hamster__nose"></div>
                </div>
                <div className="hamster__limb hamster__limb--fr"></div>
                <div className="hamster__limb hamster__limb--fl"></div>
                <div className="hamster__limb hamster__limb--br"></div>
                <div className="hamster__limb hamster__limb--bl"></div>
                <div className="hamster__tail"></div>
              </div>
            </div>
            <div className="spoke"></div>
          </div>
        </div>
      )}

      {!loading && (
        <div style={{ display: (recipes.length > 0) ? "block" : "none" }}>
          <p>Here are some recipe suggestions, click on any of them to get detailed instructions.</p>
          <div className="container">
            {(recipes.length > 0) ? showRecipes : null}
          </div>
        </div>
      )}

      <div style={{ display: (instructions) ? "block" : "none" }}>
        <h2>Recipe Instructions</h2>
        {(instructions) ? generateHTML(instructions) : null}
      </div>
    </div>
  )
}

export default App
