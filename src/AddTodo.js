import { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom';
const AddTodo = () => {

    const [todoName, setTodoName] = useState('');
    const [description,setDescription] = useState('');
    const [difficulty, setDifficulty] = useState(1);
    const [priority,setPriority] = useState('Low')
    const [error,setError] = useState(false);
    const [confirmation,setConfirmation] = useState(false);
    const history = useHistory();
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        const creation_date = Date.now()
        const todo = {name:todoName,description,difficulty,priority,creation_date};
        console.log(todo)
        try {
            const res = await axios.post('http://localhost:1000/api/addTodo',todo);
            console.log(res)
            if (res.status === 200){
                setError(false)
                setConfirmation(true)
               const redirect = setTimeout(()=>{
                    history.push('/');console.log('fired') 
                }, 3000);
                return()=>{clearTimeout(redirect)};
            }
        } 
        catch (err) {
            console.error(err)
            setError(true)
        } 
        
    }

    return ( 
        <div className="form-addTodo">
            {error && <div className="error">A task has already the same name</div>}
            {confirmation && <div className="confirmation">The task has been successfully added</div>}
            <h1>Add a todo</h1>
            <form onSubmit={handleSubmit}>
                <label>Todo name
                    <input 
                        type="text"
                        required
                        value={todoName}
                        onChange={(e) => setTodoName(e.target.value)}
                        className="form-input-name field"
                    />
                </label>
                <label>Description
                    <textarea
                        className="form-input-desc field"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    >
                    </textarea>
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
        </div>
     );
}
 
export default AddTodo;