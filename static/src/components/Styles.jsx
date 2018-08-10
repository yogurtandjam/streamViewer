import styled from 'styled-components';

const Input = styled.input`
  height: 2em;
  border: none;
  width: 100%;
  margin-bottom: 5px;
  border-radius: 3px;
  box-shadow: 2px 2px 4px 0px rgba(0,0,0,.2) inset;
`

const Form = styled.form`
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
const SortButton = styled.button`
  background-color: inherit;
  border: solid black;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 3px;
  margin-top:5px;
  float:right;
  cursor: pointer;
  transform: rotate(-135deg);
  -webkit-transform: rotate(-135deg);
`
const IceContainer = styled.div`
  width: 100%;
  background-color: #F8F8FF;
`

const WhiteContainer = styled.div`
  width: 100%;
  background-color: white;
`
const IceTitle = styled.div`
  background-color: #F8F8FF;
  text-align: center;
`
const WhiteTitle = styled.div`
  background-color: white;
  text-align: center;  
`
const TenPxPadding = styled.div`
  padding: 10px;
`

export {
  Input,
  Form,
  Button,
  ChatContainer,
  Author,
  Text,
  SortButton,
  IceContainer,
  WhiteContainer,
  IceTitle,
  WhiteTitle,
  TenPxPadding
}