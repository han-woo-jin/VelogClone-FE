import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import CommentWrite from "../components/CommentWrite";
import { actionCreators as postActions } from "../redux/modules/post";
import { history } from "../redux/configStore";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
// 마크다운 뷰어 토스트ui 라이브러리 사용
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css';
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import { Viewer } from "@toast-ui/react-editor";
import DetailLayout from '../components/DetailLayout'
// React Icons
import { useTheme } from '../context/themeProvider';
import { apis } from '../shared/axios';
import { Button } from '../elements';

const PostDetail = (props) => {
  const dispatch = useDispatch();
  const ThemeMode = useTheme();

  const pathRef = useRef();
  const viewerRef = useRef();
  const [detailList, setDetailList] = React.useState([]);
  const [likeValue, setLikeValue] = React.useState();
  const [likeCount, setLikeCount] = React.useState();
  const [commentList, setCommentList] = React.useState([]);
  const [comment, setComment] = React.useState();
  const [commentId, setCommentId] = React.useState();
  const [commentModifiedAt, setCommentModifiedAt] = React.useState();
  const [commentUserName, setCommentUserName] = React.useState();
  const [postUserEmail, setUserEmail] = React.useState();
  const loginUser = localStorage.getItem("userName")

  const detailUser = localStorage?.setItem("detailUser", postUserEmail)
  console.log(detailUser)
  const id = props.match.params.postId

  useEffect(() => {
    apis.getDetail(id)
      .then(function (response) {
        setDetailList(response.data)
        viewerRef.current.getInstance().setMarkdown(response.data.content);
        console.log(viewerRef)
        setUserEmail(response.data.postUserEmail.split("@")[0])
        setCommentList(response.data.commentList)
        setComment(response.data.commentList[0].comment)
        setCommentId(response.data.commentList[0].commentId)
        setCommentModifiedAt(response.data.commentList[0].commentModifiedAt)
        setCommentUserName(response.data.commentList[0].commentUserName)
        viewerRef.current.getInstance().setMarkdown(response.data.content);
        console.log(viewerRef)
      }).catch(function (error) {
        console.log(error)
      })
  }, [])

  const postId = detailList.postId
  console.log(postUserEmail)
  const userIcon = detailList.postUserName
  // 헤더 부분
  // const user = useSelector((state) => state.user.user);

  console.log(viewerRef)

  const deletePost = () => {
    const ok = window.confirm("정말로 삭제하시겠어요?")

    if (ok) {
      dispatch(postActions.delPostAction(id))
      history.replace('/')
    } else {
      return;
    }
  }

  const likePost = () => {
    setLikeValue(1)
    apis.likePost(id, likeValue)
      .then((res) => {
        console.log(res)
        history.push("/");
      })
      .catch((error) => console.log(error))
  }

  const CurrentMode = ThemeMode[0] === 'light' ? 'null' : 'dark';
  return (
    <DetailLayout detailList={detailList} postUserEmail={postUserEmail}>
      <Wrap>
        <h1>{detailList.title}</h1>
        <Info theme={ThemeMode[0]}>
          <div>
            <UserName>{detailList.postUserName}</UserName>
            <Separator>·</Separator>
            <Time>{detailList.postModifiedAt}</Time>
          </div>
          {detailList.postUserName === loginUser ? (
            <div >
              <button onClick={() => {
                history.push(`/postwrite/${postId}`)
              }}>수정</button>
              <button onClick={deletePost}>삭제</button>
            </div>
          ) : null}
        </Info>
        <LikeShareWrap >
          <LikeShareContainer>
            <LikeShareBox theme={ThemeMode[0]}>
              <button theme={ThemeMode[0]} onClick={likePost}><FavoriteIcon fontSize="large" /></button>

              <div>{detailList.likeCnt}</div>

              <button
                onClick={() => {
                  pathRef.current.select();
                  document.execCommand("copy");
                  pathRef.current.setSelectionRange(0, 0);
                  alert("게시글 주소 복사완료");
                }}
              >
                <input
                  style={{ position: "fixed", top: "-1000%" }}
                  ref={pathRef}
                  value={document.location.href}
                  readOnly
                />
                <ShareIcon fontSize="large" />
              </button>
            </LikeShareBox>
          </LikeShareContainer>
        </LikeShareWrap>
        <div>


          <Body theme={ThemeMode[0]}>
            {/* <ReactMarkdown>{content}</ReactMarkdown> */}
            <Viewer ref={viewerRef} theme={CurrentMode} />
          </Body>
          <Writer>
            <User theme={ThemeMode[0]}><button>{userIcon}</button></User>
            <div>{detailList.postUserName}</div>
          </Writer>
        </div>
        <Hr theme={ThemeMode[0]} ></Hr>
      </Wrap>
      <CommentWrite
        postId={postId}
        commentList={commentList}
        comment={comment}
        commentId={commentId}
        commentModifiedAt={commentModifiedAt}
        commentUserName={commentUserName}
      />
    </DetailLayout >
  );
};


const LikeShareWrap = styled.div`
  margin-top: 32px;
  position: relative;
`;

const LikeShareContainer = styled.div`
  position: fixed;
  top: 300px;
  transform: translateX(-200%);
`;

const LikeShareBox = styled.div`
  border: ${props => props.theme === 'light' ? '1px solid #868e96' : '1px solid #868e96'};
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 8px;
  background-color:  ${props => props.theme === 'light' ? '#eaecef' : '#1e1e1e'};
  width: 4rem;
  border-radius: 2.5rem;
  & > :nth-child(2) {
    margin: 8px 0 16px 0;
  }
  button {
    text-align: center;
    color: ${props => props.theme === 'light' ? '#1e1e1e' : '#eaecef'};
    :hover{
      color:red;
    }
  }
`;




const Wrap = styled.div`
  box-sizing: border-box;
  max-width: 768px;
  min-width: 452px;
  width: 100%;
  margin: auto;
  h1 {
    text-align: left;
    font-size: 3rem;
    line-height: 1.5;
    letter-spacing: -0.004em;
    margin-top: 60px;
    font-weight: 800;
    margin-bottom: 2rem;
    word-break: keep-all;
  }
`;
const Info = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 32px;
  button {
    padding: 0px;
    border: none;
    outline: none;
    background: none;
    cursor: pointer;
    font-size: 0.875rem;
    margin-left: 0.5rem;
    
    color: rgb(134, 142, 150);
    :hover {
      color:  ${props => props.theme === 'light' ? '#1e1e1e' : '#eaecef'};
    }
  }
`;
const UserName = styled.span`
  font-size: 0.875rem;
  color: rgb(52, 58, 64);
  font-weight: bold;
  cursor: pointer;
  :hover {
    color: #495057;
    text-decoration: underline;
  }
`;
const Separator = styled.span`
  margin-left: 0.5rem;
  margin-right: 0.5rem;
`;
const Time = styled.span`
  font-size: 0.875rem;
  color: #495057;
`;
const Writer = styled.div`
  
  margin: 32px 0px;
  display: flex;
  align-items: center;
`;
const Body = styled.div`
  padding: 0px;
`;

const Hr = styled.div`
background-color:  ${props => props.theme === 'light' ? '#eaecef' : '#1e1e1e'};
  width: 100%;
  height: 1px;
  margin-top: 2rem;
  margin-bottom: 1.5rem;
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
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-right: 0.5rem;
  }
`;

export default PostDetail;
