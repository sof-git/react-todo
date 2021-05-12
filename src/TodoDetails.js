import { useHistory,useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { AiOutlineEdit } from 'react-icons/ai'
import {BsFillTrashFill} from 'react-icons/bs'
import moment from 'moment'
import axios from 'axios';

const TodoDetails = () => {
    const { id } = useParams();
    const [date,setDate] = useState('');
    const [todoId,setTodoId] = useState('');
    const [todo,setTodo] = useState({_id:'',name:'',description:'',difficulty:'',priority:''});
    const [edit,setEdit] = useState(false);
    const [confirmation, setConfirmation] = useState(false);
    const [nameInputClass,setnameInputClass] = useState('form-input-name field');
    const [descInputClass,setDescInputClass] = useState('form-input-desc field');
    useEffect( () =>{
      const  fetchData = async()=>{
            const res = await axios.get('http://localhost:1000/api/getTodo', {params:{name:id}})
            setTodo(res.data.todo)
            setTodoId(res.data.todo._id)
            const date = moment(res.data.todo.creation_date).format('DD/MM/YYYY');
            setDate(date)
        }
        fetchData();
    },[])
        
    const handleDelete = React.useCallback((todoId)=>{
        axios.delete('http://localhost:1000/api/deleteTodo/',{data:{id:todoId}})
    },[])

    const handleUpdate = async (e)=>{
        e.preventDefault();
        const update = {id:todo._id,name:todo.name,description:todo.description,difficulty:todo.difficulty,priority:todo.priority};
        const res = await axios.post('http://localhost:1000/api/updateTodo/',update)
        console.log(res.data.name)
        window.location = "http://localhost:3000/todoDetails/"+res.data.name;
    }

    return ( 
        <div>
            {!edit && todo && 
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
                        <p>Created: {date}</p>
                        <div>
                            <AiOutlineEdit onClick={() => {setEdit(true)}} size={24}/>
                            <BsFillTrashFill size={24}/>
                        </div>
                    </div>
                </div>  
                                        
                
            </div>
            }
            {edit && <div className="todo-details">
               <form  onSubmit={handleUpdate} className="form-addTodo">
                    <label>Name</label>
                    <input 
                        type="text"
                        className={nameInputClass}
                        value={todo.name}
                        onChange={(e) => setTodo({...todo,name:e.target.value})}
                    />
                    <label>Description</label>
                    <textarea
                        value={todo.description}
                        className={descInputClass}
                        onChange={(e) => setTodo({...todo,description:e.target.value})}
                    >
                    </textarea>
                    <label>Priority</label>
                    <select
                        value={todo.priority}
                        onChange={(e) => setTodo({...todo,priority:e.target.value})}
                    >
                        <option value="low">Low</option>
                        <option value="minor">Minor</option>
                        <option value="moderate">Moderate</option>
                        <option value="significant">Significant</option>
                        <option value="required">Required</option>
                        <option value="highest">Highest</option>
                    </select>
                    <label>Difficulty</label>
                        <select
                            defaultValue={todo.difficulty}
                            onChange={(e) => setTodo({...todo,difficulty:e.target.value})}
                        >
                            <option type="number" value="1">1 - Too easy</option>
                            <option value="2">2 - Easy</option>
                            <option value="3">3 - Medium</option>
                            <option value="4">4 - Hard</option>
                            <option value="5">5 - Extreme</option>
                        </select>
                    <div className="buttons">
                        <button className="btn " onClick={()=>{setEdit(false)}}>Cancel</button>
                        <button className="btn ">Submit</button>
                    </div>
                    
               </form>
                
                
            </div>}
        </div>
     );
}
 
export default TodoDetails;