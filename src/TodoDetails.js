import { useHistory,useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { AiOutlineEdit, AiFillSetting } from 'react-icons/ai'
import axios from 'axios';
const TodoDetails = () => {
    const { id } = useParams();
    const [todo,setTodo] = useState('');
    const [edit,setEdit] = useState(false)
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
        <div >
            {todo && 
            <div className="todo-details">
                <div className="todo-details-title">
                    <h1>{todo.name}</h1>
                </div>
                <div className="todo-details-content">
                    <div>
                        <h3>Description</h3>
                    </div>
                    <div>

                    </div>
                    <div className="todo-details-desc">
                        <p>{todo.description}</p>
                    </div>
                    <div className="todo-details-infos">
                        <p>Priority: {todo.priority}</p>
                        <p>Difficulty: {todo.difficulty}/5</p>
                        <p>Created: {todo.creation_date}</p>
                        <AiOutlineEdit size={24}/>
                    </div>
                </div>  
                                        
                
            </div>
            }
        </div>
     );
}
 
export default TodoDetails;