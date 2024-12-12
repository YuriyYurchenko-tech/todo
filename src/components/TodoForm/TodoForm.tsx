import React from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import styles from './TodoForm.module.css';

type AddTodoProps = {
  task: string;
  setTask: React.Dispatch<React.SetStateAction<string>>;
  addTodo: () => void;
};

export default function TodoForm({ task, setTask, addTodo }: AddTodoProps): JSX.Element {
  const handleAddTodo = () => {
    if (task.trim()) {
      addTodo();
    }
  };
  return (
    <Form className={styles.todoForm}>
      <InputGroup className={styles.inputGroup}>
        <Form.Control
          className={styles.input}
          type='text'
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder='what needs to be done?'
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleAddTodo();
            }
          }}
        />
      </InputGroup>

      <Button className={styles.button} onClick={handleAddTodo}>
        Add
      </Button>
    </Form>
  );
}
