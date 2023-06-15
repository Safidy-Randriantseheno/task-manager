import React, { ChangeEvent, useRef, useState } from 'react';
import { useTaskManager } from '@/store/useTaskManager';
import { useLocalStorage } from '@/hooks/useLocalStorage';


interface Task {
  id: number,
  title: string,
  completed: boolean,
}


const TaskManager = () => {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [tasks, setTasks] = useLocalStorage('tasks', []);
  const createTaskRef = useRef<HTMLInputElement>(null);
  const {
    //tasks,
    searchTask,
    addTask,
    updateTask,
    deleteTask,
    setSearchTask,
  } = useTaskManager() as any;


 /* const handleAddTask = () => {
    const title = createTaskRef.current?.value ?? "";; // Replace with the value in the createTaskRef 
    const newTask = {
      id: Date.now(),
      title,
      completed: false,
    };
     addTask(newTask);
  };*/
  const handleAddTask = () => {
    if (newTaskTitle.trim() !== '') {
      const newTask = {
        id: Date.now(),
        title: newTaskTitle,
        completed: false,
      };
      setTasks((prevTasks) => [...prevTasks, newTask]);
      setNewTaskTitle('');
    }
  };

  const handleUpdateTask = (taskId: number, updatedTask: Task) => {
     updateTask(taskId, updatedTask);
  };

  const handleDeleteTask = (taskId: number) => {
     deleteTask(taskId);
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
     setSearchTask(e.target.value);
  };

  // See! I already give you everything!
   const filteredTasks = tasks.filter((task:{ id: number; title: string; }) =>
    task?.title && task.title.toLowerCase().includes(searchTask.toLowerCase())
   );

  return (
    <div>
      <h1>Task Manager</h1>

      <input type="text" /*ref={}*//>

      <button onClick={handleAddTask}>Add Task</button>

      <input type="text" onChange={handleSearch} placeholder="Search Task" />

      <ul>
        
        {filteredTasks.map((task:{ id: number; title: string; }) => (
          <li key={task.id}>
            <input
              type="text"
              value={task.title}
              onChange={(e) =>
                handleUpdateTask(task.id, { id: task.id, title: e.target.value, completed: false })
              }
            />
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskManager;
