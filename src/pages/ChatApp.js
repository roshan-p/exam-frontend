import React, { useState, useEffect } from "react";
import { gql, useLazyQuery, useSubscription } from "@apollo/client";
// import io from 'socket.io-client';


import Messages from './Messages';
import ChatInput from './ChatInput';




const GET_MESSAGES = gql`
  query Message($roomName:String!) {
    Message(roomName: $roomName) {
        body,
        id,
        from
    }
  }
`;
const NEW_MESSAGE = gql`
  subscription newMessage {
    newMessage {
      id,
      body,
      roomName,
      from
    }
  }
`

export default function ChatApp(props) {



  const USER_NAME = props.location.state.name;
  const ROOM_NAME = props.location.state.roomName;
  console.log(USER_NAME)
  console.log(ROOM_NAME)
  const [messageList, setMessageList] = useState([])

  const [getMessages, { data: messageData }] = useLazyQuery(GET_MESSAGES, {
    onCompleted: data => {
      setMessageList(messageData.Message)
    },
    onError(err) {
      console.log(err)
    }
  });

  const { data: newMessageData, error: messageError } = useSubscription(
    NEW_MESSAGE
  )
  useEffect(() => {
    if (messageError) console.log(messageError)

    if (newMessageData) {
      const message = newMessageData.newMessage
      setMessageList(messageList => [...messageList, message]);
    }
  }, [messageError, newMessageData])

  useEffect(() => {
    getMessages({ variables: { roomName: ROOM_NAME } })
  }, []);



  return (
    <div className="container">
      <h3>{ROOM_NAME}</h3>
      <Messages messages={messageList} me={USER_NAME} />
      <ChatInput from={USER_NAME} roomName={ROOM_NAME} />
    </div>
  );


}



