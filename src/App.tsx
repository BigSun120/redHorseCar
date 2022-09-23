import React, { useState, FC, lazy } from 'react'
import { BrowserRouter, HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import './assets/styles/index.css'
import { routers } from './configs/routers';


const Login = lazy(() => import('./pages/Login'))
const Reg = lazy(() => import('./pages/Reg'))
const NavPage = lazy(() => import('./pages/homePageView/HomePageView'))
// const User = React.lazy(() => import('./pages/system/user'))

const App: FC = () => {
  function renderRoutes(routers: any[]) {
    return <>
      {
        routers.map(a => {
          if (a.children) {
            // console.log('a.element', a.path, a.element);
            return <Route path={a.path} element={<a.element />} key={a.path}>
              {renderRoutes(a.children)}
            </Route>
          }
          return <Route path={a.path} element={<a.element />} key={a.path}></Route>
        })
      }
    </>
  }

  return (
    // <React.Suspense fallback={<div style={{ opacity: 0 }}></div>}>
    <React.Suspense fallback={<h1>loading......</h1>}>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Navigate to="login" />}></Route>
          <Route path="/login" element={<Login />} />
          <Route path="/reg" element={<Reg />} /> */}
          {
            renderRoutes(routers)
          }
        </Routes>
      </BrowserRouter>
    </React.Suspense >
  )
}
export default App
