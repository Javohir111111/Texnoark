import { useState } from 'react';
import { Modal, Form, Input, InputNumber, Button, Upload, Select, message } from 'antd';
import useProductStore from "../../../store/product-detail/product-detail";
import useCategoryStore from "../../../store/category/category";
import { PlusOutlined } from '@ant-design/icons';
import { Option } from 'antd/es/mentions';


interface AddCategoryModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

const AddProductDetailModal: React.FC<AddCategoryModalProps> = ({ open, setOpen }) => {
    const { getProductDetail, updateProductDetail, postProductDetail } = useProductStore(); // Assuming you have updateBrand method
    const { data } = useCategoryStore();
    const [visible, setVisible] = useState(false);
    // const [confirmLoading, setConfirmLoading] = useState(false);
    const [form] = Form.useForm();


    const showModal = () => {
        setVisible(true);
      };


    const handleOk = async () => {
        try {

            const values = await form.validateFields();
            // values.parent_category_id = +values.parent_category_id
            setVisible(true);
            const status = await postProductDetail(values);
            if (status === 201) {
                message.success('Category added successfully');
                const params = { page: 1, limit: 10, search: "" };
                form.resetFields();
                setOpen(false);
                getProductDetail(params); // Refresh the list of categories
            }
        } catch (error: any) {
            console.error('Validation Failed:', error);
            if (error.response?.status === 401) {
                message.error('Unauthorized. Please log in again.');
            } else {
                message.error('Failed to add category');
            }
        } finally {
            setVisible(false);
        }
    };

    const handleCancel = () => {
        setOpen(false);
    };

    return (
        <>
            <Button type="primary" onClick={showModal}>
                Create Product Detail
            </Button>
            <Modal
                visible={visible}
                title="Create New Product Detail"
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form
                    form={form}
                    layout="vertical"
                    name="form_in_modal"
                    initialValues={{
                        quantity: null,
                        description: '',
                        discount: null,
                        colors: '',
                        product_id: null,
                        files: []
                    }}
                >
                    <Form.Item
                        name="quantity"
                        label="Quantity"
                        rules={[{ required: true, message: 'Please input the quantity!' }]}
                    >
                        <InputNumber />
                    </Form.Item>
                    <Form.Item
                        name="description"
                        label="Description"
                        rules={[{ required: true, message: 'Please input the description!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="discount"
                        label="Discount"
                        rules={[{ required: true, message: 'Please input the discount!' }]}
                    >
                        <InputNumber />
                    </Form.Item>
                    <Form.Item
                        name="colors"
                        label="Colors"
                        rules={[{ required: true, message: 'Please input the colors!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Product ID"
                        name="product_id"
                        rules={[{ required: true, message: 'Please select the category ID' }]}
                    >
                        <Select placeholder="Select a category" className="w-full py-[25]">
                            {data?.map((item: any) => (
                                <Option className="w-full py-5 rounded-md px-1 " key={item.id} value={item.id}>
                                    {item.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="files"
                        label="Files"
                        valuePropName="fileList"
                        getValueFromEvent={e => Array.isArray(e) ? e : e && e.fileList}
                    >
                        <Upload action="/upload.do" listType="picture-card">
                            <div>
                                <PlusOutlined />
                                <div style={{ marginTop: 8 }}>Upload</div>
                            </div>
                        </Upload>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default AddProductDetailModal;
