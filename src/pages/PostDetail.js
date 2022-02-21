import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import CommentWrite from "../components/CommentWrite";
import { actionCreators as postActions } from "../redux/modules/post";
import { history } from "../redux/configStore";

// 마크다운 뷰어 토스트ui 라이브러리 사용
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import { Viewer } from "@toast-ui/react-editor";

// React Icons
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { RiBookmarkFill } from "react-icons/ri";
import { actionCreators as userActions } from "../redux/modules/user";

import { Grid, Text, Input } from "../elements";
import Header from "../components/Header";
import { BsSearch } from "react-icons/bs";
import DetailHeader from '../components/DetailHeader';
import { useTheme } from '../context/themeProvider';

const Detail = (props) => {
  const dispatch = useDispatch();

  const ThemeMode = useTheme();
  // // 지금 보고있는 게시물의 postId, title, content
  // const currentpostId = props.match.params.postId;
  // const postList = useSelector((state) => state.post.list);
  // const post = postList.filter(
  //   (post) => post.postId === Number(currentpostId)
  // )[0];
  // const title = post.title;
  // const content = post.content;

  // // 지금 로그인 한 유저의 이메일 앞부분
  // const rawUserId = post.user.email;
  // const userId = rawUserId.split("@")[0];
  // const nickname = post.user.nickname;

  // // 지금 로그인 한 유저의 닉네임
  // const rawLoginUser = localStorage.getItem("nickname");
  // const loginUser = rawLoginUser.split('"')[1];
  // const initial = loginUser.charAt(0).toUpperCase();

  // // 게시물 작성 날짜
  // const modDate = post.regDate.split("T")[0];
  // const yearMonthDay = modDate.split("-", 3);
  // const year = yearMonthDay[0];
  // const month = yearMonthDay[1];
  // const day = yearMonthDay[2];
  // const writtenDate = year + "년 " + month + "월 " + day + "일";

  // const deletePost = () => {
  //   dispatch(postActions.deletePostMD(currentpostId));
  // };

  // 헤더 부분
  // const user = useSelector((state) => state.user.user);
  const user = document.cookie;
  // const tologin = () => {
  //   history.push("/login");
  // };
  // const toSignup = () => {
  //   history.push("/signup");
  // };

  // const toLogOut = async () => {
  //   try {
  //     await dispatch(userActions.logOut());
  //     history.push("/");
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // if (user) {
  //   return (
  //     <>
  //       <Grid is_flex height="63.99px" width="97%">
  //         <FontBox
  //           onClick={() => {
  //             history.push("/");
  //           }}
  //         >
  //           <Logo src={"/img/grayFavicon.png"}></Logo>
  //           <Font>닉네임.log</Font>
  //         </FontBox>
  //         <div>
  //           <BsSearch
  //             style={{
  //               width: "25px",
  //               height: "25px",
  //               marginRight: "10px",
  //               marginBottom: "-7px",
  //             }}
  //           />
  //           <Btn
  //             onClick={() => {
  //               history.push("/postwrite");
  //             }}
  //           >
  //             새 글 작성
  //           </Btn>
  //           <button
  //             onClick={toLogOut}
  //             style={{
  //               width: "40px",
  //               height: "40px",
  //               borderRadius: "50%",
  //               backgroundColor: "#5f4541",
  //               color: "white",
  //               fontWeight: "bold",
  //               fontSize: "15px",
  //               border: "none",
  //             }}
  //           >
  //             <div style={{ backgroundColor: "transparent" }}>{initial}</div>
  //           </button>
  //         </div>
  //       </Grid>
  //       <DetailBox>
  //         <h1>{title}</h1>
  //         <Info>
  //           <div>
  //             <UserName>{userId}</UserName>
  //             <Separator>·</Separator>
  //             <Time>{writtenDate}</Time>
  //           </div>
  //           {/* 게시물 작성 한 사람과 현재 로그인 된 유저가 같을때에만 보임*/}
  //           {nickname == loginUser ? (
  //             <div>
  //               <button>수정</button>
  //               <button onClick={deletePost}>삭제</button>
  //             </div>
  //           ) : null}
  //         </Info>

  //         <div>
  //           <Like>
  //             <div>
  //               <svg width="24" height="24" viewBox="0 0 24 24">
  //                 <path
  //                   fill="currentColor"
  //                   d="M18 1l-6 4-6-4-6 5v7l12 10 12-10v-7z"
  //                 ></path>
  //               </svg>
  //             </div>
  //             <p>100</p>
  //             <div>
  //               <svg width="24" height="24" viewBox="0 0 24 24" class="share">
  //                 <path
  //                   fill="currentColor"
  //                   d="M5 7c2.761 0 5 2.239 5 5s-2.239 5-5 5-5-2.239-5-5 2.239-5 5-5zm11.122 12.065c-.073.301-.122.611-.122.935 0 2.209 1.791 4 4 4s4-1.791 4-4-1.791-4-4-4c-1.165 0-2.204.506-2.935 1.301l-5.488-2.927c-.23.636-.549 1.229-.943 1.764l5.488 2.927zm7.878-15.065c0-2.209-1.791-4-4-4s-4 1.791-4 4c0 .324.049.634.122.935l-5.488 2.927c.395.535.713 1.127.943 1.764l5.488-2.927c.731.795 1.77 1.301 2.935 1.301 2.209 0 4-1.791 4-4z"
  //                 ></path>
  //               </svg>
  //             </div>
  //           </Like>
  //           <Box>
  //             <BoxContent>{userId + " 님의 게시물 입니다."}</BoxContent>
  //             <RiBookmarkFill
  //               style={{
  //                 width: "35px",
  //                 height: "40px",
  //                 color: " rgb(18, 184, 134)",
  //                 position: "absolute",
  //                 top: "-8",
  //                 right: "20",
  //                 backgroundColor: "transparent",
  //               }}
  //             />
  //             <BoxFooter>
  //               <BoxFooterLeft>
  //                 <Select></Select>
  //                 목록 보기
  //               </BoxFooterLeft>
  //               <BoxFooterRight>
  //                 <div
  //                   style={{
  //                     backgroundColor: "transparent",
  //                     paddingBottom: "90px",
  //                   }}
  //                 >
  //                   1/1
  //                 </div>
  //                 <Forward>
  //                   <IoIosArrowDropleftCircle />
  //                 </Forward>
  //                 <Backward>
  //                   <IoIosArrowDroprightCircle />
  //                 </Backward>
  //               </BoxFooterRight>
  //             </BoxFooter>
  //           </Box>
  //         </div>

  //         <Content>
  //           <div>
  //             <Viewer initialValue={content} height="1000px" />
  //           </div>
  //           <Writer>
  //             <Image src={"/img/profile.png"} />
  //             <div>{nickname}</div>
  //           </Writer>
  //         </Content>
  //         <Hr></Hr>
  //       </DetailBox>
  //       <CommentWrite />
  //     </>
  //   );
  // }

  return (
    <>
      <React.Fragment>
        <DetailBox>
          <h1>제목</h1>
          <Info>
            <div>
              <UserName>id</UserName>
              <Separator>·</Separator>
              <Time>2022.2.23</Time>
            </div>
            {/* {nickname == loginUser ? (
              <div>
                <button>수정</button>
                <button onClick={deletePost}>삭제</button>
              </div>
            ) : null} */}
          </Info>

          <div>
            <Like theme={ThemeMode[0]}>
              <div>
                <svg width="24" height="24" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M18 1l-6 4-6-4-6 5v7l12 10 12-10v-7z"
                  ></path>
                </svg>
              </div>
              <p>100</p>
              <div>
                <svg width="24" height="24" viewBox="0 0 24 24" class="share">
                  <path
                    fill="currentColor"
                    d="M5 7c2.761 0 5 2.239 5 5s-2.239 5-5 5-5-2.239-5-5 2.239-5 5-5zm11.122 12.065c-.073.301-.122.611-.122.935 0 2.209 1.791 4 4 4s4-1.791 4-4-1.791-4-4-4c-1.165 0-2.204.506-2.935 1.301l-5.488-2.927c-.23.636-.549 1.229-.943 1.764l5.488 2.927zm7.878-15.065c0-2.209-1.791-4-4-4s-4 1.791-4 4c0 .324.049.634.122.935l-5.488 2.927c.395.535.713 1.127.943 1.764l5.488-2.927c.731.795 1.77 1.301 2.935 1.301 2.209 0 4-1.791 4-4z"
                  ></path>
                </svg>
              </div>
            </Like>
            {/* <Box>
              <BoxContent>{"userId 님의 게시물 입니다."}</BoxContent>
              <RiBookmarkFill
                style={{
                  width: "35px",
                  height: "40px",
                  color: " rgb(18, 184, 134)",
                  position: "absolute",
                  top: "-8",
                  right: "20",
                  backgroundColor: "transparent",
                }}
              />
              <BoxFooter>
                <BoxFooterLeft>
                  <Select></Select>
                  목록 보기
                </BoxFooterLeft>
                <BoxFooterRight>
                  <div
                    style={{
                      backgroundColor: "transparent",
                      paddingBottom: "90px",
                    }}
                  >
                    1/1
                  </div>
                  <Forward>
                    <IoIosArrowDropleftCircle />
                  </Forward>
                  <Backward>
                    <IoIosArrowDroprightCircle />
                  </Backward>
                </BoxFooterRight>
              </BoxFooter>
            </Box> */}
            <div>
              <p>asdasdfasdfasdf</p>
              <p>asdasdfasdfasdf</p>
              <p>asdasdfasdfasdf</p>
              <p>asdasdfasdfasdf</p>
              <p>asdasdfasdfasdf</p>
              <Viewer height="1000px" />
            </div>
            <Writer>
              <Image src={"/img/profile.png"} />
              <div>닉네임</div>
            </Writer>
          </div>
          <Hr theme={ThemeMode[0]}></Hr>
        </DetailBox>
        <CommentWrite />
      </React.Fragment>
    </>
  );
};

const Content = styled.div``;

const Like = styled.div`

border: ${props => props.theme === 'light' ? '1px solid #979ea6' : '1px solid #4d4d4d'};
background-color:  ${props => props.theme === 'light' ? '#eaecef' : '#1e1e1e'};
  position: absolute;
  left: 30px;
  width: 4rem;
  border-radius: 2rem;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  -webkit-box-align: center;
  align-items: center;
  div {
    transform: scale(1);
    height: 3rem;
    width: 3rem;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;

border: ${props => props.theme === 'light' ? '1px solid #979ea6' : '1px solid #4d4d4d'};
background-color:  ${props => props.theme === 'light' ? '#eaecef' : '#1e1e1e'};
    border-radius: 1.5rem;
    color: rgb(134, 142, 150);
    cursor: pointer;
    z-index: 5;
  }
`;

const Box = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 5px;
  width: 720.007px;
  height: 100.861px;
  margin: 40px 0;
  padding: 32px 24px 10px 24px;
  background: rgb(248, 249, 250);
  box-shadow: rgb(0 0 0 / 6%) 0px 0px 4px 0px;
  color: rgb(73, 80, 87);
  font-size: 24px;
  font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue",
    "Apple SD Gothic Neo", "Malgun Gothic", "맑은 고딕", 나눔고딕,
    "Nanum Gothic", "Noto Sans KR", "Noto Sans CJK KR", arial, 돋움, Dotum,
    Tahoma, Geneva, sans-serif;
  font-weight: bold;
`;
const BoxContent = styled.div`
  background-color: transparent;
  color: #495057;
`;
const BoxFooter = styled.div`
  display: flex;
  justify-content: space-between;
  height: 23.99px;
  font-weight: normal;
  font-size: 16px;
  background-color: transparent;
`;
const BoxFooterLeft = styled.div`
  background-color: transparent;
  color: #495057;
`;
const Select = styled.select`
  border: none;
  margin-right: 5px;
  background-color: transparent;
  color: #adb5bd;
`;
const BoxFooterRight = styled.div`
  display: flex;
  color: #adb5bd;
  font-size: 14px;
  background-color: transparent;
`;
const Forward = styled.div`
  color: #adb5bd;
  background-color: transparent;
  margin-left: 10px;
  font-size: 20px;
`;
const Backward = styled.div`
  color: #adb5bd;
  background-color: transparent;
  margin-left: 10px;
  font-size: 20px;
`;
const Logo = styled.img`
  position: relative;
  width: 28px;
  height: 28px;
  margin: 0px 10px 0px 0px;
  top: 3px;
`;

const DetailBox = styled.div`
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
    margin-top: 0px;
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
      color: black;
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
const Image = styled.img`
width: 100px;
  border-radius: 50%;
  margin-right: 1rem;
`;
const Hr = styled.div`
background-color:  ${props => props.theme === 'light' ? '#eaecef' : '#1e1e1e'};
  width: 100%;
  height: 1px;
  margin-top: 2rem;
  margin-bottom: 1.5rem;
`;
const FontBox = styled.div`
  padding: 10px;
  cursor: pointer;
`;
const Font = styled.text`
  // padding: 10px;
  // background-color: orange;
  font-size: 24px;
  font-family: "firaMono-Medium";
  color: rgb(52, 58, 64);
  // display: inline-block;
  // margin-left: 15px;
`;
const Btn = styled.button`
  cursor: pointer;
  margin: 15px 10px 15px 0px;
  font-size: 14px;
  background-color: white;
  /* background-color: #343a40; */
  color: #343a40;
  font-size: 17px;
  padding: 10px 15px;
  font-weight: bold;
  border-radius: 25px;
  border: 1px solid #343a40;
  &:hover {
    background-color: #868e96;
    transition: 0.125s;
  }
`;

export default Detail;
