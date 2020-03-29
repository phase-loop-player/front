import React from "react"
import { render } from "@testing-library/react"
import PhraseLoopPlayer from "./PhraseLoopPlayer"
import testdata from "./testdata.json"

test("render phrase loop plyaer", () => {
  const url = "https://www.youtube.com/watch?v=Ow_zd7Ccrv8"
  const { getByText } = render(
    <PhraseLoopPlayer url={url} regions={testdata} />
  )
  expect(getByText(/player/i)).toBeInTheDocument()
})
