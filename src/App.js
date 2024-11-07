// import React, { useState, useEffect } from 'react';
// import './Map.css';
// import { MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import L from 'leaflet';
// import axios from 'axios';

// function App() {
//   const carIcon = L.icon({
//     iconUrl: 'https://svgsilh.com/svg/2386838.svg',
//     iconSize: [60, 95],
//     iconAnchor: [12.5, 41]
//   });
//   const lIcon = L.icon({
//     iconUrl: 'https://beaconconverters.com/wp-content/uploads/2019/10/icon-bullet-point.png',
//     iconSize: [30, 30]
//   });
  
//  const [position, setPosition] = useState([13,80]);
//   // Poll server every 2 seconds to get vehicle location updates
//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       axios.get('http://localhost:3001/vehicle-location')
//         .then((response) => {
//           setPosition(response.data);
//         })
//         .catch((error) => {
//           console.error('Error fetching vehicle location:', error);
//         });
      
  
//     }, 2000);

//     return () => clearInterval(intervalId);
//   }, []);
 
// return (
//   <div className="App">
//     <h1>Vehicle Movement on Map</h1>
//     <MapContainer center={position} zoom={8} style={{ height: '100vh', width: '100%' }}>
//       <TileLayer
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//       />
//       <Marker position={position}  icon={carIcon}>
//         <Popup>
//         <p>Driver Name: john</p>
//         <p>Age: 35</p>
//         <p>Speed: 40kmph</p>
//         <p>Address:39, Nehruji St, Anandapuram, East Tambaram, Tambaram, Chennai, Tamil Nadu 600059<br /></p>
//         <p>Date: 30/10/2024 07:30:22 AM</p>
//         </Popup>
//       </Marker>
//       <Marker position={position}  icon={lIcon}/>
//       {/* <div class="card text-center">
//          <h5 class="card-title">Configure</h5>
//          <div class="dropdown">
//              <button class="btn btn-light dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Today</button>
//              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
//                <a><button type="button" className="btn" onClick={today}>Today</button></a>
//                <a><button type="button" className="btn" onClick={yesterday}>Yesterday</button></a>
//                <a><button type="button" className="btn" onClick={previousweek}>Previous Week</button></a>
//              </div>
//          </div>
//       </div> */}
//     </MapContainer>
//   </div>
//   );
// }

// export default App;



import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
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
