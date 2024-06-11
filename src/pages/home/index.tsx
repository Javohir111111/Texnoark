import { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Input, Layout, Menu, theme } from 'antd';
import { Link, Outlet } from 'react-router-dom';

const { Header, Sider, Content } = Layout;
const { Search } = Input;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const onSearch = (value: string) => {
    console.log(value); // Implement search logic here
  };

  return (
    <Layout style={{ height: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: <Link to={"about"}>Products</Link>,
            },
            {
              key: '2',
              icon: <VideoCameraOutlined />,
              label: <Link to={"service"}>Category</Link>,
            },
            {
              key: '3',
              icon: <UploadOutlined />,
              label: <Link to={"posts"}>Brands</Link>,
            },
            {
              key: '4',
              icon: <UploadOutlined />,
              label: <Link to={"profile"}>Profile</Link>,
            },
            {
              key: '5',
              icon: <UploadOutlined />,
              label: <Link to={"stock"}>Stock</Link>,
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: '0 16px', background: colorBgContainer, display: 'flex', alignItems: 'center' }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          {/* <Search
            placeholder="Search..."
            onSearch={onSearch}
            style={{
              maxWidth: 400,
            }}
          /> */}
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 'calc(100vh - 112px)', // Adjusted for Header and margin
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
