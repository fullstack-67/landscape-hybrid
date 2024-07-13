import { revalidatePath } from "next/cache";
import { FC } from "react";
import { redirect } from "next/navigation";
import { getTodos, createTodos, deleteTodo, searchTodo } from "./db";
import Link from "next/link";

interface PageProps {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function Home({ params, searchParams }: PageProps) {
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

  async function actionDeleteTodo(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    // console.log(id);
    await deleteTodo(id);
    // revalidatePath("/");
    redirect("/");
  }

  async function actionUpdateTodo(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    const action = formData.get("action");

    const todo = await searchTodo(id);
    redirect(`?todoText=${todo?.todoText}&mode=EDIT&action=${action}`);
  }

  // console.log({ params, searchParams });
  const todos = await getTodos();
  const message = (searchParams?.message ?? "") as string;
  const mode = (searchParams?.mode ?? "ADD") as string;

  return (
    <main className="container">
      <h1 className="text-2xl font-bold text-grap-800 my-3">
        <Link href={"/"}>Todos</Link>
      </h1>

      <form action={actionCeateTodo}>
        <fieldset>
          <label htmlFor="todo-text">Text</label>
          <input type="text" name="todo-text" />
        </fieldset>
        <button type="submit">Submit</button>
        <i className="pico-color-red-300">{message}</i>
      </form>

      <TodoList todos={todos} />
      {/* {todos.map((todo, idx) => (
        <article
          key={todo.id}
          className="grid"
          style={{ alignItems: "center" }}
        >
          <i>
            <span>({idx + 1})</span>
            <span> - {todo.id}</span>
          </i>
          <span>🖹 {todo.todoText}</span>

          <form action={actionUpdateTodo}>
            <input type="hidden" value={todo.id} name="id" />
            <input type="hidden" value="TRIGGER_UPDATE" name="action" />
            <button type="submit" className="secondary">
              Update
            </button>
          </form>

          <form action={actionDeleteTodo}>
            <input type="hidden" value={todo.id} name="id" />
            <button type="submit" className="contrast">
              Delete
            </button>
          </form>
        </article>
      ))} */}
    </main>
  );
}

type TodoListProps = {
  todos: Awaited<ReturnType<typeof getTodos>>;
};

const TodoList: FC<TodoListProps> = ({ todos }) => {
  async function actionDeleteTodo(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    // console.log(id);
    await deleteTodo(id);
    // revalidatePath("/");
    redirect("/");
  }
  return (
    <>
      {todos.map((todo, idx) => (
        <article
          key={todo.id}
          className="grid"
          style={{ alignItems: "center" }}
        >
          <i>
            <span>({idx + 1})</span>
            <span> - {todo.id}</span>
          </i>
          <span>🖹 {todo.todoText}</span>

          <form action="/edit">
            <input type="hidden" value={todo.id} name="id" />
            <input type="hidden" value="TRIGGER_UPDATE" name="action" />
            <button type="submit" className="secondary">
              Update
            </button>
          </form>

          <form action={actionDeleteTodo}>
            <input type="hidden" value={todo.id} name="id" />
            <button type="submit" className="contrast">
              Delete
            </button>
          </form>
        </article>
      ))}
    </>
  );
};
