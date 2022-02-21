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
    border: ${props => props.theme === 'light' ? '0.5px solid black' : '0.5px solid white'};
    margin-top: 5px;
    right:0;
    z-index:10;
    box-shadow:0px 0px 1px 2px #eee;
`

// NavList component
const NavList = styled.div`
    border: ${props => props.theme === 'light' ? '0.5px solid black' : '0.5px solid white'};

    background-color: ${props => props.theme === 'dark' ? 'black' : 'white'};
    width:150px;
    padding:14px;
    cursor:pointer;
    &:hover {
        background-color:rgb(248, 249, 250);
    };
`
export default Nav