import axios from "axios";

const token = document.cookie.split("=")[1];

export const instance = axios.create({
  // 기본적으로 우리가 바라볼 서버의 주소
  baseURL: "",
  headers: {
    "Content-Type": "multipart/form-data",
    accept: "application/json",
    token: token,
  },
});

instance.interceptors.request.use(function (config) {
  const accesstoken = document.cookie.split("=")[1];
  config.headers.common["Authorization"] = `${accesstoken}`;
  return config;
});

export const axapis = {

  createPost: (formData) => instance.post("/api/posting", formData, { withCredentials: true }),
  edPost: (id, formData) => instance.put(`/api/meeting/${id}`, formData),
  imgpost: (formData) => instance.post("/api/upload", formData, { withCredentials: true }),

}
