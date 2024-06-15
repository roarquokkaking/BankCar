package payment.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import payment.entity.KakaoPayEntity;
import payment.repo.PaymentRepo;

import java.util.Optional;

@Transactional
@Service
public class KakaoPayServiceImpl implements KakaoPayService{

    @Autowired
    PaymentRepo paymentRepo;
    @Override
    public void insert(KakaoPayEntity kakaoPayEntity) {
        paymentRepo.save(kakaoPayEntity);
    }

    @Override
    public Optional<KakaoPayEntity> getData(String id) {
        return paymentRepo.findByIdandstatus(id);
    }

    @Override
    public void setStatus(KakaoPayEntity kakaoPayEntity) {
        paymentRepo.save(kakaoPayEntity);
    }
}
