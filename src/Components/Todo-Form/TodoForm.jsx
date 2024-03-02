import React from "react";
import './TodoForm.css'

const TodoForm = () => {
  return (
    <div className="todo">
      <h1>todos</h1>
      <form id="form">
        <input
          type="text"
          name="input"
          id="input"
          class="input"
          placeholder="Enter your todo"
          autocomplete="off"
        />
        <ul class="todos" id="todos"></ul>
      </form>
      <small>
        Right click to delete the todo.
        <br />
        Left click to toggle complete.
      </small>

      <small class="phone">
        Click to toggle complete.
        <br />
        Press for 2 second to delete.
      </small>
    </div>
  );
};

export default TodoForm;
