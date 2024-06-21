let baseURL = 'http://localhost:8080'; // 개발 환경 기본값

if (process.env.NODE_ENV === 'production') {
    baseURL = 'https://dongwoossltest.shop/api'; // 프로덕션 환경
}

export { baseURL };