import { useEffect, useState } from "react";
import { Button, Input } from "antd";
import { Table } from "@layout";
import useCategoryStore from "../../store/category/category";
import AddCategoryModal from "../../components/modals/category-modal"; // Update the path as necessary
import UpdateCategoryModal from "../../components/modals/category-edit-modal"; // Create this component
import "./style.scss";
import { useNavigate } from "react-router-dom";
import { setCookies } from "@utils";

const { Search } = Input;

const IndexPage: React.FC = () => {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const { data, getProduct } = useCategoryStore();
  const [editingRecord, setEditingRecord] = useState(null);

  const showAddModal = () => {
    setEditingRecord(null);
    setAddModalOpen(true);
  };

  const showEditModal = (record: any) => {
    setCookies("Id" , record.id)
    setEditingRecord(record);
    setEditModalOpen(true);
  };

  const [params, setParams] = useState({
    search: searchValue,
    page: 1,
    limit: 200,
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
    getProduct(params);
  }, [params, searchValue]);

  const headers = [
    { title: "S/N", dataIndex: "t/r", key: "t/r" },
    { title: "Category Name", dataIndex: "name", key: "name" },
  ];

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1>Category Page</h1>
        <Search
          placeholder="Search..."
          value={searchValue}
          onChange={(e:any) => handleSearch(e.target.value)}
          style={{ maxWidth: 400 }}
        />
        <Button type="primary" onClick={showAddModal}>
          Add Category
        </Button>
      </div>
      <AddCategoryModal open={addModalOpen} setOpen={setAddModalOpen} />
      <UpdateCategoryModal open={editModalOpen} setOpen={setEditModalOpen} editData={editingRecord} />
      <Table data={data} columns={headers} title={"category"} onView={showEditModal} onEdit={showEditModal} />
    </div>
  );
};

export default IndexPage;
