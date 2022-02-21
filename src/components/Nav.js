import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";

// JS파일
import { actionCreators as userActions } from '../redux/modules/user'

const Nav = (props) => {

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
        ? <NavBar>
          <NavList>내 글 보기</NavList>
          <NavList>좋아요</NavList>
          <NavList onClick={signOut}>로그아웃</NavList>
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
    box-shadow:0px 0px 1px 2px #eee;
`

// NavList component
const NavList = styled.div`
    width:150px;
    background: #fff;
    padding:14px;
    cursor:pointer;
    &:hover {
        background-color:rgb(248, 249, 250);
    };
`
export default Nav