import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useTheme } from '../context/themeProvider';
// JS파일
import { actionCreators as userActions } from '../redux/modules/user'

const Nav = (props) => {

  const ThemeMode = useTheme();
  const dispatch = useDispatch()

  // props.nav (false or true)
  const navState = props.nav

  // NavBar 설정
  const [nav, setNav] = useState(false)

  // useEffect로 navState가 바뀔때마다 렌더링
  useEffect(() => {
    setNav(navState)
  }, [navState])

  // SignOut
  const signOut = () => {
    dispatch(userActions.logoutAction())
    setNav(false)
  }

  return (
    <React.Fragment>
      {nav
        ? <NavBar theme={ThemeMode[0]}>
          <NavList theme={ThemeMode[0]}>내 글 보기</NavList>
          <NavList theme={ThemeMode[0]}>좋아요</NavList>
          <NavList onClick={signOut} theme={ThemeMode[0]}>로그아웃</NavList>
        </NavBar>
        : null
      }
    </React.Fragment>
  )
}

// NavBar component
const NavBar = styled.nav`
    
    position:absolute;
    width: auto;
    top: 60px;
    margin-right: 110px;
    margin-top: 5px;
    right:0;
    z-index:10;
`

// NavList component
const NavList = styled.div`

    border: ${props => props.theme === 'light' ? '0.5px solid #1e1e1e' : '0.5px solid #3c3c3c'};
    background-color: ${props => props.theme === 'dark' ? '#1e1e1e' : 'white'};
    width:150px;
    padding:14px;
    cursor:pointer;
    &:hover {
    background-color: ${props => props.theme === 'dark' ? 'white' : '#3c3c3c'};
    color: ${props => props.theme === 'dark' ? '#3c3c3c' : 'white'};
    };
`
export default Nav