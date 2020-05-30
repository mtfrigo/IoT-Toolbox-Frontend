import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import SignInPage from '../pages/SignIn';
import SignUpPage from '../pages/SignUp';
import HomePage from '../pages/Home';


export default function Routes() {
    return (
        <BrowserRouter>
            <div className="container">
              <div className="parent">
                <div className="content">
                  <Switch>
                    <Route path="/" exact component={SignInPage}/>
                    <Route path="/register" exact component={SignUpPage}/>
                  </Switch>
                </div>
              </div>
            </div>
        </BrowserRouter>
    )
}