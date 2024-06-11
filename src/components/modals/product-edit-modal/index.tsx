import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, message, Select } from 'antd';
import useProductStore from '../../../store/products/product';
import useCategoryStore from '../../../store/category/category';
import useBrandStore from '../../../store/brands/brands';
import useBrandCategoryStore from '../../../store/brand-category/brand-category';

interface EditProductModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  editData: any;
}

const { Option } = Select;

const EditProductModal: React.FC<EditProductModalProps> = ({ open, setOpen, editData }: EditProductModalProps) => {
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [form] = Form.useForm();
    const { updateProduct, getProduct } = useProductStore();
    const { data: dataCategory, getProduct: getDataCategory } = useCategoryStore();
    const { dataBrandsId: dataBrands, getCategoryId: getBrands } = useBrandStore();
    const { dataBrandCategoryById: dataBrandCategory, getCategoryBrandId: getBrandCategory } = useBrandCategoryStore();

    useEffect(() => {
        getDataCategory({ search: "" }).catch(error => {
            console.error('Error fetching categories:', error);
            message.error('Failed to load categories');
        });
    }, [getDataCategory]);

    useEffect(() => {
        if (editData) {
            form.setFieldsValue(editData);
            getBrands({ id: editData.category_id, limit: 10, page: 1 }).catch(error => {
                console.error('Error fetching brands:', error);
                message.error('Failed to load brands');
            });
            getBrandCategory({ id: editData.brand_id, limit: 10, page: 1 }).catch(error => {
                console.error('Error fetching brand categories:', error);
                message.error('Failed to load brand categories');
            });
        }
    }, [editData, form, getBrands, getBrandCategory]);

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            setConfirmLoading(true);

            const productData = {
                id: editData.id,
                name: values.name,
                price: parseFloat(values.price),
                category_id: values.category_id,
                brand_id: values.brand_id,
                brand_category_id: values.brand_category_id
            };

            const status = await updateProduct(productData);
            if (status === 200) {
                message.success('Product updated successfully');
                form.resetFields();
                setOpen(false);
                getProduct({ page: 1, limit: 10, search: "" }); // Refresh the list of products
            }
        } catch (error: any) {
            console.error('Validation Failed:', error);
            message.error('Failed to update product');
        } finally {
            setConfirmLoading(false);
        }
    };

    const handleCancel = () => {
        setOpen(false);
    };

    return (
        <Modal
            title="Edit Product"
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
                    <Select 
                        placeholder="Select a category" 
                        onChange={(value) => {
                            form.setFieldsValue({ brand_id: undefined, brand_category_id: undefined });
                            getBrands({ id: value, limit: 10, page: 1 }).catch(error => {
                                console.error('Error fetching brands:', error);
                                message.error('Failed to load brands');
                            });
                        }}
                    >
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
                    <Select 
                        placeholder="Select a brand" 
                        onChange={(value) => {
                            form.setFieldsValue({ brand_category_id: undefined });
                            getBrandCategory({ id: value, limit: 10, page: 1 }).catch(error => {
                                console.error('Error fetching brand categories:', error);
                                message.error('Failed to load brand categories');
                            });
                        }}
                    >
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

export default EditProductModal;
