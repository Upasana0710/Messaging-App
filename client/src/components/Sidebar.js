import React, { useState } from 'react'
import styled from 'styled-components';
import Avatar from '@mui/material/Avatar';
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

const MainContainer = styled.div`
  background: ${({ theme }) => theme.bg};
  height: 100%;
  display: flex;
  flex-direction: column;
  width: 24%;
  position: fixed;
  right: 0;
`;
const Header = styled.div`
  background: ${({ theme }) => theme.bg};
  height: 54px;
  width: 100%;
  padding: 8px 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  box-sizing: border-box;
`;
const Heading = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 14px;
  height: 100%;
`;
const Title = styled.div`
  color: ${({ theme }) => theme.text_secondary};
  font-size: 18px;
  font-weight: 520;
`;
const SearchBlock = styled.div`
background: ${({ theme }) => theme.bg};
height: 60px;
display: flex;
justify-content: center;
align-items: center;
`;
const Block = styled.div`
background: ${({ theme }) => theme.bg};
height: 54px;
display: flex;
justify-content: space-between;
align-items: center;
padding: 8px 0px;
padding-right: 12px;
cursor: pointer;
&:hover{
    background: ${({ theme }) => theme.bgHighlight};
    border-left: 1px solid ${({ theme }) => theme.primary};
}
`;
const Search = styled.div`
background: ${({ theme }) => theme.bgHighlight};
color: ${({ theme }) => theme.text_primary};
height: 38px;
width: 90%;
border-radius: 10px;
display: flex;
align-items: center;
padding: 12px;
box-sizing: border-box;
gap: 4px;
`;
const PersonInfo = styled.div`
display: flex;
padding: 0px 16px;
gap: 12px;
`;
const Name = styled.div`
color: ${({ theme }) => theme.text_primary};
`;
const Info = styled.div`
display: flex;
flex-direction: column;
gap: 4px;
`;
const LastMessage = styled.div`
color: ${({ theme }) => theme.text_secondary};
font-size: 12px;
`;
const Conversations = styled.div`
display: flex;
flex-direction: column;
`;
const Chat = styled.div`
display: flex;
flex-direction: column;
`;
const MessageBlock = styled.div`
background: ${({ theme }) => theme.bg};
color: ${({ theme }) => theme.text_primary};
height: 60px;
width: 100%;
padding: 0px 12px;
border-top: 1px solid ${({ theme }) => theme.bgHighlight};
display: flex;
justify-content: center;
align-items: center;
position: fixed;
bottom: 0;
`;
const ChattingWith = styled.div`
display: flex;
flex-direction: row;
justify-content: start;
align-items: center;
height: 60px;
width: 100%;
padding: 0px 12px;
gap: 12px;
border-top: 1px solid ${({ theme }) => theme.primary+99};
`;
const Messages = styled.div`
display: flex;
flex-direction: column;
width: 100%;
padding: 10px;
box-sizing: border-box;
`;
const MessageContainer = styled.div`
display: flex;
justify-content: flex-start;
`;
const MyMessageContainer = styled.div`
display: flex;
justify-content: flex-end;
`;
const Message = styled.div`
height: fit-content;
width: fit-content;
padding: 8px;
background: ${({ theme }) => theme.bgHighlight};
border-radius: 0px 12px 12px 12px;
display: flex;
flex-direction: column;
gap: 4px;
`;
const MyMessage = styled.div`
height: fit-content;
width: fit-content;
padding: 8px;
background: ${({ theme }) => theme.primary};
border-radius: 12px 12px 0px 12px;
display: flex;
flex-direction: column;
gap: 4px;
`;
const Content = styled.div`
color: ${({ theme }) => theme.text_primary};
font-size: 12px;
`;
const Timestamp = styled.div`
color: ${({ theme }) => theme.text_secondary + 99};
font-size: 10px;
font-weight: 700;
text-align: end;
`;
const Sidebar = () => {
    const numbers = [1, 2, 3, 4, 5];
    const [showChat, setShowChat] = useState(false)
    return (
        <MainContainer>
            <Header>
                <Heading>
                    <ChatBubbleOutlineIcon style={{ "color": "#b1b2b3" }} />
                    <Title>Messaging</Title>
                </Heading>
                <Avatar />
            </Header>
            {!showChat ?
                <Conversations>
                    <SearchBlock>
                        <Search>
                            <SearchIcon style={{ "color": "#b1b2b3" }} />
                            <input type="text" placeholder="Search" style={{ "border": "none", "outline": "none", "width": "100%", "background": "inherit", "color": "inherit" }} />
                        </Search>
                    </SearchBlock>
                    {numbers.map(() => (
                        <Block onClick={() => setShowChat(!showChat)}>
                            <PersonInfo>
                                <Avatar />
                                <Info>
                                    <Name>John Doe</Name>
                                    <LastMessage>Last Message</LastMessage>
                                </Info>
                            </PersonInfo>
                            <Timestamp>7:10pm</Timestamp>
                        </Block>
                    ))}
                </Conversations>
                :
                <Chat>
                    <ChattingWith>
                        <ArrowBackIcon style={{ "color": "#b1b2b3", "cursor": "pointer" }} onClick={() => setShowChat(!showChat)} />
                        <Avatar />
                        <Name>John Doe</Name>
                    </ChattingWith>
                    <Messages>
                        <MessageContainer>
                            <Message>
                                <Content>Hi this is John Doe</Content>
                                <Timestamp>7:10pm</Timestamp>
                            </Message>
                        </MessageContainer>
                        <MyMessageContainer>
                            <MyMessage>
                                <Content>Hi this is John Doe</Content>
                                <Timestamp>7:10pm</Timestamp>
                            </MyMessage>
                        </MyMessageContainer>
                    </Messages>
                    <MessageBlock>
                        <input placeholder="Message..." type="text" style={{ "border": "none", "outline": "none", "width": "100%", "background": "inherit", "color": "inherit", "font-size": "16px" }} />
                    </MessageBlock>
                </Chat>
            }
        </MainContainer>
    )
}

export default Sidebar