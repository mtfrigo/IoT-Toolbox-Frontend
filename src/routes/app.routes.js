import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import HomePage from '../pages/Home';
import RequirementsPage from '../pages/Requirements';
import BuildingBlocksPage from '../pages/BBs';
import BBIsPage from '../pages/BBIs';
import ProcessCreationPage from '../pages/ProcessCreation';
import ProcessExecutionPage from '../pages/ProcessExecution';

import AdminRequirementPage from '../pages/AdminPages/requirement';
import AdminBBPage from '../pages/AdminPages/bb';
import AdminBBIPage from '../pages/AdminPages/bbi';
import MatchingPanel from '../pages/AdminPages/matching';

import Sidebar from '../components/Sidebar';

import { MatchingProvider } from '../contexts/matching'
import { RequirementsProvider } from '../contexts/requirements'
import { AdminProvider } from '../contexts/admin'
import { NewMatchProvider } from '../contexts/new-match'
import { BBiPanelProvider } from '../contexts/bbi-panel'
import { ProcessProvider } from '../contexts/process'


export default function AppRoutes() {
    return (
        <BrowserRouter>
            <div className="container">
              <Sidebar />
              <div className="parent">
                <div className="content">
                 <MatchingProvider>
                 <RequirementsProvider>
                 <BBiPanelProvider>
                 <AdminProvider>
                 <NewMatchProvider>
                 <ProcessProvider>
                  <Switch>
                    <Route path="/" exact component={HomePage}/>
                    <Route path="/requirements" exact component={RequirementsPage}/>
                    <Route path="/bbs" exact component={BuildingBlocksPage}/>
                    <Route path="/bbis/:id" exact component={BBIsPage}/>
                    <Route path="/process-creation" exact component={ProcessCreationPage}/>
                    <Route path="/process-execution" exact component={ProcessExecutionPage}/>
                    <Route path="/admin/requirement" exact component={AdminRequirementPage}/>
                    <Route path="/admin/bbi" exact component={AdminBBIPage}/>
                    <Route path="/admin/building-block" exact component={AdminBBPage}/>
                    <Route path="/admin/matching" exact component={MatchingPanel}/>
                  </Switch>
                 </ProcessProvider>
                 </NewMatchProvider>
                 </AdminProvider>
                 </BBiPanelProvider>
                 </RequirementsProvider>
                 </MatchingProvider>
                </div>
              </div>
            </div>
        </BrowserRouter>
    )
}