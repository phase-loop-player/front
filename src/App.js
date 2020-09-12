/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from "react"
import { Container } from "react-bootstrap"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import InputForm from "./components/InputForm"
import PhraseLoopPlayerContainer from "./components/PhraseLoopPlayerContainer"

function App() {
  const [inputValues, setInputValues] = useState({
    url: "",
    averageDuration: 5
  })
  return (
    <>
      <ToastContainer />
      <Container>
        <h1>Phrase loop player</h1>
        <InputForm setInputValues={setInputValues} />
        <PhraseLoopPlayerContainer {...inputValues} />
      </Container>
    </>
  )
}

export default App
