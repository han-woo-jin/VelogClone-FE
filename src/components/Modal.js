import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../context/themeProvider';
import AppLayout from './AppLayout';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import { Text } from '../elements';


const Modal = ({ modalClose }) => {
  const ThemeMode = useTheme();

  const [status, setStatus] = React.useState(false);

  // const onCloseModal = (e) => {
  //   console.log("e.target: ", e.target);
  //   console.log("e.tarcurrentTargetget: ", e.currentTarget);
  //   if (e.target === e.currentTarget) {
  //     modalClose(false);
  //   }
  // };

  return (
    <AppLayout>
      <Container>
        <ModalBox>
          <WelcomeBox theme={ThemeMode[0]}>
            <WelcomeImg theme={ThemeMode[0]} src="https://static.velog.io/static/media/undraw_joyride_hnno.fae6b95e.svg"></WelcomeImg>
            <WelcomeText theme={ThemeMode[0]} >환영합니다!</WelcomeText>
          </WelcomeBox>
          <UserBox theme={ThemeMode[0]}>

            <button style={{ float: "right" }} onClick={() => { modalClose(false); }}>❌</button>
            {!status && <Login />}
            {status && <Signup />}
            <ChangeDiv theme={ThemeMode[0]}>
              {!status && (
                <>
                  <Text>아직 회원이 아니신가요?</Text>
                  <ChangBtn theme={ThemeMode[0]} onClick={() => setStatus((prev) => !prev)}>
                    회원가입
                  </ChangBtn>
                </>
              )}
              {status && (
                <>
                  <Text>계정이 이미 있으신가요?</Text>
                  <ChangBtn theme={ThemeMode[0]} onClick={() => setStatus((prev) => !prev)}>
                    로그인
                  </ChangBtn>

                </>
              )}
            </ChangeDiv>
          </UserBox>
        </ModalBox>
      </Container>
    </AppLayout>
  )
}

export default Modal;

const ColoredText = styled.span`
  color: #E6B74A;
`
const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.2);
  // opacity: 0.5;
  z-index: 10;
  position: fixed;
  top: 0;
  left: 0;
`;

const ModalBox = styled.div`
  display: flex;
  width: auto;
  height: 390px;
  background-color: black;
  // Modal 창 브라우저 가운데로 조정
  position: absolute;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%);
  z-index: 100;
`;

const WelcomeBox = styled.div`
  padding: 24px;
  width: 250px;
  height: 450px;
  background-color:  ${props => props.theme === 'light' ? '#f1f3f5' : 'gray'};
`;


const WelcomeText = styled.text`
  display: inline-block;
  width: 100%;
  text-align: center;
  color:  ${props => props.theme === 'light' ? 'black' : 'white'};
  font-weight: bold;
  font-size: 28px;
  background-color: transparent;
`;

const WelcomeImg = styled.img`
background-color:  ${props => props.theme === 'light' ? '#f1f3f5' : 'gray'};
  margin-top: 100px;
  width: 200px;
  height: 200px;
`;
const UserBox = styled.div`
  padding: 24px;
  width: 400px;
  height: 450px;

  background-color: ${props => props.theme === 'light' ? 'white' : '#121212'};
`;

const ChangeDiv = styled.div`

background-color: ${props => props.theme === 'light' ? 'white' : '#121212'};
  display: flex;
  align-items: flex-start;
  position: absolute;
  right: 10px;
  bottom: -50px;
`;

const ChangBtn = styled.div`

background-color: ${props => props.theme === 'light' ? 'white' : '#121212'};
  width: auto;
  margin: 15px;
  font-size: 16px;
  margin-left: 15px;
  font-weight: 600;
  color: #4cbc9b;
  font-weight: bold;

  :hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;