import React from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

import HomePage from './pages/Home';
import RequirementsPage from './pages/Requirements';
import BuildingBlocksPage from './pages/BBs';

import Sidebar from './components/Sidebar';
import ProgressBar from './components/ProgressBar';

export default function Routes() {
    return (
        <BrowserRouter>
            <div className="container">
              <Sidebar />

              <div className="parent">
                <ProgressBar />

                <div className="content">
                  <Switch>
                      <Route path="/" exact component={HomePage}/>
                      <Route path="/requirements" exact component={RequirementsPage}/>
                      <Route path="/bbs" exact component={BuildingBlocksPage}/>
                  </Switch>
                </div>

              </div>
            </div>
        </BrowserRouter>
    )
}