import React, { useRef, useState, useEffect } from "react"
import ReactPlayer from "react-player"
import { Button } from "react-bootstrap"

const url = "https://www.youtube.com/watch?v=FZnZU9JInL0"
function PhraseLoopPlayer() {
  const [player, setPlayer] = useState()
  const playerRef = useRef()
  function onReady() {
    setPlayer(playerRef.current)
  }
  useEffect(() => {
    if (!player) {
      return () => {}
    }
    const intervalID = setInterval(() => {
      const currentTime = player.getCurrentTime()
      if (currentTime > 3) {
        player.seekTo(1.5, "seconds")
      }
    }, 25)
    return () => clearInterval(intervalID)
  }, [player])

  return (
    <>
      <h1>Phase loop player</h1>
      <ReactPlayer playing ref={playerRef} url={url} onReady={onReady} />
      <Button
        onClick={() => {
          player.seekTo(10, "seconds")
        }}
      >
        seek to
      </Button>
    </>
  )
}
export default PhraseLoopPlayer
