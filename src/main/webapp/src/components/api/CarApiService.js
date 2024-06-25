import axios from "axios";

// 기본 URL 설정 (로컬용 / 배포용)
const apiClient = axios.create({
    //baseURL: 'http://localhost:8080/api'
    baseURL: 'https://dongwoossltest.shop/api'
});


// userId가 자동차 등록하는 api
export function insertCarDataApi(formData, userId){
    return apiClient.post(`/users/${userId}/cars`, formData);
}

// carId 자동차를 서비스에 등록시키는 api
export function insertCarServiceApi(serviceDTO, carId){
    return apiClient.post(`/cars/${carId}/service`, serviceDTO)
}

// userId가 등록한 자동차 리스트 가져오는 api
export function selectUserCarList(userId){
    return apiClient.get(`/users/${userId}/cars`)
}

// 자신의 자동차 정보 가져오기
export function getCarItemApi(userId, carId){
    return apiClient.get(`/users/${userId}/cars/${carId}`)
}

// 자신의 등록된 자동차 삭제
export function deleteCarApi(userId, carId){
    return apiClient.delete(`/users/${userId}/cars/${carId}`)
}

//  등록된 서비스 자동차 리스트 가져오기
export function getServiceCarList(carId){
    return apiClient.get(`/cars/${carId}/service`)
}

// 좋아요 목록 가져오는 api
export function getWishList(userId){
    return apiClient.get(`/WishList/users/${userId}`)
}

// 네이버 로그인 접근 url 가져오는 api
export function getNaverLoginUrlApi(){
    return apiClient.get(`/user/naverLogin`,{
        withCredentials:true
    })
}

// 알림 보내는 api
export function sendNotification(userId){
    return apiClient.get(`/notify/${userId}`)
}


