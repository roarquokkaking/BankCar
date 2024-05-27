import React from 'react';
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { LuSmartphone } from "react-icons/lu";
import { MdEmail } from "react-icons/md";
import { FaAddressCard } from "react-icons/fa";

const MyProfile = () => {
    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            marginLeft: '30px',
            position: 'relative',
        },
        header: {
            display: 'flex',
            alignItems: 'center',
            marginBottom: '20px',
        },
        button: {
            width: 70,
            height: 70,
            padding: '10px 15px',
            border: 'none',
            borderRadius: '5px',
            backgroundColor: '#007BFF',
            color: '#fff',
            cursor: 'pointer',
            position: 'absolute',
            right: 50,
            top: 50,
        },
        formGroup: {
            marginBottom: '35px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
        },
        label: {
            display: 'block',
            marginBottom: '5px',
            fontWeight: 'bold',
        },
        input: {
            width: '400px',
            padding: '8px',
            border: 'none',
            borderBottom: '1px solid #ccc',
            borderRadius: '4px',
            boxSizing: 'border-box',
            marginBottom: '20px',
        },
        title: {
            color: '#333',
            marginBottom: '20px',
        },
        formContainer: {
            paddingTop: '30px',
        },
        submitButtonContainer: {
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            position: 'absolute',
            bottom: -50,
            left: -10,
        },
        submitButton: {
            padding: '10px 20px',
            backgroundColor: '#007BFF',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
        },
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h1 style={styles.title}>프로필</h1>
                <button style={styles.button}>사진 등록</button>
            </div>
            <div style={styles.formContainer}>
                <div style={styles.formGroup}>
                    <label style={styles.label}>
                        <MdOutlineDriveFileRenameOutline style={{marginRight: '10px'}}/>
                        이름
                    </label>
                    <input type="text" style={styles.input}/>
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>
                        <LuSmartphone style={{marginRight: '10px'}}/>
                        핸드폰 번호
                    </label>
                    <input type="text" style={styles.input}/>
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>
                        <MdEmail style={{marginRight: '10px'}}/>
                        이메일
                    </label>
                    <input type="text" style={styles.input}/>
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>
                        <FaAddressCard style={{marginRight: '10px'}}/>
                        운전면허
                    </label>
                    <input type="text" style={styles.input}/>
                </div>
            </div>
            <div style={styles.submitButtonContainer}>
                <button style={styles.submitButton}>수정하기</button>
            </div>
        </div>
    );
};

export default MyProfile;
