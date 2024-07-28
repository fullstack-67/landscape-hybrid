import { create } from "zustand";

export type ModeType = "ADD" | "EDIT";
export type TodoType = {
  id: string;
  todoText: string;
};

interface TodoStoreState {
  mode: ModeType;
  setMode: (newMode: ModeType) => void;
  curTodo: TodoType;
  setCurTodo: (newCurTodo: TodoType) => void;
  pending: boolean;
  setPending: (newPending: boolean) => void;
}

const useStore = create<TodoStoreState>()((set) => ({
  mode: "ADD",
  setMode: (newMode) => set((state) => ({ mode: newMode })),
  curTodo: { id: "", todoText: "" },
  setCurTodo: (newCurTodo) => set((state) => ({ curTodo: newCurTodo })),
  pending: false,
  setPending: (newPending) => set((state) => ({ pending: newPending })),
}));

export default useStore;
