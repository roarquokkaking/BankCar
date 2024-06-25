package payment.controller;

import booking.entity.BookingEntity;
import booking.service.BookingService;
import car.entity.Car;
import car.service.CarService;
import chat.entity.MessageRoom;
import chat.service.MessageRoomService;
import jakarta.servlet.http.HttpSession;
import login.dto.LoginDTO;
import notification.service.NotificationService;
import org.apache.kafka.common.security.auth.Login;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.view.RedirectView;
import payment.entity.KakaoPayEntity;
import payment.service.KakaoPayService;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins="*")    // 다른 포트에서 넘오는 것을 받을 수 있다.
@RestController
@RequestMapping(path = "/api/payment" , produces = "application/json")
public class KaKaoPayController {
    private static final Logger logger = LoggerFactory.getLogger(KaKaoPayController.class);
    private final RestTemplate restTemplate = new RestTemplate();

    @Autowired
    KakaoPayService kakaoPayService;
    @Autowired
    BookingService bookingService;
    @Autowired
    CarService carService;
    @Autowired
    MessageRoomService messageRoomService;
    @Autowired
    NotificationService notificationService;


    @GetMapping(path = "/kakaoPay")
    public String kakaoPay(@ModelAttribute KakaoPayEntity kakaoPayEntity, HttpSession session) {

        LoginDTO loginDTO = (LoginDTO) session.getAttribute("loginDTO");
        kakaoPayEntity.setId(loginDTO.getId());
        String url = "https://open-api.kakaopay.com/online/v1/payment/ready/";
        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", "application/json");
        headers.set("Authorization", "SECRET_KEY DEV7583106F237EE21ACE826DF4ACF641C017674");

        Map<String, Object> jsonBody = new HashMap<>();

        jsonBody.put("cid", kakaoPayEntity.getCid());
        jsonBody.put("partner_order_id", kakaoPayEntity.getPartner_order_id());
        jsonBody.put("partner_user_id", kakaoPayEntity.getPartner_user_id());
        jsonBody.put("item_name", kakaoPayEntity.getItem_name());
//        jsonBody.put("quantity",kakaoPayEntity.getQuantity());
        jsonBody.put("quantity", "1");
        jsonBody.put("total_amount", kakaoPayEntity.getTotal_amount());
//        jsonBody.put("vat_amount",kakaoPayEntity.getVat_amount());
        jsonBody.put("vat_amount", "0");
//        jsonBody.put("tax_free_amount",kakaoPayEntity.getTax_free_amount());
        jsonBody.put("tax_free_amount", "0");
        jsonBody.put("approval_url", kakaoPayEntity.getApproval_url());
        jsonBody.put("fail_url", "https://dongwoossltest.shop/fail");
        jsonBody.put("cancel_url", "https://dongwoossltest.shop/cancel");

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(jsonBody, headers);

        ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.POST, entity, Map.class);
        String pc_url = (String) response.getBody().get("next_redirect_pc_url");
//        System.out.println("pc_url="+pc_url);
        String tid = (String) response.getBody().get("tid");
        kakaoPayEntity.setTid(tid);
        kakaoPayEntity.setStatus(0);
        kakaoPayService.insert(kakaoPayEntity);
        return pc_url;
    }

    @GetMapping(path = "/success")
    public Map<String, Object> success(@RequestParam("pgToken") String pg_token, HttpSession session) {
        LoginDTO loginDTO = (LoginDTO) session.getAttribute("loginDTO");

        System.out.println("pg_token=" + pg_token);
//        logger.info("pg_token:{}",pg_token);
        String url = "https://open-api.kakaopay.com/online/v1/payment/approve";
        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", "application/json");
        headers.set("Authorization", "SECRET_KEY DEV7583106F237EE21ACE826DF4ACF641C017674");

        Optional<KakaoPayEntity> optionalKakaoPayEntity = kakaoPayService.getData(loginDTO.getId());


        KakaoPayEntity kakaoPayEntity;
        if (optionalKakaoPayEntity.isPresent()) {
            kakaoPayEntity = optionalKakaoPayEntity.get();
        } else {
            kakaoPayEntity = null;
        }

        System.out.println("success=" + kakaoPayEntity.getCid());


        Map<String, Object> jsonBody = new HashMap<>();
        jsonBody.put("cid", kakaoPayEntity.getCid());
        jsonBody.put("tid", kakaoPayEntity.getTid());
        jsonBody.put("partner_order_id", kakaoPayEntity.getPartner_order_id());
        jsonBody.put("partner_user_id", kakaoPayEntity.getPartner_user_id());
        logger.info("cid={}", kakaoPayEntity.getCid());
        jsonBody.put("pg_token", pg_token);
        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(jsonBody, headers);

        ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.POST, entity, Map.class);
        String item_name = (String) response.getBody().get("item_name");
        Map<String, Object> total = (Map<String, Object>) response.getBody().get("amount");
        int total_amount = (int) total.get("total");

        Map<String, Object> map = new HashMap<>();
        map.put("item_name", item_name);
        map.put("total_amount", total_amount);
        map.put("quantity", kakaoPayEntity.getQuantity());
        map.put("vat_amount", kakaoPayEntity.getVat_amount());
        map.put("tax_free_amount", kakaoPayEntity.getTax_free_amount());

        kakaoPayEntity.setStatus(1);
        kakaoPayService.setStatus(kakaoPayEntity);

        BookingEntity booking = new BookingEntity();

        booking.setStart_date(LocalDate.parse(kakaoPayEntity.getVat_amount()));
        booking.setEnd_date(LocalDate.parse(kakaoPayEntity.getTax_free_amount()));
        booking.setStart_time(LocalTime.parse(kakaoPayEntity.getFail_url()));
        booking.setEnd_time(LocalTime.parse(kakaoPayEntity.getCancel_url()));
        LocalDateTime time = LocalDateTime.now();
        booking.setCreate_date(time);
        Car car = carService.findCarById(kakaoPayEntity.getCar_id());
        booking.setHost_name(car.getUser().getName());
        booking.setGuest_name(loginDTO.getName());

        booking.setLoginDTO(loginDTO);
        booking.setCar(car);


        bookingService.setBooking(booking);

        // 채팅방 생성 및 저장
        MessageRoom messageRoom = new MessageRoom();
        messageRoom.setHostName(car.getUser().getName());
        messageRoom.setGuestName(loginDTO.getName());
        messageRoomService.createMessageRoom(messageRoom);

        //알림 보내기
        notificationService.notifyUser(booking.getCar().getUser().getId());

        return map;

    }

}
