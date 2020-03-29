import { useState } from "react"

export default function useLocalStorage(localStorageKey) {
  const [value, setValue] = useState(
    localStorage.getItem(localStorageKey) || ""
  )
  function onChange(e) {
    setValue(e.target.value)
    localStorage.setItem(localStorageKey, e.target.value)
  }
  return [value, onChange]
}
