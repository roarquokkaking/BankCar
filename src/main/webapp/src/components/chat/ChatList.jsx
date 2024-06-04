import React from 'react';
import styles from './ChatList.css';

const MessageList = ({ messages, userId }) => {
    return (
        <div>
            {messages.map((message, index) => {
                const isOwnMessage = message.userId === userId;

                const profileImage = !isOwnMessage && (
                    <img
                        src={message.profileImage === "null" ? '/image/nullImage/nullImage2.png' : message.profileImage}
                        alt="Profile"
                        className={styles.otherProfileImage}
                    />
                );

                return (
                    <div
                        key={index}
                        className={`${styles.messageContainer} ${isOwnMessage ? styles.ownMessageContainer : styles.otherMessageContainer}`}
                    >
                        {profileImage}
                        <div className={styles.textContainer}>
                            {!isOwnMessage && <div className={styles.nickName}>{message.nickName}</div>}
                            <div className={`${styles.message} ${isOwnMessage ? styles.ownMessage : ''}`}>
                                {message.messageType === 0 ? (
                                    <div>{message.content}</div>
                                ) : (
                                    <img src={message.content} alt="User uploaded" style={{ maxWidth: '100%', height: 'auto' }} />
                                )}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default MessageList;
