import { useContext, useState } from "react"
import { LanguageContext } from "../contexts/LanguageContext"

const HowItWorks = () => {
  const [show, setShow] = useState(false)
  const { language } = useContext(LanguageContext)

  return (
    <div>
      <h2>
        {
          (language === 'en') ?
            "How does this app work?" :
            "Comment cette application fonctionne?"
        }
      </h2>
      <p>
        {
          (language === 'en') ?
            "Press this button to discover!" :
            "Appuyez sur ce bouton pour découvrir!"
        }
      </p>
      <button type="button" onClick={() => setShow(!show)}>
        {
          (language === 'en') ?
            ((show) ? "Reduce" : "How it works?") :
            ((show) ? "Réduire" : "Comment ça marche?")
        }
      </button>
      {show && (
        <div>
          <h3>
            {
              (language === 'en') ?
                "Using the OpenAI API" :
                "L'API de complétion de texte d'OpenAI"
            }
          </h3>
          <p>
            {
              (language === 'en') ? 
              `I had the idea of using artificial intelligence to generate 
              recipe suggestions based on ingredients previously entered by 
              the user. This is a big challenge. And thanks to the text 
              completion API created by OpenAI, it allows to generate recipe 
              suggestions perfectly. For the curious, I give you the link to 
              the OpenAI API documentation to better understand how it 
              works.` : 
              `J'ai eu l'idée d'utiliser l'intelligence artificielle pour 
              générer des suggestions de recettes sur la base des 
              ingrédients précédemment saisis par l'utilisateur. C'est un 
              défi de taille. Et grâce à l'API de complétion de texte créée 
              par OpenAI, cela permet de générer des suggestions de recettes 
              parfaitement. Pour les curieux, je vous donne le lien vers la 
              documentation de l'API OpenAI pour mieux comprendre son 
              fonctionnement.`
            }
            <a href="https://beta.openai.com/docs/guides/completion/text-completion"
              target="_blank" rel="noopener noreferrer">
              Text Completion API
            </a>
          </p>
          <p>
            {
              (language === 'en') ? 
              `In future versions of this application, I will tailor the 
              recipe suggestions to the user's preferences and dietary 
              restrictions (such as vegan).` : 
              `Dans les futures versions de cette application, j'adapterai 
              les suggestions de recettes aux préférences de l'utilisateur 
              et à ses restrictions alimentaires (végétaliennes, par exemple).`
            }
          </p>
        </div>
      )}
    </div>
  )
}

export default HowItWorks
