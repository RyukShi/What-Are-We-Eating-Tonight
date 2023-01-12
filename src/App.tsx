import { FormEvent, useState } from 'react'
import './App.css'
import RecipeCard from './components/RecipeCard'
import YouTubeVideoCard from './components/YouTubeVideoCard'
import HamsterLoader from './components/HamsterLoader'
import YouTubeVideo from './YouTubeVideo'
import HowItWorks from './components/HowItWorks'
import { recipeInstructions, recipeSuggestions, toList, generateHTML } from './utils'

function App() {
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({
    youTubeAPI: null,
    openAI: null
  })
  const [recipes, setRecipes] = useState<string[]>([])
  const [ingredients, setIngredients] = useState("")
  const [instructions, setInstructions] = useState("")
  const [videos, setVideos] = useState<YouTubeVideo[]>([])

  const updateError = (type: keyof typeof errors, error: any) => {
    setErrors({ ...errors, [type]: error })
  }

  /* This function allows to fetch OpenAI completions API, to get recipe
  suggestions or recipe instructions */
  const fetchOpenAI = async (prompt: string, getRecipes: boolean = true) => {
    setLoading(true)
    updateError("openAI", null)
    fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(
        {
          prompt: prompt,
          max_tokens: 1000,
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
      (err) => updateError("openAI", err)
    ).finally(() => setLoading(false))
  }

  /* This function allows to fetch YouTube API, to get videos */
  const fetchYouTubeAPI = async (query: string) => {
    updateError("youTubeAPI", null)
    let KEY = import.meta.env.VITE_YOUTUBE_API_KEY
    let maxResults = 10
    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&maxResults=${maxResults}&key=${KEY}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      }
    }).then(
      async (response) => {
        let json = await response.json()
        let videosTemp: YouTubeVideo[] = []
        for (let obj of json?.items as any[]) {
          let title = obj.snippet.title
          let thumbnailsUrl = obj.snippet.thumbnails.medium.url
          let videoId = obj.id.videoId
          videosTemp.push(new YouTubeVideo(videoId, thumbnailsUrl, title))
        }
        setVideos(videosTemp)
      }
    ).catch((err) => updateError("youTubeAPI", err))
  }

  /* This function is used to retrieve the data
  sent from the child component (RecipeCard) */
  const handleChildData = (recipeName: string) => {
    /* Remove dots and numbers from string */
    recipeName = recipeName.replace(/[0-9.]/g, "")
    fetchOpenAI(recipeInstructions(recipeName), false)
    fetchYouTubeAPI(`How to make ${recipeName}`)
  }

  const showRecipes = recipes.map((name: string) => {
    return (<RecipeCard recipeName={name} key={name}
      disabled={loading} onDataEmit={handleChildData} />)
  })

  const showVideos = videos.map((v: YouTubeVideo) => {
    return (<YouTubeVideoCard video={v} key={v.videoId} />)
  })

  return (
    <div className="App">
      <h1>What are we eating tonight ?</h1>
      <p>
        I'm a person who doesn't like food waste, so I came up with the idea of creating a
        little app that allows us to get suggestions for recipe ideas by simply filling in
        the food scraps that are in our fridge.
      </p>

      <HowItWorks />

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

      {errors.openAI && (<h3>An error occurred while fetching data. Please try
        again later or contact support if the problem persists.</h3>)}

      {(recipes.length > 0 && !loading) && (
        <div>
          <p>
            Here are some recipe suggestions, click on any of them to get
            detailed instructions.
          </p>
          <div className="container">
            {showRecipes}
          </div>
        </div>
      )}

      {loading && <HamsterLoader />}

      {(instructions && !loading) && (
        <div>
          <h3>Recipe Instructions</h3>
          {generateHTML(instructions)}
        </div>
      )}

      {errors.youTubeAPI && (<h3>An error occurred while fetching Youtube videos.
        Please try again later or contact support if the problem persists.</h3>)}

      {(videos.length > 0 && !loading) && (
        <div>
          <h3>YouTube videos</h3>
          <p>
            Here are several YouTube video suggestions that are related
            to the recipe, click on any of them to get video.
          </p>
          <div className="container">
            {showVideos}
          </div>
        </div>
      )}
    </div>
  )
}

export default App
