// import { revalidatePath } from "next/cache";
import { FC } from "react";
import { redirect } from "next/navigation";
import { createTodos, searchTodo } from "@/app/db";

export const FormInput: FC<{
  message: string;
  mode: "ADD" | "EDIT";
  curId?: string;
}> = async ({ message, mode, curId }) => {
  async function actionCeateTodo(formData: FormData) {
    "use server";
    const todoText = formData.get("todo-text") as string;
    try {
      await createTodos(todoText);
    } catch (err) {
      console.dir(err);
      redirect(`?message=${err ?? "Unknown error"}`);
    }
    // revalidatePath("/");
    redirect("/");
  }

  async function actionUpdateTodo(formData: FormData) {
    "use server";
    // const id = (formData.get("id") ?? "") as string;
  }

  let todoText = "";
  if (mode === "EDIT" && curId) {
    const todo = await searchTodo(curId);
    todoText = todo?.todoText ?? "";
  }

  const actionForm = mode === "ADD" ? actionCeateTodo : actionUpdateTodo;

  return (
    <form action={actionForm}>
      <fieldset>
        <label htmlFor="todo-text">Text</label>
        <input type="text" name="todo-text" defaultValue={todoText} />
      </fieldset>
      <button type="submit">{mode === "ADD" ? "Submit" : "Update"}</button>

      <i className="pico-color-red-300">{message}</i>
    </form>
  );
};
