import React from 'react';
import styled from 'styled-components';
import { ChatContainer, Author, Text } from './Styles.jsx';

const Chat = props => {
  return (
    <ChatContainer>
    <Author>{props.chatInfo.authorDetails.displayName}:</Author><Text>{props.chatInfo.snippet.displayMessage}</Text>
    </ChatContainer>
  )
}

export default Chat;