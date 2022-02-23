import { createAction, handleActions } from "redux-actions"
import { produce } from 'immer'
import { apis } from "../../shared/axios"
import { axapis } from "../../shared/formaxios"


//Action
const SET_POST = "SET_POST"
const ADD_POST = "ADD_POST"
const EDIT_POST = "EDIT_POST"
const DEL_POST = "DEL_POST"
const GET_POST = "GET_POST"

//Action create
const getPost = createAction(GET_POST, (postlist) => ({ postlist }));
const setPost = createAction(SET_POST, (post) => ({ post }))
const addPost = createAction(ADD_POST, (post) => ({ post }))
const editPost = createAction(EDIT_POST, (post, post_Id) => ({ post, post_Id }))
const delPost = createAction(DEL_POST, (post_Id) => ({ post_Id }))

//initialState
const initialState = {
  list: [],
}

//Middleware

const setPostAction = () => {
  return function (dispatch, getState, { history }) {
    apis.getPost()
      .then((response) => {
        console.log(response)
      })
      .error((error) => console.log(error))
  }
}

const getPostAction = (postId, post) => {
  return function (dispatch, getState, { history }) {
    apis.getPost()
      .then((res) => {
        const postList = res.data;
        if (postId) {
          const post = postList.filter((post) => postId === postId[0]);
          const title = postList.title;
          const content = postList.content;
          const image = postList.imageUrl;
          dispatch(getPost(post, title, content, image));
        } else {
          dispatch(getPost(postList));
        }
      })
      .catch((err) => { });
  };
}

// const getDetailAction = (postId, post) => {
//   return function (dispatch, getState, { history }) {
//     apis.getPost()
//       .then((res) => {
//         const postList = res.data;
//         if (postId) {
//           const post = postList.filter((post) => postId === postId[0]);
//           const title = postList.title;
//           const content = postList.content;
//           const image = postList.imageUrl;
//           dispatch(getPost(post, title, content, image));
//         } else {
//           dispatch(getPost(postList));
//         }
//       })
//       .catch((err) => { });
//   };
// }


const addPostAction = (ImgId) => {
  return function (dispatch, getState, { history }) {
    apis.createPost(ImgId)
      .then((response) => {

        console.log(response)
        history.replace('/')
      })
      .catch((error) => console.log(error))
  }
}

const editPostAction = (id, formData) => {
  return function (dispatch, getState, { history }) {
    axapis.edPost(id, formData)
      .then((res) => {
        console.log(res)
        dispatch(editPost(id, formData));
        history.replace('/')
      })
      .catch((err) => console.log(err))
  }
}

const delPostAction = (id) => {
  return function (dispatch, getState, { history }) {
    apis.delPost(id)
      .then((res) => {
        console.log(res)
        dispatch(delPost(id))
        document.location.reload();
      })
      .catch((err) => console.log(err))
  }
}





//Reducer
export default handleActions({
  [SET_POST]: (state, action) => produce(state, (draft) => {
    draft.list.push(...action.payload.postlist)
  }),
  [ADD_POST]: (state, action) => produce(state, (draft) => {
    draft.list.unshift(action.payload.post);
  }),
  [EDIT_POST]: (state, action) => produce(state, (draft) => {
    let idx = draft.list.findIndex((p) => p.postId === action.payload.post_Id)
    draft.list[idx] = { ...draft.list[idx], ...action.payload.post }
  }),
  [DEL_POST]: (state, action) => produce(state, (draft) => {
    draft.list.filter((p) => p.postId !== action.payload.post_Id)
  }),

}, initialState);





const actionCreators = {
  setPost,
  addPost,
  editPost,
  delPost,
  setPostAction,
  addPostAction,
  editPostAction,
  delPostAction,
  getPostAction,
}

export { actionCreators }