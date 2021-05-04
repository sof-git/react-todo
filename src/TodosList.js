import React from 'react';
import axios from "axios";

import { Link } from 'react-router-dom';



const TodosList = (data) => {
    const todos = data.data
    const date = todos

    
    return ( 
        <div>
            {todos.map( todo => (
                <Link className="todo-card" to={`/todoDetails/${todo.name}`} key={todo._id}>
                    <span className="todo-card-color"></span>
                    <h3 className="todo-card-title">{todo.name}</h3>
                    <p className="todo-card-desc">{todo.description_fr}</p>
                    <p className="todo-card-desc difficulty">difficulty: {todo.difficulty}</p>               
                </Link>
            ))}
        </div>
     );
}
 
export default TodosList;