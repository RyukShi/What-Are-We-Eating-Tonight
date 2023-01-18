import { useContext } from "react"
import { LanguageContext } from "../contexts/LanguageContext"

function LanguageSelector() {
  const { language, setLanguage } = useContext(LanguageContext)

  return (
    <div>
      <label htmlFor="select-languages">
        First, choose your language
      </label>
      <select
        id="select-languages"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}>
        <option value="en">English</option>
        <option value="fr">French</option>
      </select>
    </div>
  )
}

export default LanguageSelector
