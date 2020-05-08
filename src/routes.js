import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import HomePage from './pages/Home';
import RequirementsPage from './pages/Requirements';
import BuildingBlocksPage from './pages/BBs';
import BBIsPage from './pages/BBIs';

import Sidebar from './components/Sidebar';
import ProgressBar from './components/ProgressBar';

import { MatchingProvider } from './contexts/matching'
import { RequirementsProvider } from './contexts/requirements'
import { BlocksProvider } from './contexts/blocks'
import { BBiPanelProvider } from './contexts/bbi-panel'


export default function Routes() {
    return (
        <BrowserRouter>
            <div className="container">
              <Sidebar />

              <div className="parent">
                <ProgressBar />

                <div className="content">
                 <MatchingProvider>
                 <RequirementsProvider>
                 <BlocksProvider>
                 <BBiPanelProvider>
                    <Switch>
                        <Route path="/" exact component={HomePage}/>
                        <Route path="/requirements" exact component={RequirementsPage}/>
                        <Route path="/bbs" exact component={BuildingBlocksPage}/>
                        <Route path="/bbis/:id" exact component={BBIsPage}/>
                    </Switch>
                 </BBiPanelProvider>
                 </BlocksProvider>
                 </RequirementsProvider>
                 </MatchingProvider>
                </div>

              </div>
            </div>
        </BrowserRouter>
    )
}