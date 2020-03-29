import React from "react"
import { Container } from "react-bootstrap"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { HotKeys } from "react-hotkeys"
import { PhraseLoopPlayerContainer } from "./phaseLoopPlayer"

const keyMap = {
  PREVIOUS: ["j"],
  NEXT: ["left"]
}

function App() {
  return (
    <HotKeys keyMap={keyMap}>
      <ToastContainer />
      <Container>
        <PhraseLoopPlayerContainer />
      </Container>
    </HotKeys>
  )
}

export default App
