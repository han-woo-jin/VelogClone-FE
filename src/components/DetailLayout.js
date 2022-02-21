import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../context/themeProvider';
import { FlexContainer } from '../style/styles';
import ThemeToggle from '../theme/ThemeToggle';
import DetailHeader from './DetailHeader';
import PostList from '../pages/PostList';

const AppLayout = ({ children }) => {
  const [ThemeMode, toggleTheme] = useTheme();
  return (
    <WrapContainer>
      <DetailHeader />


      <ThemeToggle toggle={toggleTheme} mode={ThemeMode}>
        DarkMode
      </ThemeToggle>
      <FlexContainer>{children}</FlexContainer>
    </WrapContainer>
  )
}

export default AppLayout;

const WrapContainer = styled.main`
  min-height: 100%;
  position: relative;
`;
