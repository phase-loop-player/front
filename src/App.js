import React from "react"
import { Container } from "react-bootstrap"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import PhaseLoopPlayer from "./components/PhaseLoopPlayer"

function App() {
  return (
    <>
      <ToastContainer />
      <Container>
        <PhaseLoopPlayer />
      </Container>
    </>
  )
}

export default App
