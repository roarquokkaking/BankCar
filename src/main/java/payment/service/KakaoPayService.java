package payment.service;

import payment.entity.KakaoPayEntity;

import java.util.Optional;

public interface KakaoPayService {
    void insert(KakaoPayEntity kakaoPayEntity);

    Optional getData(String id);

    void setStatus(KakaoPayEntity kakaoPayEntity);
}
