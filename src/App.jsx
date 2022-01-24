import React from 'react';
import { BrowserRouter as Router,Routes, Route} from 'react-router-dom';
import { Home } from './pages/Home';
import { Timezone } from './pages/Timezone';

export function App() {
  return (
        <Router>
            <Routes>
                <Route index path="/" element={<Home/>}></Route>
                <Route path="/timezones/:id" element={<Timezone/>}></Route>
            </Routes>
        </Router>
    );
    /* <Route path='/home' component={Home}/> */
    /* <Route path='/timezones' component={Timezone}/> */
}
