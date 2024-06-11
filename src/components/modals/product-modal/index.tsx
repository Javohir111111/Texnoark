import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, message, Select } from 'antd';
import useProductStore from '../../../store/products/product';
import useCategoryStore from '../../../store/category/category';
import useBrandStore from '../../../store/brands/brands';
import useBrandCategoryStore from '../../../store/brand-category/brand-category';

interface AddProductModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

const { Option } = Select;

const AddProductModal: React.FC<AddProductModalProps> = ({ open, setOpen }: AddProductModalProps) => {
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [form] = Form.useForm();
    const { postProduct, getProduct } = useProductStore();
    const { data: dataCategory, getProduct: getDataCategory } = useCategoryStore();
    const { dataBrandsId: dataBrands, getCategoryId: getBrands } = useBrandStore();
    const { dataBrandCategoryById: dataBrandCategory, getCategoryBrandId: getBrandCategory } = useBrandCategoryStore();

    useEffect(() => {
        getDataCategory({ search: "" });
    }, [getDataCategory]);

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            setConfirmLoading(true);

            const productData = {
                name: values.name,
                price: parseFloat(values.price),
                category_id: values.category_id,
                brand_id: values.brand_id,
                brand_category_id: values.brand_category_id
            };

            try {
                const status = await postProduct(productData);
                if (status === 201) {
                    message.success('Product added successfully');
                    form.resetFields();
                    setOpen(false);
                    getProduct({ page: 1, limit: 10, search: "" }); // Refresh the list of products
                }
            } catch (error) {
                message.error('Failed to add product');
            } finally {
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
            title="Add Product"
            open={open}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    label="Product Name"
                    name="name"
                    rules={[{ required: true, message: 'Please enter the product name' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Price"
                    name="price"
                    rules={[
                        { required: true, message: 'Please enter the price' },
                        {
                            validator: (_, value) => {
                                if (!value || isNaN(Number(value))) {
                                    return Promise.reject(new Error('Price must be a number'));
                                }
                                return Promise.resolve();
                            }
                        }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Category"
                    name="category_id"
                    rules={[{ required: true, message: 'Please select a category' }]}
                >
                    <Select placeholder="Select a category" onChange={(value) => getBrands({ id: value, limit: 10, page: 1 })}>
                        {dataCategory?.map((item: any) => (
                            <Option key={item.id} value={item.id}>
                                {item.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Brand"
                    name="brand_id"
                    rules={[{ required: true, message: 'Please select a brand' }]}
                >
                    <Select placeholder="Select a brand" onChange={(value) => getBrandCategory({ id: value, limit: 10, page: 1 })}>
                        {dataBrands?.map((item: any) => (
                            <Option key={item.id} value={item.id}>
                                {item.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Brand Category"
                    name="brand_category_id"
                    rules={[{ required: true, message: 'Please select a brand category' }]}
                >
                    <Select placeholder="Select a brand category">
                        {dataBrandCategory?.map((item: any) => (
                            <Option key={item.id} value={item.id}>
                                {item.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddProductModal;
