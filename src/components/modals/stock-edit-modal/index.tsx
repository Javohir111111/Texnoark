import React, { useState, useEffect } from 'react';
import { Modal, Form, message, Select, Button, InputNumber } from 'antd';
import useStackStore from '../../../store/stock/stock';
import useCategoryStore from '../../../store/category/category';
import useBrandStore from '../../../store/brands/brands';
import useProductStore from '../../../store/products/product';

interface EditProductModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    editData: any; // Add this prop to pass existing product data
}

const { Option } = Select;

const EditProductModal: React.FC<EditProductModalProps> = ({ open, setOpen, editData }: EditProductModalProps) => {
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [form] = Form.useForm();
    const { updateStock, getStock } = useStackStore(); // Assuming updateStock is the function to update the stock
    const { data: dataCategory, getProduct: getDataCategory } = useCategoryStore();
    const { dataBrandsId: dataBrands, getCategoryId: getBrands } = useBrandStore();
    const { getProduct: getProducts, dataProduct, getBrandProduct } = useProductStore();

    useEffect(() => {
        getDataCategory({ search: "", limit: 1000, page: 1 });
        getProducts({ search: "", limit: 1000, page: 1 });

        if (editData) {
            form.setFieldsValue({
                category_id: editData.category_id,
                brand_id: editData.brand_id,
                product_id: editData.product_id,
                quantity: editData.quantity
            });

            getBrands({ id: editData.id, limit: 10, page: 1 });
            getBrandProduct(editData.brand_id);
        }
    }, [getDataCategory, getProducts, editData, form, getBrands, getBrandProduct]);

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            setConfirmLoading(true);

            const updatedProductData = {
                id: editData.id, // Assuming editData contains an id field
                putData: {
                    category_id: values.category_id,
                    brand_id: values.brand_id,
                    product_id: values.product_id,
                    quantity: values.quantity
                }
            };

            try {
                const status = await updateStock(updatedProductData);
                if (status === 200) {
                    message.success('Product updated successfully');
                    form.resetFields();
                    setOpen(false);
                    getStock({ page: 1, limit: 10, search: "" }); // Refresh the list of products
                } else {
                    message.error('Failed to update product');
                }
            } catch (error) {
                message.error('Failed to update product');
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
            title="Edit Product"
            visible={open}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            footer={[
                <Button key="back" onClick={handleCancel}>
                    Cancel
                </Button>,
                <Button key="submit" type="primary" loading={confirmLoading} onClick={handleOk}>
                    Update
                </Button>,
            ]}
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    label="Quantity"
                    name="quantity"
                    rules={[
                        { required: true, message: 'Please enter the quantity' },
                        {
                            validator: (_, value) => {
                                if (!value || isNaN(Number(value))) {
                                    return Promise.reject(new Error('Quantity must be a number'));
                                }
                                return Promise.resolve();
                            }
                        }
                    ]}
                >
                    <InputNumber min={0} style={{ width: '100%' }} />
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
                    <Select placeholder="Select a brand" onChange={(value) => getBrandProduct(value)}>
                        {dataBrands?.map((item: any) => (
                            <Option key={item.id} value={item.id}>
                                {item.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Product"
                    name="product_id"
                    rules={[{ required: true, message: 'Please select a product' }]}
                >
                    <Select placeholder="Select a product">
                        {dataProduct?.map((item: any) => (
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

export default EditProductModal;
