import React, {useRef, useState} from 'react';
import Map from './blocks/Map';
import {ToastContainer} from "react-toastify";
import LeftMenu from "./blocks/LeftMenu";

const MapPage = () => {
    const [location, setLocation] = useState('');
    const [markers, setMarkers] = useState([53.1957187, 50.1009541]);

    const handleSearch = () => {
        // Using a Geocoding service to get coordinates from location name
        fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${location}`)
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    const { lat, lon } = data[0];
                    const newPosition = [lat, lon];
                    setMarkers(newPosition);
                } else {
                    alert('Location not found');
                }
            })
            .catch(error => console.error('Error:', error));
    };

    return (
        <div className="container">
            <ToastContainer />
            <div className="left-column">
                <LeftMenu />
            </div>
            <div className="right-column map-box">
                <Map marker={markers} />
                <div>
                    <input
                        className="map-search"
                        type="text"
                        placeholder="Поиск по местам"
                        value={location}
                        onChange={e => setLocation(e.target.value)}
                    />
                </div>
                <button className="orange-btn" onClick={handleSearch}>Найти</button>

            </div>
        </div>
    );
};

export default MapPage;