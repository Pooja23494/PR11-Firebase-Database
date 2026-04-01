import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createTodo,
  deleteTodo,
  getAllTodos,
  updateTodo,
} from "./features/todo/todoSlice";

const App = () => {
  const [todo, setTodo] = useState({});
  const { todos } = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTodo({ ...todo, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (todo.id) {
      dispatch(updateTodo(todo));
    } else {
      dispatch(createTodo({ ...todo, id: Date.now() }));
    }
    setTodo({});
  };

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
  };

  const handleEdit = (todo) => {
    setTodo(todo);
  };

  useEffect(() => {
    dispatch(getAllTodos());
  }, []);

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <form
              action=""
              method="post"
              className="card p-4 mt-5"
              onSubmit={handleSubmit}
            >
              <h2 className="text-center mb-4">Todo App</h2>
              <div className="mb-2">
                <label htmlFor="text" className="form-label">
                  Todo
                </label>
                <input
                  type="text"
                  name="text"
                  value={todo.text || ""}
                  onChange={handleChange}
                  className="form-control mb-3"
                />
              </div>
              <button type="submit" className="btn btn-primary">
                {todo.id ? "Update":"Add"} Todo
              </button>
            </form>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <table className="table table-bordered table-hover mt-5 caption-top">
              <caption>
                <h2>Todos Data</h2>
              </caption>
              <thead className="table-dark">
                <tr>
                  <th>#.</th>
                  <th>Todo</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {todos.map((t, index) => (
                  <tr key={t.id}>
                    <td>{index + 1}</td>
                    <td>{t.text}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-danger btn-sm me-2"
                        onClick={() => handleDelete(t.id)}
                      >
                        Delete
                      </button>
                      <button
                        type="button"
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => handleEdit(t)}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
