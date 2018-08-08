import React from 'react';
import styled from 'styled-components';

const VideoContainer = styled.div`
  text-align:center;
  display: inline-block;
  min-height: 1px;
  margin: 10px;
  width: 18%;
`
const BoxShadow = styled.div`
  box-shadow: 0 6px 18px 1px rgba(0,0,0,.2);
  width: 70%;
`
const Thumbnail = styled.img`
  cursor: pointer;
  height: 100%;
  width: 100%;
  border-radius: 0 5px 0 5px;
`

const Title = styled.p`
  margin-top: 0px;
  color: black;
  font-family: Helvetica;
`

const VideoThumbnail = (props) => {
  return (
    <VideoContainer>
      <BoxShadow>
        <Thumbnail onClick={()=>props.selectVideo(props.video)} src={props.video.snippet.thumbnails.default.url} alt=""/>
        <Title>{props.video.snippet.channelTitle}</Title>
      </BoxShadow>
    </VideoContainer>
  )
}

export default VideoThumbnail;