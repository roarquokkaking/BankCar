import axios from "axios";

// 기본 URL 설정 (로컬용 / 배포용)
const apiClientLocal = axios.create({
    baseURL: 'http://localhost:8080/api'
});
const apiClientPublish = axios.create({
    baseURL: 'https://dongwoossltest.shop/api'
});

// userId가 자동차 등록하는 api
export function insertCarDataApi(formData, userId){
    return apiClientPublish.post(`/users/${userId}/cars`, formData);
}

// carId 자동차를 서비스에 등록시키는 api
export function insertCarServiceApi(serviceDTO, carId){
    return apiClientPublish.post(`/cars/${carId}/service`, serviceDTO)
}

// userId가 등록한 자동차 리스트 가져오는 api
export function selectUserCarList(userId){
    return apiClientPublish.get(`/users/${userId}/cars`)
}

// 네이버 로그인 접근 url 가져오는 api
export function getNaverLoginUrlApi(){
    return apiClientLocal.get(`/user/naverLogin`,{
        withCredentials:true
    })
}


