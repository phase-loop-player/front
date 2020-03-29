import { useCallback } from "react"

export default function useReactPlayerCallback({
  setPlayer,
  setDuration,
  playerRef,
  setVideoState
}) {
  const onReady = useCallback(() => {
    setPlayer(playerRef.current)
    setDuration(playerRef.current.getDuration())
  }, [playerRef, setDuration, setPlayer])
  const onProgress = useCallback(
    state => {
      // console.log(state)
      setVideoState(state)
    },
    [setVideoState]
  )
  return { onReady, onProgress }
}
