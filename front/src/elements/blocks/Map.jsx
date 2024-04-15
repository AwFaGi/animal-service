import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const Map = ({ marker }) => {
    useEffect(() => {
        // Create map instance
        const map = L.map('map').setView(marker, 14);

        // Add OpenStreetMap tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        return () => {
            // Clean up map instance
            map.remove();
        };
    }, [marker]);

    return <div id="map" style={{ width: '100%', height: '400px' }} />;
};

export default Map;