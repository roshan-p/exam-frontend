import React, { useState, useEffect } from "react";
import { gql, useMutation } from "@apollo/client";



const SEND_MESSAGE = gql`
  mutation sendMessage($roomName: String!, $body: String!,$from:String!) {
    sendMessage(roomName: $roomName, body: $body,from:$from) {
      roomName,
      body,
      from
    }
  }
`;
export default function ChatInput(props) {


  const [variables, setVariables] = useState({
    roomName:props.roomName,
    body: '',
    from:props.from,
  })
    const [sendMessage, { loading }] = useMutation(SEND_MESSAGE, {
        update(_, res) {
         
        },
        onError(err) {
        
            console.log(err)
        }
    });
  const submitHandler = e => {
    e.preventDefault();
    console.log(variables)
    sendMessage({ variables });
    setVariables({...variables,body:'' })

}



    return (
      <form className="chat-input" onSubmit={submitHandler}>
        <input type="text"
          onChange={e => setVariables({ ...variables, body: e.target.value })}
          value={variables.body || ''}
          placeholder="Write a message..."
          required />
      </form>
    );
  
}
