import create from 'zustand';
// Définition du store Zustand pour gérer les tâches
const useTaskManager = create((set) => ({
  tasks: [],
  searchKeyword: '',
  setSearchKeyword: (keyword:string) => set(() => ({ searchKeyword: keyword })),
  addTask: (task :{ id: number; title: string }) =>  set((state: { tasks: { id: number; title: string }[] }) => ({ tasks: [...state.tasks, task] })),
  updateTask: (taskId: number, updatedTask : {title:string}) =>
    set((state: {tasks:{ id: number; title: string }[]}) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId ? { ...task, ...updatedTask } : task
      ),
    })),
  deleteTask: (taskId: number) =>
  set((state: {tasks:{ id: number; title: string }[]}) => ({
      tasks: state.tasks.filter((task) => task.id !== taskId),
    })),
}));

export {
  useTaskManager
}