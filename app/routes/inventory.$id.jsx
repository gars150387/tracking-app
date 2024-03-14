import { Form, Link, redirect, useLoaderData } from "@remix-run/react";
import { db } from "../service/db";

export const loader = async ({ params }) => {
  const itemSelected = await db.item.findUnique({
    where: params,
  });
  return itemSelected;
};

export const action = async ({ request }) => {
  const form = await request.formData();
  const itemId = form.get("id");
  const brand = form.get("brand");
  const category = form.get("category");
  const group = form.get("group");
  const quantity = form.get("quantity");
  const description = form.get("description");
  await db.item.update({
    where: {
      id: itemId,
    },
    data: { brand, category, group, quantity, description },
  });
  return redirect("/inventory")
};
export default function ItemId() {
  const data = useLoaderData();
  return (
    <div>
      <Form method="PATCH">
        <div>
          <label>
            Item id
            <input readOnly value={data.id} type="text" name="id" />
          </label>
        </div>
        <div>
          <label>
            Brand
            <input defaultValue={data.brand} type="text" name="brand" />
          </label>
        </div>

        <div>
          <label>
            Category
            <input defaultValue={data.category} type="text" name="category" />
          </label>
        </div>

        <div>
          <label>
            Groups
            <input
              defaultValue={data.group}
              type="text"
              name="group"
              required=""
            />
          </label>
        </div>
        <div>
          <label>
            Quantity
            <input
              defaultValue={data.quantity}
              type="number"
              name="quantity"
              required=""
            />
          </label>
        </div>
        <div>
          <label>
            Description
            <textarea
              defaultValue={data.description}
              name="description"
              rows="6"
            ></textarea>
          </label>
        </div>
        <div className="flex justify-between items-center w-full">
          <button type="submit">Update</button>
          <Link to={'/inventory'}><button type="reset">Cancel</button></Link>
        </div>
      </Form>
    </div>
  );
}
