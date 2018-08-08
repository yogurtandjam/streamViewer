import React from 'react';
import styled from 'styled-components';

const StreamerInfoContainer = styled.div`
  width: 100%;
  background-color: white;
  border-radius: 0 10px 10px 0;
`
const StreamerTitle = styled.div`
  background-color: #F8F8FF;
  text-align: center;
`

const StreamerInfo = props => {
  return (
    <StreamerInfoContainer>
      <StreamerTitle>{props.name}</StreamerTitle>
      <p>Time Started: {props.timestamp}</p>
      <p>Concurrent Viewers: {props.concurrent}</p>
    </StreamerInfoContainer>
  )
}

export default StreamerInfo;