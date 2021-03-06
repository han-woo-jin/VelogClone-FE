import axios from "axios";

const tokencheck = document.cookie;
const token = tokencheck.split("=")[1];
const search = localStorage.getItem("search")

export const instance = axios.create({
  // 기본적으로 우리가 바라볼 서버의 주소
  baseURL: "",
  headers: {
    // "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    // accept: "*/*",
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json",
    token: token,
    //로그인 후에는 토큰도 headers에 담아서 건내줘야한다.
  },
});

const forsearch = axios.create({
  // 기본적으로 우리가 바라볼 서버의 주소
  baseURL: "",
  headers: {
    // "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    // accept: "*/*",
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json",
    token: token,
    search: search,
    //로그인 후에는 토큰도 headers에 담아서 건내줘야한다.
  },
});

instance.interceptors.request.use(function (config) {
  const accesstoken = document.cookie.split("=")[1];
  config.headers.common["Authorization"] = `${accesstoken}`;
  return config;
});


export const apis = {
  // 로그인 요청
  login: (userEmail, password) =>
    instance.post("/user/login", { userEmail: userEmail, password: password }),

  signup: (userEmail, password, passwordCheck, userName) =>
    instance.post("/user/signup", {
      userEmail: userEmail,
      password: password,
      passwordCheck: passwordCheck,
      userName: userName,
    },
      { withCredentials: true }
    ),

  // 게시물 불러오기
  getPost: () => instance.get("/api/posting"),

  getSearch: (search) => instance.post("/api/search", {
    search: search
  },
    { withCredentials: true }
  ),
  getDetail: (id) => instance.get(`/api/posting/${id}`),
  delPost: (id) => instance.delete(`/api/posting/${id}`),

  // 게시물 한개불러오기
  // getOnePost: (meetingId) => instance.get(`/api/meeting/${meetingId}`),
  // 게시물 작성하기
  createPost: (ImgId, content, title) => instance.post(`/api/posting/${ImgId}`, {
    content: content,
    title: title,
  },
    { withCredentials: true }
  ),
  likePost: (postId, likeValue) => instance.post(`/api/likes/${postId}`, {
    likeValue: likeValue,
  },
    { withCredentials: true }
  ),
  // 게시물 수정하기
  editPost: (postId, content, title) => instance.put(`/api/posting/${postId}`, {
    content: content,
    title: title,
  },
    { withCredentials: true }
  ),
  // 게시물 삭제하기


  // 댓글 불러오기
  getComment: (meetingId) => instance.get(`api/meeting/${meetingId}`),
  // 댓글 작성하기
  createComment: (postId, comment) => instance.post("api/comment", {
    postId: postId,
    comment: comment
  }),
  // 댓글 수정하기
  // editComment: (meetingId, content, commentId) => instance.put(`api/meeting/${meetingId}/comments/${commentId}`, content),
  // 댓글 삭제하기
  delCommentDB: (commentId) => instance.delete(`api/comment/${commentId}`),


  //모임 참여하기
  createJoin: (meetingId) => instance.post(`api/meeting/${meetingId}/user/`),
  //모임 탈퇴하기
  deleteJoin: (meetingId) => instance.delete(`api/meeting/${meetingId}/user/`),
};
