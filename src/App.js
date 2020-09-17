import React from "react";
import { Container } from "react-bootstrap";
import ApolloProvider from "./ApolloProvider";
import { MessageProvider } from './context/message'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import AfterLogin from "./pages/AfterLogin";
import BeforeChat from "./pages/BeforeChat";
import ChatApp from "./pages/ChatApp";
import Register from "./pages/Register";


function App() {

  return (
    <ApolloProvider>
      <Container>
        <MessageProvider>
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={Register} />
              <Route path="/afterlogin" component={AfterLogin} />
              <Route path="/beforechat" component={BeforeChat} />
              <Route path="/chat" component={ChatApp} />
            </Switch>
          </BrowserRouter>
        </MessageProvider>
      </Container>
    </ApolloProvider>
  )
};

export default App;
