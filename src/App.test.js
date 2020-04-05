import React from "react"
import { render } from "@testing-library/react"
import App from "./App"

test("render app", () => {
  const { getByText } = render(<App />)
  const homeElement = getByText(/phrase loop player/i)
  expect(homeElement).toBeInTheDocument()
})
