import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Watermark, Input } from "antd";
import { Table } from "@layout"; // Update the import path for your Table component
import { setCookies } from "@utils";
import UpdateBrandModal from "../../components/modals/brand-edit-modal"; // Create this component
import useProductStore from "../../store/brands/brands";
import AddBrandModal from "../../components/modals/brand-modal"; // Update the path as necessary
import "./style.scss";
import useCategoryStore from "../../store/category/category";

const { Search } = Input;

const IndexPage: React.FC = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { data, getBrand } = useProductStore();
  const { getProduct } = useCategoryStore();
  const [searchValue, setSearchValue] = useState("");
  const [editingRecord, setEditingRecord] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);

  
  const showModal = () => {
    setOpen(true);
  };

  const showEditModal = (record: any) => {
    setCookies("Id" , record.id)
    setEditingRecord(record);
    setEditModalOpen(true);
  };

  const [params, setParams] = useState({
    search: "",
    page: 1,
    limit: 7,
  });

  const handleSearch = (value: string) => {
    setSearchValue(value);
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("search", value);
    navigate(`?${searchParams}`);
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const search = searchParams.get("search") || "";
    setSearchValue(search);
    setParams((prevParams) => ({ ...prevParams, search }));
  }, [location.search]);

  useEffect(() => {
    getBrand(params), getProduct(params);
  }, [params]);

  useEffect(() => {
    setParams((prevParams) => ({ ...prevParams, search: searchValue }));
  }, [searchValue]);

  const headers = [
    { title: "S/N", dataIndex: "t/r", key: "t/r" },
    { title: "Brand Name", dataIndex: "name", key: "name" },
    { title: "Description", dataIndex: "description", key: "description" },
  ];

  return (
    <div>
      <Watermark content={['Javohir Erkinov', 'Happy Working']}>
        <div className="flex items-center justify-between">
          <h1>Brand Page</h1>
          <Search
            placeholder="Search..."
            value={searchValue}
            onChange={(e:any) => handleSearch(e.target.value)}
            style={{
              maxWidth: 400,
            }}
          />
          <Button type="primary" onClick={showModal}>
            Add Brand
          </Button>
        </div>
        <AddBrandModal open={open} setOpen={setOpen} />
        <UpdateBrandModal open={editModalOpen} setOpen={setEditModalOpen} editData={editingRecord} />
        <Table data={data} columns={headers} title={"brand"} onEdit={showEditModal}/>
      </Watermark>
    </div>
  );
};

export default IndexPage;
