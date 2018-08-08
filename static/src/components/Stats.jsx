import React from'react';
import styled from 'styled-components';
import axios from 'axios';
import { Input, Button } from './Styles.jsx';
import StatsRow from './StatsRow.jsx';
import UserList from './UserList.jsx';
import StreamerInfo from './StreamerInfo.jsx';

const StatsContainer = styled.div`
  margin-top: 3%;
  display: flex;
  background-color: lavender;
  flex-direction: column;
  justify-content: space-between;
  font-family: Helvetica;
  padding: 10px;
  max-height: 500px;
`
const StatsTitle = styled.div`
  border-radius: 5px;
  display:flex;
  flex-direction: row;
  background-color: #F8F8FF;
  min-height: 50px;
`
const Title = styled.h2`
  text-align: center;
  color: purple;
  margin: auto;
  font-family: Helvetica;
`

const StatsBody = styled.div`
  padding: 20px;
  display:flex;
  flex-direction: row;
  justify-content: space-between;
`
const TableContainer = styled.div`
  width:100%;
  overflow-y: auto;
`
const UsersTable = styled.table`
  width:100%;
  background-color: white;
  border-radius: 10px 0 0 10px;
`

const Head = styled.thead`
  background-color: #F8F8FF;
`
const Th = styled.th`
  min-width: 150px;
`

const Body = styled.tbody`
  border-top: 2px solid black;
`

const UserSearch = styled.div`
  background-color: #F8F8FF;
  padding: 10px;
  width: 100%;
  max-height: 90%;
`

const BackToVideo = Button.extend`
  margin: 10px;
  float: right;
`

class Stats extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      messageCount: {},
      text: '',
      messages: {}
    }
    this.getStats = this.getStats.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.getStats(this.props.liveStreamId);
  }

  getStats(currentVideo) {
    axios.get('https://www.googleapis.com/youtube/v3/liveChat/messages/', {
      params: {
        liveChatId: currentVideo,
        part: 'authorDetails,snippet'
      }
    })
    .then(res => {
      this.filterStats(res.data.items);
    })
    .catch(err => console.log(err))
  }

  filterStats(messages) {
    let userMessageIndex = {};
    let userMessages = {};
    messages.forEach(message => {
      let user = message.authorDetails.displayName;
      let text = message.snippet.displayMessage;
      let lowerCaseUser = user.toLowerCase();
      userMessageIndex[user] ? userMessageIndex[user] ++ : userMessageIndex[user] = 1;
      userMessages[lowerCaseUser] ? userMessages[lowerCaseUser].push(text) : userMessages[lowerCaseUser] = [text];
    })
    this.setState({ 
      messageCount: userMessageIndex,
      messages: userMessages
    });
    console.log('this is users ', userMessageIndex)
    console.log('this is messages', userMessages)
  }

  handleChange(e) {
    this.setState({ text: e.target.value })
  }

  render() {
    return (
      <StatsContainer>
        <StatsTitle>
          <Title>{this.props.video.snippet.channelTitle}'s Stats</Title>
          <BackToVideo onClick={this.props.goBack}>Back</BackToVideo>
        </StatsTitle>
        <StatsBody>
          <TableContainer>
            <UsersTable>
              <Head>
                <tr>
                  <Th>Usernames</Th>
                  <Th>Messages</Th>
                </tr>
              </Head>
              <Body>
                {Object.keys(this.state.messageCount).map((user, index) => <StatsRow userName={user} messageCount={this.state.messageCount[user]} key={index}/>)}
              </Body>
            </UsersTable>
          </TableContainer>
          <UserSearch>
            Search for User Messages
            <Input onChange={this.handleChange}/>
              <UserList currentSearch={this.state.text} messages={this.state.messages}/>
          </UserSearch>
          <StreamerInfo
            name={this.props.video.snippet.channelTitle}
            concurrent={this.props.concurrent}
            timestamp={this.props.timestamp}/>
        </StatsBody>
      </StatsContainer>
    )
  }
}

export default Stats;