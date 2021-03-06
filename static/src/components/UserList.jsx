import React from 'react';
import UserMessage from './UserMessage.jsx';
import styled from 'styled-components';

const List = styled.div`
  background-color: white;
  max-width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  max-height: 85%;
`

const UserList = props => {
  return !props.messages[props.currentSearch.toLowerCase()] ? <div/>:
   (
    <List>
      {props.messages[props.currentSearch.toLowerCase()].map((message, index) => <UserMessage message={message} key={index} idx={index}/>)}
    </List>
  )
}

export default UserList;