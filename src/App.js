import React, { useState, useEffect } from 'react'

import TaskList from './Components/TaskList'

export const App = () => {
  const [taskList, setTaskList] = useState([]);
  const [loading, setLoading] = useSate(false);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    setLoading(true);
    fetch('https://week7-backend.herokuapp.com/tasks')
      .then(res => res.json())
      .then(data => setTaskList(data))
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  }

  return (
    <div>
      <TaskList />
    </div>
  )
}
