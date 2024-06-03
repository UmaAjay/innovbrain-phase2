import React from 'react';
import TodoList from './components/TodoList';

function App() {
  return (
    <div className="App">
      <header className="bg-blue-500 text-white p-4">
        <h1 className="text-xl">Employee To-Do Tasks</h1>
      </header>
      <main className="p-4">
        <TodoList />
      </main>
    </div>
  );
}

export default App;
