import React from 'react';
import styled from 'styled-components';
import { IceContainer, WhiteTitle, TenPxPadding } from './Styles.jsx';

const StreamerContainer = IceContainer.extend`
  border-radius: 0 10px 0 0;
`
const Category = styled.p`
  font-weight: bold;
  margin: 0px;
`

const StreamerInfo = props => {
  return (
    <StreamerContainer>
      <WhiteTitle>{props.name}</WhiteTitle>
      <TenPxPadding>
      <Category>Time Started:</Category> {props.timestamp}
      <Category>Concurrent Viewers:</Category> {props.concurrent}
      </TenPxPadding>
    </StreamerContainer>
  )
}

export default StreamerInfo;