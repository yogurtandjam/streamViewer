import React from 'react';
import styled from 'styled-components';
import ChatBox from './ChatBox.jsx';

const CurrentContainer = styled.div`
  padding-top: 3%;
  margin:10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`


const VideoSide = styled.div`
padding: 20px;
width: 100%;
display: flex;
flex-direction: column;
box-shadow: 0 6px 18px 1px rgba(0,0,0,.2);
border-radius: 0 0 0 15px;
`
const VideoPlayer = styled.iframe`
  height: 400px;
  border:none;
`
const Title = styled.h2`
  word-wrap: normal;
  color: purple;
  margin: 0px;
  font-family: Helvetica;
`

const Channel = styled.p`
  font-family: Helvetica;
  display:flex;
  flex-direction: row;
  justify-content: space-between;
`

const CheckStats = styled.button`
  cursor: pointer;
  color: white;
  height: 2em;
  border: none;
  border-radius: 3px;
  width: 100px;
  background-color: purple;
`

const CurrentVideo = (props) => {
  return (
    <CurrentContainer isWatching={props.isWatching}>
      <VideoSide>
        <VideoPlayer src={`https://www.youtube.com/embed/${props.video.id.videoId}`} allowFullScreen/>
        <Title>{props.video.snippet.title}</Title>
        <Channel>{props.video.snippet.channelTitle}
        <CheckStats onClick={()=>props.checkStats()}>Check Stats</CheckStats>
        </Channel>
      </VideoSide>
      <ChatBox
        currentVideo={props.currentVideo}
        token={props.token}
        getLiveStreamId={props.getLiveStreamId}
        liveStreamId={props.liveStreamId}
        currentUserName={props.currentUserName}/>
    </CurrentContainer>
  )
}

export default CurrentVideo;
