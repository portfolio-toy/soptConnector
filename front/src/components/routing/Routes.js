import React from 'react';
import { Route, Switch } from 'react-router-dom';

import PrivateRoute from '../routing/PrivateRoute';
import Register from '../auth/Register';
import Login from '../auth/Login';
import Alert from '../layout/Alert';
import Dashboard from '../dashboard/Dashboard';
import CreateProfile from '../profile-forms/CreateProfile';
import Profile from '../profile/Profile';
import Profiles from '../profiles/Profiles';
import EditProfile from '../profile-forms/EditProfile';
import AddEducation from '../profile-forms/AddEducation';
import AddExperience from '../profile-forms/AddExperience';
import Posts from '../posts/Posts';
import Post from '../post/Post';
import Game from '../game/Game';
import Multiplication from '../game/Multiplication';
import WordReply from '../game/WordReply';
import NumberBaseball from '../game/NumberBaseball';
import TicTacToe from '../game/TicTacToe';
import MineSearch from '../game/MineSearch/MineSearch';
import ResponseCheck from '../game/ResponseCheck';
import RSP from '../game/RSP';
import Lotto from '../game/Lotto';
import NotFound from '../layout/NotFound';

const Routes = () => {
  return (
    <section className="container">
      <Alert />
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/profiles" component={Profiles} />
        <Route exact path="/profile/:id" component={Profile} />
        <Route exact path="/game" component={Game} />
        <Route exact path="/Multiplication" component={Multiplication} />
        <Route exact path="/WordReply" component={WordReply} />
        <Route exact path="/RSP" component={RSP} />
        <Route exact path="/Lotto" component={Lotto} />
        <Route exact path="/TicTacToe" component={TicTacToe} />
        <Route exact path="/NumberBaseball" component={NumberBaseball} />
        <Route exact path="/MineSearch" component={MineSearch} />
        <Route exact path="/ResponseCheck" component={ResponseCheck} />

        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/create-profile" component={CreateProfile} />
        <PrivateRoute exact path="/edit-profile" component={EditProfile} />
        <PrivateRoute exact path="/add-education" component={AddEducation} />
        <PrivateRoute exact path="/add-experience" component={AddExperience} />
        <PrivateRoute exact path="/posts" component={Posts} />
        <PrivateRoute exact path="/posts/:id" component={Post} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;