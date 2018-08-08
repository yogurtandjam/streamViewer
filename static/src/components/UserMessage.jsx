import React from 'react';
import styled from 'styled-components';
import { css } from 'styled-components';
import { ChatContainer, Text } from './Styles.jsx';

const MessageContainer = ChatContainer.extend`
  ${props => props.idx % 2 && css` background-color: lavender`}
`

const UserMessage = props => {
  return (
    <MessageContainer idx={props.idx}>
      <Text>{props.message}</Text>
    </MessageContainer>
  )
}

export default UserMessage;