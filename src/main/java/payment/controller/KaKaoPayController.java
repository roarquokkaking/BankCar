package payment.controller;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.view.RedirectView;
import payment.entity.KakaoPayEntity;

import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins="*")    // 다른 포트에서 넘오는 것을 받을 수 있다.
@RestController
@RequestMapping(path = "/api/payment" , produces = "application/json")
public class KaKaoPayController {
    private final RestTemplate restTemplate = new RestTemplate();
    String tid ="";
    String cid="";
    String partner_order_id="";
    String partner_user_id="";

    @GetMapping(path="/kakaoPay")
    public String kakaoPay (@ModelAttribute KakaoPayEntity kakaoPayEntity){

        String url = "https://open-api.kakaopay.com/online/v1/payment/ready/";
        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", "application/json");
        headers.set("Authorization", "SECRET_KEY DEV7583106F237EE21ACE826DF4ACF641C017674");

        Map<String, Object> jsonBody = new HashMap<>();
        cid=kakaoPayEntity.getCid();
        partner_order_id=kakaoPayEntity.getPartner_order_id();
        partner_user_id=kakaoPayEntity.getPartner_user_id();
        jsonBody.put("cid",kakaoPayEntity.getCid());
        jsonBody.put("partner_order_id",kakaoPayEntity.getPartner_order_id());
        jsonBody.put("partner_user_id",kakaoPayEntity.getPartner_user_id());
        jsonBody.put("item_name",kakaoPayEntity.getItem_name());
        jsonBody.put("quantity",kakaoPayEntity.getQuantity());
        jsonBody.put("total_amount", kakaoPayEntity.getTotal_amount());
        jsonBody.put("vat_amount",kakaoPayEntity.getVat_amount());
        jsonBody.put("tax_free_amount",kakaoPayEntity.getTax_free_amount());
        jsonBody.put("approval_url",kakaoPayEntity.getApproval_url());
        jsonBody.put("fail_url",kakaoPayEntity.getFail_url());
        jsonBody.put("cancel_url",kakaoPayEntity.getCancel_url());

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(jsonBody, headers);

        ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.POST, entity, Map.class);
        String pc_url= (String) response.getBody().get("next_redirect_pc_url");
//        System.out.println("pc_url="+pc_url);
        tid = (String) response.getBody().get("tid");
        return pc_url;
    }

    @GetMapping(path = "/success")
    public void success(@RequestParam("pg_token") String pg_token){


        paysuccess(pg_token);

    }

    public RedirectView paysuccess(String pg_token){
        String url ="https://open-api.kakaopay.com/online/v1/payment/approve";
        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", "application/json");
        headers.set("Authorization", "SECRET_KEY DEV7583106F237EE21ACE826DF4ACF641C017674");
        Map<String, Object> jsonBody = new HashMap<>();
        jsonBody.put("cid",cid);
        jsonBody.put("tid",tid);
        jsonBody.put("partner_order_id",partner_order_id);
        jsonBody.put("partner_user_id",partner_user_id);
        jsonBody.put("pg_token",pg_token);
        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(jsonBody, headers);

        ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.POST, entity, Map.class);
        String item_name = (String) response.getBody().get("item_name");
        Map<String,Object> total= (Map<String, Object>) response.getBody().get("amount");
        String total_amount= (String) total.get("total");
        return new RedirectView("https://dongwoossltest.shop/success?itemName="+item_name+"&totalAmount="+total_amount);
    }
}
