import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import { apis } from "../shared/axios";
import { useHistory } from 'react-router-dom';

// React Icons
import { ImClock } from "react-icons/im";
import { BsGraphUp } from "react-icons/bs";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { useTheme } from '../context/themeProvider';
import AppLayout from '../components/AppLayout';
import { Input } from '../elements';
import { Button } from '../elements';

const PostList = (props) => {
  // const postList = useSelector((state) => state.post.list);
  const history = useHistory();
  const ThemeMode = useTheme();
  // React.useEffect(() => {
  //   dispatch(postActions.getPostMD());
  // }, []);
  const tokencheck = document.cookie;
  const token = tokencheck.split("=")[1];

  const [post_list, setPostList] = useState([]);
  const [search, setSearch] = useState({});

  // useEffect(() => {
  //   apis.getPost()
  //     .then(function (response) {
  //       setPostList(response.data)
  //     }).catch(function (error) {
  //       console.log(error)
  //     })
  // }, [])

  const searching = (e) => {
    setSearch(e.target.value)
    console.log(typeof (search))
  };

  const handleSearch = () => {

    apis.getSearch(search)
      .then(function (res) {
        console.log(res)

        setPostList(res.data)
      }).catch(function (error) {
        console.log(error)
      })
  }

  return (
    <AppLayout>
      <br />
      <Wrapper theme={ThemeMode[0]}>
        <Input _onChange={searching} />
        <Btn onClick={handleSearch} theme={ThemeMode[0]}>
          {" "}
          검색{" "}
        </Btn>
      </Wrapper>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Grid>
          {post_list.map((post, index) => {

            return (
              <Grid key={index} onClick={() => {
                if (token) {
                  history.push(`/detail/${post.postId}`)
                } else {
                  window.alert('로그인 먼저 해주세요!')
                  history.push('/')
                }
              }}>

                <Card key={index} {...post} />
              </Grid>
            )

          })}
        </Grid>
      </div>
    </AppLayout>
  );
};

const Wrapper = styled.div`

  display: flex;
  width: 90%;
  margin: 0 auto;
  height: 50px;
  box-sizing: border-box;
  text-align: center;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.5rem;
  
  button{
    width:auto;
    height: auto;
    border: 1px solid;

  }
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
const Btn = styled.button`

  border: ${props => props.theme === 'light' ? '1px solid black' : '1px solid #4d4d4d'};
  margin: 1.5px 10px 9.7px 0px;
  font-size: 16px;
  background-color: #4cbc9b;
  padding: 8px 25px;
  font-weight: bold;
  width: 94px;
  height: 47px;
  position: absolute;
  right: 36px;

`;
export default PostList;
