import React from "react"
import { InputGroup, Form, Button, Col } from "react-bootstrap"
import { Formik } from "formik"
import { Persist } from "@engrjabi/formik-persist"
import { backend } from "../../api"

export default function({ setUrl, setRegions }) {
  return (
    <Formik
      initialValues={{ url: "", minDuration: 3, maxDuration: 7 }}
      onSubmit={async values => {
        const { url, minDuration, maxDuration } = values
        setRegions(null)
        localStorage.setItem("loopIndex", 0)
        const { data } = await backend.get(
          `/regions?url=${url}&minDuration=${minDuration}&maxDuration=${maxDuration}`
        )
        setUrl(url)
        setRegions(data.regions)
      }}
    >
      {({ values, handleChange, handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <Form.Row className="d-md-flex">
            <Form.Group as={Col} sm="12" lg="5" xl="7" className="d-flex">
              <InputGroup.Text>url</InputGroup.Text>
              <Form.Control
                name="url"
                type="text"
                value={values.url}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group as={Col} sm="5" lg="3" xl="2" className="d-flex">
              <InputGroup.Text>min duration</InputGroup.Text>
              <Form.Control
                name="minDuration"
                type="number"
                value={values.minDuration}
                onChange={handleChange}
                xs="2"
              />
            </Form.Group>
            <Form.Group as={Col} sm="5" lg="3" xl="2" className="d-flex">
              <InputGroup.Text>max duration</InputGroup.Text>
              <Form.Control
                name="maxDuration"
                type="number"
                value={values.maxDuration}
                onChange={handleChange}
              />
            </Form.Group>
            <Col sm="2" xl="1">
              <Button block type="submit" className="mb-3">
                submit
              </Button>
            </Col>
          </Form.Row>
          <Persist name="settings" debounce={100} />
        </Form>
      )}
    </Formik>
  )
}
