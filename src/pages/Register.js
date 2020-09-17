import React, { useState } from 'react'
import { Form, Button } from "react-bootstrap";
import { gql, useMutation } from '@apollo/client';
// const REGISTER_USER = gql`
//   mutation createSender($name:String!) {
//     createSender(name: $name) {
//       name
//     }
//   }
// `;
export default function Register(props) {
   
  
    const [variables, setVariables] = useState({
        name: '',
    })

    // const [createSender, { loading }] = useMutation(REGISTER_USER, {
    //     update(_, res) {
    //        
    //         props.history.push('/');
    //     },
    //     onError(err) {
    //         console.log(err)
    //     }
    // });

    const submitSender = e => {
        e.preventDefault();
       // createSender({ variables });
        props.history.push('/afterlogin', { name: variables.name });
    }
    return (
        <div>
            <Form onSubmit={submitSender}>
                <Form.Group controlId="formGridAddress1">
                    <Form.Label>Name</Form.Label>
                    <Form.Control placeholder="Name..." value={variables.name} onChange={e => setVariables({ ...variables, name: e.target.value })} />
                </Form.Group>
                <Button variant="primary" type="submit">Go! </Button>
            </Form>
        </div>
    )
}
