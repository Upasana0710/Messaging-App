import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components';
import Avatar from '@mui/material/Avatar';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import SendIcon from '@mui/icons-material/Send';
import { getDM, getMessages, fetchUser, createMessage } from '../api/index';
import Conversation from './Conversation';
import Messages from './Messages';

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
width: 24%;
padding: 0px 12px;
border-top: 1px solid ${({ theme }) => theme.bgHighlight};
display: flex;
justify-content: center;
align-items: center;
position: fixed;
bottom: 0;
box-sizing: border-box;
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
`;
const Name = styled.div`
color: ${({ theme }) => theme.text_primary};
`;


const Sidebar = () => {
    const [showChat, setShowChat] = useState(false);
    const [conversations, setConversations] = useState([]);
    const [dms, setDms] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [currentChat, setCurrentChat] = useState(null);
    const [friend, setFriend] = useState(null);
    const scrollRef = useRef();
    const user = JSON.parse(localStorage.getItem('user_info'));
    let arr;
    useEffect(() => {
        const getConversations = async () => {
            getDM(user.result._id).then((res) => {
                setConversations(res.data);
            })
                .catch((err) =>
                    console.log(err));
        }
        getConversations();
    }, [user.result._id])
    const messaging = async () => {
        // getMessages(currentChat?._id).then((res) => {
        //     setdms(res.data);
        //     console.log(dms);
        // })
        //     .catch((err) =>
        //         console.log(err));
        try {
            const res = await getMessages(currentChat?._id)
            const friendId = currentChat?.members.find((m)=>m!==user.result._id);
            fetchUser(friendId).then((res)=>{
                setFriend(res.data);
            }).catch((err)=>console.log(err))
            // console.log(res.data);
            // console.log(res.data.messages);
            // setDms(res.data.messages);
            // console.log(dms);
            // arr = res.data.messages;
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {

        messaging()
    }, [currentChat])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const message = {
            sender: user.result._id,
            text: newMessage,
            conversationId: currentChat._id
        }
        try{
            const res = await createMessage(message);
            console.log(res.data)
            setNewMessage("");
            // setDms([...dms,res.data])
        }catch(error){
            console.log(error);
        }
    }
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
      }, [dms]);
    return (
        <MainContainer>
            <Header>
                <Heading>
                    <ChatBubbleOutlineIcon style={{ "color": "#b1b2b3" }} />
                    <Title>Messaging</Title>
                </Heading>
                <Avatar src={user.result?.profilePic} />
            </Header>
            {!showChat ?
                <Conversations>
                    <SearchBlock>
                        <Search>
                            <SearchIcon style={{ "color": "#b1b2b3" }} />
                            <input type="text" placeholder="Search" style={{ "border": "none", "outline": "none", "width": "100%", "background": "inherit", "color": "inherit" }} />
                        </Search>
                    </SearchBlock>
                    {conversations.map((conversation) => (
                        <div onClick={() => setCurrentChat(conversation)}>
                            <Conversation conversation={conversation} user={user} showChat={showChat} setShowChat={setShowChat} />
                        </div>
                    ))}
                </Conversations>
                :
                <Chat>
                    <ChattingWith>
                        <ArrowBackIcon style={{ "color": "#b1b2b3", "cursor": "pointer" }} onClick={() => setShowChat(!showChat)} />
                        <Avatar src={friend?.profilePic}/>
                        <Name>{friend?.name}</Name>
                    </ChattingWith>
                    {/* {arr.map((message) => (
                        <div ref={scrollRef}>
                            <Messages message={message} showChat={showChat} setShowChat={setShowChat} own={message.sender === user._id} />
                        </div>
                    ))} */}
                    <MessageBlock>
                        <input placeholder="Message..." type="text" style={{ border: "none", outline: "none", width: "100%", background: "inherit", color: "inherit", fontSize: "16px" }} 
                        onChange={(e)=>setNewMessage(e.target.value)} value={newMessage}/>
                        <SendIcon style={{ "color": "#b1b2b3", "cursor": "pointer" }} onClick={handleSubmit}/>
                    </MessageBlock>
                </Chat>
            }
        </MainContainer>
    )
}

export default Sidebar