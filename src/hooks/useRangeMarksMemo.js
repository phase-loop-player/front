import { useMemo } from "react"
import { RANGE } from "../config"

export default function useRangeMArksMemo({ regions, loopRegion }) {
  return useMemo(() => {
    return regions.reduce((prev, { start, end }) => {
      if (start < loopRegion.start - RANGE || end > loopRegion.end + RANGE) {
        return prev
      }
      prev[start] = Number(start.toFixed(1))
      prev[end] = Number(end.toFixed(1))
      return prev
    }, {})
  }, [loopRegion.end, loopRegion.start, regions])
}
