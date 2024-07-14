import { redirect } from "next/navigation";
import { searchTodo } from "../db";
import { FormInput } from "@/Components/FormInput";

interface PageProps {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function EditTodo({ searchParams }: PageProps) {
  const curId = (searchParams?.curId ?? "") as string;

  return (
    <main className="container">
      <h1>Edit Todo</h1>
      <FormInput message={""} mode={"EDIT"} curId={curId} />
    </main>
  );
}
