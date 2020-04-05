import React, { useState, useEffect } from "react"
import InputForm from "./InputForm"
import PhraseLoopPlayer from "./PhraseLoopPlayer"

function catchException(fn) {
  try {
    fn()
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e)
  }
}

export default function PhraseLoopPlayerContainer() {
  const [url, setUrl] = useState("url")
  const [regions, setRegions] = useState()

  useEffect(() => {
    catchException(() => {
      const settingsString = localStorage.getItem("settings")
      if (!settingsString) {
        return
      }
      const settings = JSON.parse(settingsString)
      const { values } = settings
      if (values.url) {
        setUrl(values.url)
      }
    })
  }, [])

  useEffect(() => {
    catchException(() => {
      const regionsString = localStorage.getItem("regions")
      if (!regionsString) {
        return
      }
      setRegions(JSON.parse(regionsString))
    })
  }, [])

  return (
    <>
      <h1>Phase loop player</h1>
      <InputForm url={url} setUrl={setUrl} setRegions={setRegions} />
      <PhraseLoopPlayer url={url} regions={regions} />
    </>
  )
}
