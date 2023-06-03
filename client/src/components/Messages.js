import React, { useEffect } from 'react'
import styled from 'styled-components';
import { format } from 'timeago.js';
import './Sidebar.css';

const MessagesBlock = styled.div`
display: flex;
flex-direction: column;
width: 100%;
padding: 8px 10px;
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
min-height: 40px;
width: 120px;
padding: 8px;
background: ${({ theme }) => theme.bgHighlight};
color: ${({ theme }) => theme.text_primary};
border-radius: 0px 12px 12px 12px;
display: flex;
flex-direction: column;
position: relative;
&:hover{
    transform: translateY(-8px);
    transition: all 0.4s ease-in-out;
    box-shadow: 0 0 18px 0 rgba(0, 0, 0, 0.3);
    filter: brightness(1.3);
  }
`;
const MyMessage = styled.div`
min-height: 40px;
width: 120px;
padding: 8px;
background: ${({ theme }) => theme.primary};
color: ${({ theme }) => theme.text_primary};
border-radius: 12px 12px 0px 12px;
display: flex;
flex-direction: column;
gap: 4px;
position: relative;
&:hover{
    transform: translateY(-8px);
    transition: all 0.4s ease-in-out;
    box-shadow: 0 0 18px 0 rgba(0, 0, 0, 0.3);
    filter: brightness(1.3);
  }
`;
const Content = styled.div`
font-size: 14px;
`;
const Timestamp = styled.div`
color: ${({ theme }) => theme.text_secondary + 99};
font-size: 10px;
font-weight: 700;
text-align: end;
position: absolute;
bottom: 6px;
right: 6px;
`;

const Messages = ({ message, showChat, setShowChat, own }) => {

    // Define the syntax elements and their corresponding CSS classes
    const syntaxElements = [
        { regex: /\b(function|if|else|for|while)\b/g, className: 'keyword' },
        { regex: /\/\/.*$/gm, className: 'comment' },
        { regex: /(["'])(?:\\.|[^\\])*?\1/g, className: 'string' },
        // ... Add more syntax elements and their corresponding regex and CSS classes
    ];

    // Wrap each syntax element with the appropriate React component
    let highlightedCode = message.text;
    syntaxElements.forEach((element) => {
        highlightedCode = highlightedCode.replace(
            element.regex,
            (match) => `<span class="${element.className}">${match}</span>`
        );
    });

    function highlightCode(code) {
        // Define the syntax elements and their corresponding CSS classes


        return (
            <code>
                {React.createElement('span', { dangerouslySetInnerHTML: { __html: highlightedCode } })}
            </code>
        );
    }

    useEffect(() => {
        highlightCode(message.text)
    }, [])

    return (
        <MessagesBlock>
            {!own ?
                <MessageContainer>
                    <Message>
                        <Content>
                            <code className="chat-message">
                                {React.createElement('span', { dangerouslySetInnerHTML: { __html: highlightedCode } })}
                            </code>
                        </Content>
                        {/* <div className="chat-message"></div> */}
                        <Timestamp>{format(message.createdAt)}</Timestamp>
                    </Message>
                </MessageContainer>
                :
                <MyMessageContainer>
                    <MyMessage>
                        <Content>
                            <code className="chat-message">
                                {React.createElement('span', { dangerouslySetInnerHTML: { __html: highlightedCode } })}
                            </code>
                        </Content>
                        {/* <Content className="chat-message"></Content> */}
                        <Timestamp>{format(message.createdAt)}</Timestamp>
                    </MyMessage>
                </MyMessageContainer>
            }
        </MessagesBlock>
    )
}

export default Messages