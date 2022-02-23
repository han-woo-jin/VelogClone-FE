import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../context/themeProvider';
import Input from '../elements/Input';
import Text from '../elements/Text';
import { actionCreators as userActions } from '../redux/modules/user';
import { emailCheck } from '../shared/common';
import { useDispatch } from 'react-redux';


const Login = () => {
  const dispatch = useDispatch();
  const ThemeMode = useTheme();

  const [userEmail, loginEmail] = React.useState("");
  const [password, loginPw] = React.useState("");
  const login = () => {

    if (!emailCheck(userEmail) || !userEmail) {
      alert("이메일 형식을 다시 확인해주세요!");
      return;
    }

    if (!password || password.length < 4) {
      alert("비밀번호 입력란을 다시 확인해주세요! 비밀번호는 4자리 이상입니다");
      return;
    }
    dispatch(userActions.loginAction(userEmail, password));

  };
  return (

    <StyledBox theme={ThemeMode[0]}>
      <Text bold size="26px">
        로그인
      </Text>
      <Input
        label="이메일"
        placeholder="이메일을 입력하세요"
        _onChange={(e) => {
          loginEmail(e.target.value);
        }}
        style={{ border: "none" }}
      ></Input>
      <Input
        label="비밀번호"
        placeholder="비밀번호을 입력하세요"
        type="password"
        style={{ border: "none" }}
        _onChange={(e) => {
          loginPw(e.target.value);
        }}
      ></Input>
      <Btn
        onClick={() => {
          login();
        }}
      >
        {" "}
        로그인{" "}
      </Btn>
    </StyledBox>

  )
}

export default Login;

const StyledBox = styled.div`
margin: auto;
  padding: 20px;
  min-width: 250px;
  width: auto;
  height: auto;
  color: ${props => props.theme === 'light' ? 'white' : '#121212'};

background-color: ${props => props.theme === 'light' ? 'white' : '#121212'};;
`

const Btn = styled.button`
  margin: 10px 10px 0px 0px;
  font-size: 16px;
  background-color: #4cbc9b;
  color: white;
  padding: 10px 15px;
  font-weight: bold;
  width: 95.99px;
  height: 47.99px;
  border: none;
  position: absolute;
  right: 36px;
  border: none;

`;
