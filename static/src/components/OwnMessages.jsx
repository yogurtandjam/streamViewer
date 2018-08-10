import React from 'react';
import styled from 'styled-components';
import SavedMessages from './SavedMessages.jsx';
import { WhiteContainer, IceTitle, TenPxPadding } from './Styles.jsx';

const OwnMessages = props => {
  return props.messages ?
  (
    <WhiteContainer>
      <IceTitle>Your Messages</IceTitle>
      <TenPxPadding>
      {props.messages.map((message, index) => <SavedMessages key={index} idx={index} message={message} currentUserName={props.currentUserName}/>)}
      </TenPxPadding>
    </WhiteContainer>
  )
  :
  (
    <WhiteContainer>
    <IceTitle>Your Message</IceTitle>
    <TenPxPadding>
    </TenPxPadding>
  </WhiteContainer>
  )
}

export default OwnMessages;