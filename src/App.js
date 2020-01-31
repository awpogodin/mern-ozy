import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Navbar from './components/Navbar';
import ItemsScreen from './screens/ItemsScreen';
import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/profile">
          <ProfileScreen />
        </Route>
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
