import { useEffect } from "react"

export default function useLoop({ player, loopRegion }) {
  useEffect(() => {
    if (!player || !loopRegion) {
      return () => {}
    }
    const { start, end } = loopRegion
    const intervalID = setInterval(() => {
      const currentTime = player.getCurrentTime()
      if (currentTime > end) {
        player.seekTo(start, "seconds")
      }
    }, 25)
    return () => clearInterval(intervalID)
  }, [loopRegion, player])
}
