import React, { useState } from 'react';

function TodoItem({ text, completed, onToggleCompleted, onDelete }) {
  const [isDeleteButtonVisible, setIsDeleteButtonVisible] = useState(false);

  const showDeleteButton = () => setIsDeleteButtonVisible(true);
  const hideDeleteButton = () => setIsDeleteButtonVisible(false);

  const Checkbox = () => (
    <label className="checkbox">
      <input
        type="checkbox"
        checked={completed}
        onChange={onToggleCompleted}
        style={{ appearance: 'none' }}
      />
      <span className="checkmark"></span>
    </label>
  );

  const TaskText = () => (
    <span
      className={`task-text ${completed ? 'completed-text' : ''}`}
      style={{ textDecoration: completed ? 'line-through' : 'none' }}
    >
      {text}
    </span>
  );

  const DeleteButton = () => (
    isDeleteButtonVisible && (
      <span className="delete-button" onClick={onDelete}>
        ✗
      </span>
    )
  );

  return (
    <li className={`todo-item ${completed ? 'completed' : ''}`}>
      <div
        className="task-container"
        onMouseEnter={showDeleteButton}
        onMouseLeave={hideDeleteButton}
      >
        <Checkbox />
        <TaskText />
        <DeleteButton />
      </div>
    </li>
  );
}

export default TodoItem;
