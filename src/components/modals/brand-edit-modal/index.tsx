import { useEffect, useState } from "react";
import { Modal, Form, Input, message, Select } from "antd";
import useProductStore from "../../../store/brands/brands";
import useCategoryStore from "../../../store/category/category";

interface UpdateBrandModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  editData: any; // Use appropriate type here, if available
}

const { Option } = Select;

const UpdateBrandModal: React.FC<UpdateBrandModalProps> = ({ open, setOpen, editData }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  console.log(form,"kjnkjnk")

  const { getBrand, updateBrand } = useProductStore(); // Assuming you have updateBrand method
  const { data } = useCategoryStore();

  useEffect(() => {
    if (editData) {
      form.setFieldsValue(editData);
    }
  }, [editData, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      setConfirmLoading(true);

      const payload = {
        name: values.name,
        description: values.description,
        categoryId: values.category_id // Renaming category_id to categoryId
      };

      const status = await updateBrand(payload);
      if (status.status === 200) {
        const params = { page: 1, limit: 10, search: "" };
        message.success("Brand updated successfully");
        form.resetFields();
        setOpen(false);
        getBrand(params); // Refresh the list of brands
      } else {
        message.error("Failed to update brand");
      }
    } catch (error) {
      console.error("Validation Failed:", error);
      message.error("Failed to update brand");
    } finally {
      setConfirmLoading(false);
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Modal
      title="Edit Brand"
      open={open}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Brand Name"
          name="name"
          rules={[{ required: true, message: "Please enter the brand name" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Brand Description"
          name="description"
          rules={[{ required: true, message: "Please enter the brand description" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Category"
          name="category_id"
          rules={[{ required: true, message: "Please select the category" }]}
        >
          <Select placeholder="Select a category" className="w-full py-[25]">
            {data.map((item) => (
              <Option className="w-full py-5 rounded-md px-1" key={item.id.toString()} value={item.id.toString()}>
                {item.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateBrandModal;
