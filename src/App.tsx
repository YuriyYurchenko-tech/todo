import React, { useEffect, useState } from 'react';
import styles from './App.module.css';
import { Row } from 'react-bootstrap';
import TodoForm from './components/TodoForm/TodoForm';
import Task from './components/Task/Task';
import type { TodoType } from './types/todoTypes';

export default function App(): React.JSX.Element {
  const [todos, setTodos] = useState<TodoType[]>(() => {
    const storedTodos = localStorage.getItem('todos');
    try {
      return storedTodos ? (JSON.parse(storedTodos) as TodoType[]) : [];
    } catch {
      console.error('Failed to parse todos from localStorage');
      return [];
    }
  });
  
  const [activeTab, setActiveTab] = useState<'all' | 'completed' | 'active'>('all');

  const [task, setTask] = useState<TodoType['text']>('');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    const newTodo: TodoType = {
      id: Date.now(),
      text: task,
      completed: false,
    };
    setTodos([...todos, newTodo]);
    setTask('');
  };

  const checkedTodo = (id: TodoType['id']) =>
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)),
    );

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  return (
    <Row className={styles.app}>
      <Row className={styles.todoContainer}>
        <h1 className={styles.title}>todos</h1>
        <TodoForm task={task} setTask={setTask} addTodo={addTodo} />
        <Task
          todos={todos}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          checkedTodo={checkedTodo}
          clearCompleted={clearCompleted}
        />
      </Row>
    </Row>
  );
}
