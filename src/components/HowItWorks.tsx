import { useState } from "react"

const HowItWorks = () => {
  const [show, setShow] = useState(false)

  return (
    <div>
      <h2>How does this app work?</h2>
      <p>Press this button to discover!</p>
      <button type="button" onClick={() => setShow(!show)}>
        {(show) ? "Reduce" : "How it works?"}
      </button>
      {show && (
        <div>
          <h3>Using the OpenAI API</h3>
          <p>
            I had the idea of using artificial intelligence to generate recipe
            suggestions based on ingredients previously entered by the user. This
            is a big challenge. And thanks to the text completion API created by
            OpenAI, it allows to generate recipe suggestions perfectly.
            For the curious, I give you the link to the OpenAI API documentation
            to better understand how it works.
            <a href="https://beta.openai.com/docs/guides/completion/text-completion"
              target="_blank" rel="noopener noreferrer">
              Text Completion API
            </a>
          </p>
          <p>
            In future versions of this application, I will tailor the recipe
            suggestions to the user's preferences and dietary restrictions
            (such as vegan).
          </p>
        </div>
      )}
    </div>
  )
}

export default HowItWorks
