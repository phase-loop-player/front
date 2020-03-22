import React from "react"
import { render } from "@testing-library/react"
import App from "./App"

test("renders home", () => {
  const { getByText } = render(<App />)
  const homeElement = getByText(/phase loop player/i)
  expect(homeElement).toBeInTheDocument()
})
