import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import HomePage from './pages/Home';
import RequirementsPage from './pages/Requirements';
import BuildingBlocksPage from './pages/BBs';
import BBIsPage from './pages/BBIs';

import AdminRequirementPage from './pages/AdminPages/requirement';
import AdminBBPage from './pages/AdminPages/bb';
import AdminBBIPage from './pages/AdminPages/bbi';
import MatchingPanel from './pages/AdminPages/matching';

import Sidebar from './components/Sidebar';
import ProgressBar from './components/ProgressBar';

import { MatchingProvider } from './contexts/matching'
import { RequirementsProvider } from './contexts/requirements'
import { BlocksProvider } from './contexts/blocks'
import { AdminProvider } from './contexts/admin'
import { NewBBProvider } from './contexts/new-bb'
import { NewBBIProvider } from './contexts/new-bbi'
import { NewMatchProvider } from './contexts/new-match'
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
                 <AdminProvider>
                 <NewBBProvider>
                 <NewBBIProvider>
                 <NewMatchProvider>
                  <Switch>
                    <Route path="/" exact component={HomePage}/>
                    <Route path="/requirements" exact component={RequirementsPage}/>
                    <Route path="/bbs" exact component={BuildingBlocksPage}/>
                    <Route path="/bbis/:id" exact component={BBIsPage}/>
                    <Route path="/admin/requirement" exact component={AdminRequirementPage}/>
                    <Route path="/admin/bbi" exact component={AdminBBIPage}/>
                    <Route path="/admin/building-block" exact component={AdminBBPage}/>
                    <Route path="/admin/matching" exact component={MatchingPanel}/>
                  </Switch>
                 </NewMatchProvider>
                 </NewBBIProvider>
                 </NewBBProvider>
                 </AdminProvider>
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