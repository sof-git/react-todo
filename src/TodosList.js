import React from 'react';
import { Link } from 'react-router-dom';



const TodosList = (data) => {
    const todos = data.data;
    
    return ( 
        <div className="todo-card-list">
            {todos.map( todo => (
                <Link className="todo-card" to={`/todoDetails/${todo.name}`} key={todo._id}>
                    <h3 className="todo-card-title">{todo.name}</h3>
                    <div className="todo-card-desc difficulty"><p>difficulty: {todo.difficulty}</p></div>            
                    <div className="todo-card-desc priority"><p>Priority: {todo.priority}</p></div>
                </Link>
            ))}
        </div>
     );
}
 
export default TodosList;