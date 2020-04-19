import React from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

import Home from './pages/Home';

export default function Routes() {
    return (
        <BrowserRouter>
            <div class="container">
              <div class="sidemenu">
                <ul class="sidemenu-list">
                  <li>
                    <Link to="/"></Link>
                  </li>
                </ul>
              </div>

              <div class="content">
                <Switch>
                    <Route path="/" exact component={Home}/>
                </Switch>
              </div>
            </div>
        </BrowserRouter>
    )
}