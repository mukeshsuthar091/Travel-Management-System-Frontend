import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';

import Home from './../pages/Home';
import Tours from './../pages/Tours';
import TourDetails from './../pages/TourDetails';
import Login from './../pages/Login';
import Register from './../pages/Register';
import SearchResultList from './../pages/SearchResultList';
import ThankYou from '../pages/ThankYou';
import Gallery from '../pages/Gallery';
import Success from '../pages/success';
import Cancel from '../pages/cancel';


const Routers = () => {
  return (
    <Routes>
        <Route path='/' element={<Navigate to="/home"/>} />
        <Route path='/home' element={<Home/>} />
        <Route path='/gallery' element={<Gallery/>} />
        <Route path='/tours' element={<Tours/>} />
        <Route path='/tours/:id' element={<TourDetails/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/tours/search' element={<SearchResultList/>} />
        <Route path='/success' element={<Success/>} />
        <Route path='/cancel' element={<Cancel/>} />
        <Route path='/thank-you' element={<ThankYou/>} />
    </Routes>
  )
}

export default Routers