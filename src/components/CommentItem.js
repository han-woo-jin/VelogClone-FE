import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { actionCreators as commentActions } from "../redux/modules/comment";
import { useTheme } from '../context/themeProvider';
const CommentItem = (props) => {

  const ThemeMode = useTheme();
  const dispatch = useDispatch();

  const loginUser = localStorage.getItem("userName")
  const comment = props.comment
  const commentId = props.commentId
  const commentModifiedAt = props.commentModifiedAt
  const commentUserName = props.commentUserName
  const userIcon = commentUserName.substring(0, 2)


  const handleDelete = () => {
    const result = window.confirm("댓글을 정말로 삭제하시겠습니까?");
    if (result) {
      dispatch(commentActions.delCommentAction(commentId));

      document.location.reload();
    }
  };

  const handleModify = () => { };

  if (commentUserName === loginUser) {
    return (
      <React.Fragment>
        <Container theme={ThemeMode[0]}>
          <User theme={ThemeMode[0]}>
            <UserInfo>
              <button >{userIcon}</button>
              <div style={{ margin: "auto" }}>

                <UserName>{commentUserName}</UserName>
                <Time>{commentModifiedAt}</Time>
              </div>
            </UserInfo>
            <Edit>
              <span onClick={handleModify}>수정</span>
              <span onClick={handleDelete}>삭제</span>
            </Edit>
          </User>
          <Content>{comment}</Content>
          <PlusComment>
            <span>
              <i className="xi-plus-square-o"></i>
            </span>
            <span>답글 달기</span>
          </PlusComment>
        </Container>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <Container theme={ThemeMode[0]}>
        <User theme={ThemeMode[0]}>
          <UserInfo >
            <button  >{userIcon}</button>
            <div style={{ margin: "auto" }}>
              <UserName>{commentUserName}</UserName>
              <Time>{commentModifiedAt}</Time>
            </div>
          </UserInfo>
        </User>
        <Content>{comment}</Content>
        <PlusComment>
          <span>
            <i className="xi-plus-square-o"></i>
          </span>
          <span>답글 달기</span>
        </PlusComment>
      </Container>
    </React.Fragment>
  );
};

CommentItem.defaultProps = {
  commentId: 1,
  nickname: "닉네임",
  content: "댓글내용",
  regdate: "1시간 전",
};

const Container = styled.div`
  margin: 2.5rem;
  box-sizing: border-box;
  width: 100%;
  max-width: 768px;
  min-width: 452px;
  margin: auto;
  border-bottom: ${props => props.theme === 'light'
    ? '1px solid rgb(233, 236, 239)'
    : '1px solid rgb(34, 36, 38)'};
  padding: 1.5rem 0 1.5rem 0;
`;

const User = styled.div`
  font-weight: bold;
  display: flex;
  font-size: 20px;
  justify-content: space-between;
  align-items: center;
  button {
    border: ${props => props.theme === 'light' ? '1px solid white' : '1px solid black'};
    color:  ${props => props.theme === 'light' ? 'white' : 'black'};
    background-color:${props => props.theme === 'dark' ? 'white' : 'rgb(90, 92, 94)'};
    width: 55px;
    height: 55px;
    border-radius: 50%;
    margin-right: 0.5rem;
  }
`;

const UserInfo = styled.div`
  display: flex;
`;

const UserName = styled.div`
  font-size: 1rem;
  font-weight: bold;
  text-align: left;
`;

const Time = styled.div`
  margin-top: 0.25rem;
  color: rgb(134, 142, 150);
  font-size: 0.875rem;
`;

const Content = styled.div`
  font-size: 1.125rem;
  line-height: 1.7;
  letter-spacing: -0.004em;
  word-break: keep-all;
  overflow-wrap: break-word;
  text-align: left;
  margin: 1.5rem 0 0 0;
`;

const Edit = styled.div`
  span {
    cursor: pointer;
    font-size: 0.875rem;
    color: rgb(134, 142, 150);
    margin-left: 0.5rem;
    :hover {
      text-decoration: underline;
      color: #b0b5c3;
    }
  }
`;

const PlusComment = styled.div`
  margin-top: 2rem;
  display: inline-flex;
  align-items: center;
  color: rgb(18, 184, 134);
  font-weight: bold;
  cursor: pointer;
  i {
    margin-right: 0.5rem;
  }
`;
export default CommentItem;
