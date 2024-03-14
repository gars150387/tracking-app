import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { Table } from "antd";
import { db } from "../service/db.js";

export const loader = async () => {
  const data = await db.item.findMany();
  const result = new Set();
  for (let item of data) {
    result.add({
      key: item.id,
      ...item,
    });
  }
  return Array.from(result);
};

export const action = async ({ request }) => {
  const form = await request.formData();
  const brand = form.get("brand");
  const category = form.get("category");
  const group = form.get("group");
  const quantity = form.get("quantity");
  const description = form.get("description");
  await db.item.create({
    data: { brand, category, group, quantity, description },
  });
};
export default function Inventory() {
  const items = useLoaderData();
  async function handleDeleteItem({ props }) {
    return await db.item.delete({ where: { id: props.id } });
  }
  const columns = [
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Group",
      dataIndex: "group",
    },
    {
      title: "Brand",
      dataIndex: "brand",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Qty",
      dataIndex: "quantity",
    },
    {
      title: "",
      dataIndex: "",
      render: (record) => (
        <>
          <Link key={`edit-${record.id}`} to={`/inventory/${record.id}`}>
            <button>Edit</button>
          </Link>
          <Link key={`edit-${record.id}`} to={`/inventory/delete/${record.id}`}>
            <button onClick={() => handleDeleteItem(record)}>Delete</button>
          </Link>
        </>
      ),
    },
  ];
  return (
    <div className="flex flex-col justify-between items-center w-full self-start">
      <h3>Inventory</h3>
      <Link to={"/inventory/search"}>
        <button>Search</button>
      </Link>
      <Link to={"/inventory/new"}>
        <button>New item</button>
      </Link>
      <div className="flex justify-between items-center w-[65vw] h-screen">
        <div className="flex justify-start items-center self-start w-full h-auto">
          <Table
            columns={columns}
            dataSource={items}
            pagination={{
              position: "bottomCenter",
            }}
          />
        </div>

        <div className="flex justify-end items-center w-full self-start px-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
