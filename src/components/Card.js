
import React from "react";
import styled from "styled-components";
import { useTheme } from '../context/themeProvider';
import ReactMarkdown from 'react-markdown';
const Card = (props) => {
  const ThemeMode = useTheme();

  console.warn = console.error = () => { };
  const apple = props.content.split("!")[0];
  const orange = props.content.split(")")[1];


  return (
    <>
      <CardWrap
        theme={ThemeMode[0]}
      >
        <CardImg src={props.imageUrl} />
        <Body>
          <Title>{props.title}</Title>
          <Description>
            <ReactMarkdown>
              {apple === "" ? orange : apple}
            </ReactMarkdown>
          </Description>
          <DtCmt>
            <span>
              <span>{props.postModifiedAt}</span>
              {" ∙ "}
              <span>{props.commentCnt}개의 댓글</span>
            </span>
          </DtCmt>
        </Body>
        <Footer theme={ThemeMode[0]}>
          <FooterLeft>
            <Span>by</Span>
            <UserName>{props.postUserName}</UserName>
          </FooterLeft>
          <Like>
            <span>{props.likeCnt}</span>
          </Like>
        </Footer>
      </CardWrap>
    </>
  );
};
const DtCmt = styled.div`
  font-size: 0.75rem;
  color: gray;
`;

const CardWrap = styled.div`
background-color: ${props => props.theme === 'light' ? '#f5f6f7' : '#1e1e1e'};
  width: 100%;
  border-radius: 4px;
  box-shadow: rgb(0 0 0 / 4%) 0px 4px 16px 0px;
  transition: box-shadow 0.25s ease-in 0s, transform 0.25s ease-in 0s;
  margin: 1rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 3px 3px 15px 1px rgb(134, 142, 150) ;
  &:hover {
    box-shadow: 3px 3px 15px 1px #9e9e9e;
    transition: 0.3s;
    cursor: pointer;
    transform: translateY(-8px);
  }
`;
const CardImg = styled.div`
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-repeat: no-repeat;
  /* text-align: center;
  display: flex; */
  /* justify-content: center;
  align-items: center;
  flex-direction: row; */
  /* margin: auto; */
  height: 167px;
`;
const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  /* margin: 20px; */
  width: 320px;
  height: 140px;
  padding: 16px;
`;
const Title = styled.h4`
  font-size: 16px;
  margin: 0 0 4px;
  /* word-break: break-word; */
  font-weight: bold;
  width: 288.02px;
  height: 43.33px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
`;
const Description = styled.p`
  margin: 0 0 24px;
  width: 288.02px;
  height: 72.986px;
  color: gray;
  font-size: 14px;
  line-height: 1.5;
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  text-align: left;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;
const Footer = styled.div`
  padding: 10px 16px;
  height: 44.1px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* margin: 20px 20px 20px 20px; */
  cursor: pointer;
  border-top: ${props => props.theme === 'light' ? '1px solid #e6e6e6' : '1px solid #3c3c3c'};
`;
const FooterLeft = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const Span = styled.span`
  color: rgb(134, 142, 150);
  font-size: 0.75rem;
  line-height: 1.5;
  margin-right: 0.25rem;
`;
const UserName = styled.span`
  font-size: 12px;
  font-weight: bold;
`;
const Like = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 1.75rem;
    height: 1.6rem;
  }
  span {
    font-size: 0.75rem;
  }
`;

export default Card;
