import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../context/themeProvider';
import PostList from '../pages/PostList';
import AppLayout from './AppLayout';
import Card from './Card';

const Main = () => {
  const ThemeMode = useTheme();
  const CurrentMode = ThemeMode[0] === 'light' ? '🌝' : '🌚';

  return (
    <AppLayout>
      <PostList />
    </AppLayout>
  )
}

export default Main;

const ColoredText = styled.span`
  color: #E6B74A;
`