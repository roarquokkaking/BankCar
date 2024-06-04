import React from "react";
import styles from "./Chatting.css";

const ChattingGroupBox = ({ id, title, content }) => {
  return (
    <>
      <div
        className={`${styles.groupChat} p-2 d-flex justify-content-start align-items-center`}
      >
        <img
          className={`${styles.groupChatImage}`}
          src="/image/nullImage/nullImage2.png"
          alt="nullImage"
        ></img>
        <div
          className={`${styles.groupChatInfoDiv} d-flex justify-content-center align-items-start flex-column`}
        >
          <span>{title}</span>
          <span className={styles.groupChatContentSpan}>{content}</span>
        </div>
      </div>
    </>
  );
};

export default ChattingGroupBox;