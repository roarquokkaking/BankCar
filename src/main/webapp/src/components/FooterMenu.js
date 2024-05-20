import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { FaRegHeart, FaRegUserCircle, FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";

const footerMenu = [
  { id: 1, text: "홈", icon: <FaHome size={18} />, path: "/" },
  {
    id: 2,
    text: "위시리스트",
    icon: <FaRegHeart size={18} />,
    path: "/wishList",
  },
  {
    id: 3,
    text: "로그인",
    icon: <FaRegUserCircle size={18} />,
    path: "/login",
  },
];

const FooterMenu = () => {
  const [pressed, setPressed] = useState(null); // 눌린 버튼의 id를 저장하는 상태
  return (
    <Box sx={{ display: "flex", justifyContent: "center", flexGrow: 1 }}>
      <Stack>
        {footerMenu.map((item) => {
          return (
            <Button
              key={item.id}
              component={Link}
              to={item.path}
              onTouchStart={() => setPressed(item.id)} // 모바일 터치 시작 시
              onTouchEnd={() => setPressed(null)} // 모바일 터치 끝날 때
              onMouseDown={() => setPressed(item.id)} // 마우스 클릭 시
              onMouseUp={() => setPressed(null)} // 마우스 클릭 끝날 때
              onMouseLeave={() => setPressed(null)} // 마우스가 버튼을 벗어날 때
            >
              <Stack
                sx={{
                  justifyContent: "center",
                  alignItems: "center",
                  margin: 1, // 버튼 간격 조정
                  borderBottom:
                    pressed === item.id ? "2px solid black" : "none", // 밑줄 효과
                }}
                direction="column"
                spacing={1}
              >
                {item.icon}
                <Typography> {item.text}</Typography>
              </Stack>
            </Button>
          );
        })}
      </Stack>
    </Box>
  );
};

export default FooterMenu;
