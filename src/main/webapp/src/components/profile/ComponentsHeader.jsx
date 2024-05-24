import React from "react";
import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from "react-router-dom";

const ComponentHeader = ({text}) => {
  const navigate = useNavigate();
  return (
    <div>
      <header>
        <div className="headernav">
          <GoArrowLeft
            style={{
              width: "30px",
              height: "30px",
              marginTop: "4%",
              marginLeft: "20px",
            }}
            onClick={() => navigate(-1)}
          />
          <h1
            style={{
              textAlign: "center",
              font: "apple SD Gothic Neo",
              fontSize: "18px",
              marginTop: "-9%",
            }}
          >
            {text}
          </h1>
        </div>
      </header>
    </div>
  );
};

export default ComponentHeader;
