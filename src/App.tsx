import { useState } from "react";
import { uid } from "uid";
import "./App.css";

interface Todo {
  id: string;
  text: string;
  checked: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState("");

  const addTodo = () => {
    setTodos([...todos, { id: uid(), text, checked: false }]);
    setText("");
  };

  const checkTodo = (id: string) => {
    const newListTodo = todos.map((todo) => {
      if (todo.id === id) {
        todo.checked = !todo.checked;
      }
      return todo;
    });
    setTodos(newListTodo);
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="App">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add todo..."
      />
      <ul aria-label="todos">
        {todos.map((todo) => (
          <li key={todo.id}>
            <label
              htmlFor="toggle"
              style={{
                textDecoration: todo.checked ? "line-through" : undefined,
              }}
            >
              <input
                id="toggle"
                type="checkbox"
                onChange={() => checkTodo(todo.id)}
              />
              {todo.text}
              <button type="button" onClick={() => deleteTodo(todo.id)}>
                Delete
              </button>
            </label>
          </li>
        ))}
      </ul>
      <button type="submit" onClick={addTodo} disabled={!text.length}>
        Add
      </button>
    </div>
  );
}

export default App;
