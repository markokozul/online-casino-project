import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './home/Home';
import Header from '../components/layout/Header';

export default function Router() {
  return (
    <Routes>
      <Route path='/' element={<Home />}></Route>
    </Routes>
  );
}
