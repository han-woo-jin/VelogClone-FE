import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Card from "../components/Card";
import { actionCreators as postActions } from "../redux/modules/post";
import Header from "../components/Header";

// React Icons
import { ImClock } from "react-icons/im";
import { BsGraphUp } from "react-icons/bs";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { useTheme } from '../context/themeProvider';

const PostList = () => {
  const dispatch = useDispatch();
  // const postList = useSelector((state) => state.post.list);

  const ThemeMode = useTheme();
  // React.useEffect(() => {
  //   dispatch(postActions.getPostMD());
  // }, []);

  return (
    <>
      <Wrapper theme={ThemeMode[0]}>
        {/* 상단에 있는 트렌딩, 최신 버튼 */}
        <Button
          theme={ThemeMode[0]}
          onClick={() => window.alert("힝 속았지~ 😎")}
        >
          <div
            style={{
              marginRight: "50px",
            }}
          />
          <BsGraphUp
            style={{
              width: "20px",
              height: "20px",
              marginRight: "10px",
            }}
          />
          <span style={{ width: "50px" }} >트렌딩</span>
        </Button>
        <Button>
          <div
            style={{
              marginRight: "10px",
            }}
          />

          <span
            style={{

              borderBottom: "1px solid",
              width: "70px",
              padding: "5px",
            }}
          >
            <ImClock
              style={{
                width: "20px",
                height: "20px",
                marginBottom: "-5px",
                marginRight: "7px",
              }}
            />
            최신
          </span>
        </Button>

        <HamDIv>
          <BiDotsVerticalRounded
            onClick={() => window.alert("힝 속았지~ 😎")}
            style={{
              width: "25px",
              height: "25px",
              marginBottom: "-5px",
              marginRight: "7px",
              cursor: "pointer",
            }}
          />
        </HamDIv>
      </Wrapper>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Grid>
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          {/* {postList.map((post, index) => {
            return <Card />;
          })} */}
        </Grid>
      </div>
    </>
  );
};

const Wrapper = styled.div`
  color:  ${props => props.theme === 'light' ? 'black' : 'white'};

  background-color:  ${props => props.theme === 'dark' ? 'black' : 'white'};
  display: flex;
  width: 90%;
  margin: 0 auto;
  height: 60px;
  box-sizing: border-box;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.5rem;
`;

const Button = styled.div`
  font-size: 18px;
  font-weight: 600;
  height: 48px;
  width: 120px;
  min-height: auto;
  min-width: auto;
  display: flex;
  justify-content: center;
  align-items: center;

  :hover {
    cursor: pointer;
  }

`;

const HamDIv = styled.div`
  width: 90%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 15px;
  color: gray;
`;

const Grid = styled.div`
  /* width: 1055.97px; */
  margin: auto;
  display: grid;
  grid-template-columns: 320px 320px 320px 320px 320px;
  /* grid-template-rows: 331.08px 331.08px 331.08px; */
  gap: 2rem;
  @media screen and (max-width: 1800px) {
    grid-template-columns: 320px 320px 320px 320px;
  }
  @media screen and (max-width: 1430px) {
    grid-template-columns: 320px 320px 320px;
  }
  @media screen and (max-width: 1100px) {
    grid-template-columns: 320px 320px;
  }
`;

export default PostList;
