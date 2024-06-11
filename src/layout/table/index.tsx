import { Table, Button, Space, Modal } from 'antd';
import { TableProps } from 'antd';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useBrandStore from '../../store/brands/brands';
import useCategoryStore from '../../store/category/category';
import useProductStore from '../../store/products/product';
import useStockStore from '../../store/stock/stock';

interface GlobalTableProps<T> extends TableProps<T> {
  data: T[];
  columns: TableProps<T>['columns'];
  onEdit: (record: T) => void;
  title: 'brand' | 'category' | 'product' | 'stock';
}

const GlobalTable = <T extends object>({ data, columns, onEdit, title, ...rest }: GlobalTableProps<T>) => {
  const navigate = useNavigate();
  const { deleteBrand } = useBrandStore();
  const { deleteProduct } = useCategoryStore();
  const { deleteProducts } = useProductStore();
  const { deleteStock } = useStockStore();

  const handleViewDetails = (record: T) => {
    const id = (record as any).id; // Assumes each record has an `id` property
    if (title === 'brand') {
      navigate(`/home/posts/${id}`);
    } else if (title === 'category') {
      navigate(`/home/service/${id}`);
    } else if (title === 'product') {
      navigate(`/home/about/${id}`);
    }
  };

  // Add action column for edit, delete, and view details buttons
  const actionColumn = {
    title: 'Actions',
    key: 'actions',
    render: (text: string, record: T) => (
      <Space size="middle">
        <Button type="primary" onClick={() => onEdit(record)}>Edit</Button>
        <Button type="dashed" onClick={() => handleDelete(record)}>Delete</Button>
        <Button type="default" onClick={() => handleViewDetails(record)}>View details</Button>
      </Space>
    ),
  };

  // Merge the action column with the existing columns
  const updatedColumns = [...columns, actionColumn];

  const handleDelete = (record: T) => {
    Modal.confirm({
      title: `Are you sure you want to delete this ${title}?`,
      content: 'This action cannot be undone.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: () => deleteData(record),
    });
  };

  const deleteData = async (record: T) => {
    const id = (record as any).id; // Assumes each record has an `id` property
    if (!id) {
      toast.error('Error: No ID found for the record');
      return;
    }

    try {
      let status;
      if (title === 'brand') {
        status = await deleteBrand(id);
      } else if (title === 'category') {
        status = await deleteProduct(id);
      } else if (title === 'product') {
        status = await deleteProducts(id);
      } else if (title === 'stock') {
        status = await deleteStock(id);
      }

      if (status === 200) {
        toast.success(`${title.charAt(0).toUpperCase() + title.slice(1)} deleted successfully`);
        // Optionally, you can refresh the table data here
      } else {
        toast.error(`Error: Failed to delete ${title}`);
      }
    } catch (err: any) {
      toast.error('Error: ' + err?.message);
      console.log(err);
    }
  };

  return (
    <Table<T>
      dataSource={data}
      columns={updatedColumns}
      pagination={rest.pagination || { pageSize: 7 }}
      {...rest}
    />
  );
};

export default GlobalTable;
