import React from "react"
import { Container } from "react-bootstrap"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { PhraseLoopPlayerContainer } from "./phaseLoopPlayer"

function App() {
  return (
    <>
      <ToastContainer />
      <Container>
        <PhraseLoopPlayerContainer />
      </Container>
    </>
  )
}

export default App
