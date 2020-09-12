import React from "react"
import { Container } from "react-bootstrap"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import useLocalStorageState from "use-local-storage-state"
import InputForm from "./components/InputForm"
import PhraseLoopPlayerContainer from "./components/PhraseLoopPlayerContainer"

function App() {
  const [url, setUrl] = useLocalStorageState("url", "")
  return (
    <>
      <ToastContainer />
      <Container>
        <h1>Phrase loop player</h1>
        <InputForm url={url} setUrl={setUrl} />
        <PhraseLoopPlayerContainer url={url} />
      </Container>
    </>
  )
}

export default App
