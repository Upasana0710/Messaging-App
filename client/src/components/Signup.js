import React, { useState } from 'react'
import styled from 'styled-components';
import { Link, useNavigate } from "react-router-dom"
import { useGoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { signupGoogle, signinGoogle } from "../redux/actions/auth";

const MainContainer = styled.div`
  background: ${({ theme }) => theme.bgLight};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 40px;
  overflow-x: hide;
  box-sizing: border-box;
`;
const Box = styled.div`
  background: ${({ theme }) => theme.bg};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 24%;
  height: 200px;
  border-radius: 8px;
  gap: 40px;
`;
const Welcome = styled.div`
  color: ${({ theme }) => theme.text_primary};
  width: 100%;
  text-align: center;
`;
const Container = styled.div`
display: flex;
flex-direction: column;
gap: 8px;
`;
const Button = styled.div`
  background: ${({ theme }) => theme.primary};
  width: 200px;
  height: 30px;
  border-radius: 8px;
  display-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
const Content = styled.div`
color: ${({ theme }) => theme.text_primary};
text-align: center;
font-size: 14px;
`;
const Redirect = styled.div`
color: ${({ theme }) => theme.text_secondary};
text-align: center;
font-size: 12px;
font-weight: 550;
&:hover{
    color: ${({ theme }) => theme.primary};
    cursor: pointer;
}
`;
const Signup = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [user, setUser] = useState({ name: '', email: '', profilePic: '' });
    const [signin, setSignin] = useState(false);

    function handleGoogleSignUpSuccess(tokenResponse) {

        const accessToken = tokenResponse.access_token;

        dispatch(signupGoogle(accessToken, navigate))
    }

    const signupfunc = useGoogleLogin({ onSuccess: handleGoogleSignUpSuccess });

    function handleGoogleSignInSuccess(tokenResponse) {

        const accessToken = tokenResponse.access_token;

        dispatch(signinGoogle(accessToken, navigate))
    }
    const signinfunc = useGoogleLogin({ onSuccess: handleGoogleSignInSuccess });

    return (
        <MainContainer>
            <Box>
                <Welcome>Welcome to Chat App</Welcome>
                {!signin ?
                    <Container>
                        <Button onClick={() => signupfunc()}>
                            <Content>Sign Up</Content>
                        </Button>
                        <Redirect onClick={() => setSignin(true)}>Already have an account? Sign in.</Redirect>
                    </Container>
                    :
                    <Container>
                        <Button onClick={() => signinfunc()}>
                            <Content>Sign In</Content>
                        </Button>
                        <Redirect onClick={() => setSignin(false)}>Already have an account? Sign up.</Redirect>
                    </Container>
                }
            </Box>
        </MainContainer>
    )
}

export default Signup