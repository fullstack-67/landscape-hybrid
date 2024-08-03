import { revalidatePath } from "next/cache";
import { FC } from "react";
import { redirect } from "next/navigation";
import { createTodos, searchTodo, updateTodo } from "@/app/db";

interface Props {
  mode: "ADD" | "EDIT";
  message?: string;
  curId: string;
}

export const FormInput: FC<Props> = async ({ message, mode, curId }) => {
  async function actionCreateTodo(formData: FormData) {
    "use server";
    const todoText = formData.get("todoText") as string;
    try {
      await createTodos(todoText);
    } catch (err) {
      console.dir(err);
      redirect(`/?message=${err ?? "Unknown error"}&curId=&mode=ADD`);
    }
    redirect("/?message=&curId=&mode=ADD"); // No refresh.
    // revalidatePath("/")  // I need to change the URL (i.e. insert search params), therefore, I cannot use revalidatePath.
  }

  async function actionUpdateTodo(formData: FormData) {
    "use server";
    const todoTextUpdated = formData.get("todoText") as string;
    // No need for this since I already get curId from component prop. Very nice.
    // const curId = formData.get("curId") as string;
    try {
      await updateTodo(curId, todoTextUpdated);
    } catch (err) {
      redirect(`/?message=${err ?? "Unknown error"}&curId=${curId}&mode=EDIT`);
    }
    // revalidatePath("/");
    redirect("/"); // Need to redirect because I need to clear the URL.
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
        style={{
          gridTemplateColumns: mode === "ADD" ? "4fr 1fr" : "4fr 1fr 1fr",
          alignItems: "end",
        }}
      >
        <form action={actionForm} style={{ display: "contents" }}>
          <div>
            <input
              type="text"
              name="todoText"
              defaultValue={todoText}
              placeholder=""
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
