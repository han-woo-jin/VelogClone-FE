import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import CommentList from "./CommentList";
import { history } from "../redux/configStore";

import { actionCreators as commentActions } from "../redux/modules/comment";
import { useTheme } from '../context/themeProvider';

const CommentWrite = (props) => {
  const dispatch = useDispatch();

  const ThemeMode = useTheme();
  const [comments, setComments] = React.useState("");
  // const commentList = useSelector((state) => state.comment.commentList);
  const isLogIn = useSelector((state) => state.user.isLogIn);

  // useEffect(() => {
  //   dispatch(commentAction.getCommentDB(postId));
  // }, []);

  const postId = props.postId
  const comment = props.comment
  const commentId = props.commentId
  const commentModifiedAt = props.commentModifiedAt
  const commentUserName = props.commentUserName
  const commentList = props.commentList


  const onChange = (e) => {
    setComments(e.target.value);
  };

  const addComment = () => {


    // if (content === "") {
    //   window.alert("내용을 입력해주세요.");
    // }
    // if (isLogIn === false) {
    //   window.alert("로그인 후 이용해 주세요.");
    //   history.push("/login");
    // }
    dispatch(commentActions.addCommentAction(postId, comments));
    document.location.reload();
  };

  return (
    <React.Fragment>
      {/* <Count>{commentList?.length}개의 댓글</Count> */}
      <Container>
        <Input
          theme={ThemeMode[0]}
          placeholder="댓글을 작성하세요"
          onChange={onChange}
          value={comments}
        />
        <Button
          onClick={() => {
            addComment();
          }}
        >
          댓글 작성
        </Button>
      </Container>

      <CommentList
        postId={postId}
        commentList={commentList}
        comment={comment}
        commentId={commentId}
        commentModifiedAt={commentModifiedAt}
        commentUserName={commentUserName}
      ></CommentList>
    </React.Fragment>
  );
};

const Container = styled.div`
  box-sizing: border-box;
  max-width: 768px;
  min-width: 452px;
  width: 100%;
  height: 200px;
  margin: 0 auto 3rem auto;
  display: flex;
  flex-direction: column;
  align-items: end;
`;
const Count = styled.h4`
  box-sizing: border-box;
  max-width: 768px;
  min-width: 452px;
  width: 100%;
  font-size: 1.125rem;
  line-height: 1.5;
  font-weight: 600;
  display: block;
  text-align: left;
  margin: 0 auto 1rem auto;
`;

const Input = styled.input`
  padding: 1rem 1rem 1.5rem;
  outline: none;
border: ${props => props.theme === 'light' ? '1px solid black' : '1px solid #4d4d4d'};

background-color: ${props => props.theme === 'light' ? 'white' : '#1e1e1e'};
  margin-bottom: 1.5rem;
  width: 100%;
  box-sizing: inherit;
  border-radius: 4px;
  min-height: 6.125rem;
  font-size: 1rem;
  color: rgb(33, 37, 41);
  line-height: 1.75;
  word-break: break-all;
  ::placeholder {
    color: #adb5bd;
  }
`;
const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  cursor: pointer;
  border: none;
  background: rgb(18, 184, 134);
  color: white;
  border-radius: 4px;
  padding: 0.625rem 1.25rem;
  height: 2rem;
  font-size: 1rem;
  font-family: inherit;
  box-sizing: inherit;
  outline: none;
  width: 110px;
  &:hover {
    background-color: #45d1a7;
  }
`;

export default CommentWrite;
