import { useContext } from "react"
import { LanguageContext } from "../contexts/LanguageContext"
import LanguageSelector from "./LanguageSelector"
import HowItWorks from "./HowItWorks"

const Introduction = () => {
  const { language } = useContext(LanguageContext)

  return (
    <div>
      <h1>
        {
          (language === 'en') ?
            "What are we eating tonight ?" :
            "Qu'est-ce qu'on mange ce soir ?"
        }
      </h1>

      <LanguageSelector />

      <p>
        {
          (language === 'en') ?
            `I'm a person who doesn't like food waste, so I came up with the 
          idea of creating a little app that allows us to get suggestions 
          for recipe ideas by simply filling in the food scraps that are 
          in our fridge.` :
            `Je suis une personne qui n'aime pas le gaspillage alimentaire, 
          c'est pourquoi j'ai eu l'idée de créer une petite application 
          qui nous permet d'obtenir des suggestions de recettes en indiquant 
          simplement les restes de nourriture qui se trouvent dans notre 
          réfrigérateur.`
        }
      </p>

      <HowItWorks />
    </div>
  )
}

export default Introduction
