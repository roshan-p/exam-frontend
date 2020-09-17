import React from 'react'
import { Button, Form, Row, Col } from "react-bootstrap";
import { Link } from 'react-router-dom';
export default function AfterLogin(props) {

  const USER_NAME = props.location.state.name;

  function onPressButton() {
    props.history.push({
      pathname: '/beforechat',
      state: { userAction: 'create', name: USER_NAME }
    })
  }
  return (
    <Row className="bg-white py-5 justify-content-center">
      <Col sm={8} md={6} lg={4}>
        <Form>

          <div className="text-center">
            <h3>Hi {USER_NAME}</h3>
            <br />
            <br />
            <Button onClick={() => onPressButton()} variant="success" type="submit">Create new chat room</Button>
            <br />
            <br />
            <h4>
              <Link to={{ pathname: '/beforechat', state: { userAction: 'join' } }}>Join chat room</Link>
            </h4>
          </div>
        </Form>
      </Col>
    </Row>
  )
}
