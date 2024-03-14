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
    await db.item.delete({
      where: {
        id: itemId,
      }
    });
    return redirect("/inventory")
  };
export default function DeleteItemPage(){
    const data = useLoaderData()
    return <div>
        <h3>Are you sure you want to delete this item?</h3>
        <Form method="delete">
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

        <div className="flex justify-between items-center w-full">
          <button type="submit">Delete</button>
          <Link to={'/inventory'}><button type="reset">Cancel</button></Link>
        </div>
      </Form>
    </div>
}