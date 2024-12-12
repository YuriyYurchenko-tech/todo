import React from 'react';
import { ButtonGroup, Button, Form, InputGroup, Row } from 'react-bootstrap';
import styles from './Task.module.css';
import type { TodoType } from '../../types/todoTypes';

type TodosProps = {
  todos: TodoType[];
  activeTab: 'all' | 'completed' | 'active';
  setActiveTab: React.Dispatch<React.SetStateAction<'all' | 'completed' | 'active'>>;
  checkedTodo: (id: number) => void;
  clearCompleted: () => void;
};

export default function Task({
  todos,
  activeTab,
  setActiveTab,
  checkedTodo,
  clearCompleted,
}: TodosProps): JSX.Element {
  const filteredTodos = todos.filter((todo) => {
    if (activeTab === 'completed') return todo.completed;
    if (activeTab === 'active') return !todo.completed;
    return true;
  });

  return (
    <Row className={styles.taskContainer}>
      {filteredTodos.map((todo) => (
        <Form key={todo.id} className={styles.taskForm}>
          <InputGroup className={styles.inputGroup} onClick={() => checkedTodo(todo.id)}>
            <InputGroup.Checkbox
              type="checkbox"
              checked={todo.completed}
              onChange={() => checkedTodo(todo.id)}
            />
            <InputGroup.Text
              className={styles.title}
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none',
                opacity: todo.completed ? 0.5 : 1,
              }}
            >
              {todo.text}
            </InputGroup.Text>
          </InputGroup>
        </Form>
      ))}

      <ButtonGroup className={styles.tabs}>
        <Button
          className={`${styles.button} ${activeTab === 'all' ? styles.activeButton : ''}`}
          onClick={() => setActiveTab('all')}
        >
          All
        </Button>
        <Button
          className={`${styles.button} ${activeTab === 'active' ? styles.activeButton : ''}`}
          onClick={() => setActiveTab('active')}
        >
          Active
        </Button>
        <Button
          className={`${styles.button} ${activeTab === 'completed' ? styles.activeButton : ''}`}
          onClick={() => setActiveTab('completed')}
        >
          Completed
        </Button>
        <Button className={styles.clearButton} onClick={clearCompleted}>
          Clear Completed
        </Button>
      </ButtonGroup>
    </Row>
  );
}
