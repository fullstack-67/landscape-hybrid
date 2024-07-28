import { getTodos } from "./actionsAndDb";
import { FormInput } from "@/Components/FormInput";
import { TodoList } from "@/Components/TodoList";
import { Spinner } from "@/Components/Spinner";

interface PageProps {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function Home({ params, searchParams }: PageProps) {
  const todos = await getTodos();
  const key = new Date().getTime().toString();
  return (
    <main className="container">
      <a href="/">
        <h1>Todo</h1>
      </a>
      {/* I set the new key so that the state is reset and I am able to switch between server action. See https://stackoverflow.com/a/77816853*/}
      <FormInput key={key} />
      <TodoList todos={todos} />
      <Spinner />
    </main>
  );
}
