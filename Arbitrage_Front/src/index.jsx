import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import "./style/style.scss"
import Login from './Login';
import Register from './Register';
import ForgotPassword from './forgotPassword';
import ResetPassword from './ResetPassword';
import { AuthProvider } from './AuthContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthProvider>
        <BrowserRouter>
            <Routes>
                <Route path='/password-reset/:token/:email' element={<ResetPassword />} />
                <Route path='/forgot-password' element={<ForgotPassword />} />
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login />} />
                <Route path='*' element={<App />} />
            </Routes>
        </BrowserRouter>
    </AuthProvider>
);

// const appRoot = ReactDOM.createRoot(document.getElementById('app-root'));
// appRoot.render(
//     <BrowserRouter>
//         <Routes>
//             <Route path='/login' element={<Login />} />
//         </Routes>
//     </BrowserRouter>
// );
