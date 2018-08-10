import React from 'react';
import styled, { css } from 'styled-components';
import { ChatContainer } from './Styles.jsx';

const MessageContainer = ChatContainer.extend`
  ${props => props.idx % 2 && css` background-color: lavender`}
`

const SavedMessage = props => {
  return (
    <MessageContainer idx={props.idx}>
      {props.currentUserName}:{props.message}
    </MessageContainer>
  )
}

export default SavedMessage;