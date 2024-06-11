import { Modal, Form, Input, Upload, Button, message, Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import useProductStore from "../../../store/brands/brands";
import useCategoryStore from "../../../store/category/category";
import { useState } from 'react';

interface AddBrandModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

const { Option } = Select;

const AddBrandModal: React.FC<AddBrandModalProps> = ({ open, setOpen }:any) => {
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [form] = Form.useForm();

    const { getBrand, postBrand } = useProductStore();
    const { data } = useCategoryStore();

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            setConfirmLoading(true);

            if (values.file && values.file[0]) {
                const file = values.file[0].originFileObj;
                const formData = new FormData();
                const params = { page: 1, limit: 100, search: "" };
                formData.append('name', values.name);
                formData.append('description', values.description);
                formData.append('category_id', values.category_id);
                formData.append('file', file);

                try {
                    const status = await postBrand(formData);
                    if (status === 201) {
                        message.success('Brand added successfully');
                        form.resetFields();
                        setOpen(false);
                        getBrand(params); // Refresh the list of brands
                    }
                } catch (error) {
                    message.error('Failed to add brand');
                } finally {
                    setConfirmLoading(false);
                }
            } else {
                message.error('Please upload the brand image');
                setConfirmLoading(false);
            }
        } catch (error) {
            console.log('Validate Failed:', error);
            setConfirmLoading(false);
        }
    };

    const handleCancel = () => {
        setOpen(false);
    };

    return (
        <Modal
            title="Add Brand"
            open={open}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    label="Brand Name"
                    name="name"
                    rules={[{ required: true, message: 'Please enter the brand name' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Brand Description"
                    name="description"
                    rules={[{ required: true, message: 'Please enter the brand description' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Category ID"
                    name="category_id"
                    rules={[{ required: true, message: 'Please select the category ID' }]}
                >
                    <Select placeholder="Select a category" className="w-full py-[25]">
                        {data.map((item) => (
                            <Option className="w-full py-5 rounded-md px-1 " key={item.id} value={item.id}>
                                {item.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Image"
                    name="file"
                    valuePropName="fileList"
                    getValueFromEvent={(e) => {
                        if (Array.isArray(e)) {
                            return e;
                        }
                        return e && e.fileList;
                    }}
                    rules={[{ required: true, message: 'Please upload the brand image' }]}
                >
                    <Upload name="logo" listType="picture" beforeUpload={() => false}>
                        <Button icon={<UploadOutlined />}>Click to upload</Button>
                    </Upload>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddBrandModal;
