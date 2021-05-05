import TodosList from './TodosList';
import useFetchTodos from './state/useFetchTodos';
import { Link } from 'react-router-dom';
const Home = () => {
    const {todos} = useFetchTodos('http://localhost:1000/api/todos')
    const empty = todos && todos.length ? true : false;
    return ( 
        <div className="home">
            <h1>My Todos</h1>
            {todos && <TodosList data={todos}/>}     
            {!empty && <p className="warning-message">no todos were found. You could start by adding one <Link to="/addTodo">here</Link></p>}       
        </div>
     );
}
 
export default Home;