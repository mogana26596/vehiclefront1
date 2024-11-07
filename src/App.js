import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import L from 'leaflet';
function App() {
  const [vehicles, setVehicles] = useState([]);

    const fetchVehicleData = async () => {
        try {
            const response = await axios.get('https://vehicleback1.onrender.com/vehicles');
            setVehicles(response.data);
        } catch (error) {
            console.error('Error fetching vehicle data:', error);
        }
    };

    useEffect(() => {
        fetchVehicleData();

        // Polling every 5 seconds
        const interval = setInterval(() => {
            fetchVehicleData();
        }, 1000);

        return () => clearInterval(interval);
    }, []);


  const lIcon = L.icon({
      iconUrl: 'https://beaconconverters.com/wp-content/uploads/2019/10/icon-bullet-point.png',
    iconSize: [30, 30]
       });

       const carIcon = L.icon({
        iconUrl: 'https://svgsilh.com/svg/2386838.svg',
        iconSize: [60, 95],
        iconAnchor: [12.5, 41]
      });



  return (
    <MapContainer center={[13, 80]} zoom={8} style={{ height: "100vh", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Polyline positions={vehicles} color="black" />

      {vehicles.map((vehicle) => (
        <Marker key={vehicle.id} position={[vehicle.lat, vehicle.lng]} icon={lIcon}></Marker> 
        
      ))}

    </MapContainer>
  );
}

export default App;
