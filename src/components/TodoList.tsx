import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { FC } from "react";
import { deleteTodo, type Todo } from "@/app/db";

interface Props {
  todos: Todo[];
  mode: "ADD" | "EDIT";
  curId: string;
}

export const TodoList: FC<Props> = ({ todos, mode, curId }) => {
  return (
    <>
      {todos.map((todo, idx) => {
        const fontStyle = todo.id === curId ? "700" : "400";
        const fontClass = todo.id === curId ? "pico-color-blue-400" : "";

        return (
          <article
            key={todo.id}
            className="grid"
            style={{
              alignItems: "center",
              gridTemplateColumns: "0.5fr 4fr 1fr 1fr",
            }}
          >
            <span>({idx + 1})</span>
            <span style={{ fontWeight: fontStyle }} className={fontClass}>
              ✍️ {todo.todoText}
            </span>
            {mode === "ADD" && (
              <>
                <ButtonDelete todo={todo} />
                <ButtonUpdate todo={todo} />
              </>
            )}
          </article>
        );
      })}
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
  }
  return (
    <form action={actionDeleteTodo}>
      {/* No need to use hidden field anymore once we can use prop. */}
      {/* <input type="hidden" value={todo.id} name="curId" /> */}
      <button type="submit" className="contrast" style={{ marginBottom: 0 }}>
        🗑️
      </button>
    </form>
  );
};

const ButtonUpdate: FC<{ todo: Todo }> = ({ todo }) => {
  async function actionTriggerUpdate() {
    "use server";
    redirect(`/?mode=EDIT&curId=${todo.id}`); // I cannot use revalidate path because the url will not change.
  }
  return (
    <form action={actionTriggerUpdate}>
      <button type="submit" className="secondary" style={{ marginBottom: 0 }}>
        🖊️
      </button>
    </form>
  );
};
