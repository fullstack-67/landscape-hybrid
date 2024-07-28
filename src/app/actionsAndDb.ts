"use server";
import { revalidatePath } from "next/cache";
// import { redirect } from "next/navigation";

export async function actionCreateTodo(prevState: any, formData: FormData) {
  const todoText = formData.get("todoText") as string;
  console.log("Create");
  try {
    await createTodos(todoText);
  } catch (err) {
    console.dir(err);
    return { message: err ?? "Unknown Error" };
  }
  revalidatePath("/");
  return { message: "" };
}

export async function actionUpdateTodo(
  curId: string,
  prevState: any,
  formData: FormData
) {
  const todoTextUpdated = formData.get("todoText") as string;
  try {
    await updateTodo(curId, todoTextUpdated);
  } catch (err) {
    return { message: err ?? "Unknown Error" };
    // redirect(`/?message=${err ?? "Unknown error"}&curId=${curId}&mode=EDIT`);
  }
  revalidatePath("/"); // I should revalidate here.  No need to refresh
  return { message: "" };
}

export async function actionGetCurTodo(curId: string) {
  if (!curId) return null;
  const todo = await searchTodo(curId);
  return todo ?? null;
}

export async function actionDeleteTodo(
  curId: string,
  prevState: any,
  formData: FormData
) {
  "use server";
  console.log({ curId, prevState, formData });
  await deleteTodo(curId);
  revalidatePath("/");
}

// * DB Functionality
// I need to include this with server-action function so that I don't get multiple copies of todos arrays.
// This inclusion would not be necessary when I use real database.
const LATENCY = 500; // ms

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
  await sleep(LATENCY);
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

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export type Todo = Awaited<ReturnType<typeof getTodos>>[0];
