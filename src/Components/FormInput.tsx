// import { revalidatePath } from "next/cache";
import { FC } from "react";
import { redirect } from "next/navigation";
import { createTodos } from "@/app/db";

export const FormInput: FC<{ message: string }> = ({ message }) => {
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

  return (
    <form action={actionCeateTodo}>
      <fieldset>
        <label htmlFor="todo-text">Text</label>
        <input type="text" name="todo-text" />
      </fieldset>
      <button type="submit">Submit</button>
      <i className="pico-color-red-300">{message}</i>
    </form>
  );
};
