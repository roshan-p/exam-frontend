import React, { createContext, useReducer, useContext } from 'react'

const MessageStateContext = createContext()
const MessageDispatchContext = createContext()

const messageReducer = (state, action) => {
  let usersCopy, userIndex
  const { username, message, messages } = action.payload
  switch (action.type) {
    case 'SET_USERS':
      return {
        ...state,
        users: action.payload,
      }

    case 'ADD_MESSAGE':

      return {
        ...state,
        users: usersCopy,
      }

    case 'LOAD_MESSAGE':
        console.log('LOAD_MESSAGE')
        console.log(message)
        return {
          ...state,
          users: usersCopy,
        }


    default:
      throw new Error(`Unknown action type: ${action.type}`)
  }
}

export const MessageProvider = ({ children }) => {
  const [state, dispatch] = useReducer(messageReducer, { users: null })

  return (
    <MessageDispatchContext.Provider value={dispatch}>
      <MessageStateContext.Provider value={state}>
        {children}
      </MessageStateContext.Provider>
    </MessageDispatchContext.Provider>
  )
}

export const useMessageState = () => useContext(MessageStateContext)
export const useMessageDispatch = () => useContext(MessageDispatchContext)
