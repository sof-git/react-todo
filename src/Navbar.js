import { Link } from "react-router-dom";
const Navbar = () => {
    return ( 
        <nav className="navbar">
            <h1>My Todo App</h1>
            <div className="links">
                <Link to="/">Home</Link>
                <Link to="/register">Register</Link>
                <Link to="/addTodo">Add a todo</Link>
            </div>

        </nav>
     );
}
 
export default Navbar;