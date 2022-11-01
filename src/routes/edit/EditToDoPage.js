import React from "react";
import { TodoForm } from '../../ui/TodoForm';
import { useTodos } from '../useTodos'
import { useParams, useLocation } from 'react-router-dom'
function EditTodoPage() {

    const params = useParams();
    const location = useLocation();
    const currentId = Number(params?.id || '1')

    const { state ,stateUpdaters } = useTodos();
    const { editTodo } = stateUpdaters;
    const { getTodo, loading } = state;

    if(loading) {
        return (
            <>
                <p>Cargando...</p>
            </>
        )
    } else {
        const todo = getTodo(currentId)
        const todoText = location.state?.todo.text || todo?.text
        // const todoText = location.state?.todo.text || ''
        return (
            <>
                <TodoForm
                    // addTodo={() => {}}
                    // setOpenModal={() => {}}
                    defaultTodoText={todoText}
                    submitEvent={(newText) => editTodo(currentId, newText)}
                    submitText={'Editar'}
                    label={'edita todo'}
                />
            </>
        )
    }
}

export { EditTodoPage }