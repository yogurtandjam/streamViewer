import React from'react';
import styled from 'styled-components';
import { Input, Button } from './Styles.jsx';

const StatsContainer = styled.div`
  margin-top: 3%;
  display: flex;
  background-color: lavender;
  flex-direction: column;
  justify-content: space-between;
`
const StatsTitle = styled.div`
  display:flex;
  flex-direction: row;
  background-color: #F8F8FF;
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

const UsersTable = styled.table`
`

const UserSearch = styled.div`
`

const BackToVideo = Button.extend`
  margin: 10px;
  float: right;
`


class Stats extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [],
      chats: [],
      
    }
  }

  componentDidMount() {
    console.log(this.props)
  }

  render() {
    return (
      <StatsContainer>
        <StatsTitle>
          <Title>Stats</Title>
          <BackToVideo>Back</BackToVideo>
        </StatsTitle>
        <StatsBody>
          <UsersTable>
            <thead>
              <tr>
                <th>Usernames</th>
                <th>Message Count</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>yo</td>
                <td>yokay</td>
              </tr>
            </tbody>
          </UsersTable>
          <UserSearch>
            <Input/>
          </UserSearch>
        </StatsBody>
      </StatsContainer>
    )
  }
}

export default Stats;