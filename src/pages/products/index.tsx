import { useEffect, useState } from "react";
import { Table } from "@layout";
import useProductStore from "../../store/products/product";
import "./style.scss"
import { setCookies } from "@utils";
import UpdateProductModal from "../../components/modals/product-edit-modal";
import AddProductModal from "../../components/modals/product-modal";
import { Button } from "antd";

const index = () => {
  const { data, getProduct } = useProductStore()
  console.log(data)
  const [editingRecord, setEditingRecord] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [parmas, setPamrams] = useState({
    page: 1,
    limit: 10,
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
    getProduct(parmas)
  }, [])
  const theder = [
    { title: "S/N", value: "t/r" },
    { title: "Product Name", dataIndex: "name", key: "name" },
    // { title: "color", dataIndex: "name", key: "name" },
    // { title: "Size", value: "size" },
    { title: "Count", dataIndex: "price", key: "price" },
    // { title: "Cost", value: "cost" },
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
      <Table data={data} columns={theder} onEdit={showEditModal} title="product" />
    </div>
  );
};

export default index;