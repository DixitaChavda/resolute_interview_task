import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editTask, toggleCompleted, deleteTask } from "../Redux/TasksSlice";
import { useFormik } from "formik";
import * as Yup from "yup";

import { toast } from "react-toastify";

const Task = ({ task }) => {
  const [editing, setEditing] = useState(false);
  const dispatch = useDispatch();

  const { handleChange, values, handleSubmit, touched, errors } = useFormik({
    initialValues: {
      title: task.title,
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .required("Task can not be empty")
        .trim()
       
    }),
    onSubmit: (values) => {
      dispatch(editTask({ id: task.id, title: values.title }));
      setEditing(false);
      toast.success("Task is Updated");
    },
  });

  const handleDelete = (task) => {
    dispatch(deleteTask(task));
    toast.success("Task is deleted");
  };



  return (
    <li className="my-3 animate-slideUp flex items-center bg-slate-900 text-white py-2 px-5 rounded-lg shadow-2xl text-lg">
      <input
        className="mr-3 h-4 w-4"
        type="checkbox"
        checked={task.completed}
        onChange={()=>dispatch(toggleCompleted(task.id))}
      />
      {editing ? (
        <>
          <form
            className="flex justify-between items-start w-full"
            onSubmit={handleSubmit}
          >
            <div className="w-full ">
              <input
                type="text"
                name="title"
                className="rounded-lg text-lg h-full w-full outline-none px-1 py-2 bg-base-100"
                value={values.title}
                onChange={handleChange}
              />

              {errors.title && touched.title && (
                <div className="text-red-500 text-lg">{errors.title}</div>
              )}
            </div>

            <button
              type="submit"
              className="bg-blue-500 ml-5 hover:bg-blue-600 py-1 px-5 rounded-lg shadow-xl"
            >
              Save
            </button>
          </form>
        </>
      ) : (
        <>
          <span
            className="mr-5"
            style={{
              textDecoration: task.completed ? "line-through " : "none",
            }}
            onClick={() => setEditing(true)}
          >
            {task.title}
          </span>

          <div className="ml-auto">
            <button
              className="bg-blue-500 mx-2 hover:bg-blue-600 py-1 px-5 rounded-lg shadow-xl"
              onClick={() => setEditing(true)}
            >
              Edit
            </button>
            <button
              className="bg-red-500 py-1 px-3 rounded-lg shadow-xl"
              onClick={() => handleDelete(task.id)}
            >
              Delete
            </button>
          </div>
        </>
      )}
    </li>
  );
};

export default Task;
