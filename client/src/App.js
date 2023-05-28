import { ThemeProvider } from "styled-components";
import { useState } from "react";
import { darkTheme, lightTheme } from "./utils/Themes";
import styled from 'styled-components';
import './App.css';
import Sidebar from "./components/Sidebar";
import HorizontalBar from "./components/HorizontalBar";

const MainContainer = styled.div`
  background: ${({ theme }) => theme.bgLight};
  width: 100%;
  height: 100vh;
`;
function App() {
  const [darkMode, setDarkMode] = useState(true);
  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <MainContainer>
        <HorizontalBar darkMode={darkMode} setDarkMode={setDarkMode} />
        <Sidebar />
      </MainContainer>
    </ThemeProvider>
  );
}

export default App;
