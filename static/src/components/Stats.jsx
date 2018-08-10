import React from'react';
import styled, { css } from 'styled-components';
import axios from 'axios';
import { Input, Button, SortButton, IceContainer, WhiteTitle, WhiteContainer } from './Styles.jsx';
import StatsRow from './StatsRow.jsx';
import UserList from './UserList.jsx';
import StreamerInfo from './StreamerInfo.jsx';
import OwnMessages from './OwnMessages.jsx';

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
  height: 500px;
`
const TableContainer = WhiteContainer.extend`
  overflow-y: auto;
  border-radius: 0 0 0 10px;
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
  min-width: 100px;
  hover: pointer;
`

const Body = styled.tbody`
  border-top: 2px solid black;
`

const UserSearch = IceContainer;

const SearchHeader = WhiteTitle.extend`
  margin-bottom: 10px;
`;

const BackToVideo = Button.extend`
  margin: 10px;
  float: right;
`

const SortAscending = SortButton.extend`
  ${props => props.sortedAscending && css` display: none `}
`

const SortDescending = SortAscending.extend`
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
  ${props => !props.sortedAscending && css` display: none `}
  ${props => props.sortedAscending && css` display: block`}
`

class Stats extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      messageCount: {},
      text: '',
      messages: {},
      users: [],
      sortedAscending: false,
      ownMessages: []
    }
    this.getStats = this.getStats.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.sortUsernameAscending = this.sortUsernameAscending.bind(this);
    this.sortUsernameDescending = this.sortUsernameDescending.bind(this);
    this.getOwnMessages = this.getOwnMessages.bind(this);
  }

  componentDidMount() {
    this.getStats(this.props.liveStreamId);
    this.getOwnMessages(this.props.currentUserName, this.props.liveStreamId)
  };

  getOwnMessages(user, room) {
    let filteredUser = user.replace('%20', ' ')
    axios.get(`ec2-54-241-188-109.us-west-1.compute.amazonaws.com/users/messages/${filteredUser}/${room}`)
      .then(res => {
        this.setState({ ownMessages: res.data })
      })
      .catch(err => console.log(err))
      .then(res => console.log(this.state.ownMessages))
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
    let users = Object.keys(userMessageIndex)
    this.setState({ 
      users: users,
      messageCount: userMessageIndex,
      messages: userMessages
    });
    console.log('this is users ', userMessageIndex)
    console.log('this is messages', userMessages)
  }

  sortUsernameAscending(users) {
    console.log('old users ', users)
    let sortedUsers = users.slice().sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
    this.setState({
      users: sortedUsers,
      sortedAscending: true
    })
    console.log('new users ', sortedUsers)
  }

  sortUsernameDescending(users) {
    console.log('old users ', users)
    let sortedUsers = users.slice().reverse();
    this.setState({
      users: sortedUsers,
      sortedAscending: false
    })
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
                  <Th onClick={()=> !this.state.sortedAscending ?
                    this.sortUsernameAscending(this.state.users):
                    this.sortUsernameDescending(this.state.users)}>
                    Usernames
                    <SortAscending
                      sortedAscending={this.state.sortedAscending}/>
                    <SortDescending
                      sortedAscending={this.state.sortedAscending}/>
                  </Th>
                  <Th>Messages</Th>
                </tr>
              </Head>
              <Body>
                {this.state.users.map((user, index) => <StatsRow userName={user} messageCount={this.state.messageCount[user]} key={index}/>)}
              </Body>
            </UsersTable>
          </TableContainer>
          <UserSearch>
            <SearchHeader>Search for User Messages</SearchHeader>
            <Input onChange={this.handleChange}/>
              <UserList currentSearch={this.state.text} messages={this.state.messages}/>
          </UserSearch>
          <OwnMessages 
            messages={this.state.ownMessages}
            currentUserName={this.props.currentUserName}/>
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