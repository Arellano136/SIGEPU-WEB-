import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthContext from '../config/context/auth-context';
import AdminLayout from '../module/admin/AdminLayout';
import SignInPage from '../module/auth/SingInpage';
import Home from '../module/admin/Home';
import Orders from '../module/admin/Orders';
import Clients from '../module/admin/Clients.jsx';
import Profile from '../module/admin/Profile';
import Workers from '../module/admin/Workers';
import Inventary from'../module/admin/Inventary';
const AppRouter = () => {
    const { user } = useContext(AuthContext);

    return (
        <BrowserRouter>
            <Routes>
                {user.signed ? (
                    <Route path='/*' element={<AdminLayout/>}>
                        <Route path='home' element={<Home/>} />
                        <Route path='inventary' element={<Inventary/>} />
                        <Route path='orders' element={<Orders/>} />
                        <Route path='clients' element={<Clients/>} />
                        <Route path='workers' element={<Workers/>} />
                        <Route path='profile' element={<Profile />} />
                    </Route>
                ) : (
                    <Route path='/*' element={<SignInPage />} />
                )}
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;
