import React, { useState, FC } from 'react'
import { BrowserRouter, HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import './assets/styles/index.css'

const Login = React.lazy(() => import('./pages/Login'))
const Reg = React.lazy(() => import('./pages/Reg'))
const NavPage = React.lazy(() => import('./pages/navPage'))
// const NavPage = React.lazy(() => import('./pages/NavPage'))


const App: FC = () => (
  <React.Suspense>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="login" />}></Route>
        <Route path="/login" element={<Login />} />
        <Route path="reg" element={<Reg />} />
        <Route path="nav" element={<NavPage />} />
      </Routes>
    </BrowserRouter>
  </React.Suspense>
)

export default App
