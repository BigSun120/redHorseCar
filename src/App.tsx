import React, { useState, FC } from 'react'
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import './assets/styles/common.css'

const Login = React.lazy(() => import('./pages/Login'))
const Reg = React.lazy(() => import('./pages/Reg'))
// const NavPage = React.lazy(() => import('./pages/NavPage'))


const App: FC = () => (
  <React.Suspense>
    <HashRouter>
      <Routes>
        <Route path="/" element={<Navigate to="login" />}></Route>
        <Route path="/login" element={<Login />} />
        <Route path="reg" element={<Reg />} />
        {/* <Route path="nav" element={<NavPage />} /> */}
      </Routes>
    </HashRouter>
  </React.Suspense>
)
// function App() {
//   return (
//     <React.Suspense>
//       <HashRouter>
//         <Routes>
//           <Route path="/" element={<Navigate to="login" />}></Route>
//           <Route path="/login" element={<Login />} />
//           <Route path="reg" element={<Reg />} />
//           {/* <Route path="nav" element={<NavPage />} /> */}
//         </Routes>
//       </HashRouter>
//     </React.Suspense>
//   )
// }

export default App
