import React from 'react';
import styled from 'styled-components';
import DetailLayout from './DetailLayout';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/themeProvider';
import PostDetail from "../pages/PostDetail"

const Sub = () => {
  const ThemeMode = useTheme();
  return (
    <DetailLayout>
      <PostDetail />
    </DetailLayout>
  )
}

export default Sub;

const StyledButton = styled.button`
  width: 240px;
  height: 56px;
  border-radius: 4px;
  border: ${props => props.theme === 'light' ? '1px solid #31302E' : '1px solid #bbb'};
  color:  ${props => props.theme === 'light' ? '#31302E' : '#bbb'};
`
