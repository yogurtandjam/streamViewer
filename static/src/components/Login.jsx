import React from 'react';
import styled from 'styled-components';
import { GoogleLogin } from 'react-google-login-component';

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

class Login extends React.Component{
 
  constructor (props, context) {
    super(props, context);
    this.responseGoogle = this.responseGoogle.bind(this);
  }
 
  responseGoogle (googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    var googleId = googleUser.getId();
    console.log({ googleId });
    console.log({accessToken: id_token});
    console.log(this.props)
    this.props.goHome();
    //anything else you want to do(save to localStorage)...
  }
 
  render () {
    return (
      <LoginContainer>
        <LoginText>Log In</LoginText>
        <GoogleLogin socialId="371647430195-thi6ovloq7a7kqsf9asro4jca9a9hhoa.apps.googleusercontent.com"
                     className="google-login"
                     scope="profile"
                     fetchBasicProfile={false}
                     responseHandler={this.responseGoogle}
                     buttonText="Login With Google"/>
      </LoginContainer>
    );
  }
 
}
 
export default Login;