import React from "react"

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hasError: false
    }
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error
    }
  }
  // componentDidCatch(error, errorInfo) {}

  render() {
    const { state, props } = this
    if (state.hasError) {
      return <h1> Something went wrong. </h1>
    }
    return props.children
  }
}
