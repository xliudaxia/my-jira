import { useAuth } from "context/auth-context";
import React, { FormEvent } from "react";
import { Button, Form, Input } from "antd";
import { LongButton } from "./index";

export const LoginScreen = () => {
  const { login, user } = useAuth();
  const handleSumbmit = (values: { username: string; password: string }) => {
    login(values);
  };
  return (
    <Form action="" onFinish={handleSumbmit}>
      {/* {user ? (
        <div>
          登录成功，用户名{user?.name} token:{user?.token}
        </div>
      ) : null} */}
      <Form.Item
        name={"username"}
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input placeholder="用户名" type="text" id={"username"} />
      </Form.Item>
      <Form.Item
        name={"password"}
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input placeholder="密码" type="password" id={"password"} />
      </Form.Item>
      <Form.Item>
        <LongButton htmlType={"submit"} type={"primary"}>
          登录
        </LongButton>
      </Form.Item>
    </Form>
  );
};
