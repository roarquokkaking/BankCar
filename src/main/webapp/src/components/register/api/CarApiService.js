import axios from "axios";

// 기본 URL 설정
const apiClient = axios.create({
    baseURL: 'http://localhost:8080'
});

export function insertCarData(carData){
    return apiClient.post('/cars', carData, {
        headers: {"Content-Type": "multipart/form-data"}
    });
}

