import React from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../Redux/TasksSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

const AddTaskForm = ({ isOpenModal, setIsOpenModal }) => {
  const dispatch = useDispatch();

  const { values, errors, touched, handleSubmit, handleChange, resetForm } =
    useFormik({
      initialValues: {
        title: "",
      },
      validationSchema: Yup.object({
        title: Yup.string().required("title is required").trim(),
      }),
      onSubmit: (values) => {
        console.log(values);
        dispatch(addTask(values.title));
        resetForm();
        setIsOpenModal(false)
        toast.success("Task is Added  ");
      },
    });

  return (
    <>

      {isOpenModal && <div className="fixed animate-slideDown inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-base-200 w-2/5 p-6 rounded shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg text-white font-bold">Create Task</h2>
            <button onClick={() => setIsOpenModal(false)} className="text-white  focus:outline-none">
              <svg className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path
                  d="M14.35 14.35a.5.5 0 0 1 0 .7l-1.41 1.41a.5.5 0 0 1-.7 0L10 11.41l-2.24 2.24a.5.5 0 0 1-.7 0l-1.41-1.41a.5.5 0 0 1 0-.7L8.59 10 6.35 7.76a.5.5 0 0 1 0-.7l1.41-1.41a.5.5 0 0 1 .7 0L10 8.59l2.24-2.24a.5.5 0 0 1 .7 0l1.41 1.41a.5.5 0 0 1 0 .7L11.41 10l2.24 2.24z"
                />
              </svg>
            </button>
          </div>
          <form className=" rounded-2xl box-border p-5 my-7 " onSubmit={handleSubmit}>
            <div className="h-12 relative w-full mt-10">
              <input
                type="text"
                name="title"
                placeholder=""
                className="input"
                value={values.title}
                onChange={handleChange}
              />

              <div className="cut"></div>
              <label for="New Task" className="placeholder">
                New Task
              </label>
            </div>
            {errors.title && touched.title ? (
              <div className="text-sm font-normal text-red-500">{errors.title}</div>
            ) : null}

            <div className="flex justify-center w-full">
              <button type="submit" className="bg-sky-100 px-8 rounded-xl border-none box-border text-light-100 cursor-pointer text-lg h-12 mt-5 text-center  active:bg-sky-200">
                Add
              </button>
            </div>

          </form>
        </div>
      </div>}
    </>




  );
};

export default AddTaskForm;
