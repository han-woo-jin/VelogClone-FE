import { React, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { actionCreators as postActions } from "../redux/modules/post";
import { history } from "../redux/configStore";
import { useTheme } from '../context/themeProvider';
import { useEffect } from 'react';
// 마크다운 라이브러리 토스트 ui 사용
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import axios from 'axios';
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css';
import { axapis } from '../shared/formaxios';


const PostWrite = () => {
  const dispatch = useDispatch();

  const editorRef = useRef();
  const [title, setTitle] = useState("");

  const titleChange = (e) => {
    setTitle(e.target.value);
  };




  const handleClick = () => {
    const content = editorRef.current.getInstance().getMarkdown();

    console.log(content);
  };
  const token = document.cookie.split("=")[1];
  useEffect(() => {

    if (editorRef.current) {
      // 기존에 Image 를 Import 하는 Hook 을 제거한다.
      editorRef.current.getInstance().removeHook("addImageBlobHook");

      // 새롭게 Image 를 Import 하는 Hook 을 생성한다.
      editorRef.current
        .getInstance()
        .addHook("addImageBlobHook", (blob, callback) => {
          (async () => {
            let formData = new FormData();
            const post = {
              title: "123123123123",
              content: "asdfasdfasdf",
            }

            formData.append("imageFile", blob);
            formData.append("post", new Blob([JSON.stringify(post)], { type: "application/json" }))


            await axapis.imgpost(
              formData
            )
              .then((res) => {
                console.log(res)
                const imageUrl = res.data;

                // Image 를 가져올 수 있는 URL 을 callback 메서드에 넣어주면 자동으로 이미지를 가져온다.
                callback(imageUrl, "image");
              })

          })();

          return false;
        });
    }

    return () => { };
  }, [editorRef]);


  // useEffect(() => {
  //   if (contentRef.current) {
  //     contentRef.current.getInstance().removeHook("addImageBlobHook");
  //     contentRef.current
  //       .getInstance()
  //       .addHook("addImageBlobHook", (blob, post) => {
  //         (async () => {
  //           let formData = new FormData();
  //           const post = {
  //             title: "123123123123",
  //             content: "asdfasdfasdf",
  //           }
  //           formData.append("imageFile", blob);
  //           formData.append("post", new Blob([JSON.stringify(post)], { type: "application/json" }))

  //           console.log(formData)
  //           console.log()
  //           await axapis.imgpost(formData)
  //             .then((response) => {
  //               console.log(response)
  //             })
  //             .catch((error) => console.log(error))
  //         })();
  //         return false;
  //       });
  //   }
  //   return () => { };
  // }, [contentRef]);

  // const addPost = () => {
  //   // 마크다운 언어를 서버에 저장하기위해서 변형함
  //   const contentHTML = contentRef.current.getInstance().getHTML();
  //   const contentMarkdown = contentRef.current.getInstance().getMarkdown();

  //   const content = contentMarkdown.replaceAll("#", "").split("!")[0];
  //   console.log(contentMarkdown)

  //   const hello = contentMarkdown.split("](")[1];
  //   // const image = hello.split(")")[0];

  //   console.log(hello)
  //   let formData = new FormData()
  //   const post = {
  //     title: title,
  //     content: content,
  //     // image: image,
  //   };

  //   console.log(post);
  //   dispatch(postActions.addPostAction(post));
  // };

  const ThemeMode = useTheme();
  const CurrentMode = ThemeMode[0] === 'light' ? 'null' : 'dark';
  return (
    <>
      <Wrap>
        <Head theme={ThemeMode[0]}>
          <TitleInput theme={ThemeMode[0]} placeholder="제목을 입력하세요" onChange={titleChange} />
        </Head>
        <Body>
          <Editor
            ref={editorRef}
            previewStyle="vertical"
            width="100%"
            height="100vh"
            initialEditType="markdown"
            useCommandShortcut={true}
            placeholder="당신의 이야기를 적어보세요"
            previewHighlight={false}
            theme={CurrentMode}
          />
        </Body>
        <Footer theme={ThemeMode[0]}>
          <ExitBtn
            onClick={() => {
              history.push("/");
            }}
          >
            나가기
          </ExitBtn>
          <div style={{ display: "flex" }}>
            <SaveBtn onClick={() => window.alert("힝 속았지~ 😎")}>
              임시저장
            </SaveBtn>
            <SubmitBtn onClick={handleClick}>출간하기</SubmitBtn>
          </div>

        </Footer>
      </Wrap>
    </>
  );
};

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100%;
  margin: auto;
  border: none;
  
`;
const Head = styled.div`
  width: 100%;
  padding: 0px;
  background-color: black;
  color: black;
`;
const TitleInput = styled.input`
  width: 100vw;
  height: 140px;
  border: none;
  font-size: 40px;
  font-weight: bold;
  padding-left: 20px;
  color:  ${props => props.theme === 'light' ? 'black' : 'white'};
  background-color:  ${props => props.theme === 'light' ? 'white' : '#232428'};
`;
const Body = styled.div`
  width: 100vw;
  padding: 0px;
`;
const Footer = styled.div`
  position: fixed;
  width: 100%;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 70px;
  padding: 0 16px;

  background-color:  ${props => props.theme === 'light' ? 'white' : '#232428'};

`;
const ExitBtn = styled.button`
  width: 82.257px;
  height: 40px;
  padding: 0 20px;
  display: flex;
  margin-right: 10px;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  cursor: pointer;
  border: none;
  background: #e5e5e5;
  color: black;
  border-radius: 4px;
  font-size: 1rem;
  font-family: inherit;
  box-sizing: inherit;
  outline: none;
`;

const SaveBtn = styled.button`
  width: 82.257px;
  height: 40px;
  padding: 0 20px;
  display: flex;
  margin-right: 10px;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  cursor: pointer;
  border: none;
  
  background: #e5e5e5;
  color: black;
  border-radius: 4px;
  font-size: 1rem;
  font-family: inherit;
  box-sizing: inherit;
  outline: none;
`;
const SubmitBtn = styled.button`
  width: 82.257px;
  height: 40px;
  padding: 0 20px;
  display: flex;
  margin-right: 30px;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  cursor: pointer;
  border: none;
  background: rgb(18, 184, 134);
  color: white;
  border-radius: 4px;
  font-size: 1rem;
  font-family: inherit;
  box-sizing: inherit;
  outline: none;
  &:hover {
    background-color: #45d1a7;
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
  font-size: 1rem;
  font-family: inherit;
  box-sizing: inherit;
  outline: none;
  &:hover {
    background-color: #45d1a7;
  }
`;
export default PostWrite;