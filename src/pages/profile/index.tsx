import React, { useEffect, useState } from "react";
// import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Modal, Button, Descriptions, Divider, Avatar, Drawer, Row, Col } from "antd";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { auth } from "../../service/auth";
import { getCookies } from "@utils";
// import { removeCookiesAll } from "@coocse";

const { confirm } = Modal;

const AdminProfile: React.FC = () => {
    const navigate = useNavigate();
    const [adminData, setAdminData] = useState<any>({});
    const [drawerVisible, setDrawerVisible] = useState(false);
    const adminId = Number(getCookies("admin_id"));

    const getAdminData = async (id: number) => {
        try {
            const response = await auth.getAdminId(id);
            if (response.status === 200) {
                setAdminData(response.data.data);
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getAdminData(adminId);
    }, [adminId]);

    const addAccount = () => {
        // removeCookiesAll(["access_token", "refresh_token", "admin_id", "admin_data"]);
        navigate("/");
    };

    const showConfirm = () => {
        confirm({
            title: 'Do you want to add a new account?',
            icon: <ExclamationCircleOutlined />,
            onOk() {
                addAccount();
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    const toggleDrawer = () => {
        setDrawerVisible(!drawerVisible);
    };

    return (
        <>
            {/* <ToastContainer /> */}
            <div style={{ padding: '20px', backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
                <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
                    <Col xs={24} sm={24} md={18} lg={12} xl={10}>
                        <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)' }}>
                            <Row justify="center" style={{ marginBottom: '20px' }}>
                                <Avatar size={128} src="https://t4.ftcdn.net/jpg/03/59/09/01/360_F_359090172_vsL1da5fNVENKKMoQTq7NSwPPrllQcRB.jpg" />
                            </Row>
                            <Descriptions title="Admin Info" bordered>
                                <Descriptions.Item label="First Name" span={3}>{adminData?.first_name}</Descriptions.Item>
                                <Descriptions.Item label="Last Name" span={3}>{adminData?.last_name}</Descriptions.Item>
                                <Descriptions.Item label="Phone Number" span={3}>{adminData?.phone_number}</Descriptions.Item>
                                <Descriptions.Item label="Email" span={3}>{adminData?.email}</Descriptions.Item>
                                <Descriptions.Item label="Created At" span={3}>{adminData?.createdAt ? adminData?.createdAt.slice(0, 10) : ""}</Descriptions.Item>
                                <Descriptions.Item label="Updated At" span={3}>{adminData?.lastUpdateAt ? adminData?.lastUpdateAt.slice(0, 10) : ""}</Descriptions.Item>
                            </Descriptions>
                            <Divider />
                            <Row justify="center" gutter={16}>
                                <Col>
                                    <Button type="primary" onClick={toggleDrawer}>
                                        Edit
                                    </Button>
                                </Col>
                                {/* <Col>
                                    <ModalDeleteAccount id={adminId} />
                                </Col> */}
                                <Col>
                                    <Button type="primary" danger onClick={showConfirm}>
                                        + Add Account
                                    </Button>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </div>
            <Drawer
                title="Edit Admin"
                placement="right"
                onClose={toggleDrawer}
                visible={drawerVisible}
                width={400}
            >
                {/* Add form for editing admin data here */}
            </Drawer>
        </>
    );
};

export default AdminProfile;
