import React from 'react';
import './TodoForm.css';
import { useNavigate } from 'react-router-dom';

function TodoForm(
  // { addTodo, setOpenModal }
  props
) {

  const navigate = useNavigate();
  const [newTodoValue, setNewTodoValue] = React.useState(props.defaultTodoText || '');

  const onChange = (event) => {
    setNewTodoValue(event.target.value);
  };
  const onCancel = () => {
    // setOpenModal(false);
    navigate('/')
  };
  const onSubmit = (event) => {
    event.preventDefault();
    // addTodo(newTodoValue);
    // setOpenModal(false);
    props.submitEvent(newTodoValue);
    navigate('/')
  };

  return (
    <form onSubmit={onSubmit}>
      <label>{props.label}</label>
      <textarea
        value={newTodoValue}
        onChange={onChange}
        placeholder="Cortar la cebolla oara el almuerzo"
      />
      <div className="TodoForm-buttonContainer">
        <button
          type="button"
          className="TodoForm-button TodoForm-button--cancel"
          onClick={onCancel}
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="TodoForm-button TodoForm-button--add"
        >
          {props.submitText}
        </button>
      </div>
    </form>
  );
}

export { TodoForm };
