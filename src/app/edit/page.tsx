import { redirect } from "next/navigation";
import { searchTodo } from "../db";
export default function EditTodo() {
  async function actionUpdateTodo(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    const action = formData.get("action");

    const todo = await searchTodo(id);
    redirect(`?todoText=${todo?.todoText}&mode=EDIT&action=${action}`);
  }

  return <>AAA</>;
}
