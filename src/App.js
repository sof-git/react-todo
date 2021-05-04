import Home from './Home';
import './style/App.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AddTodo from './AddTodo';
import TodoDetails from './TodoDetails';
import Navbar from './Navbar';


function App() {

  return (
    <Router>
      <div className="App">
      <Navbar/>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/addTodo">
            <AddTodo />
          </Route>
          <Route path="/todoDetails/:id">
            <TodoDetails />
          </Route>
        </Switch>
      </div>
    </Router>

  );
}

export default App;
