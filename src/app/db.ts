let todos = [
  {
    id: genId(),
    todoText: "My First Todo",
  },
];

function genId() {
  return new Date().getTime().toString().slice(-4);
}

export async function getTodos() {
  return todos;
}

export async function createTodos(todoText: string) {
  if (!todoText) return Promise.reject("Empty Text");
  todos.push({
    id: genId(),
    todoText: todoText,
  });
}

export async function deleteTodo(id: string) {
  todos = todos.filter((el) => el.id !== id);
}

export async function searchTodo(id: string) {
  const todo = todos.find((el) => el.id === id);
  return todo;
}

export type Todo = Awaited<ReturnType<typeof getTodos>>[0];
