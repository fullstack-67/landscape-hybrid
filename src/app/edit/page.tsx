import { FormInput } from "@/Components/FormInput";

interface PageProps {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function EditTodo({ searchParams }: PageProps) {
  const curId = (searchParams?.curId ?? "") as string;
  const message = (searchParams?.message ?? "") as string;

  return (
    <main className="container">
      <h1>Edit Todo</h1>
      <FormInput mode={"EDIT"} curId={curId} message={message} />
    </main>
  );
}
