import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { FaRegHeart, FaRegUserCircle, FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import { red } from "@mui/material/colors";

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
  {
    id: 4,
    text: "프로필",
    icon: <FaRegUserCircle size={18} />,
    path: "/profile",
  },
];

const FooterMenu = () => {
  const [pressed, setPressed] = useState(null); // 눌린 버튼의 id를 저장하는 상태
  const [selected, setSelected] = useState(1);
  return (
    <Box sx={{ display: "flex", justifyContent: "center", flexGrow: 1 }}>
      <Stack>
        {footerMenu.map((item) => {
          return (
            <Button
              key={item.id}
              component={Link}
              to={item.path}
              onClick={() => setSelected(item.id)}
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
                  color: selected === item.id ? "red" : "black",
                  textShadow:
                    pressed === item.id
                      ? "2px 2px 5px rgba(0, 0, 0, 0.3)"
                      : "none", // 조건부 textShadow 적용
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
