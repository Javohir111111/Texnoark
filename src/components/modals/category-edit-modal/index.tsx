import { useEffect, useState } from "react";
import { Modal, Form, Input, message } from "antd";
import useCategoryStore from "../../../store/category/category";
// import {getCookies, setCookies} from "../../utils"

interface UpdateCategoryModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  editData: any;
}

const UpdateCategoryModal: React.FC<UpdateCategoryModalProps> = ({ open, setOpen, editData }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();

  const { getProduct, updateProduct } = useCategoryStore();

  useEffect(() => {
    if (editData) {
      form.setFieldsValue(editData);
    }
  }, [editData, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      setConfirmLoading(true);
      const status = await updateProduct(values);
      console.log(status)
      if (status.status === 200) {
        const params = { page: 1, limit: 10, search: "" };
        message.success("Category updated successfully");
        form.resetFields();
        setOpen(false);
        getProduct(params); // Refresh the list of categories
      }
    } catch (error: any) {
      console.error("Validation Failed:", error);
      message.error("Failed to update category");
    } finally {
      setConfirmLoading(false);
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Modal
      title="Edit Category"
      open={open}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Category Name"
          name="name"
          rules={[{ required: true, message: "Please enter the category name" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateCategoryModal;
