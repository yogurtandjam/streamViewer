import React from 'react';
import Home from './components/Home.jsx';
import Stats from './components/Stats.jsx';
import CurrentVideo from './components/CurrentVideo.jsx';
import Header from './components/Header.jsx';
import key from '../config.js'
import styled from 'styled-components';
import axios from 'axios';
import { GoogleLogin } from './components/react-google-login-component.js';

const Container = styled.div`
  margin:0px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  height:100%;
`
const LoginContainer = styled.div`
  max-width: 300px;
  max-height: 500px;
  text-align: center;
  display:flex;
  flex-direction: column;
  margin: auto;
  margin-top: 3%;
  box-shadow: 0 6px 18px 1px rgba(0,0,0,.2);
  padding: 15px;
`

const LoginText = styled.h2`
  font-family: helvetica;
`


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
      currentVideo: '',
      currentComments: {},
      isWatching: false,
      isHome: false,
      isStats: false,
      isLoggedOut: true,
      liveStreamId: '',
      concurrentViewers: '',
      timestamp: '',
      currentUserName: '',
      token: ""
    }
    this.getStreams = this.getStreams.bind(this);
    this.selectVideo = this.selectVideo.bind(this);
    this.goHome = this.goHome.bind(this);
    this.checkStats = this.checkStats.bind(this);
    this.responseGoogle = this.responseGoogle.bind(this);
    this.getLiveStreamId = this.getLiveStreamId.bind(this);
    this.goBack = this.goBack.bind(this);
    this.getUserName = this.getUserName.bind(this);
  }

  componentDidMount() {
    this.getStreams();
  }

  getStreams() {
    axios.get('https://www.googleapis.com/youtube/v3/search/',{
      params: {
        part: 'snippet',
        eventType: 'live',
        type: 'video',
        videoCategoryId: 20,
        regionCode: 'US',
        maxResults: 30,
        key: key
      }
    })
      .then(res => this.setState({ videos: res.data.items }))
      .catch(err => console.log(err))
  }

  getLiveStreamId(selection) {
    axios.get('https://www.googleapis.com/youtube/v3/videos/', {
      params: {
        id: selection.id.videoId,
        key: 'AIzaSyAObGRHB4XxP06wXnZAjvPmCA744x0Tj0I',
        part: 'liveStreamingDetails,snippet'
      }
    })
    .then(res => {
      let concurrent = res.data.items[0].liveStreamingDetails.concurrentViewers;
      let chatId = res.data.items[0].liveStreamingDetails.activeLiveChatId;
      let timestamp = res.data.items[0].liveStreamingDetails.actualStartTime;
      this.setState({
        liveStreamId: chatId,
        concurrentViewers: concurrent,
        timestamp: timestamp
      })
    })
  }

  selectVideo(selection) {
    this.setState({
      isWatching: true,
      currentVideo: selection,
      isHome: false,
      isLoggedOut: false,
      isStats: false
    })
  }

  goBack() {
    this.setState({
      isWatching: true,
      isHome: false,
      isLoggedOut: false,
      isStats: false
    })
  }

  goHome() {
    this.setState({
      isHome: true,
      isWatching: false,
      isLoggedOut: false,
      isStats: false
    })
  }

  checkStats() {
    this.setState({
      isHome: false,
      isWatching: false,
      isStats: true,
      isLoggedOut: false
    })
  }


  responseGoogle (googleUser) {
    var access_token = googleUser.getAuthResponse().access_token;
    this.setState({
      token: access_token
    })
    this.goHome();
  }

  getUserName () {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${this.state.token}`)
      .then(res => this.setState({ currentUserName: res.data.name }))
      .catch(err => console.log(err))
  }

  render() {
    if (this.state.isLoggedOut) {
      return (
        <Container>
          <Header isLoggedOut={this.state.isLoggedOut}/>
          <LoginContainer>
            <LoginText>Log In</LoginText>
            <GoogleLogin socialId="371647430195-thi6ovloq7a7kqsf9asro4jca9a9hhoa.apps.googleusercontent.com"
                        className="google-login"
                        scope="https://www.googleapis.com/auth/youtube"
                        fetchBasicProfile={false}
                        responseHandler={this.responseGoogle}
                        buttonText="Login With Google"/>
          </LoginContainer>
        </Container>
      )
    }
    if (this.state.isHome) {
      return (
        <Container>
          <Header isHome={this.state.isHome} isWatching={this.state.isWatching}/>
          <Home
            videos={this.state.videos}
            isHome={this.state.isHome}
            selectVideo={this.selectVideo}
            getUserName={this.getUserName}/>
        </Container>
      )
    }
    if (this.state.isWatching) {
      return (
        <Container>
          <Header isWatching={this.state.isWatching} goHome={this.goHome}/>
          <CurrentVideo
            video={this.state.currentVideo}
            isWatching={this.state.isWatching}
            currentVideo={this.state.currentVideo}
            token={this.state.token}
            getLiveStreamId={this.getLiveStreamId}
            liveStreamId={this.state.liveStreamId}
            checkStats={this.checkStats}
            currentUserName={this.state.currentUserName}/>
        </Container>
      )
    }
    if (this.state.isStats) {
      return (
        <Container>
          <Header isState={this.state.isStats} goHome={this.goHome}/>
          <Stats  
            video={this.state.currentVideo}
            isWatching={this.state.isWatching}
            liveStreamId={this.state.liveStreamId}
            goBack={this.goBack}
            concurrent={this.state.concurrentViewers}
            timestamp={this.state.timestamp}
            currentUserName={this.state.currentUserName}/>
        </Container>
      )
    }
  }
}

export default App;
