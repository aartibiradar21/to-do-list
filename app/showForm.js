"use client"
import React, { useState } from 'react';
import Priority from './priorityBox.js';
import { deleteTask } from './deleteTask.js';

const TodoList = () => {
  const [userInput, setUserInput] = useState('');
  const [tasks, setTasks] = useState([]);
  const [estimatedTime, setEstimatedTime] = useState(''); 
  const [selectedPriority, setSelectedPriority] = useState(1); 
  const [filterOption, setFilterOption] = useState('all'); 
  const [selectedTimeInterval, setSelectedTimeInterval] = useState(0); 
  const timeIntervals = [
    { label: 'Less than 30 mins', value: 0.5 },
    { label: 'Less than 2 hours', value: 2 },
    { label: 'Less than 4 hours', value: 4 },
  ];

  const handleTimeIntervalChange = (e) => {
    setSelectedTimeInterval(parseFloat(e.target.value));
  };


  const selectedPriorityRef = React.useRef();

  const handleChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleTimeChange = (e) => {
    setEstimatedTime(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (userInput.trim() !== '') {
      const newTask = {
        text: userInput,
        priority: selectedPriority,
        estimatedTime: estimatedTime, 
        checked: false, 
        textColor: 'black',
      };

      setTasks([...tasks, newTask]);

      setUserInput('');
      setEstimatedTime('');
    }
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = deleteTask(tasks, index);
    setTasks(updatedTasks);
  };

  const handleToggleTodo = (index) => {
    const newTasks = [...tasks];
    newTasks[index].checked = !newTasks[index].checked;
    newTasks[index].textColor = newTasks[index].checked ? 'green' : 'black'; 
    setTasks(newTasks);
  };
  const handleFilterChange = (e) => {
    setFilterOption(e.target.value);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filterOption === 'done') {
      return task.checked;
    } else if (filterOption === 'notDone') {
      return !task.checked;
    } else {
      return true; 
    }
  });

  const filterAndSortTasks = (tasks, filterTime) => {
  return tasks
    .filter((task) => task.estimatedTime < filterTime)
    .sort((a, b) => a.estimatedTime - b.estimatedTime);
};

  const filteredTasksByTimeInterval = filteredTasks.filter(
    (task) => {
      if (selectedTimeInterval === 0.5) {
        return task.estimatedTime < 0.5;
      } else if (selectedTimeInterval === 2) {
        return task.estimatedTime < 2;
      } else if (selectedTimeInterval === 4) {
        return task.estimatedTime < 4;
      }
      return true;
    }
  );
  
  const handleSortByPriority = () => {
    const sortedTasks = [...tasks];
    sortedTasks.sort((a, b) => a.priority - b.priority);
    setTasks(sortedTasks);
  };



  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1 className="task-form">Task Form</h1>
        <h2 className="h2">TODO TASK</h2>
        <input
          className="input"
          type="text"
          value={userInput}
          placeholder="Enter a task"
          onChange={handleChange}
        />
        <br />
        <h2 className='h2'>PRIORITY NO FOR TASK</h2>
        <Priority selectedPriority={selectedPriority} setSelectedPriority={setSelectedPriority} />
        <br />
        <h2 className="h2">TIME FOR TASK</h2>
        <input
          className="input1"
          type="text"
          value={estimatedTime}
          placeholder="Estimated Time (hours)"
          onChange={handleTimeChange}
        />
        <br />
        <button className="add" type="submit">
          Add Task
        </button>
        <div class="status-container">
          <h2>Status</h2>
          <select
            className="filter-dropdown"
            value={filterOption}
            onChange={handleFilterChange}
          >
            <option value="all">All Tasks</option>
            <option value="done">Done</option>
            <option value="notDone">Not Done</option>
          </select>
        </div>
      </form>
      <button className="sort-priority" onClick={handleSortByPriority}>
        Sort by Priority
      </button>

      <table>
        <thead>
          <tr>
            <th className="task-cell">Task</th>
            <th className="task-cell">Priority</th>
            <th className="task-cell">Estimated Time</th>
            <th className="task-cell">Delete</th>
            <th className="task-cell">Done</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.map((task, index) => (
            <tr key={index}>
              <td className="task-cell"><span
                  style={{
              
                    textDecoration: task.checked ? 'line-through' : 'none',
                    color: task.textColor, 

                  }}
                >
                  {task.text}
                </span></td>
              <td className="task-cell">{task.priority}</td>
              <td className="task-cell">{task.estimatedTime}</td>
              <td className="task-cell">
                <button
                  onClick={() => handleDeleteTask(index)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  <img
                    src="/delete-button.svg"
                    alt="Delete"
                    width="20px"
                    height="20px"
                  />
                </button>
              </td>
              <td className="task-cell">
                <input
                  type="checkbox"
                  checked={task.checked}
                  onChange={() => handleToggleTodo(index)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TodoList;
