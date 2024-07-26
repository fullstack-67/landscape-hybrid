"use client";

import { FC } from "react";
import {
  actionUpdateTodo,
  actionCreateTodo,
  actionGetCurTodo,
} from "@/app/actions";

interface Props {
  mode: "ADD" | "EDIT";
  message?: string;
  curId: string;
}

export const FormInput: FC<Props> = ({ message, mode, curId }) => {
  let todoText = "";

  const actionForm =
    mode === "ADD" ? actionCreateTodo : actionUpdateTodo.bind(null, curId);

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
          <div>
            <input
              type="text"
              name="todoText"
              defaultValue={todoText}
              placeholder=""
            />
          </div>
          <input type="hidden" name="curId" value={curId ?? ""} />
          <button type="submit">{mode === "ADD" ? "Submit" : "Update"}</button>
        </form>
        {mode === "EDIT" && (
          <form action="/" style={{ display: "contents" }}>
            <button type="submit" className="contrast">
              Cancel
            </button>
          </form>
        )}
      </div>

      {<i className="pico-color-red-300">{message ?? ""}</i>}
    </>
  );
};
