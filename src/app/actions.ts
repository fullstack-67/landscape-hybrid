"use server";

import { createTodos, getTodos, searchTodo, updateTodo } from "@/app/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function actionCreateTodo(formData: FormData) {
  const todoText = formData.get("todoText") as string;
  try {
    await createTodos(todoText);
  } catch (err) {
    console.dir(err);
    redirect(`?message=${err ?? "Unknown error"}`);
  }
  const todos = await getTodos();
  console.log({ todoText, todos });
  return { success: true };
  //   redirect(`/`);
  //   revalidatePath("/"); // I should revalidate here.  No need to refresh
}

export async function actionUpdateTodo(curId: string, formData: FormData) {
  const todoTextUpdated = formData.get("todoText") as string;
  try {
    await updateTodo(curId, todoTextUpdated);
  } catch (err) {
    redirect(`/?message=${err ?? "Unknown error"}&curId=${curId}&mode=EDIT`);
  }
  // revalidatePath("/");
  redirect("/"); // Need to redirect because I need to clear the URL.
}

export async function actionGetCurTodo(curId: string) {
  if (!curId) return null;
  const todo = await searchTodo(curId);
  return todo ?? null;
}
