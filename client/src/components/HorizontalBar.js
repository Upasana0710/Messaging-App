import React from 'react'
import styled from 'styled-components';

const MainContainer= styled.div`
  background: ${({ theme }) => theme.bg};
  height: 40px;
  padding: 10px 40px;
  display: flex;
  justify-content: flex-end;
`;
const Mode= styled.div`
  background: ${({ theme }) => theme.bg};
  width: 80px;
  padding: 8px;
  border: 1px solid ${({ theme }) => theme.primary};
  border-radius: 16px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ChangeMode= styled.div`
  color: ${({ theme }) => theme.primary};
`;
const HorizontalBar = ({darkMode, setDarkMode}) => {
  return (
    <MainContainer>
        <Mode onClick={()=>setDarkMode(!darkMode)}>
            {darkMode?
                <ChangeMode >Light Mode</ChangeMode>
                :
                <ChangeMode >Dark Mode</ChangeMode>
            }
        </Mode>
    </MainContainer>
  )
}

export default HorizontalBar