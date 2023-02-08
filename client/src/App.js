import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import About from './Components/About';
import NoteState from './Contexts/notes/noteState';
import Login from './Components/Login'
import SignUp from './Components/SignUp'
import AuthState from './Contexts/auth/AuthState';


function App() {
  return (
    <>
      <AuthState>
        <NoteState>
          <Router>
            <Navbar />
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/about">
                <About />
              </Route>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route exact path="/signup">
                <SignUp />
              </Route>
            </Switch>
          </Router>
        </NoteState>
      </AuthState>
    </>
  );
}

export default App;