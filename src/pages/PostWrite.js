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
import { apis, instance } from '../shared/axios';


const PostWrite = () => {
  const dispatch = useDispatch();
  const [ImgUrl, setImgUrl] = useState("");
  const [ImgId, setImgId] = useState("");

  const editorRef = useRef();
  const [title, setTitle] = useState("");

  const titleChange = (e) => {
    setTitle(e.target.value);
  };




  const handleClick = () => {
    const content = editorRef.current.getInstance().getMarkdown();

    console.log(content, title);
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
            formData.append("imageFile", blob);
            await axapis.imgpost(
              formData
            )
              .then((res) => {
                console.log(res)
                const imageUrl = res.data.imageUrl;
                setImgUrl(res.data.imageUrl)
                setImgId(res.data.imageId)
                callback(imageUrl, "image");
              })
              .catch((error) => console.log(error));
          })();

          return false;
        });
    }

    return () => { };
  }, [editorRef]);


  const addPost = () => {
    // 마크다운 언어를 서버에 저장하기위해서 변형함
    const content = editorRef.current.getInstance().getMarkdown();
    const id = ImgId
    console.log(id, title, content)
    apis.createPost(id, content, title)
      .then((res) => {
        console.log(res)
        history.push('/');
      })
      .catch((error) => console.log(error, id, title, content))
  };

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
            <SubmitBtn onClick={addPost}>출간하기</SubmitBtn>
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