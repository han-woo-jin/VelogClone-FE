import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../context/themeProvider';
import Input from '../elements/Input';
import Text from '../elements/Text';
import { emailCheck } from '../shared/common';
import { actionCreators as userActions } from "../redux/modules/user";
import { useDispatch } from "react-redux";

const Signup = (props) => {
  const ThemeMode = useTheme();
  const [userEmail, setEmail] = React.useState("");
  const [password, setPw] = React.useState("");
  const [passwordcheck, setPwCheck] = React.useState("");
  const [userName, setNickName] = React.useState("");
  const [modalOpen, setModalOpen] = React.useState(false);

  const modalClose = () => {
    setModalOpen(!modalOpen);
  };
  const dispatch = useDispatch();
  const signup = () => {


    if (userEmail === "" || password === "" || passwordcheck === "" || userName === "") {
      window.alert("아이디, 패스워드, 닉네임을 모두 입력해주세요!");
      return;
    }
    // id가 이메일 형식 확인
    if (!emailCheck(userEmail)) {
      window.alert("이메일 형식이 맞지 않습니다!");
      return;
    }
    if (!password || password.length < 4) {
      alert("비밀번호 입력란을 다시 확인해주세요! 비밀번호는 4자리 이상입니다");
      return;
    }
    // 비밀번호와 비밀번호 확인 부분이 일치하나 확인!
    if (password !== passwordcheck) {
      window.alert("패스워드와 패스워드 확인이 일치하지 않습니다!");
      return;
    }
    if (!userName) {
      alert("사용하실 닉네임을 입력해주세요!");
      return;
    }

    dispatch(userActions.signupAction(userEmail, password, passwordcheck, userName));
    // dispatch(userActions.loginAction(userEmail, password));

  };
  return (

    <StyledBox theme={ThemeMode[0]}>
      <Text bold size="26px">
        회원가입
      </Text>
      <Input
        label="이메일"
        placeholder="이메일을 입력하세요"
        _onChange={(e) => {
          setEmail(e.target.value);
        }}
        style={{ border: "none" }}
      ></Input>
      <Input
        label="비밀번호"
        placeholder="비밀번호을 입력하세요"
        type="password"
        style={{ border: "none" }}
        _onChange={(e) => {
          setPw(e.target.value);
        }}
      ></Input>
      <Input
        label="비밀번호 확인"
        placeholder="비밀번호를 다시 입력해주세요"
        type="password"
        _onChange={(e) => {
          setPwCheck(e.target.value);
        }}
      ></Input>
      <Input
        label="닉네임"
        placeholder="닉네임을 입력하세요"
        _onChange={(e) => {
          setNickName(e.target.value);
        }}
      ></Input>
      <Btn
        onClick={() => {
          console.log("회원가입!!");
          signup();
        }}
      >
        회원가입
      </Btn>
    </StyledBox>

  )
}

export default Signup;

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
  padding: 10px 1px;
  font-weight: bold;
  width: 95.99px;
  height: 47.99px;
  border: none;
  position: absolute;
  right: 36px;
  border: none;

`;
