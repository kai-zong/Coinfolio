import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Portfolio from './components/portfolio/portfolio.jsx';
import Transactions from './components/portfolio/transaction/Transactions.jsx';
import Summary from './components/portfolio/Summary.jsx';
import Nav from './components/Nav.jsx';
import PriceTable from './components/home/PriceTable.jsx';
import { UserAndPriceTableProvider } from './UserAndPriceTableContext.jsx';
import {Auth0Provider, useAuth0} from '@auth0/auth0-react';
import config from './config.js';
import VerifyUser from './components/VerifyUser.jsx';
import Profile from './components/portfolio/Profile.jsx';
import AuthDebugger from './components/AuthDebugger.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
const requestedScopes = ["profile", "email"];

function RequireAuth({ children }) {
  const { isAuthenticated, isLoading } = useAuth0();

  // If the user is not authenticated, redirect to the home page
  if (!isLoading && !isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Otherwise, display the children (the protected page)
  return children;
}

root.render(
  <React.StrictMode>
    <Auth0Provider
  domain={config.REACT_APP_AUTH0_DOMAIN}
  clientId={config.REACT_APP_AUTH0_CLIENT_ID}
  authorizationParams={{
    redirect_uri: `${window.location.origin}/verify-user`,
    audience: config.REACT_APP_AUTH0_AUDIENCE,
    scope: requestedScopes.join(" "),
  }}
  >
    <UserAndPriceTableProvider>
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<PriceTable />} />
        <Route path="verify-user" element={<VerifyUser/>} />
        <Route path="portfolio" element={
          <RequireAuth>
            <Portfolio />
          </RequireAuth>
        }>
          <Route index element={<Summary />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="profile" element={<Profile />} />
          {/* Define other nested routes for Portfolio here */}
        </Route>
        {/* Define other routes */}
        <Route path="debugger" element={<AuthDebugger />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </BrowserRouter>
    </UserAndPriceTableProvider>
    </Auth0Provider>
  </React.StrictMode>,
);
