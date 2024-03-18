import React, { useEffect, useState } from "react";
import "./TodoForm.css";
import Loading from "../Loading/Loading";

const TodoForm = () => {
  const [todoData, setTodoData] = useState({
    title: "",
    completed: false,
  });
  const [todos, setTodos] = useState(null);
  const [editTodo, setEditTodo] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    // console.log(e.target.value, todoData);
    setTodoData({
      ...todoData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = (todo) => {
    setEditTodo(todo);
    setEditedTitle(todo.title);
  };

  const handleToogleEdit = (todo) => {
    setEditTodo(todo.completed);
  };

  const handleSubmitData = async () => {
    console.log("Data submited.");
    try {
      setLoading(true);
      // Get JWT token from localStorage or wherever it's stored
      const token = localStorage.getItem("Authorization");
      if (!token) {
        throw new Error("Token not found");
      }

      await fetch("https://todo-backend-qvg8.onrender.com/api/v1/todos", {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todoData),
      })
        .then((res) => res.json())
        .then((data) => data, setLoading(false))
        .catch((error) => console.error(error));
      await fetchTodos();
    } catch (error) {
      console.error("Error in submiting data.", error);
      setLoading(false);
    }
  };

  const handleToogleComplete = async (todoId, currentCompleteStatus) => {
    console.log("Completed");
    try {
      const token = localStorage.getItem("Authorization");
      // console.log(token);
      if (!token) {
        throw new Error("Token not found");
      }

      const updatedTodoData = {
        ...todoData,
        completed: !currentCompleteStatus,
      };

      // console.log("edittodo id", editTodo._id);
      await fetch(
        `https://todo-backend-qvg8.onrender.com/api/v1/updateTodo/${todoId}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: (JSON.stringify(updatedTodoData), console.log(updatedTodoData)),
        }
      )
        .then((res) => {
          // console.log(updatedTodoData); // Log updatedTodoData
          console.log(res); // Log response
          return res.json(); // Return response JSON for next .then() block
        })
        .then((data) => {
          console.log(data.todo); // Log response data
        })
        .catch((error) => console.error(error));
      // setTodoData(updatedTodoData);
      await fetchTodos();
    } catch (error) {
      console.error("Error in updating data:", error);
    }
  };

  const handleUpdate = async () => {
    console.log("Todo Updated");
    try {
      setLoading(true);
      const token = localStorage.getItem("Authorization");
      console.log(token);
      if (!token) {
        throw new Error("Token not found");
      }
      console.log("edittodo id", editTodo._id);
      await fetch(
        `https://todo-backend-qvg8.onrender.com/api/v1/todos/${editTodo._id}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title: editedTitle }),
        }
      )
        .then((res) => res.json(), setLoading(false))
        .catch((error) => console.error(error));
      await fetchTodos();
    } catch (error) {
      console.error("Error in updating data:", error);
      setLoading(false);
    }
  };

  const handleDelete = async (todoId) => {
    console.log("Item deleted");
    try {
      setLoading(true);
      // Get JWT token from localStorage or wherever it's stored
      const token = localStorage.getItem("Authorization");
      console.log(token);
      if (!token) {
        throw new Error("Token not found");
      }

      console.log("todoId", todoId);
      await fetch(
        `https://todo-backend-qvg8.onrender.com/api/v1/todos/${todoId}`,
        {
          method: "DELETE",
          headers: {
            Accept: "applicaation/json",
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ todoId }),
        }
      )
        .then((res) => res.json())
        .then((data) => console.log(data), setLoading(false))
        .catch((error) => console.error(error));
      await fetchTodos();
    } catch (error) {
      console.error("Error in deleting data:", error);
      setLoading(false);
    }
  };

  const fetchTodos = async () => {
    try {
      setLoading(true);
      // Get JWT token from localStorage or wherever it's stored
      const token = localStorage.getItem("Authorization");
      // console.log(token);
      if (!token) {
        throw new Error("Token not found");
      }

      await fetch(`https://todo-backend-qvg8.onrender.com/api/v1/todos`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => setTodos(data.todos), setLoading(false));
    } catch (error) {
      console.error("Error in fetching data", error);
      setLoading(false);
      // Handle error
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  if (loading) {
    return <Loading />;
  }

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
        {/* {loader ? loader : "Loading.."} */}
        <ul className="todos" id="todos">
          {todos ? (
            todos.map((todo) => (
              <div key={todo._id} className="todo-list">
                {editTodo && editTodo._id === todo._id ? (
                  <>
                    <div className="editArea">
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
                      <button className="editBtn" onClick={handleUpdate}>
                        <i className="fa-solid fa-pen"></i>
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <li key={todo._id}>
                      <div className="checkboxOrTodoData">
                        <input
                          value={todo.completed}
                          checked={todo.completed}
                          onChange={() =>
                            handleToogleComplete(todo._id, todo.completed)
                          }
                          type="checkbox"
                          id={todo._id}
                          style={{ fontSize: "1rem" }}
                        />
                        <p
                          onClick={() => handleToogleEdit(todo)}
                          style={{
                            textDecoration: todo.completed
                              ? "line-through"
                              : "none",
                            color: todo.completed ? "red" : "",
                          }}
                        >
                          {todo.title}
                        </p>
                      </div>
                    </li>
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
                  </>
                )}
              </div>
            ))
          ) : (
            <Loading />
          )}
        </ul>
      </div>
      {localStorage.getItem("Authentication") ? (
        <></>
      ) : (
        <small>You need to signup/login first.</small>
      )}
    </div>
  );
};

export default TodoForm;
