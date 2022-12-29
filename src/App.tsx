import { useState } from 'react'
import './App.css'

function App() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)

  const generatePrompt = (ingredients: string) => {
    return `Propose moi au maximum 5 intitulés de recettes que je peux réaliser avec cette liste d'ingrédients suivante : ${ingredients}.`
  }

  const fetchOpenAPI = async () => {
    setLoading(true)
    fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(
        {
          prompt: generatePrompt('3 œufs, lait, farine, sucre, 3 bananes'),
          max_tokens: 1000,
          model: 'text-davinci-003',
          temperature: 0.6
        }
      )
    }).then(
      async (response) => setData(await response.json())
    ).catch(
      (err) => setError(err)
    ).finally(() => setLoading(false))
  }

  if (error) return (<p>A problem occurred while creating the query</p>)

  return (
    <div className="App">
      <h1>What are we eating tonight ?</h1>
      <p>I'm a person who doesn't like food waste, so I came up with the idea of creating a
        little app that allows us to get suggestions for recipe ideas by simply filling in
        the food scraps that are in our fridge.</p>
      <form>
        <label htmlFor="ingredients">Ingredients</label>
        <input type="text" id="ingredients" placeholder="3 eggs, milk, flour, sugar, butter..." />
        <button onClick={fetchOpenAPI} disabled={loading}>Cook the leftovers</button>
      </form>

      <p>{(data != null) ? data?.choices[0].text : "No data"}</p>
    </div>
  )
}

export default App
