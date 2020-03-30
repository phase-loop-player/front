import { useCallback } from "react"

export default function useUpdateLoopRegion({
  player,
  regions,
  loopIndexRef,
  setLoopRegion
}) {
  return useCallback(
    index => {
      const tmp = Math.min(index, regions.length - 1)
      const nextIndex = Math.max(tmp, 0)
      setLoopRegion(regions[nextIndex])
      player.seekTo(regions[nextIndex].start)
      loopIndexRef.current = nextIndex
    },
    [loopIndexRef, player, regions, setLoopRegion]
  )
}
