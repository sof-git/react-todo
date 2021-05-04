import { useHistory,useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
const TodoDetails = () => {
    const { id } = useParams();
    const [todo,setTodo] = useState('hello');
    const [confirmation, setConfirmation] = useState(false)
    useEffect( () =>{
      const  fetchData = async()=>{
            const res = await axios.get('http://localhost:1000/api/getTodo', {params:{name:id}})
            setTodo(res.data.todo)
        }
        fetchData();
    },[])
        
    const handleDelete = React.useCallback((todoId)=>{
        axios.delete('http://localhost:1000/api/deleteTodo',{data:{id:todoId}})
    },[])
    return ( 
        <div>
            {todo && 
            <div>
                <h1>{todo.name}</h1>
                <p>{todo.description}</p>
                <p>{todo.creation_date}</p>
                <p>{todo.difficulty}</p>                        
                <button  onClick={() =>handleDelete(todo._id)}>delete</button>
            </div>
            }
        </div>
     );
}
 
export default TodoDetails;