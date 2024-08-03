import { getTodos } from "./actionsAndDb";
import { FormInput } from "@/components/FormInput";
import { TodoList } from "@/components/TodoList";
import { Spinner } from "@/components/Spinner";

interface PageProps {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function Home({ params, searchParams }: PageProps) {
  const todos = await getTodos();
  return (
    <main className="container">
      <a href="/">
        <h1>Todo (RSC + RCC)</h1>
      </a>
      <FormInput />
      <TodoList todos={todos} />
      <Spinner />
    </main>
  );
}
