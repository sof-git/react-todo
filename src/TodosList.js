import React from 'react';
import { Link } from 'react-router-dom';
import { useState,useEffect } from 'react';
import moment from 'moment';


const TodosList = (data) => {
    
    const [todos,setTodos] = useState(data.data);
    const [sortType, setSortType] = useState('creation_date');
    
    useEffect(() => {
        const handleSort = (type) => {

          const types = {
            creation_date: 'creation_date',
            priority: 'priority',
            difficulty: 'difficulty',
          };

          const sortProperty = types[type];
          if (sortProperty === 'creation_date'){
            const sorted = [...todos].sort((a, b) => new Date(a[sortProperty]) - new Date(b[sortProperty]));
            setTodos(sorted);
          } else {
            const sorted = [...todos].sort((a, b) => b[sortProperty] - a[sortProperty]);
            setTodos(sorted);
          }

        };
    
        handleSort(sortType);
      }, [sortType]);

    return ( 
        <div className="todo-card-list">
        { todos && <div className="todo-options">
          <h3>Options</h3>
          <select className="todos-options-select" onChange={(e) => setSortType(e.target.value)}>
              <option value="creation_date">Creation date</option>
              <option value="priority">Priority</option>
              <option value="difficulty">Difficulty</option>
          </select>
        </div> }
            {todos && todos.map( todo => (
                <Link className="todo-card" to={`/todoDetails/${todo.name}`} key={todo._id}>
                    <h3 className="todo-card-title">{todo.name}</h3>
                    <div className="todo-card-desc difficulty"><p>difficulty: {todo.difficulty}</p></div>            
                    <div className="todo-card-desc priority"><p>Priority: {todo.priority}</p></div>
                    <div className="todo-card-desc date"><p>Date: {moment(todo.creation_date).format('DD/MM/YYYY')}</p></div>
                </Link>
            ))}
        </div>
     );
}
 
export default TodosList;