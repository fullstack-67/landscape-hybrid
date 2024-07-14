import { redirect } from "next/navigation";
import { searchTodo } from "../db";
import { FormInput } from "@/Components/FormInput";

interface PageProps {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function EditTodo({ searchParams }: PageProps) {
  const id = (searchParams?.id ?? "") as string;

  return (
    <>
      <FormInput message={""} mode={"EDIT"} />
    </>
  );
}
