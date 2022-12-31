import { useState } from 'react'
import './App.css'
import RecipeCard from './components/RecipeCard'

function App() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [recipes, setRecipes] = useState([])
  const [ingredients, setIngredients] = useState("")

  const generatePrompt = (ingredients: string) => {
    return `Suggest me 5 names of recipes that I can make with this list of ingredients : ${ingredients}.`
  }

  const showRecipes = recipes.map((name: string, i: number) => {
    return (<RecipeCard recipeName={name} key={i} />)
  })

  const fetchOpenAI = async () => {
    setLoading(true)
    fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(
        {
          prompt: generatePrompt(ingredients),
          max_tokens: 1000,
          model: 'text-davinci-003',
          temperature: 0.6
        }
      )
    }).then(
      async (response) => {
        let d = await response.json()
        setRecipes((d?.choices[0].text).trim().split('\n'))
      }
    ).catch(
      (err) => setError(err)
    ).finally(() => setLoading(false))
  }

  if (error) return (<h1>A problem occurred when fetching data</h1>)

  return (
    <div className="App">
      <h1>What are we eating tonight ?</h1>
      <p>I'm a person who doesn't like food waste, so I came up with the idea of creating a
        little app that allows us to get suggestions for recipe ideas by simply filling in
        the food scraps that are in our fridge.</p>
      <form>
        <label htmlFor="ingredients">Ingredients : </label>
        <input
          onChange={(e) => setIngredients(e.target.value)}
          type="text" id="ingredients"
          value={ingredients}
          placeholder="3 eggs, milk, flour, sugar, butter..." />
        <button
          onClick={fetchOpenAI}
          disabled={loading}
          style={{ display: (ingredients) ? "block" : "none" }}>
          Cook the leftovers
        </button>
      </form>

      <div style={{ display: (recipes.length > 0) ? "block" : "none" }}>
        <p>Here are some recipe suggestions, click on any of them to get detailed instructions.</p>
        <div className="container">
          {(recipes.length > 0) ? showRecipes : null}
        </div>
      </div>
    </div>
  )
}

export default App
