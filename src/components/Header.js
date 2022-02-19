import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../assets/logo.png';
import { useTheme } from '../context/themeProvider';
import { BsSearch } from 'react-icons/bs';
import { FlexContainer } from '../style/styles';
import Modal from './Modal';
import { useHistory } from 'react-router-dom';


const Header = (props) => {

  const history = useHistory();

  // const toLogOut = async () => {
  //   try {
  //     await dispatch(userActions.logOut());
  //     history.push("/");
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  const [modalOpen, setModalOpen] = React.useState(false);
  const modalClose = () => {
    setModalOpen(!modalOpen);
  };
  const ThemeMode = useTheme();

  return (
    <nav>
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
          <WriteBtn theme={ThemeMode[0]} onClick={() => { window.alert("aa") }}>새 글 작성</WriteBtn>
          <WriteBtn theme={ThemeMode[0]} onClick={() => { modalClose(); }}>로그인</WriteBtn>
          {modalOpen && <Modal modalClose={modalClose}></Modal>}
        </LeftMenu>
      </StyledHeader>
    </nav>
  )
}

export default Header;

const StyledHeader = styled.ul`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 97%;
  height: 64px;
  padding: 0px 100px;

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
`
const WriteBtn = styled.button`
  border: ${props => props.theme === 'light' ? '1px solid black' : '1px solid white'};
  color:  ${props => props.theme === 'light' ? 'black' : 'white'};
  cursor: pointer;
  border-radius: 25px;
  margin: 15px 10px 15px 0px;
  font-size: 14px;
  font-size: 17px;
  padding: 10px 15px;
  font-weight: bold;
  border-radius: 25px;
  &:hover {
    background-color: ${props => props.theme === 'light' ? 'black' : 'white'};;
    color:${props => props.theme === 'light' ? 'white' : 'black'};;
    transition: 0.125s;
  }
`
