// import Link from "next/link";
import { getTodos } from "./actionsAndDb";
import { FormInput } from "@/Components/FormInput";
import { TodoList } from "@/Components/TodoList";

interface PageProps {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function Home({ params, searchParams }: PageProps) {
  const todos = await getTodos();
  const message = (searchParams?.message ?? "") as string;
  const curId = (searchParams?.curId ?? "") as string;
  let mode = (searchParams?.mode ?? "ADD") as "ADD" | "EDIT";
  if (mode !== "ADD" && mode !== "EDIT") mode = "ADD";

  return (
    <main className="container">
      <a href="/">
        <h1>Todo</h1>
      </a>
      <FormInput />
      <TodoList todos={todos} mode={mode} />
    </main>
  );
}
