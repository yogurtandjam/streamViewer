import styled from 'styled-components';

const Input = styled.input`
  height: 2em;
  border: none;
  width: 100%;
  margin-bottom: 5px;
  border-radius: 3px;
  box-shadow: 2px 2px 4px 0px rgba(0,0,0,.2) inset;
`

const Button = styled.button`
  cursor: pointer;
  color: white;
  height: 2em;
  border: none;
  border-radius: 3px;
  width: 100px;
  background-color: purple;
`

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

export {
  Input,
  Button,
  ChatContainer,
  Author,
  Text
}