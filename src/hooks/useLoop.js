import { useEffect } from "react"

let intervalID

export default function useLoop({ player, loopRegion }) {
  useEffect(() => {
    clearInterval(intervalID)
    if (!player || !loopRegion) {
      return () => {}
    }
    const { start, end } = loopRegion
    intervalID = setInterval(() => {
      const currentTime = player.getCurrentTime()
      if (currentTime < start) {
        player.seekTo(start, "seconds")
      }
      if (currentTime > end) {
        player.seekTo(start, "seconds")
      }
    }, 25)
    return () => clearInterval(intervalID)
  }, [loopRegion, player])
}
