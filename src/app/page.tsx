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
  // const key = new Date().getTime().toString();
  return (
    <main className="container">
      <a href="/">
        <h1>Todo (RSC + RCC)</h1>
      </a>
      {/* I set the new key so that the state is reset and I am able to switch between server action. See https://stackoverflow.com/a/77816853*/}
      <FormInput />
      <TodoList todos={todos} />
      <Spinner />
    </main>
  );
}
