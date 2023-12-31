import { createSlice } from '@reduxjs/toolkit';

const getTasksFromLocalStorage = () => {
  const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  return storedTasks;
};

const setTasksToLocalStorage = (tasks) => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: { tasks: getTasksFromLocalStorage(), filter: 'all' },
  reducers: {
    addTask: (state, action) => {
      const newTask = { id: Date.now(), title: action.payload, completed: false };
      state.tasks.push(newTask);
      setTasksToLocalStorage(state.tasks);
    },
    editTask: (state, action) => {
      const task = state.tasks.find((t) => t.id === action.payload.id);
      if (task) {
        task.title = action.payload.title;
        setTasksToLocalStorage(state.tasks);
      }
    },
    toggleCompleted: (state, action) => {
      const task = state.tasks.find((t) => t.id === action.payload);
      if (task) {
        task.completed = !task.completed;
        setTasksToLocalStorage(state.tasks);
      }
    },
    deleteTask: (state, action) => {
      const updatedTasks = state.tasks.filter((task) => task.id !== action.payload);
      setTasksToLocalStorage(updatedTasks);
      state.tasks = updatedTasks;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const { addTask, editTask, toggleCompleted, deleteTask, setFilter } = tasksSlice.actions;
export default tasksSlice.reducer;