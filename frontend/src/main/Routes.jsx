import React from 'react';
import { Switch, Route, Redirect } from 'react-router';

import Home from '../user/Home';
import Register from '../user/Register';
import User from '../user/User';
import Delete from '../user/Delete';
import ERRO from '../user/ERRO';

export default () => ( 
  <Switch>
    <Route exact path='/' component={Home} />
    <Route path='/register' component={Register} />
    <Route path='/users' component={User} />
    <Route path='/delete' component={Delete} />
    <Route path='/erro' component={ERRO} />
    <Redirect from='*' to='/erro' />
  </Switch>
);