import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import AccountPage from "./elements/AccountPage";
import LoginPage from "./elements/LoginPage";
import RegisterPage from "./elements/RegisterPage";
import React from "react";
import TravelPage from "./elements/TravelPage";
import MapPage from "./elements/MapPage";
import HelpPage from "./elements/HelpPage";

function App() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<LoginPage />}/>
                <Route path='/register' element={<RegisterPage />}/>
                <Route path='/login' element={<LoginPage />}/>
                <Route path='/account' element={<AccountPage />}/>
                <Route path='/travels' element={<TravelPage />}/>
                <Route path='/map' element={<MapPage />}/>
                <Route path='/help' element={<HelpPage />}/>
            </Routes>
        </Router>
    );
}

export default App;
