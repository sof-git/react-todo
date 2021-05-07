import { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom';
const AddTodo = () => {

    const [todoName, setTodoName] = useState('');
    const [description,setDescription] = useState('');
    const [difficulty, setDifficulty] = useState(1);
    const [priority,setPriority] = useState('Low')
    const [ErrorNameMessage,setErrorNameMessage] = useState(false);
    const [confirmation,setConfirmation] = useState(false);
    const [nameErrorClass,setnameErrorClass] = useState('form-input-name field');
    const [descErrorClass,setDescErrorClass] = useState('form-input-desc field');
    
    const [nameError,setNameError] = useState(false);
    const [descError,setDescError] = useState(false);
    const history = useHistory();
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        setNameError(false)
        setnameErrorClass('form-input-name field')
        setDescError(false)
        setDescErrorClass('form-input-desc field')        

        if (!todoName){
            console.log(todoName)
            setNameError(true)
            setnameErrorClass('form-input-name field inputError')

        } if (!description){
            console.log(description)
            setDescError(true)
            setDescErrorClass('form-input-desc field inputError')
        }
        else {
            const creation_date = Date.now();
            const todo = {name:todoName,description,difficulty,priority,creation_date};
            console.log(todo)
            try {
                const res = await axios.post('http://localhost:1000/api/addTodo',todo);
                console.log(res)
                if (res.status === 200){
                    setErrorNameMessage(false)
                    setErrorNameMessage(false)
                    setConfirmation(true)
                    setNameError(false)
                    setnameErrorClass('form-input-name field')
                    setDescError(false)
                    setDescErrorClass('form-input-desc field')        
                   const redirect = setTimeout(()=>{
                        history.push('/');console.log('fired') 
                    }, 3000);
                    return()=>{clearTimeout(redirect)};
                }
    
            } 
            catch (err) {
                if (err.response.status === 409){
                    setErrorNameMessage(true)
                    setnameErrorClass('form-input-name field inputError')
                }
    
            } 
        }

        
    }

    return ( 
        <div className="form-addTodo">

            <h1>Add a todo</h1>
            <form onSubmit={handleSubmit}>
                <label>Todo name
                    <input 
                        type="text"
                        value={todoName}
                        onChange={(e) => setTodoName(e.target.value)}
                        className={nameErrorClass}
                    />
                {ErrorNameMessage && <p className='error'>A task has already the same name</p>}
                {nameError && <p className="error">The field is empty</p>}
                </label>

                <label>Description
                    <textarea
                        className={descErrorClass}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    >
                    </textarea>
                {descError && <p className="error">The field is empty</p>}
                </label>
                <label>Difficulty
                    <select 
                        className="form-select-diff form-select field"
                        required
                        value={difficulty}
                        onChange={(e) => setDifficulty(e.target.value)}
                    >
                        <option type="number" value="1">1 - Too easy</option>
                        <option value="2">2 - Easy</option>
                        <option value="3">3 - Medium</option>
                        <option value="4">4 - Hard</option>
                        <option value="5">5 - Extreme</option>
                    </select>
                </label>
                <label>Priority
                    <select
                        className="field form-select"
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                    >
                        <option value="low">Low</option>
                        <option value="minor">Minor</option>
                        <option value="moderate">Moderate</option>
                        <option value="significant">Significant</option>
                        <option value="required">Required</option>
                        <option value="highest">Highest</option>
                    </select>
                </label>
                <button className="form-submit">Add todo</button>
            </form>
            {confirmation && <div className="confirmation">The task has been successfully added</div>}
        </div>
     );
}
 
export default AddTodo;