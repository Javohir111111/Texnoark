import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Card } from 'antd';
import { ToastContainer, toast } from "react-toastify";
import { UserOutlined, LockOutlined, PhoneOutlined, MailOutlined } from '@ant-design/icons';
import { auth } from "../../service/auth";
import { setCookies } from "../../utils";
import './style.scss';

const RegisterPage= () => {
  const navigate = useNavigate();

  interface InitialValues {
    first_name: string;
    last_name: string;
    phone_number: string;
    email: string;
    password: string;
  }

  const initialValues: InitialValues = {
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
    password: "",
  };

  const handleSubmit = async (values: InitialValues) => {
    try {
      const response = await auth.signup(values);
      console.log(response);
      if (response.status === 201) {
        // setCookies("token", response.data.access_token);
        // toast.success("Successfully registered");
        setTimeout(() => { navigate("/signin"); }, 1000);
      }
    } catch (error: any) {
      toast.error("Error: " + error?.message);
      console.log(error);
    }
  }

  return (
    <div className="register-container">
      <Card title="Register" className="register-card">
        <Form
          name="register"
          initialValues={initialValues}
          onFinish={handleSubmit}
        >
          <Form.Item
            name="first_name"
            rules={[{ required: true, message: 'Please input your First Name!' }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="First Name"
            />
          </Form.Item>
          <Form.Item
            name="last_name"
            rules={[{ required: true, message: 'Please input your Last Name!' }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Last Name"
            />
          </Form.Item>
          <Form.Item
            name="phone_number"
            rules={[{ required: true, message: 'Please input your Phone Number!' }]}
          >
            <Input
              prefix={<PhoneOutlined />}
              placeholder="Phone Number"
            />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please input your Email!' }]}
          >
            <Input
              prefix={<MailOutlined />}
              type="email"
              placeholder="Email"
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
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="register-form-button">
              Register
            </Button>
          </Form.Item>
        </Form>
      </Card>
      {/* <ToastContainer /> */}
    </div>
  );
};

export default RegisterPage;
