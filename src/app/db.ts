const DB_LATENCY = 500; // ms

let todos = [
  {
    id: "123456", // Need to hardcode this instead of autogen due to caching (I guess).
    todoText: "My First Todo",
  },
];

function genId() {
  return new Date().getTime().toString().slice(-6);
}

export async function getTodos() {
  await sleep(DB_LATENCY);
  return todos;
}

export async function createTodos(todoText: string) {
  await sleep(DB_LATENCY);
  if (!todoText) return Promise.reject("Empty Text");
  todos.push({
    id: genId(),
    todoText: todoText,
  });
}

export async function deleteTodo(id: string) {
  await sleep(DB_LATENCY);
  todos = todos.filter((el) => el.id !== id);
}

export async function searchTodo(id: string) {
  await sleep(DB_LATENCY);
  const todo = todos.find((el) => el.id === id);
  return todo;
}

export async function updateTodo(id: string, todoTextUpdated: string) {
  await sleep(DB_LATENCY);
  if (!todoTextUpdated) return Promise.reject("Empty Text");
  const idx = todos.findIndex((el) => el.id === id);
  if (idx > -1) {
    todos[idx].todoText = todoTextUpdated;
  } else {
    return Promise.reject("Invalid Todo ID");
  }
}

export type Todo = Awaited<ReturnType<typeof getTodos>>[0];

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
