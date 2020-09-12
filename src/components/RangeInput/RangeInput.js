import React, { useMemo } from "react"
import { Range } from "rc-slider"
import { RANGE } from "../../config"

export default function({
  regions,
  duration,
  loopRegion,
  setLoopRegion,
  playedSeconds
}) {
  const marks = useMemo(() => {
    return regions.reduce((prev, { start, end }) => {
      if (start < loopRegion.start - RANGE || end > loopRegion.end + RANGE) {
        return prev
      }
      prev[start] = Number(start.toFixed(1))
      prev[end] = Number(end.toFixed(1))
      return prev
    }, {})
  }, [loopRegion.end, loopRegion.start, regions])

  const value = loopRegion
    ? [loopRegion.start, loopRegion.end]
    : [playedSeconds, playedSeconds]
  return (
    <Range
      value={value}
      min={Math.max(0, loopRegion.start - RANGE)}
      max={Math.min(duration, loopRegion.end + RANGE)}
      step={0.01}
      marks={marks}
      onChange={([s, e]) => {
        setLoopRegion({ start: s, end: e })
      }}
    />
  )
}
