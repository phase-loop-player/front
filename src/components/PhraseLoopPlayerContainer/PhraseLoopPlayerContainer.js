import React, { useEffect } from "react"
import to from "await-to-js"
import { toast } from "react-toastify"
import queryString from "query-string"
import useLocalStorageState from "use-local-storage-state"
import { getSubtitles } from "youtube-captions-scraper-yoyota"
import PhraseLoopPlayer from "../PhraseLoopPlayer/PhraseLoopPlayer"

export default function PhraseLoopPlayerContainer({ url }) {
  const [regions, setRegions] = useLocalStorageState("regions")

  useEffect(() => {
    async function fetchCaptions() {
      if (!url) {
        return
      }
      const { v } = queryString.parse(url.match(/\?(.*)/g).pop())
      const [err, captions] = await to(
        getSubtitles({
          videoID: v,
          lang: "en",
          url: "https://cors.yoyota.dev/https://www.youtube.com"
        })
      )
      if (err) {
        toast.error(err.string())
      }
      setRegions(null)
      localStorage.setItem("loopIndex", 0)
      setRegions(captions)
    }
    fetchCaptions()
  }, [setRegions, url])

  if (!regions || regions.length === 0) {
    return <div />
  }
  return <PhraseLoopPlayer url={url} regions={regions} />
}
