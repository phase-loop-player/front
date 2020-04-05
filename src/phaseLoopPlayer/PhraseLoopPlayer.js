import React, { useRef, useState, useEffect, useCallback } from "react"
import "rc-slider/assets/index.css"
import ReactPlayer from "react-player"
import { GlobalHotKeys } from "react-hotkeys"
import { Button } from "react-bootstrap"
import Slider from "rc-slider"

import useLoop from "../hooks/useLoop"
import useReactPlayerCallback from "../hooks/useReactPlayerCallback"
import useLoopIndex from "../hooks/useLoopIndex"
import RangeInput from "./RangeInput"

function PhraseLoopPlayer({ url, regions }) {
  const playerRef = useRef()
  const [player, setPlayer] = useState()
  const [duration, setDuration] = useState(0)
  const [videoState, setVideoState] = useState({ playedSeconds: 0 })
  const { onReady, onProgress } = useReactPlayerCallback({
    setPlayer,
    setDuration,
    playerRef,
    setVideoState
  })
  const { loopIndex, setLoopIndex, addLoopIndex } = useLoopIndex(regions)
  const [loopRegion, setLoopRegion] = useState(regions[loopIndex])
  useLoop({ player, loopRegion })
  useEffect(() => {
    setLoopRegion(regions[loopIndex])
  }, [loopIndex, regions])

  const handleSeekChange = useCallback(
    time => {
      const index = regions.findIndex(
        ({ start, end }) => start < time && time < end
      )
      if (index !== -1) {
        setLoopIndex(index)
      }
    },
    [regions, setLoopIndex]
  )

  const handlers = {
    next: () => addLoopIndex(1),
    previous: () => addLoopIndex(-1)
  }

  const keyMap = {
    next: ["right"],
    previous: ["left"]
  }

  return (
    <GlobalHotKeys keyMap={keyMap} handlers={handlers} allowChanges>
      <h5>player</h5>
      <ReactPlayer
        playing
        ref={playerRef}
        url={url}
        onReady={onReady}
        onProgress={onProgress}
        width="100%"
        height={window.innerHeight / 2}
      />
      <Slider
        className="my-5"
        value={videoState.playedSeconds}
        min={0}
        max={duration}
        step={0.01}
        onChange={handleSeekChange}
      />
      <RangeInput
        regions={regions}
        duration={duration}
        loopRegion={loopRegion}
        setLoopRegion={setLoopRegion}
        playedSeconds={videoState.playedSeconds}
      />
      <div className="mt-5">
        <Button size="lg" onClick={() => addLoopIndex(-1)}>
          Previous
        </Button>
        <Button size="lg" onClick={() => addLoopIndex(1)}>
          Next
        </Button>
      </div>
    </GlobalHotKeys>
  )
}
export default PhraseLoopPlayer
