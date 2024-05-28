import React from 'react';
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { LuSmartphone } from "react-icons/lu";
import { MdEmail } from "react-icons/md";
import { FaAddressCard } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { GoArrowLeft } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';

const MyProfile = () => {
    const navigate = useNavigate();
    const styles = {
        header: {
            marginTop: '2%',
            marginBottom: '10px',
            width: '390.4px',
            height: '40px',    
        },
        button: {
            textAlign: 'center',
            width: 140,
            height: 140,
            padding: '10px 15px',
            border: 'none',
            color: '#007BFF',
            cursor: 'pointer',
            borderRadius: '50%',
            right: 50,
            marginTop:15,
        },
        icon: {
            fontSize: '90px', 
            color: 'gray', 
        },
        formGroup: {
            marginTop: '12%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
        },
        label: {
            display: 'block',
            marginBottom: '-5px',
            fontWeight: 'bold',
        },
        input: {
            width: '330px',
            padding: '8px',
            border: 'none',
            borderBottom: '1px solid #ccc',
            borderRadius: '4px',
            boxSizing: 'border-box',
            marginBottom: '20px',
        },
        title: {
            color: '#333',
            font: "apple SD Gothic Neo",
            fontSize: "20px",
            marginTop: "4%",
        },
        formContainer: {
            paddingTop: '9px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            marginLeft: '30px', 
            position: 'relative',
        },
        submitButtonContainer: {
            marginTop: '10px',
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            position: 'absolute',
            bottom: -50,
            left: -10,
        },
        submitButton: {
            backgroundColor: '#3399d9',
            color: '#fff',
            borderRadius: '5px',
            width: '150px',
            height: '40px',
            fontSize: '16px',
            border: 'none',
            fontWeight: 'bold',
        },  
        buttonDiv: {
            textAlign: 'center',
        },
    };
    return (
        <div>
            <div style={styles.header}>
              <GoArrowLeft
                style={{
                  width: "30px",
                  height: "30px",
                  marginTop: "2%",
                  marginLeft: "3%",
                }}
                onClick={() => navigate(-1)}
              />
              </div>
            <h1 style={styles.title}></h1>
            <div style={styles.buttonDiv}>
                <button style={styles.button}
                ><CgProfile style={styles.icon}/></button>
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
                        면허증
                    </label>
                    <input type="text" style={styles.input}/>
                </div>
                <div style={styles.submitButtonContainer}>
                <button style={styles.submitButton}>수정하기</button>
            </div>
        </div>  
    </div>
    
    );
};

export default MyProfile;
