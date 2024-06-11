import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Card } from 'antd';
import { ToastContainer, toast } from "react-toastify";
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { auth } from "../../service/auth"
import { setCookies } from "@utils"
import './style.scss';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  interface initialValues {
    phone_number: number;
    password: string;
  }
  const initialValues: initialValues = {
    phone_number: +998931607550,
    password: "erkinoff",
  };

  const handelSubmit = async (values: initialValues) => {
    try {
      const respons = await auth.signin(values);
      console.log(respons);
      if (respons.status === 201) {
        setCookies("token", respons.data.data.tokens.access_token);
        setCookies("refresh_token", respons?.data?.data?.tokens?.refresh_token);
        setCookies("admin_data", respons?.data?.data?.admin);
        setCookies("admin_id", respons?.data?.data?.data?.id);
        toast.success("successfully logged in");
        setTimeout(() => { navigate("/home"); }, 1000)

      }
    } catch (error: any) {
      toast.error("Error : " + error?.message);
      console.log(error);
    }
  }

  return (
    <div className="login-container">
      <Card title="Login" className="login-card">
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={handelSubmit}
        >
          <Form.Item
            name="phone_number"
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input
              prefix={<UserOutlined />}
              type="tel"
              placeholder="Telephone Number"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default LoginPage;
