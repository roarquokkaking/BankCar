# BankCar

### 🎯서비스 목표
BankCar 서비스의 목적은 최근 렌트카 및 리스카 시장의 매출 상승과 소비자들의 경제적 부담을 줄이고 유연한 이동 수단을 찾는 트렌드에 맞춰, 다양한 차량 선택 옵션과 간편한 예약 및 대여 서비스를 제공하는 것입니다. 이를 통해 이용자들에게 목적에 맞는 최적의 이동 수단을 제공합니다.

### 📌프로젝트 소개  
> - 개인 자동차 대여 플랫폼 서비스
> - 개발 인원 총 5명 ( 박정연, 김용환, 김태진, 이동우, 최인환)
> - 개발 기간 : 4주 (2024.05.27 ~ 2024.06.26) 
- 배포 URL : ~__https://dongwoossltest.shop__~**(NCP 서비스가 종료되어 서버가 내려갔습니다.)**
- 👽 ~위의 URL 을 통해 산출물을 경험해 보실 수 있습니다.~
- 🎥시연 영상 : https://www.youtube.com/watch?v=h_NkeBzHJAU
---
### ⚙️ 개발 환경
- **프레임워크** : Spring Boot
- **IDE** : intelliJ
- **Back** : Java 17, Gradle,  JPA, Mysql, Websocket
- **Front** : React, node.js, axios, 
- **인프라**, **CI/CD** : Naver Cloud Platform, JenKins, NGINX, SSL
- **협업 도구** : Github, Figma, notion

---
## 핵심 기능
 ### 👦소셜 로그인 및 유저 정보 관리
- 저희 서비스는 카카오, 네이버, 구글 세 가지 **(Oauth) 로그인**을 지원합니다. 이를 통해 사용자들은 간편하게 로그인할 수 있으며, **React Reducer**를 활용해 로그인 정보를 효율적으로 관리합니다.​
 
![image](https://github.com/JungYeon22/BankCar/assets/105910143/09300497-d587-43be-a2ff-31d301e001ca)


### 🚗운전면허증 등록
- 사용자는 면허증 사진을 업로드하면,** Naver Cloud OCR API**를 통해 면허증 정보를 자동으로 인식하고 추출합니다. 이를 통해 정확한 인증이 가능하며, 다른 사진이 등록될 경우 인증이 불가합니다. 또한 **민감한 정보는 블러**처리 통하여 유저의 정보를 보호합니다.

![image](https://github.com/JungYeon22/BankCar/assets/105910143/a047f331-db4f-477b-8156-b42ee564eeee)

  ​
### 💸카카오페이 결제
-  사용자가 결제를 요청하면, 카카오 페이 API를 호출하여 결제 정보를 전달, 사용자는 카카오 페이 결제 화면에서 결제를 완료합니다. 결제가 완료되면, **카카오 페이 API**로부터 결제 완료 정보를 받아와 예약을 확정합니다.​

![image](https://github.com/JungYeon22/BankCar/assets/105910143/c1a28941-661c-48d2-b3ea-0956de19ec16)

  
### 🔐SSL 인증 
- 클라이언트가 도메인에 접속하면 **Nginx가 SSL 인증서를 통해 연결을 암호화**합니다. 이를 통해 사용자와 서버 간의 데이터 전송이 **안전**하게 이루어집니다.​

![image](https://github.com/JungYeon22/BankCar/assets/105910143/c7b19a5f-cd25-423f-9f94-8ff8121e643d)

  
### 📰자동차 정보 관리 Context
-  사용자가 자동차 정보를 입력하면 **React Context를 통해 상태를 관리**하고, 이를 서버에 등록합니다. 이 과정을 통해 사용자들은 자신의 자동차 정보를 간편하게 등록하고 관리할 수 있으며, **데이터의 일관성**을 유지할 수 있습니다.

 ![image](https://github.com/JungYeon22/BankCar/assets/105910143/516c6068-3723-482f-a155-21701fbb47c4)


### 🧑‍🤝‍🧑실시간 채팅
- 저희 1:1 채팅 기능은 WebSocket과 STOMP 기술을 사용하여 실시간으로 메시지를 주고받을 수 있도록 설계되었습니다. WebSocket은 클라이언트와 서버 간의 지속적인 양방향 통신을 가능하게 하여 빠르고 효율적인 메시지 전송을 지원합니다. STOMP는 메시지의 라우팅과 형식을 체계적으로 관리하며, 구독/발행 모델을 통해 다수의 클라이언트가 동시에 통신할 수 있게 합니다. 이 두 기술을 통해 저희 서비스는 안정적이고 실시간 채팅 기능을 구현했습니다.​

 ![image](https://github.com/JungYeon22/BankCar/assets/105910143/3241f7d7-925c-4f4d-a2eb-1803a0665dcb)




