import { useEffect, useState } from "react";
import { Table } from "@layout";
import useSubCategoryStore from "../../../store/sub-category/sub-category";
// import "./style.scss"
import { setCookies } from "@utils";
import UpdateProductModal from "../../../components/modals/product-edit-modal";
import AddProductModal from "../../../components/modals/product-modal";
import { Button } from "antd";
import { useParams } from "react-router-dom";

const index = () => {
    const { id } = useParams();
    const subCatigoryId = Number(id);
  const { dataSubCatigory, getDataSubCategory } = useSubCategoryStore()
//   console.log(data)
  const [editingRecord, setEditingRecord] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [parmas, setPamrams] = useState({
    id: subCatigoryId,
    page: 1,
    limit: 7,
    search: ''
  });


  const showEditModal = (record: any) => {
    setCookies("Id", record.id)
    setEditingRecord(record);
    setEditModalOpen(true);
  };

  const showModal = () => {
    setOpen(true);
  };


  useEffect(() => {
    getDataSubCategory(parmas)
  }, [])
  const theder = [
    { title: "S/N", value: "t/r" },
    { title: "Subcategory", dataIndex: "name", key: "name" },
    // { title: "color", dataIndex: "name", key: "name" },
    // { title: "Size", value: "size" },
    { title: "Parent ID", dataIndex: "parent_category_id", key: "parent_category_id" },
    // { title: "Discount", dataIndex: "discount", key: "description" },
    // { title: "Quantity", dataIndex: "quantity", key: "quantity" },
    // { title: "Action", value: "action3" },
  ];


  return (
    <div>
      <div className="flex items-center justify-between">
      <h1>Products page</h1>
      <Button type="primary" onClick={showModal}>
        Add Brand
      </Button>
      </div>
      <AddProductModal open={open} setOpen={setOpen} />
      <UpdateProductModal open={editModalOpen} setOpen={setEditModalOpen} editData={editingRecord} />
      <Table data={dataSubCatigory} columns={theder} onEdit={showEditModal} title="product" />
    </div>
  );
};

export default index;