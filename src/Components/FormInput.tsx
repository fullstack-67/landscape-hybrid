// import { revalidatePath } from "next/cache";
import { FC } from "react";
import { redirect } from "next/navigation";
import { createTodos, searchTodo, updateTodo } from "@/app/db";

export const FormInput: FC<{
  mode: "ADD" | "EDIT";
  message?: string;
  curId?: string;
}> = async ({ message, mode, curId }) => {
  async function actionCreateTodo(formData: FormData) {
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

    const curId = formData.get("curId") as string;
    const todoTextUpdated = formData.get("todo-text") as string;

    try {
      await updateTodo(curId, todoTextUpdated);
    } catch (err) {
      redirect(`/edit/?message=${err ?? "Unknown error"}&curId=${curId}`);
    }

    redirect("/");
  }

  let todoText = "";
  if (mode === "EDIT" && curId) {
    const todo = await searchTodo(curId);
    todoText = todo?.todoText ?? "";
  }

  const actionForm = mode === "ADD" ? actionCreateTodo : actionUpdateTodo;

  return (
    <>
      <div
        className="grid"
        style={{ gridTemplateColumns: "3fr 1fr 1fr", alignItems: "end" }}
      >
        <form action={actionForm} style={{ display: "contents" }}>
          <div>
            <input
              type="text"
              name="todo-text"
              defaultValue={todoText}
              placeholder="Todo Text"
            />
          </div>
          <input type="hidden" name="curId" value={curId ?? ""} />
          <button type="submit">{mode === "ADD" ? "Submit" : "Update"}</button>
        </form>
        {mode === "EDIT" && (
          <form action="/" style={{ display: "contents" }}>
            <button type="submit" className="contrast">
              Cancel
            </button>
          </form>
        )}
      </div>

      {<i className="pico-color-red-300">{message ?? ""}</i>}
    </>
  );
};
