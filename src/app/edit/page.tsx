import { redirect } from "next/navigation";
import { searchTodo } from "../db";
import { FormInput } from "@/Components/FormInput";

interface PageProps {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function EditTodo({ searchParams }: PageProps) {
  async function actionUpdateTodo(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    const action = formData.get("action");

    const todo = await searchTodo(id);
    redirect(`?todoText=${todo?.todoText}&mode=EDIT&action=${action}`);
  }

  const id = (searchParams?.id ?? "") as string;

  return (
    <>
      <FormInput message={""} />
    </>
  );
}
