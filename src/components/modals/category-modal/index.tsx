import { Modal, Form, Input, message } from "antd";
import useCategoryStore from "../../../store/category/category";
import { useState } from "react";

interface AddCategoryModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const AddCategoryModal: React.FC<AddCategoryModalProps> = ({ open, setOpen }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();

  const { getProduct, postProduct } = useCategoryStore();

  const handleOk = async () => {
    try {

      const values = await form.validateFields();
      // values.parent_category_id = +values.parent_category_id
      setConfirmLoading(true);
      const status = await postProduct(values);
      if (status === 201) {
        message.success('Category added successfully');
        const params = { page: 1, limit: 10, search: "" };
        form.resetFields();
        setOpen(false);
        getProduct(params); // Refresh the list of categories
      }
    } catch (error: any) {
      console.error('Validation Failed:', error);
      if (error.response?.status === 401) {
        message.error('Unauthorized. Please log in again.');
      } else {
        message.error('Failed to add category');
      }
    } finally {
      setConfirmLoading(false);
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Modal
      title="Add Category"
      open={open}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Category Name"
          name="name"
          rules={[{ required: true, message: 'Please enter the category name' }]}
        >
          <Input />
        </Form.Item>
        {/* <Form.Item
          label="Parent Category ID"
          name="parent_category_id" 
          rules={[{ required: true, message: 'Please enter the position' }]}
        >
          <Input type="number" />
        </Form.Item> */}
      </Form>
    </Modal>
  );
};

export default AddCategoryModal;

// const file = e.target.file[0]
// const FormData = new FormData()
// Formdata.append('file', file)

