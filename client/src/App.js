import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Detail from './pages/Detail';
import NoMatch from './pages/NoMatch';
import Navigation from './components/Nav';
import HomePage from './pages/homePage';
import EventDetailPage from './pages/eventDetailPage';
import User from './pages/users';
import UserProfile from "./pages/userProfile";
import UserEvents from './pages/userEvents';
import CreateEvent from "./pages/createEvent";
import DeleteEvent from "./pages/deleteEvent";

function App() {
  return (
     <Router>
<div>
  <Navigation />
  <Switch>
    <Route exact path='/' component={HomePage}></Route>
    <Route exact path='/events' component={EventDetailPage}></Route>
    <Route exact path='/userEvents' component={UserEvents}></Route>
    <Route exact path='/createEvent' component={CreateEvent}></Route>
    <Route exact path='/deleteEvent' component={DeleteEvent}></Route>
    <Route exact path='/users/:id' component={User}></Route>
    <Route exact path= '/userProfile/:id' component={UserProfile}></Route>
    <Route component={NoMatch} />
  </Switch>
  
</div>
</Router>

  );
}

export default App;


