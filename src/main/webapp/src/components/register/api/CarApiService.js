import axios from "axios";

// 기본 URL 설정
const apiClient = axios.create({
    baseURL: 'https://dongwoossltest.shop/api'    // https://dongwoossltest.shop/api  //http://localhost:8080/api
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

export function getNaverLoginUrlApi(userId){
    return apiClient.get(`/user/naverLogin`,{
        withCredentials:true
    })
}


