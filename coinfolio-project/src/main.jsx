import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Portfolio from './components/portfolio.jsx';
import Asset from './components/Asset.jsx';
import Summary from './components/Summary.jsx';
import Nav from './components/Nav.jsx';
import PriceTable from './components/PriceTable.jsx';
import { UserAndPriceTableProvider } from './UserAndPriceTableContext.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserAndPriceTableProvider>
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<PriceTable />} />
        <Route path="portfolio/:user" element={<Portfolio />}>
          <Route index element={<Summary />} />
          <Route path="asset" element={<Asset />} />
          {/* Define other nested routes for Portfolio here */}
        </Route>
        {/* Define other routes */}
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </BrowserRouter>
    </UserAndPriceTableProvider>
  </React.StrictMode>,
);
