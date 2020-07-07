import React from "react"
import useLocalStorageState from "use-local-storage-state"

import InputForm from "./InputForm"
import PhraseLoopPlayer from "./PhraseLoopPlayer"

export default function PhraseLoopPlayerContainer() {
  const [url, setUrl] = useLocalStorageState("url", "")
  const [regions, setRegions] = useLocalStorageState("regions")

  if (!regions || regions.length === 0) {
    return (
      <>
        <h1>Phrase loop player</h1>
        <InputForm url={url} setUrl={setUrl} setRegions={setRegions} />
      </>
    )
  }

  return (
    <>
      <h1>Phrase loop player</h1>
      <InputForm url={url} setUrl={setUrl} setRegions={setRegions} />
      <PhraseLoopPlayer url={url} regions={regions} />
    </>
  )
}
