import React from "react"
import { Container } from "react-bootstrap"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import PhraseLoopPlayer from "./components/PhraseLoopPlayer"

function App() {
  return (
    <>
      <ToastContainer />
      <Container>
        <PhraseLoopPlayer />
      </Container>
    </>
  )
}

export default App
