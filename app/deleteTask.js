export function deleteTask(tasks, index) {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    return updatedTasks;
  }
  