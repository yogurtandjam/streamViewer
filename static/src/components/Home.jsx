import React from 'react';
import VideoThumbnail from './VideoThumbnail.jsx';
import styled from 'styled-components';
import { css } from 'styled-components';

const HomeContainer = styled.div`
  margin-top: 3%;
  display: flex;
  flex-flow: wrap;
  top:0;
  justify-content: space-between;
  ${props => !props.isHome && css` display: none`};
`


const Home = (props) => {
  return (
    <HomeContainer isHome={props.isHome}>
      {props.getUserName()}
      {props.videos.map((video, index) => <VideoThumbnail video={video} id={index} selectVideo={props.selectVideo}/>)}
    </HomeContainer>
  )
}

export default Home;