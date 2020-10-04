import React, { useEffect } from "react"
import to from "await-to-js"
import { toast } from "react-toastify"
import queryString from "query-string"
import useLocalStorageState from "use-local-storage-state"
import { getSubtitles } from "youtube-captions-scraper-yoyota"
import PhraseLoopPlayer from "../PhraseLoopPlayer/PhraseLoopPlayer"

export default function PhraseLoopPlayerContainer({ url, averageDuration }) {
  const [regions, setRegions] = useLocalStorageState("regions")

  useEffect(() => {
    if (!url || regions) {
      return
    }
    async function fetchCaptions() {
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
      const intersection = fixOverlap(captions)
      const chunked = chunkRegions({
        averageDuration,
        regions: intersection
      })
      setRegions(chunked)
    }
    fetchCaptions()
  }, [averageDuration, regions, setRegions, url])

  if (!regions || regions.length === 0) {
    return <div />
  }
  return <PhraseLoopPlayer url={url} regions={regions} />
}

function fixOverlap(regions) {
  if (!regions) {
    return []
  }
  if (regions.length < 3) {
    return regions
  }
  if (regions[0].end === regions[2].start) {
    return regions.reduce((prev, curr, index) => {
      if (index % 2 === 1) {
        const prevRegion = regions[index - 1]
        const region = {
          ...prevRegion,
          text: `${prevRegion.text} ${curr.text}`
        }
        prev.pop()
        return [...prev, region]
      }
      return [...prev, curr]
    }, [])
  }
  return regions
}

function chunkRegions({ regions, averageDuration }) {
  if (!regions || regions.length === 0) {
    return []
  }
  return regions.reduce((prev, curr) => {
    const region = curr
    const chunkSize = Math.round(region.dur / averageDuration)
    const dur = region.dur / chunkSize

    if (chunkSize < 2) {
      return [...prev, region]
    }

    const chunks = [...Array(chunkSize).keys()].map(index => {
      const start = region.start + index * dur
      return { dur, start, end: start + dur, text: region.text }
    })

    return [...prev, ...chunks]
  }, [])
}
