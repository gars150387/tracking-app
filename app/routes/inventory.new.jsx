import { Form, Link } from "@remix-run/react";
import { db } from "../service/db.js";

export const action = async ({ request }) => {
  const form = await request.formData();
  const brand = form.get("brand");
  const category = form.get("category");
  const company = form.get("company");
  const group = form.get("group");
  const quantity = form.get("quantity");
  const description = form.get("description");
  return await db.item.create({
    data: { brand, category, company, group, quantity, description },
  });
};
export default function InventoryNewItem() {
  return (
    <Form method="POST">
      <div>
        <label>
          Brand
          <input type="text" name="brand" />
        </label>
      </div>
      <div>
        <label>
          Company
          <input
            readOnly
            defaultValue={"Yennyceth"}
            type="text"
            name="company"
          />
        </label>
      </div>
      <div>
        <label>
          Category
          <input type="text" name="category" />
        </label>
      </div>

      <div>
        <label>
          Groups
          <input type="text" name="group" required="" />
        </label>
      </div>
      <div>
        <label>
          Quantity
          <input type="number" name="quantity" required="" />
        </label>
      </div>
      <div>
        <label>
          Description
          <textarea name="description" rows="6"></textarea>
        </label>
      </div>
      <div className="flex justify-between items-center w-full">
        <button type="submit">Save</button>
        <Link to={"/inventory"}>
          <button type="reset">Reset</button>
        </Link>
      </div>
    </Form>
  );
}
