import React from 'react'
import styled from 'styled-components';
import { format } from 'timeago.js';

const MessagesBlock = styled.div`
display: flex;
flex-direction: column;
width: 100%;
padding: 20px 10px;
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
&:hover{
    transform: translateY(-8px);
    transition: all 0.4s ease-in-out;
    box-shadow: 0 0 18px 0 rgba(0, 0, 0, 0.3);
    filter: brightness(1.3);
  }
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
&:hover{
    transform: translateY(-8px);
    transition: all 0.4s ease-in-out;
    box-shadow: 0 0 18px 0 rgba(0, 0, 0, 0.3);
    filter: brightness(1.3);
  }
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

const Messages = ({ message, showChat, setShowChat, own }) => {
    return (
        <MessagesBlock>
            {!own ?
                <MessageContainer>
                    <Message>
                        <Content>{message.text}</Content>
                        <Timestamp>{format(message.createdAt)}</Timestamp>
                    </Message>
                </MessageContainer>
                :
                <MyMessageContainer>
                    <MyMessage>
                        <Content>{message.text}</Content>
                        <Timestamp>{format(message.createdAt)}</Timestamp>
                    </MyMessage>
                </MyMessageContainer>
            }
        </MessagesBlock>
    )
}

export default Messages