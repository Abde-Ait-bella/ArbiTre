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
import Home from './Home';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthProvider>
        <BrowserRouter>
            <Routes>
                <Route path='/password-reset/:token/:email' element={<ResetPassword />} />
                <Route path='/forgot-password' element={<ForgotPassword />} />
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login />} />
                <Route path='/dashboard/*' element={<App />} />
                <Route path='/*' element={<Home />} />
            </Routes>
        </BrowserRouter>
    </AuthProvider>
);
