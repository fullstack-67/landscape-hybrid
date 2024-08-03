"use client";
import { FC, useEffect } from "react";
import { type Todo } from "@/app/actionsAndDb";
import { actionDeleteTodo } from "@/app/actionsAndDb";
import useStore from "@/utils/store";
import { useFormState, useFormStatus } from "react-dom";
import { useTransition } from "react";

interface Props {
  todos: Todo[];
}

export const TodoList: FC<Props> = ({ todos }) => {
  const [curTodo] = useStore((state) => [state.curTodo]);
  return (
    <>
      {todos.map((todo, idx) => {
        const fontStyle = todo.id === curTodo.id ? "700" : "400";
        const fontClass = todo.id === curTodo.id ? "pico-color-blue-400" : "";

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
            <ButtonGroup todo={todo} />
          </article>
        );
      })}
    </>
  );
};

const ButtonGroup: FC<{ todo: Todo }> = ({ todo }) => {
  const action = actionDeleteTodo.bind(null, todo.id);
  const [state, actionForm] = useFormState(action as any, null);
  const [mode] = useStore((state) => [state.mode]);
  const [pendingT, startTransition] = useTransition();
  if (mode === "EDIT") return <></>;
  return (
    <>
      <button
        onClick={() => {
          startTransition(async () => await action(null, null));
        }}
      >
        DD
      </button>
      <div>{pendingT ? "Yes" : "No"}</div>
      <form action={actionForm} style={{ display: "contents" }}>
        <ButtonDelete />
        <ButtonUpdate todo={todo} />
      </form>
    </>
  );
};

const ButtonDelete: FC = () => {
  const { pending: pendingLocal } = useFormStatus();
  const [pending, setPending] = useStore((state) => [
    state.pending,
    state.setPending,
  ]);
  useEffect(() => {
    setPending(pendingLocal);
  }, [pendingLocal]);
  return (
    <button
      type="submit"
      className="contrast"
      disabled={pending}
      style={{ marginBottom: 0 }}
    >
      🗑️
    </button>
  );
};

const ButtonUpdate: FC<{ todo: Todo }> = ({ todo }) => {
  const [setMode, setCurTodo] = useStore((state) => [
    state.setMode,
    state.setCurTodo,
  ]);
  return (
    <button
      className="secondary"
      style={{ marginBottom: 0 }}
      onClick={() => {
        setMode("EDIT");
        setCurTodo(todo);
      }}
    >
      🖊️
    </button>
  );
};
