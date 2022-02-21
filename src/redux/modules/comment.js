import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from '../../shared/axios';

// actions Type
const ADD_COMMENT = "ADD_COMMENT";
const REMOVE_COMMENT = "REMOVE_COMMENT";
const EDIT_COMMENT = "EDIT_COMMENT";
const GET_COMMENT = "GET_COMMENT";

// action creators
const addComment = createAction(ADD_COMMENT, (comment) => ({ comment }));
const removeComment = createAction(REMOVE_COMMENT, (commentId) => ({
  commentId,
}));
const editComment = createAction(EDIT_COMMENT, (commentId, comment) => ({
  commentId,
  comment,
}));
const getComment = createAction(GET_COMMENT, (commentList) => ({
  commentList,
}));

//initialState
const initialState = {
  commentList: [],
};

//middleware
const getCommentDB = (postId) => {
  return function (dispatch, getState, { history }) {
    apis
      .getComment(postId)
      .then((res) => {
        dispatch(getComment(res.data));
      })
      .catch((e) => {
        alert("댓글을 불러오는데 실패하였습니다.");
      });
  };
};

const addCommentDB = (comment) => {
  return function (dispatch, getState, { history }) {
    apis
      .addComment(comment)
      .then((res) => {
        dispatch(getCommentDB(comment.postId));
      })
      .catch((e) => { });
  };
};

const editCommentDB = (commentId, data) => {
  return function (dispatch, getState, { history }) {
    apis
      .put(`/api/comments/${commentId}`, data)
      .then((res) => {
        dispatch(editComment(commentId, res.data));
      })
      .catch((e) => {
        alert("댓글 수정에 실패하였습니다.");
      });
  };
};

const removeCommentDB = (commentId) => {
  return function (dispatch, getState, { history }) {
    apis
      .removeComments(commentId)
      .then((res) => {
        dispatch(removeComment(commentId));
      })
      .catch((e) => {
        alert("댓글 삭제에 실패하였습니다.");
      });
  };
};

//reducer
export default handleActions(
  {
    [ADD_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.commentList.unshift(action.payload.comment);
      }),
    [REMOVE_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.commentList = draft.commentList.filter(
          (c) => c.commentId !== action.payload.commentId
        );
      }),
    [GET_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.commentList = action.payload.commentList;
      }),
  },
  initialState
);

//action creator export
const actionCreators = {
  addComment,
  removeComment,
  editComment,
  getComment,
  addCommentDB,
  getCommentDB,
  editCommentDB,
  removeCommentDB,
};

export { actionCreators };
