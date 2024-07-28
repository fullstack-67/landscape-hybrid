"use client";

import { FC } from "react";
import { actionUpdateTodo, actionCreateTodo } from "@/app/actionsAndDb";
import { useFormState, useFormStatus } from "react-dom";
import { useRef, useEffect } from "react";
import useStore from "@/utils/store";

export const FormInput: FC = () => {
  const [mode, curTodo] = useStore((state) => [state.mode, state.curTodo]);
  const actionFormOption =
    mode === "ADD" ? actionCreateTodo : actionUpdateTodo.bind(null, curTodo.id);
  const initialState = { message: "" };
  const [state, actionForm] = useFormState<{ message: string }>(
    actionFormOption as any,
    initialState
  );

  return (
    <>
      <div
        className="grid"
        style={{
          gridTemplateColumns: mode === "ADD" ? "4fr 1fr" : "4fr 1fr 1fr",
          alignItems: "end",
        }}
      >
        <form action={actionForm} style={{ display: "contents" }}>
          <InputText />
          <ButtonSubmit message={state?.message ?? ""} />
          <ButtonCancel />
        </form>
      </div>

      {<i className="pico-color-red-300">{state?.message ?? ""}</i>}
    </>
  );
};

// I need to use useFormStatus in the component in the form.
// https://react.dev/reference/react-dom/hooks/useFormStatus
const InputText: FC = () => {
  const [curTodo] = useStore((state) => [state.curTodo]);
  const { pending } = useFormStatus();
  const ref = useRef<HTMLInputElement>(null);

  // Reset the input form after submission
  useEffect(() => {
    if (!pending && ref?.current) {
      ref.current.value = "";
    }
  }, [pending]);

  // I need this to set the input when editing
  useEffect(() => {
    if (ref?.current) {
      ref.current.value = curTodo.todoText;
    }
  }, [curTodo.todoText]);

  return (
    <input
      type="text"
      name="todoText"
      placeholder=""
      disabled={pending}
      ref={ref}
    />
  );
};

const ButtonSubmit: FC<{ message: string }> = ({ message }) => {
  const { pending } = useFormStatus();
  const [mode, setMode, setCurTodo] = useStore((state) => [
    state.mode,
    state.setMode,
    state.setCurTodo,
  ]);
  useEffect(() => {
    // If there is error message, do not change the mode yet.
    if (message) return;
    if (!pending && mode === "EDIT") {
      setMode("ADD");
      setCurTodo({ id: "", todoText: "" });
    }
  }, [pending]);

  return (
    <button type="submit" disabled={pending}>
      {mode === "ADD" ? "Submit" : "Update"}
    </button>
  );
};

const ButtonCancel: FC = () => {
  const [mode, setMode, setCurTodo] = useStore((state) => [
    state.mode,
    state.setMode,
    state.setCurTodo,
  ]);
  const { pending } = useFormStatus();

  function handleCancel() {
    setMode("ADD");
    setCurTodo({ id: "", todoText: "" });
  }
  if (mode === "ADD") return <></>;
  return (
    <button
      type="button"
      className="contrast"
      onClick={handleCancel}
      disabled={pending}
    >
      Cancel
    </button>
  );
};
