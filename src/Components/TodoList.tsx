// import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { FC } from "react";
import { deleteTodo, type Todo } from "@/app/db";

export const TodoList: FC<{ todos: Todo[] }> = ({ todos }) => {
  return (
    <>
      {todos.map((todo, idx) => (
        <article
          key={todo.id}
          className="grid"
          style={{
            alignItems: "center",
            gridTemplateColumns: "1fr 3fr 1fr 1fr",
          }}
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
    // const curId = formData.get("curId") as string;
    // await deleteTodo(curId);

    // This is better than getting value from FormData
    await deleteTodo(todo.id);

    revalidatePath("/");
    // redirect("/");
  }
  return (
    <form action={actionDeleteTodo}>
      {/* No need to use this anymore once we can use prop. */}
      {/* <input type="hidden" value={todo.id} name="curId" /> */}
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
