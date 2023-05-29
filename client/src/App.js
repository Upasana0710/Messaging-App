import { ThemeProvider } from "styled-components";
import { useState } from "react";
import { darkTheme, lightTheme } from "./utils/Themes";
import styled from 'styled-components';
import './App.css';
import {Routes, Route} from 'react-router-dom'
import HorizontalBar from "./components/HorizontalBar";
import Signup from '../src/components/Signup';
import Sidebar from "./components/Sidebar";

const MainContainer = styled.div`
  background: ${({ theme }) => theme.bgLight};
  width: 100%;
  height: 100vh;
  overflow-x: hide;
`;
function App() {
  const [darkMode, setDarkMode] = useState(true);
  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <MainContainer>
        <HorizontalBar darkMode={darkMode} setDarkMode={setDarkMode} />
        <Routes>
        <Route path="/" element={<Signup/>}/>
        <Route path="/messaging" element={<Sidebar/>}/>
      </Routes>
      </MainContainer>
    </ThemeProvider>
  );
}

export default App;
