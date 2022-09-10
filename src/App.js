import { useState, useReducer, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

import "./index.css";
import style from "./App.module.css";

import AddForm from "./AddForm";
import EditForm from "./EditForm";
import Button from "./Button";

const reducer = function (state, action) {
  if (action.type === "add-todo") {
    return [...state, { id: action.id, title: action.payload.title }];
  }

  if (action.type === "delete-todo") {
    return state.filter((todo) => todo.id !== action.id);
  }

  if (action.type === "change-todo") {
    return state.map((todo) =>
      todo.id === action.id ? { ...todo, title: action.payload.title } : todo
    );
  }
};

const todosStorageFunc = function () {
  const savedTodos = localStorage.getItem("todos");
  if (savedTodos) return JSON.parse(savedTodos);

  return [];
};

function App() {
  const [state, dispatch] = useReducer(reducer, todosStorageFunc());

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(state));
  }, [state]);

  const [todo, setTodo] = useState("");

  const [changeForm, isEdit] = useState(false);
  const [editTodo, editSetTodo] = useState("");
  const [id, targetId] = useState(null);

  const submitTodos = function (e) {
    e.preventDefault();
    if (todo.trim() === "") return alert("The field should not be empty");

    dispatch({
      type: "add-todo",
      id: Math.random().toString(),
      payload: { title: todo.trim() },
    });

    setTodo("");
  };

  const submitEditTodos = function (e) {
    e.preventDefault();
    if (editTodo.trim() === "") return alert("The field should not be empty");

    dispatch({
      type: "change-todo",
      id: id,
      payload: { title: editTodo.trim() },
    });

    isEdit(false);
    editSetTodo("");
    targetId(null);
  };

  const storeStateTodo = function (e) {
    setTodo(e.target.value);
  };

  const storeEditStateTodo = function (e) {
    editSetTodo(e.target.value);
  };

  return (
    <div className={style.container}>
      {changeForm ? (
        <EditForm
          onSubmit={submitEditTodos}
          onChange={storeEditStateTodo}
          value={editTodo}
          editCancel={() => isEdit(false)}
        />
      ) : (
        <AddForm
          onSubmit={submitTodos}
          onChange={storeStateTodo}
          value={todo}
        />
      )}
      <ul className={style.list}>
        {state.map((todo) => {
          return (
            <li key={todo.id}>
              {todo.title}

              <div className={style.btn_container}>
                <Button
                  onClick={() => {
                    isEdit(true);
                    targetId(todo.id);
                    editSetTodo(todo.title);
                  }}
                  className="btn_edit"
                >
                  Edit
                  <FaEdit />
                </Button>
                <Button
                  onClick={() => {
                    dispatch({ type: "delete-todo", id: todo.id });
                  }}
                  className="btn_delete"
                >
                  Delete
                  <FaTrash />
                </Button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
export default App;
