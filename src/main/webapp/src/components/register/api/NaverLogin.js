import axios from "axios";

// 기본 URL 설정
const apiClient = axios.create({
    baseURL: 'http://localhost:8080'    // https://dongwoossltest.shop//api
});

export function onNaverLogin(){
     apiClient.post(`/user/naverLogin`).then(res => res.data).catch(error=> console.log(error))
}