import React from 'react';
import { useLocalStorage } from './useLocalStorage';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom'

function useTodos() {

  let [searchParams, setSearchParams] = useSearchParams();

  const wordFromPath = searchParams.getAll('search')[0];

  let location = useLocation();
  let navigate = useNavigate();

  const {
    item: todos,
    saveItem: saveTodos,
    sincronizeItem: sincronizeTodos,
    loading,
    error,
  } = useLocalStorage('TODOS_V2', []);

  const [searchValue, setSearchValue] = React.useState('');

  React.useEffect(() => {
    if (searchValue.length > 0) {
      navigate({
        pathname: location.pathname,
        search: `?search=${searchValue}`,
      })
    }
  }, [searchValue])

  const [openModal, setOpenModal] = React.useState(false);

  const completedTodos = todos.filter(todo => !!todo.completed).length;
  const totalTodos = todos.length;

  let searchedTodos = [];

  if (!searchValue.length >= 1) { 

    if(wordFromPath) {
      searchedTodos = todos.filter(todo => {
        const todoText = todo.text.toLowerCase();
        const searchText = wordFromPath.toLowerCase();
        return todoText.includes(searchText);
      });
      setSearchValue(wordFromPath)
    }
    else {
      searchedTodos = todos;
    }

  } else {
    searchedTodos = todos.filter(todo => {
      const todoText = todo.text.toLowerCase();
      const searchText = searchValue.toLowerCase();
      return todoText.includes(searchText);
    });
  }

  const addTodo = (text) => {
    const id = newTodoId(todos);
    const newTodos = [...todos];
    newTodos.push({
      completed: false,
      text,
      id
    });
    // console.log('new todos after crete todo', newTodos)
    saveTodos(newTodos);
  };

  const completeTodo = (id) => {
    const todoIndex = todos.findIndex(todo => todo.id === id);
    const newTodos = [...todos];
    newTodos[todoIndex].completed = true;
    saveTodos(newTodos);
  };

  const editTodo = (id, newText) => {
    const todoIndex = todos.findIndex(todo => todo.id === id);
    const newTodos = [...todos];
    newTodos[todoIndex].text = newText;
    saveTodos(newTodos);
  };

  const deleteTodo = (id) => {
    const todoIndex = todos.findIndex(todo => todo.id === id);
    const newTodos = [...todos];
    newTodos.splice(todoIndex, 1);
    saveTodos(newTodos);
  };

  const getTodo = (id) => todos[todos.findIndex(todo => todo.id === id)]

  const state = {
    loading,
    error,
    totalTodos,
    completedTodos,
    searchValue,
    searchedTodos,
    openModal,
    getTodo
  };

  const stateUpdaters = {
    setSearchValue,
    addTodo,
    completeTodo,
    deleteTodo,
    setOpenModal,
    sincronizeTodos,
    editTodo
  };

  return { state, stateUpdaters };
}

const newTodoId = (todoList) => {

  if (todoList.length < 1) {
    return 1;
  }

  const idList = todoList.map(todo => todo.id)
  return Math.max(...idList) + 1;
}

export { useTodos };
