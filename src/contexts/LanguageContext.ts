import { createContext } from "react"

interface LanguageContextType {
  language: string
  setLanguage: (newLanguage: string) => void
}

const defaultValue: LanguageContextType = {
  language: "en",
  setLanguage: (newLanguage: string) => { }
}

export const LanguageContext = createContext<LanguageContextType>(defaultValue)
