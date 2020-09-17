import React, { useState } from 'react'
import { Button, Form, Row, Col, ButtonToolbar } from "react-bootstrap";
// import { gql, useMutation } from '@apollo/client';
// const CREATE_ROOM = gql`
//   mutation createRoom($roomName:String!) {
//     createRoom(roomName: $roomName) {
//         roomName
//     }
//   }
// `;
export default function BeforeChat(props) {
    const { userAction } = props.location.state
    const USER_NAME = props.location.state.name;

    const [variables, setVariables] = useState({
        roomName: '',
    })

    // const [createRoom, { loading }] = useMutation(CREATE_ROOM, {
    //     update(_, res) {
    //         console.log(res)
    //         // localStorage.setItem({ 'name': variables.name });
    //         // props.history.push('/');
    //     },
    //     onError(err) {
    //         console.log(err)
    //     }
    // });

    const submitRoom = e => {
        e.preventDefault();
        if (userAction === "create") {
            //createRoom({ variables });
        }
        localStorage.setItem('roomName', variables.roomName);
        props.history.push('/chat', { roomName: variables.roomName, name: USER_NAME });
    }

    function onBack() {
        props.history.goBack()
    }

    return (
        <Row className="bg-white py-5 justify-content-center">
            <Col sm={8} md={6} lg={4}>
                <Form onSubmit={submitRoom}>
                    <Form.Row>
                        <Col>
                            <Form.Control placeholder="Room name" value={variables.roomName} onChange={e => setVariables({ ...variables, roomName: e.target.value })} />
                        </Col>
                    </Form.Row>

                    <Form.Row style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
                        <ButtonToolbar style={{ display: 'inline-block' }}>
                            <Button onClick={() => onBack()} >Back</Button>{' '}
                            <Button variant="primary" type="submit">{userAction === "create" ? "Create" : "Join"}</Button>
                        </ButtonToolbar>
                    </Form.Row>


                </Form>
            </Col>
        </Row >
    )
}
