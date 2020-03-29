import React, { useState, useEffect } from "react"
import Input from "../components/Input"
import useLocalStorage from "../hooks/useLocalStorage"
import PhraseLoopPlayer from "./PhraseLoopPlayer"
import { backend } from "../api"

export default function PhraseLoopPlayerContainer() {
  const [url, handleUrlChange] = useLocalStorage("url")
  const [minDuration, handleMinDurationChange] = useLocalStorage("minDuration")
  const [maxDuration, handleMaxDurationChange] = useLocalStorage("maxDuration")
  const [regions, setRegions] = useState()
  useEffect(() => {
    async function fetchRegions() {
      const storeKey = `${url}_${minDuration}_${maxDuration}`
      const storedRegions = localStorage.getItem(storeKey)
      if (storedRegions) {
        setRegions(JSON.parse(storedRegions))
        return
      }
      const { data } = await backend.get(
        `/regions?url=${url}&minDuration=${minDuration}&maxDuration=${maxDuration}`
      )
      setRegions(data.regions)
      localStorage.setItem(storeKey, JSON.stringify(data.regions))
    }
    fetchRegions()
  }, [maxDuration, minDuration, setRegions, url])

  if (!url || !regions) {
    return <div />
  }

  return (
    <>
      <h1>Phase loop player</h1>
      <Input label="url" value={url} onChange={handleUrlChange} />
      <Input
        label="minDuration"
        value={minDuration}
        onChange={handleMinDurationChange}
      />
      <Input
        label="maxDuration"
        value={maxDuration}
        onChange={handleMaxDurationChange}
      />
      <PhraseLoopPlayer url={url} regions={regions} />
    </>
  )
}
