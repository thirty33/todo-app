import React from "react";
import { TodoForm } from '../../ui/TodoForm';
import { useTodos } from '../useTodos'

function NewTodoPage() {
    
    const { stateUpdaters } = useTodos();
    const { addTodo } = stateUpdaters;

    return (
        <>
            <TodoForm
                // addTodo={() => {}}
                // setOpenModal={() => {}}
                submitEvent={(text) => addTodo(text)}
                submitText={'Añadir'}
                label={'Escribe tu nuevo todo'}
            />
        </>
    )
}

export { NewTodoPage }