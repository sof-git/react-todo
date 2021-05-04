import { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom';
const AddTodo = () => {

    const [todoName, setTodoName] = useState('');
    const [description,setDescription] = useState('');
    const [difficulty, setDifficulty] = useState(1);
    const [error,setError] = useState(false);
    const history = useHistory();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const creation_date = Date.now()
        const todo = {name:todoName,description,difficulty,creation_date};
        console.log(todo)
        try {
            const res = await axios.post('http://localhost:1000/api/addTodo',todo);
            console.log(res)
            if (res.status === 200){
                
               // history.push('/')
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

            <h1>Add a todo</h1>
            <form onSubmit={handleSubmit}>
                <label>Todo name</label>
                <input 
                    type="text"
                    required
                    value={todoName}
                    onChange={(e) => setTodoName(e.target.value)}
                    className="form-input-name field"
                />
                <label>Description</label>
                <textarea
                    className="form-input-desc field"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                >
                </textarea>
                <select 
                    className="form-select-diff field"
                    required
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                >
                    <option value="">Chose difficulty</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </select>
                <button className="form-submit">Add todo</button>
            </form>
        </div>
     );
}
 
export default AddTodo;