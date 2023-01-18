import { useState, ReactNode } from "react"
import { LanguageContext } from "../contexts/LanguageContext"

interface LanguageProviderProps {
  children: ReactNode
}

const LanguageProvider = (props: LanguageProviderProps) => {
  const [language, setLanguage] = useState("en")

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {props.children}
    </LanguageContext.Provider>
  )
}

export default LanguageProvider
