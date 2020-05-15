import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import HomePage from './pages/Home';
import RequirementsPage from './pages/Requirements';
import BuildingBlocksPage from './pages/BBs';
import BBIsPage from './pages/BBIs';
import SignInPage from './pages/SignIn';

import AdminRequirementPage from './pages/AdminPages/requirement';
import AdminBBPage from './pages/AdminPages/bb';
import AdminBBIPage from './pages/AdminPages/bbi';

import Sidebar from './components/Sidebar';
import ProgressBar from './components/ProgressBar';

import { MatchingProvider } from './contexts/matching'
import { RequirementsProvider } from './contexts/requirements'
import { BlocksProvider } from './contexts/blocks'
import { AdminProvider } from './contexts/admin'
import { CapDialogProvider } from './contexts/cap-dialog'
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
                    <Switch>
                        <Route path="/" exact component={HomePage}/>
                        <Route path="/requirements" exact component={RequirementsPage}/>
                        <Route path="/bbs" exact component={BuildingBlocksPage}/>
                        <Route path="/bbis/:id" exact component={BBIsPage}/>
                        <Route path="/login" exact component={SignInPage}/>
                        <Route path="/admin/requirement" exact component={AdminRequirementPage}/>
                        <CapDialogProvider>
                          <Route path="/admin/bb" exact component={AdminBBPage}/>
                        </CapDialogProvider>
                        <Route path="/admin/bbu" exact component={AdminBBIPage}/>
                    </Switch>
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