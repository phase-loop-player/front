import React from "react"
import { Row, Col, Form } from "react-bootstrap"

export default function({ label, value, onChange }) {
  return (
    <Form>
      <Form.Group as={Row} className="d-flex">
        <Form.Label column sm="2">
          {label}
        </Form.Label>
        <Col sm="10">
          <Form.Control
            type="text"
            placeholder={`Enter ${label}`}
            value={value}
            onChange={onChange}
          />
        </Col>
      </Form.Group>
    </Form>
  )
}
