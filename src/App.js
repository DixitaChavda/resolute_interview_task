import React, { useState } from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import TaskList from "./Components/TaskList";
import AddTaskForm from "./Components/AddTaskForm";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";


const App = () => {
  const [isOpenModal,setIsOpenModal] = useState(false);
   return (
    <Provider store={store}>
      <div className="min-h-screen w-full bg-black p-5 flex  flex-col  items-center">
        <div className="flex w-full  justify-end">
          <button data-modal-target="default-modal" data-modal-toggle="default-modal"  onClick={()=> setIsOpenModal(true)} className="text-white bg-blue-500 mx-2 hover:bg-blue-600 py-1 px-5 rounded-lg shadow-xl">+ Add Task</button>
        </div>

        <AddTaskForm setIsOpenModal={setIsOpenModal} isOpenModal={isOpenModal} />
        <TaskList />
      </div>


      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Provider>
  );
};

export default App;
