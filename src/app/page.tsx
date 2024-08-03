// import Link from "next/link";
import { getTodos } from "./db";
import { FormInput } from "@/components/FormInput";
import { TodoList } from "@/components/TodoList";

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

  console.log({ mode, curId });
  return (
    <main className="container">
      <a href="/">
        <h1>Todo (RSC Only)</h1>
      </a>
      <FormInput message={message} mode={mode} curId={curId} />
      <TodoList todos={todos} mode={mode} curId={curId} />
    </main>
  );
}
