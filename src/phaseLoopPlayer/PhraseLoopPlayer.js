import React, { useRef, useState, useCallback } from "react"
import "rc-slider/assets/index.css"
import ReactPlayer from "react-player"
import { HotKeys } from "react-hotkeys"
import { Button } from "react-bootstrap"

import Slider, { Range } from "rc-slider"

import { RANGE } from "../config"
import useLoop from "../hooks/useLoop"
import useRangeMarksMemo from "../hooks/useRangeMarksMemo"
import useReactPlayerCallback from "../hooks/useReactPlayerCallback"
import useUpdateLoopRegion from "../hooks/useUpdateLoopRegion"

function PhraseLoopPlayer({ url, regions = [] }) {
  const playerRef = useRef()
  const [player, setPlayer] = useState()
  const [duration, setDuration] = useState(0)
  const loopIndexRef = useRef(0)
  const [loopRegion, setLoopRegion] = useState(
    regions[0] || { start: 0, end: 5 }
  )
  const [videoState, setVideoState] = useState({ playedSeconds: 0 })

  useLoop({ player, loopRegion })
  const marks = useRangeMarksMemo({ regions, loopRegion })
  const { onReady, onProgress } = useReactPlayerCallback({
    setPlayer,
    setDuration,
    playerRef,
    setVideoState
  })
  const updateLoopRegion = useUpdateLoopRegion({
    player,
    regions,
    loopIndexRef,
    setLoopRegion
  })

  const handleSeekChange = useCallback(
    time => {
      player.seekTo(time)
      const index = regions.findIndex(
        ({ start, end }) => start < time && time < end
      )
      setLoopRegion(regions[index])
      loopIndexRef.current = index
    },
    [player, regions]
  )

  return (
    <HotKeys handlers={{}}>
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
      <Range
        value={[loopRegion.start, loopRegion.end]}
        min={Math.max(0, loopRegion.start - RANGE)}
        max={Math.min(duration, loopRegion.end + RANGE)}
        step={0.01}
        marks={marks}
      />
      <div className="mt-5">
        <Button
          size="lg"
          onClick={() => updateLoopRegion(loopIndexRef.current - 1)}
        >
          Previous
        </Button>
        <Button
          size="lg"
          onClick={() => updateLoopRegion(loopIndexRef.current + 1)}
        >
          Next
        </Button>
      </div>
    </HotKeys>
  )
}
export default PhraseLoopPlayer
