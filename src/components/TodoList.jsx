import React, { useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const TodoList = () => {
  const [userId, setUserId] = useState('');
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchTodos = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`);
      setTodos(response.data);
    } catch (err) {
      setError('Failed to fetch to-dos');
    }
    setLoading(false);
  };

  const completedTasks = todos.filter(todo => todo.completed).length;
  const notCompletedTasks = todos.length - completedTasks;

  const data = {
    labels: ['Completed', 'Not Completed'],
    datasets: [
      {
        data: [completedTasks, notCompletedTasks],
        backgroundColor: ['#4CAF50', '#F44336'],
        hoverBackgroundColor: ['#66BB6A', '#EF5350'],
      },
    ],
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-center mb-4">
        <input
          type="text"
          className="border rounded p-2 mr-2"
          placeholder="Enter User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <button onClick={fetchTodos} className="bg-blue-500 text-white rounded p-2">Submit</button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {todos.length > 0 && (
        <>
          <h2 className="text-xl mb-4">To-Do List</h2>
          <ul className="list-disc pl-5">
            {todos.map(todo => (
              <li key={todo.id} className={`mb-1 ${todo.completed ? 'line-through' : ''}`}>
                {todo.title}
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Pie data={data} />
          </div>
        </>
      )}
    </div>
  );
};

export default TodoList;
