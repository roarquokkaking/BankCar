import React from "react";
import { VscClose } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";

const RegisterHeader = ({text}) => {

    const headerNav = {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "390.4px",
        height: "48px",
        marginTop:"10px",
        marginBottom: "10px",
    };
    const navigate = useNavigate();
    return (
        <div>
            <header>
                <div style={headerNav}>
                    <h1
                        style={{
                            textAlign: "center",
                            font: "apple SD Gothic Neo",
                            fontSize: "24px",
                        }}
                    >
                        {text}
                    </h1>
                    <VscClose
                        style={{
                            width: "30px",
                            height: "30px",
                            marginRight: "10px",
                        }}
                        onClick={() => navigate(`/profile`)}
                    />
                </div>
                <Divider />
            </header>
        </div>
    );
};
// 구분선 컴포넌트
const Divider = () => {
    return (
        <hr
            style={{
                borderColor: "#fff", // 구분선 색상 설정
                borderWidth: 1, // 구분선 두께 설정
                margin: "0 20px", // 상하로 10px, 좌우로 0px 마진 설정
            }}
        />
    );
};

export default RegisterHeader;