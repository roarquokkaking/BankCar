package payment.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.json.simple.JSONObject;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class NaverServiceImpl implements NaverService {

    @SuppressWarnings("unchecked")
    @Override
    public Map<String, Object> naverPay(Map<String, Object> param) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("X-Naver-Client-Id", "HN3GGCMDdTgGUfl0kFCo");
        headers.set("X-Naver-Client-Secret", "ftZjkkRNMR");
        headers.set("Content-Type", "application/json");
        
        Map<String, Object> payParams = new HashMap<>();
        payParams.put("merchantPayKey", "KAO20230318002");
        payParams.put("merchantUserKey", "사용자하나둘셋");
        payParams.put("productName", param.get("productName"));
        payParams.put("productCount", param.get("productCount"));
        payParams.put("totalPayAmount", param.get("totalPayAmount"));
        payParams.put("taxScopeAmount", param.get("taxScopeAmount"));
        payParams.put("taxExScopeAmount", param.get("taxExScopeAmount"));
        payParams.put("returnUrl", "http://localhost:3000/payment/naverpaycompletion");

        //상품관련정보
        List<Map<String, Object>> items = new ArrayList<>();
        Map<String, Object> item = new HashMap<>();
        item.put("categoryType", "PRODUCT");
        item.put("categoryId", "GENERAL");
        item.put("uid", "iphone");
        item.put("name", "아이폰");
        item.put("count", 1);

        items.add(item);

        payParams.put("productItems", items);

        JSONObject jObj = new JSONObject();
        jObj.putAll(payParams);

        //네이버페이 결제준비 API 요청
        HttpEntity<?> request = new HttpEntity<>(jObj.toString(), headers);

        RestTemplate template = new RestTemplate();
        String url = "https://dev.apis.naver.com/np_rlqoc664565/naverpay/payments/v2/reserve";

        //요청결과
        Map<String, Object> res = template.postForObject(url, request, Map.class);
        return res;
    }
}
