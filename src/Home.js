import TodosList from './TodosList';
import useFetchTodos from './state/useFetchTodos';
import { Link } from 'react-router-dom';
const Home = () => {
    const {todos} = useFetchTodos('http://localhost:1000/api/todos')
    const empty = todos && todos.length ? true : false;
    return ( 
        <div>
            <h1>Todos</h1>
            {todos && <TodosList data={todos}/>}     
            {!empty && <div>no todos found you could start by adding one <Link to="/addTodo">here</Link></div>}       
        </div>
     );
}
 
export default Home;