import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import ItemsScreen from './screens/ItemsScreen';
import NavBar from './components/NavBar';
import LoginScreen from './screens/LoginScreen';


function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route path="/login">
          <LoginScreen />
        </Route>
        <Route path="/">
          <ItemsScreen />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
