import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import TodoItem from './TodoItem';
import './index.css';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTodosLoaded, setIsTodosLoaded] = useState(false);

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
      localStorage.removeItem('todos');
    }
    setIsTodosLoaded(true);
  }, []);

  useEffect(() => {
    if (isTodosLoaded) {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, [todos, isTodosLoaded]);

  const handleToggleCompleted = (index) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const handleAddTodo = () => {
    const newTodo = {
      id: new Date().getTime().toString(),
      text: inputValue,
      completed: false,
    };
    setTodos([...todos, newTodo]);
    setInputValue('');
  };

  const handleInputKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleAddTodo();
    }
  };

  const handleDeleteTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedTodos = Array.from(todos);
    const [reorderedItem] = reorderedTodos.splice(result.source.index, 1);
    reorderedTodos.splice(result.destination.index, 0, reorderedItem);

    setTodos(reorderedTodos);
  };

  return (
    <div>
      <h1 className="quests-header">Quests</h1>
      <div className="input-container">
        <textarea
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          placeholder="What adventure today?"
          className="input"
          rows="1"
        ></textarea>
      </div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="droppable-todos">
          {(provided) => (
            <ul className="todo-list" {...provided.droppableProps} ref={provided.innerRef}>
              {todos.map((todo, index) => (
                <Draggable key={todo.id} draggableId={todo.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <TodoItem
                        text={todo.text}
                        completed={todo.completed}
                        onToggleCompleted={() => handleToggleCompleted(index)}
                        onDelete={() => handleDeleteTodo(index)}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
      <footer className="footer">Designed by Brandon Volesky</footer>
    </div>
  );
}

export default TodoList;