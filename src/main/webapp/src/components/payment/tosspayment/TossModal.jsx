import { useEffect, useRef, useState } from "react";
import { nanoid } from "nanoid";
import { loadTossPayments } from "@tosspayments/payment-sdk";
import "./Tosspayment.css";

const clientKey = "test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq";
const options = {
  card: [
    "신한",
    "현대",
    "삼성",
    "롯데",
    "토스뱅크",
    "하나",
    "국민",
    "비씨",
    "농협",
    "우리",
    "카카오뱅크",
    "케이뱅크",
    "기업",
    "씨티",
    "새마을",
    "우체국",
    "수협",
    "신협",
    "광주은행",
    "전북",
    "산업",
    "제주",
    "저축",
  ],
  easypay: ["토스페이", "네이버페이", "삼성페이", "엘페이", "카카오페이", "핀페이", "페이코", "SSG페이"],
  tossPayments: ["계좌이체", "가상계좌", "휴대폰", "문화상품권", "도서문화상품권", "게임문화상품권"],
};

export function TossModal() {
  const [selectedMethod, setSelectedMethod] = useState("card");
  const [selectedOption, setSelectedOption] = useState("결제수단 선택");
  const [paymentOptions, setPaymentOptions] = useState(options.card);
  const customerNameRef = useRef(null);
  const customerEmailRef = useRef(null);

  const handleMethodChange = (event) => {
    setSelectedMethod(event.target.value);
    setSelectedOption("결제수단 선택");
    setPaymentOptions(options[event.target.value]);
  };

  return (
    <div className="box_section" style={{ width: 600 }}>
      <h2 style={{ marginTop: -30 }}>주문/결제</h2>
      <h4 className="text--left">결제수단</h4>
      <div className="checkable typography--p">
        {Object.keys(options).map((optionKey) => (
          <label key={optionKey} htmlFor={optionKey} className="checkable__label typography--regular">
            <input type="radio" value={optionKey} id={optionKey} name="method" className="checkable__input" checked={selectedMethod === optionKey} onChange={handleMethodChange} />
            <span className="checkable__label-text" style={{ paddingRight: 25 }}>
              {optionKey === "card" ? "카드" : optionKey === "easypay" ? "간편결제" : "기타 결제수단"}
            </span>
          </label>
        ))}
      </div>

      <div className="input radius--m p-select input--medium p-select--medium" style={{ marginTop: 20 }}>
        <span className="input__field p-select__field">
          <span className="p-select__field-title" id="selectText">
            {selectedOption}
          </span>
        </span>
        <select
          className="p-select__native"
          aria-invalid="false"
          aria-label="결제수단 선택"
          id="paymentType"
          name="paymentType"
          value={selectedOption}
          onChange={(event) => setSelectedOption(event.target.value)}
        >
          <option disabled value="결제수단 선택">
            결제수단 선택
          </option>
          {paymentOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <h4 className="text--left">구매자 정보</h4>
      <div className="input radius--m input--medium input--default dashboard-emotion-cache-15lad2a">
        <input className="input__field" placeholder="이름(선택)" aria-invalid="false" aria-label="이름 입력" id="customerName" ref={customerNameRef} />
      </div>
      <div className="input radius--m input--medium input--default dashboard-emotion-cache-15lad2a" style={{ marginTop: 10 }}>
        <input className="input__field" placeholder="이메일 입력(선택)" aria-invalid="false" aria-label="이메일 입력" id="customerEmail" ref={customerEmailRef} />
      </div>

      <h4 className="text--left">결제내역</h4>
      <div className="p-grid typography--p">
        <div className="p-grid-col text--left">결제금액</div>
        <div className="p-grid-col text--right">1원</div>
      </div>
      <div className="p-grid typography--p" style={{ marginTop: 10 }}>
        <div className="p-grid-col text--left">주문상품 정보</div>
        <div className="p-grid-col text--right">토스 티셔츠 외 2건</div>
      </div>

      <button
        className="button"
        id="payment-button"
        style={{ width: 300 }}
        onClick={async () => {
          try {
            const tossPayments = await loadTossPayments(clientKey);
            const paymentMethod = selectedMethod === "tossPayments" ? selectedOption : "카드";
            await tossPayments?.requestPayment(paymentMethod, {
              amount: 101,
              orderId: nanoid(),
              orderName: "테스트 결제",
              successUrl: `${window.location.origin}/success`,
              failUrl: `${window.location.origin}/fail`,
              flowMode: selectedMethod === "tossPayments" ? "DEFAULT" : "DIRECT",
              cardCompany: selectedMethod === "card" ? selectedOption : null,
              easyPay: selectedMethod === "easypay" ? selectedOption : null,
              customerEmail: customerEmailRef.current.value,
              customerName: customerNameRef.current.value,
            });
          } catch (error) {
            console.error(error);
          }
        }}
      >
        결제하기
      </button>
    </div>
  );
}