import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import * as serviceWorker from "./serviceWorker"
import ErrorBoundary from "./ErrorBoundary"

const Root = () => (
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
)

ReactDOM.render(<Root />, document.getElementById("root"))

serviceWorker.unregister()
