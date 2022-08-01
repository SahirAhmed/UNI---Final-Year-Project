import React from 'react'
import { Routes, Route } from 'react-router-dom';

import Home from './routes/Home';
import About from './routes/About';
import Register from './routes/Register';
import ContainerToast from '../src/Toast/ContainerToast'
import Profile from './routes/Profile';
import ProfileCharity from './routes/ProfileCharity';
import Charities from './routes/Charities';
import Fundraisers from './routes/Fundraisers';
import CharityLandingPage from './routes/CharityLandingPage';
import CharityEditLandingPage from './routes/CharityEditLandingPage';
import FundraiserLandingPage from './routes/FundraiserLandingPage';
import FundraiserEditLandingPage from './routes/FundraiserEditLandingPage';
import Statistics from './routes/Statistics';
import IDLB from './routes/IDLB';
import CDLB from './routes/CDLB';
import FDLB from './routes/FDLB';
import Minigames from './routes/Minigames';

function App() {
  return (
    <>
       <ContainerToast/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/register' element={<Register />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/profilecharity' element={<ProfileCharity />} />
        <Route path='/charities' element={<Charities />} />
        <Route path='/fundraisers' element={<Fundraisers />} />
        <Route path='/charitylandingpage/:id' element={<CharityLandingPage />} />
        <Route path='/charityeditlandingpage' element={<CharityEditLandingPage />} />
        <Route path='/fundraiserlandingpage/:id' element={<FundraiserLandingPage />} />
        <Route path='/fundraisereditlandingpage' element={<FundraiserEditLandingPage />} />
        <Route path='/statistics' element={<Statistics />} />
        <Route path='/statistics/idlb' element={<IDLB />} />
        <Route path='/statistics/cdlb' element={<CDLB />} />
        <Route path='/statistics/fdlb' element={<FDLB />} />
        <Route path='/minigames' element={<Minigames />} />
      </Routes>
    </>
  );
}

export default App;
