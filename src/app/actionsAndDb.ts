"use server";
// import { createTodos, getTodos, searchTodo, updateTodo } from "@/app/db";
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
  revalidatePath("/"); // I should revalidate here.  No need to refresh
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

// DB Functionality

let todos = [
  {
    id: genId(),
    todoText: "My First Todo",
  },
];

function genId() {
  return new Date().getTime().toString().slice(-6);
}

export async function getTodos() {
  return todos;
}

export async function createTodos(todoText: string) {
  if (!todoText) return Promise.reject("Empty Text");
  todos.push({
    id: genId(),
    todoText: todoText,
  });
}

export async function deleteTodo(id: string) {
  todos = todos.filter((el) => el.id !== id);
}

export async function searchTodo(id: string) {
  const todo = todos.find((el) => el.id === id);
  return todo;
}

export async function updateTodo(id: string, todoTextUpdated: string) {
  if (!todoTextUpdated) return Promise.reject("Empty Text");
  const idx = todos.findIndex((el) => el.id === id);
  if (idx > -1) {
    todos[idx].todoText = todoTextUpdated;
  } else {
    return Promise.reject("Invalid Todo ID");
  }
}

export type Todo = Awaited<ReturnType<typeof getTodos>>[0];
