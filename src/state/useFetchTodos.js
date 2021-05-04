import { useState, useEffect } from 'react';
import axios from 'axios';
const useFetchTodos = (url) => {
    const [todos,setTodos] = useState(null);
    const [error,setError] = useState(null)
    
    useEffect(() => {
      axios.get(url)
        .then(res=>{
          console.log(res.data.todos)
          const data = res.data.todos;
          setTodos(data);
          setError(null);
        })
        .catch(err => {
          setError(err.message)
        })
    },[url]);

      return {todos,error};
}
 
export default useFetchTodos;