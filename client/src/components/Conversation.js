import React,{useState, useEffect} from 'react'
import styled from 'styled-components';
import Avatar from '@mui/material/Avatar';
import { fetchUser } from '../api/index';

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
const Timestamp = styled.div`
color: ${({ theme }) => theme.text_secondary + 99};
font-size: 10px;
font-weight: 700;
text-align: end;
`;
const Conversation = ({conversation, searchedUser, user}) => {

    const [friend, setFriend] = useState(null);

    useEffect(()=>{
        if(conversation){
        const friendId = conversation.members?.find((m)=>m!==user.result._id);

        fetchUser(friendId).then((res)=>{
            setFriend(res.data);
        }).catch((err)=>console.log(err))
    }else if(searchedUser){
        setFriend(searchedUser);
    }
    },[user,conversation])
    return (
        <Block>
            <PersonInfo>
                <Avatar src={friend?.profilePic} />
                <Info>
                    <Name>{friend?.name}</Name>
                </Info>
            </PersonInfo>
        </Block>
    )
}

export default Conversation