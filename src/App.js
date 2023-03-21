import React, { useState, useEffect } from 'react';

import TaskList from './Components/TaskList'
import TaskForm from './Components/TaskForm'

export const App = () => {
  const [taskList, setTaskList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newTodo, setNewTodo] = useState('');

  const fetchTasks = () => {
    setLoading(true);
    fetch('https://week-7-backend.onrender.com/tasks')
      .then((res) => res.json())
      .then((data) => setTaskList(data))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleNewTodoChange = (event) => {
    setNewTodo(event.target.value)
  }

  const onFormSubmit = (event) => {
    event.preventDefault();

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        description: newTodo
      })
    }

    fetch('https://week-7-backend.onrender.com/tasks', options)
      .then((res) => res.json())
      .then(() => fetchTasks())
      .finally(() => setNewTodo(''));
  }

  return (
    <div>
      <TaskForm
        newTodo={newTodo}
        onNewTodoChange={handleNewTodoChange}
        onFormSubmit={onFormSubmit} />
      <TaskList
        loading={loading}
        taskList={taskList}
        setTaskList={setTaskList} />
    </div>
  )
}
