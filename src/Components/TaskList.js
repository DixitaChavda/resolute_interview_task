import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setFilter } from "../Redux/TasksSlice";
import Task from "./Task";

const TaskList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  console.log(tasks);
  const filter = useSelector((state) => state.tasks.filter);
  const [filterType, setFilterType] = useState(filter);

  const handleFilterChange = (newFilter) => {
    dispatch(setFilter(newFilter));
    setFilterType(newFilter);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filterType === "all") return true;
    if (filterType === "completed") return task.completed;
    if (filterType === "uncompleted") return !task.completed;
    return false;
  });
  

  return (
    <div className="w-full">
      {tasks && tasks.length > 0 ? (
        <>
          <select
            onChange={(e) => handleFilterChange(e.target.value)}
            className="bg-base-200 animate-slideDown text-white py-2 px-3 mb-5 rounded-xl"
          >
            <option className="p-2" value="all">
              All
            </option>
            <option value="completed">Completed</option>
            <option value="uncompleted">Uncompleted</option>
          </select>
          <div>
            {filteredTasks.length > 0 ? (
              <ul>
                {filteredTasks.map((task) => (
                  <Task key={task.id} task={task} />
                ))}
              </ul>
            ) : (
              <p className="text-white text-3xl my-7 text-center">No tasks {filterType === "completed" ? "completed" : "found"}</p>
            )}
          </div>
        </>
      ) : (
        <p  className="text-white text-3xl my-7 text-center">No tasks found</p>
      )}
    </div>
  );
};

export default TaskList;
