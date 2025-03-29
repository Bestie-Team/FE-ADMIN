import { Button, Card, Input } from "antd";
import { useState } from "react";
import { login } from "../remote/auth";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const loginHandler = async () => {
    try {
      const loggedIn = await login({ username: id, password: password });
      if (loggedIn) {
        navigate("/main");
      }
    } catch (e) {
      console.log(e);
      alert("로그인 실패");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-dvh w-full bg-gray-50 p-4">
      <Card
        style={{
          textAlign: "left",
          minWidth: "300px",
        }}
      >
        <div className="text-2xl mb-1 font-semibold">로그인</div>
        <p>아이디와 비밀번호를 입력하세요</p>
        <div className="mb-4">
          <div className="mb-2">아이디</div>
          <Input value={id} onChange={(e) => setId(e.target.value)} />
        </div>
        <div className="mb-4">
          <div className="mb-2">비밀번호</div>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button
          onClick={loginHandler}
          style={{
            width: "100%",
            backgroundColor: "black",
            color: "white",
            height: "40px",
            fontSize: "16px",
          }}
        >
          로그인
        </Button>
      </Card>
    </div>
  );
}
