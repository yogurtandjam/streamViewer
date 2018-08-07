import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Chat from './Chat.jsx';

const ChatBoxContainer = styled.div`
  background-color: lavender;
  width: 30%;
  border-radius: 0 15px 15px 0;
  padding: 5px;
`

const ChatTitle = styled.div`
  padding-left: 20px;
  border: 1px;
`

const ChatLog = styled.div`
  padding: 10px;
  height: 500px;
  overflow-y: auto;
  background-color: #F8F8FF;
  border-radius:15px;
`

const ChatEntry = styled.div`
  text-align:center;
  padding-top: 5px;
`

const Input = styled.input`
  height: 2em;
  border: none;
  width: 100%;
  margin-bottom: 5px;
  border-radius: 3px;
`

const Submit = styled.button`
  cursor: pointer;
  color: white;
  height: 2em;
  border: none;
  width: 100px;
  background-color: purple;
  border-radius: 3px;
  float:right;
`
const Title = styled.h2`
  word-wrap: normal;
  color: purple;
  margin: 0px;
  font-family: Helvetica;
`
class ChatBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chats: [],
      text: ''
    }
    this.updateChatBox = this.updateChatBox.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.Interval;
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.props.token;
  }

  componentDidMount() {
    this.props.getLiveStreamId(this.props.currentVideo)
    ChatLog.scrollTop = ChatLog.scrollHeight;
    this.Interval = setInterval(()=>this.updateChatBox(),1000);
  }

  componentWillUnmount() {
    clearInterval(this.Interval);
  }

  scrollToBottom() {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }



  updateChatBox() {
    axios.get('https://www.googleapis.com/youtube/v3/liveChat/messages/', {
      params: {
        liveChatId: this.props.liveStreamId,
        part: 'authorDetails,snippet'
      }
    })
    .then(res => {
      if (this.state.chats.length === 0 || res.data.items[0].id !== this.state.chats[0].id) {
        this.setState({ chats: res.data.items })
        this.scrollToBottom();
      }
    })
    .catch(err => console.log(err))
  }

  sendMessage(text) {
    axios.post('https://www.googleapis.com/youtube/v3/liveChat/messages?part=snippet&key=AIzaSyAObGRHB4XxP06wXnZAjvPmCA744x0Tj0I', {
        snippet: {
          liveChatId: this.props.liveStreamId,
          type: 'textMessageEvent',
          textMessageDetails: {
            messageText: text
          }
        }
    })
    .then(res => this.updateChatBox())
    .catch(err => console.log(err))
  }

  handleSubmit() {
    console.log(this.state.text)
    this.sendMessage(this.state.text);
    this.setState({ text: '' })
  }

  handleChange(e) {
    this.setState({ [e.target.id]: e.target.value});
  }

  render() {
    return (
    <ChatBoxContainer>
      <ChatTitle>
        <Title>Chat Away</Title>
      </ChatTitle>
      <ChatLog id="chatLog">
        {this.state.chats.map((chatInfo, index) => <Chat chatInfo={chatInfo} key={index}/>)}
        <div style={{ float:"left", clear: "both" }}
             ref={(el) => { this.messagesEnd = el; }}>
        </div>
      </ChatLog>
      <ChatEntry>
        <Input type="text" id="text" value={this.state.text} onChange={this.handleChange}/>
        <Submit onClick={this.handleSubmit}>Submit</Submit>
      </ChatEntry>
    </ChatBoxContainer>
    )
  }
}
export default ChatBox;