import { getTodos, createTodos, deleteTodo, searchTodo } from "./db";
// import Link from "next/link";
import { FormInput } from "@/Components/FormInput";
import { TodoList } from "@/Components/TodoList";

interface PageProps {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function Home({ params, searchParams }: PageProps) {
  // console.log({ params, searchParams });
  const todos = await getTodos();
  const message = (searchParams?.message ?? "") as string;

  return (
    <main className="container">
      <h1>Todo</h1>

      <FormInput message={message} mode="ADD" />
      <TodoList todos={todos} />
    </main>
  );
}
