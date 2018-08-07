import React from 'react';
import styled from 'styled-components';

const ChatContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 100%;
  word-break: break-all;
`

const Author = styled.p`
  font-family: courier;
  font-weight: bold;
  font-size: 11px;
  color: purple;
  margin-top: 0;
`
const Text = styled.p`
  font-family: courier;
  font-size: 11px;
  margin-top: 0;
`

const Chat = props => {
  return (
    <ChatContainer>
    <Author>{props.chatInfo.authorDetails.displayName}:</Author><Text>{props.chatInfo.snippet.displayMessage}</Text>
    </ChatContainer>
  )
}

export default Chat;