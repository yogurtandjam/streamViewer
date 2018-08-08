import React from 'react';
import styled from 'styled-components';


const TopHalf = styled.div`
  display: flex;
  justify-content: space-between;
`

const Title = styled.h1`
  color: purple;
  font-family: Helvetica;
  margin: 0px;
  font-style: italic;
  font-weight: bold;
` 
const HL = styled.div`
  height: 1.5px;
  background-color: purple;
  width: 100%;
`

const Back = styled.button`
  margin-right: 10px;
  margin-top: 5px;
  cursor: pointer;
  color: white;
  height: 2em;
  border: none;
  border-radius: 3px;
  width: 100px;
  background-color: purple;
`

const Header = (props) => {
  if (props.isHome || props.isLoggedOut) {
    return (
      <div>
        <Title>Stream Viewer</Title>
        <HL/>
      </div>
    )
  }
  if (props.isWatching) {
    return (
      <div>
        <TopHalf>
          <Title>Stream Viewer</Title>
          <Back onClick={props.goHome}>Home</Back>
        </TopHalf>
        <HL/>
      </div>
    )
  }
  return (
    <div>
      <TopHalf>
        <Title>Stream Viewer</Title>
        <Back onClick={props.goHome}>Home</Back>
      </TopHalf>
      <HL/>
    </div>
  )
}

export default Header;