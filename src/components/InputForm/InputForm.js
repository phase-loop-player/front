import React from "react"
import { InputGroup, Form, Button, Col } from "react-bootstrap"
import { Formik } from "formik"
import { Persist } from "@engrjabi/formik-persist"

export default function({ setUrl }) {
  return (
    <Formik
      initialValues={{ url: "", minDuration: 0.2, maxDuration: 5 }}
      onSubmit={async values => {
        const { url } = values
        setUrl(url)
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
              <InputGroup.Text>min time</InputGroup.Text>
              <Form.Control
                name="minDuration"
                type="number"
                value={values.minDuration}
                onChange={handleChange}
                xs="2"
              />
            </Form.Group>
            <Form.Group as={Col} sm="5" lg="3" xl="2" className="d-flex">
              <InputGroup.Text>max time</InputGroup.Text>
              <Form.Control
                name="maxDuration"
                type="number"
                value={values.maxDuration}
                onChange={handleChange}
              />
            </Form.Group>
            <Col sm="2" xl="1">
              <Button block type="submit" className="mb-3 mx-0">
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
