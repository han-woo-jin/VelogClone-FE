import React from "react";
import CommentItem from "./CommentItem";
import { useSelector } from "react-redux";

const CommentList = (props) => {
  const postId = props.postId
  const commentList = props.commentList


  return (
    <React.Fragment>
      <>
        {commentList.map((item, index) => {
          return <CommentItem {...item} index={index} key={index}
            commentList={commentList}
          />;
        })}
      </>
    </React.Fragment>
  );
};

export default CommentList;
