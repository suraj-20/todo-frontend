import React, { useEffect, useState } from "react";
import "./TodoForm.css";

const TodoForm = () => {
  const [todoData, setTodoData] = useState({
    title: "",
  });
  const [todos, setTodos] = useState([]);
  const [editTodo, setEditTodo] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");

  const handleChange = (e) => {
    console.log(e.target.value);
    setTodoData({ ...todoData, [e.target.name]: e.target.value });
  };

  const handleEdit = (todo) => {
    setEditTodo(todo);
    setEditedTitle(todo.title);
  };

  const handleSubmitData = async () => {
    console.log("Data submited.");
    try {
      if (localStorage.getItem("Auth-token")) {
        await fetch("https://todo-backend-qvg8.onrender.com/api/v1/todos", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Auth-token": `${localStorage.getItem("Auth-token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(todoData),
        })
          .then((res) => res.json())
          .then((data) => data)
          .catch((error) => console.error(error));
        await fetchTodos();
      }
    } catch (error) {
      console.error("Error in submiting data.", error);
    }
  };

  const handleUpdate = async () => {
    console.log("Todo Updated");
    try {
      if (localStorage.getItem("Auth-token")) {
        await fetch(
          `https://todo-backend-qvg8.onrender.com/api/v1/todos/${editTodo._id}`,
          {
            method: "PUT",
            headers: {
              Accept: "application/json",
              "Auth-token": `${localStorage.getItem("Auth-token")}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ title: editedTitle }),
          }
        )
          .then((res) => res.json())
          .catch((error) => console.error(error));
        await fetchTodos();
      }
    } catch (error) {
      console.error("Error in updating data:", error);
    }
  };

  const handleDelete = async (todoId) => {
    console.log("Item deleted");
    try {
      if (localStorage.getItem("Auth-token")) {
        await fetch(
          `https://todo-backend-qvg8.onrender.com/api/v1/todos/${todoId}`,
          {
            method: "DELETE",
            headers: {
              Accept: "applicaation/json",
              "Auth-token": `${localStorage.getItem("Auth-token")}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ todoId }),
          }
        )
          .then((res) => res.json())
          .catch((error) => console.error(error));
        await fetchTodos();
      }
    } catch (error) {
      console.error("Error in deleting data:", error);
    }
  };

  const fetchTodos = async () => {
    try {
      if (localStorage.getItem("Auth-token")) {
        await fetch("https://todo-backend-qvg8.onrender.com/api/v1/todos")
          .then((res) => res.json())
          .then((data) => setTodos(data))
          .catch((error) => console.error(error));
      }
    } catch (error) {
      console.error("Error fetching Todos:", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="todo">
      <h1>todos</h1>
      <div className="todoForm">
        <form
          id="form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmitData();
          }}
        >
          <input
            value={todoData.title}
            onChange={handleChange}
            type="text"
            name="title"
            id="title"
            className="todo-input"
            placeholder="Enter your todo"
            autoComplete="off"
          />
        </form>
        <ul className="todos" id="todos">
          {todos.map((todo, i) => (
            <div key={todo._id} className="todo-list">
              {editTodo && editTodo._id === todo._id ? (
                <>
                  <input
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                    type="text"
                    name="title"
                    id="title"
                    className="todo-input"
                    placeholder="Enter your todo"
                    autoComplete="off"
                  />
                  <button onClick={handleUpdate}>
                    <i className="fa-solid fa-pen"></i>
                  </button>
                </>
              ) : (
                <>
                  <li key={todo._id}>
                    <p>{todo.title}</p>
                    <div className="editAndUpdateBtn">
                      <button
                        onClick={() => {
                          handleEdit(todo);
                        }}
                      >
                        <i className="fa-regular fa-pen-to-square"></i>
                      </button>
                      <button
                        onClick={() => {
                          handleDelete(todo._id);
                        }}
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  </li>
                </>
              )}
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoForm;
