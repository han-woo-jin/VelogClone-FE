import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useTheme } from '../context/themeProvider';
import { BsSearch } from 'react-icons/bs';
import Modal from './Modal';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as userActions } from '../redux/modules/user';
import Nav from './Nav';
import { AiFillCaretDown } from "react-icons/ai";

const Header = (props) => {
  const userName = localStorage?.getItem("userName")?.substring(0, 2)

  const dispatch = useDispatch();
  const user = document.cookie
  // const user = true;
  const history = useHistory();

  const [nav, setNav] = React.useState(false)

  const navBtn = () => {
    if (nav) {
      setNav(false)
    } else {
      setNav(true)
    }
  }
  const LogOut = async () => {
    try {
      await dispatch(userActions.logoutAction());
      history.push("/");
    } catch (err) {
      console.error(err);
    }
  };
  // const [LoginMode, setLoginMode] = React.useState(true);
  // const onClickModal = () => {
  //   setLoginMode(!LoginMode);
  // };
  const [modalOpen, setModalOpen] = React.useState(false);
  const modalClose = () => {
    setModalOpen(!modalOpen);
  };
  const ThemeMode = useTheme();

  if (user) {
    return (
      <>
        <StyledHeader>
          <RightMenu theme={ThemeMode[0]}>
            <Link to='/' >
              velog
            </Link>
          </RightMenu>
          <LeftMenu>
            <BsSearch style={{
              width: "25px",
              height: "25px",
              marginRight: "10px",
              marginBottom: "-7px",
            }} />
            <WriteBtn theme={ThemeMode[0]} onClick={() => { history.push('/postwrite') }}>새 글 작성</WriteBtn>

            <UserBtn theme={ThemeMode[0]} onClick={navBtn} >{userName}</UserBtn>
            <AiFillCaretDown onClick={navBtn} />
            <Nav nav={nav} />

            {modalOpen && <Modal modalClose={modalClose}></Modal>}
          </LeftMenu>
        </StyledHeader>
      </>
    )
  }

  return (
    <>
      <StyledHeader>
        <RightMenu theme={ThemeMode[0]}>
          <Link to='/' >
            velog
          </Link>
        </RightMenu>
        <LeftMenu>
          <BsSearch style={{
            width: "25px",
            height: "25px",
            marginRight: "10px",
            marginBottom: "-7px",
          }} />
          <WriteBtn theme={ThemeMode[0]} onClick={() => { modalClose(); }}>로그인</WriteBtn>
          {modalOpen && <Modal modalClose={modalClose}></Modal>}

        </LeftMenu>
      </StyledHeader>
    </>
  )

}

export default Header;

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: auto;
  height: 64px;
  padding: 10px 110px 0px 110px;
  margin-left: auto;
  margin-right: auto;

  -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: justify;

  font-family: "Fira Mono", monospace;
`

const RightMenu = styled.li`
  & a {
    display: flex;
    align-items: center;
    font-size: 25px;
    color:  ${props => props.theme === 'light' ? 'black' : 'white'};
    font-weight: bold;
    & img {
      width: 30px;
    }
    & p {
      margin-left: 2px;
      font-size: 25px;
      font-weight: 500;
    }
  }
`

const LeftMenu = styled.li`
  font-size: 16px;
  font-weight: 500;
  min-width: 200px;
`
const WriteBtn = styled.button`
  border: ${props => props.theme === 'light' ? '1px solid black' : '1px solid white'};
  color:  ${props => props.theme === 'light' ? 'black' : 'white'};
  cursor: pointer;
  border-radius: 25px;
  margin: 15px 0px 15px 5px;
  font-size: 14px;
  font-size: 17px;
  padding: 10px 10px;
  font-weight: bold;
  border-radius: 25px;
  &:hover {
    background-color: ${props => props.theme === 'light' ? 'black' : 'white'};
    color:${props => props.theme === 'light' ? 'white' : 'black'};;
    transition: 0.125s;
  }
`
const UserBtn = styled.button`
  border: ${props => props.theme === 'light' ? '1px solid black' : '1px solid white'};
  color:  ${props => props.theme === 'light' ? 'black' : 'white'};
  
  cursor: pointer;
  width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-left: 0.5rem;
  font-size: 16px;
  padding: 10px 10px;
  font-weight: bold;
  &:hover {
    background-color: ${props => props.theme === 'light' ? 'black' : 'white'};
    color:${props => props.theme === 'light' ? 'white' : 'black'};;
    transition: 0.125s;
  }
`