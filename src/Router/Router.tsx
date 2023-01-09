import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from '@/components/Home';
import routes from './routes';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.ROOT} element={<Home />} />
        <Route path="*" element={<Navigate to={routes.ROOT} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
