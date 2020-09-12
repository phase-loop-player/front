import React, { useEffect } from "react"
import { InputGroup, Form, Button, Col } from "react-bootstrap"
import { Formik } from "formik"
import { Persist } from "@engrjabi/formik-persist"

export default function({ setInputValues }) {
  useEffect(() => {
    const { values } = JSON.parse(localStorage.getItem("settings")) || {}
    if (values) {
      setInputValues(values)
    }
  }, [setInputValues])
  return (
    <Formik
      initialValues={{ url: "", averageDuration: 5 }}
      onSubmit={async values => {
        setInputValues(values)
      }}
    >
      {({ values, handleChange, handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <Form.Row className="d-md-flex">
            <Form.Group as={Col} sm="12" xl="9" className="d-flex">
              <InputGroup.Text>url</InputGroup.Text>
              <Form.Control
                name="url"
                type="text"
                value={values.url}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group as={Col} sm="12" xl="2" className="d-flex">
              <InputGroup.Text>average duration</InputGroup.Text>
              <Form.Control
                name="averageDuration"
                type="number"
                value={values.averageDuration}
                onChange={handleChange}
              />
            </Form.Group>
            <Col sm="12" xl="1">
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
