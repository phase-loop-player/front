import { useCallback } from "react"
import useLocalStorageState from "use-local-storage-state"

export default function useLoopIndex(regions) {
  const [loopIndex, setLoopIndex] = useLocalStorageState("loopIndex", 0)
  const addLoopIndex = useCallback(
    step => {
      const tmp = Math.min(step + loopIndex, regions.length - 1)
      const nextIndex = Math.max(tmp, 0)
      setLoopIndex(nextIndex)
    },
    [loopIndex, regions, setLoopIndex]
  )
  return { loopIndex, setLoopIndex, addLoopIndex }
}
