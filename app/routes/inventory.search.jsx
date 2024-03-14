import { Form, Link, useActionData } from "@remix-run/react";
import { List } from "antd";
import { db } from "../service/db";

export const action = async ({ request }) => {
  const form = await request.formData();
  const search = form.get("search");
  const result = await db.item.findMany({
    where: {
      OR: [
        { company: search },
        { category: search },
        { brand: search },
        { group: search },
        { quantity: search },
        { description: search },
      ],
    },
  });
  return result;
};

export default function SearchingItem() {
  const result = useActionData();
  return (
    <div>
      <Form method="POST">
        <input type="text" name="search" required="" />
        <button type="submit">Search</button>
      </Form>
      <div>
        <List
          itemLayout="horizontal"
          dataSource={result}
          renderItem={(item) => (
            <List.Item
              className="bg-white border rounded-md text-pretty font-semibold px-4 py-6 my-2"
              actions={[
                <Link
                  key={`editing-option-${item.id}`}
                  to={`/inventory/${item.id}`}
                >
                  <button key="list-loadmore-edit">edit</button>
                </Link>,
                <Link
                  key={`deleting-option-${item.id}`}
                  to={`/inventory/delete/${item.id}`}
                >
                  <button key="list-loadmore-more">delete</button>
                </Link>,
              ]}
            >
              <List.Item.Meta
                title={
                  <p className="w-full text-pretty font-semibold px-4 py-6 my-2">
                    {item.category}
                  </p>
                }
                description={
                  <span className="w-full text-pretty font-semibold px-4 py-6 my-2">
                    {item.group}
                  </span>
                }
              />
              <div>{item.quantity}</div>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
}
