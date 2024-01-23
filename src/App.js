import React from 'react';
import './App.css';
import TodoList from './TodoList';
import backgroundImage from './assets/map.jpg'; // Import the background image

function App() {
  return (
    <div className="App" style={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed',
      minHeight: '100vh' // Ensure the background covers the full viewport height
    }}>
      <TodoList />
    </div>
  );
}

export default App;