import { revalidatePath } from "next/cache";
// import { redirect } from "next/navigation";
import { FC } from "react";
import { deleteTodo, type Todo } from "@/app/db";

export const TodoList: FC<{ todos: Todo[] }> = ({ todos }) => {
  return (
    <>
      {todos.map((todo, idx) => (
        <article
          key={todo.id}
          className="grid"
          style={{ alignItems: "center" }}
        >
          <span>
            🪪 ({idx + 1})-{todo.id}
          </span>
          <span>✍️ {todo.todoText}</span>

          <ButtonDelete todo={todo} />
          <ButtonUpdate todo={todo} />
        </article>
      ))}
    </>
  );
};

const ButtonDelete: FC<{ todo: Todo }> = ({ todo }) => {
  async function actionDeleteTodo(formData: FormData) {
    "use server";
    // const id = formData.get("id") as string;
    // await deleteTodo(id);

    // This is better than getting value from FormData
    await deleteTodo(todo.id);

    revalidatePath("/");
    // redirect("/");
  }
  return (
    <form action={actionDeleteTodo}>
      {/* No need to use this anymore once we can use prop. */}
      {/* <input type="hidden" value={todo.id} name="id" /> */}
      <button type="submit" className="contrast">
        Delete
      </button>
    </form>
  );
};

const ButtonUpdate: FC<{ todo: Todo }> = ({ todo }) => {
  return (
    <form action="/edit">
      <input type="hidden" value={todo.id} name="curId" />
      <button type="submit" className="secondary">
        Update
      </button>
    </form>
  );
};
