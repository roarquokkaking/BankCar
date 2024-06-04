import React from "react";
import Accordion from "react-bootstrap/Accordion";
import styles from "./Chatting.css";
import ChattingGroupBox from "./ChatGroupBox";

const Chatting = ({ isOpenChatting }) => {
  return (
    <div className={styles.chattingContainer}>
      <Accordion activeKey={isOpenChatting ? "0" : ""}>
        <Accordion.Item eventKey="0">
          <Accordion.Header>채팅</Accordion.Header>
          <Accordion.Body style={{ padding: 0 }}>
            <div className={`${styles.chattingContentContainer} d-flex`}>
              <div
                className={`${styles.chattingContentElementLeft} d-flex justify-content-start align-items-start flex-column`}
              >
                <ChattingGroupBox
                  id="1"
                  title="(클라우드)김태진"
                  content="버거킹가실분?"
                ></ChattingGroupBox>
                <ChattingGroupBox
                  id="2"
                  title="(클라우드)박정연"
                  content="버거킹가실분?"
                ></ChattingGroupBox>
                <ChattingGroupBox
                  id="3"
                  title="(클라우드)이동우"
                  content="버거킹가실분?"
                ></ChattingGroupBox>
                <ChattingGroupBox
                  id="4"
                  title="(클라우드)김용환"
                  content="버거킹가실분?"
                ></ChattingGroupBox>
                <ChattingGroupBox
                  id="5"
                  title="(클라우드)최인환"
                  content="버거킹가실분?"
                ></ChattingGroupBox>
              </div>
              <div
                className={`${styles.chattingContentElementRight} d-flex justify-content-start align-items-start`}
              ></div>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default Chatting;