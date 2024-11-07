const key = '3NQD9cXtH7DNOti92zqB';
      const map = L.map('map').setView([13,80], 7);
      const layer = L.tileLayer(`https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=${key}`,{
       tileSize: 512,
       zoomOffset: -1,
       minZoom: 1,
      }).addTo(map);

      var myIcon1 = L.icon({ 
      iconUrl: 'https://www.svgrepo.com/show/312483/location-indicator-red.svg',
      iconSize: [50,50]
      });
      L.marker([12.922915, 80.127457], {icon: myIcon1}).addTo(map);
      L.marker([12.683995,79.983345], {icon: myIcon1}).addTo(map); L.marker([12.504760, 79.893440], {icon: myIcon1}).addTo(map);


var myIcon = L.icon({ 
      iconUrl: 'https://svgsilh.com/svg/2386838.svg',
      iconSize: [60, 95]
      });
      L.marker([12.922915, 80.127457], {icon: myIcon}).addTo(map);

      
      var latlngs = [
      [12.922915, 80.127457],
      [12.683995,79.983345],
      [12.504760, 79.893440]
      ];

      var polyline = L.polyline(latlngs, {color: 'green', weight:8}).addTo(map);

      // zoom the map to the polyline
      map.fitBounds(polyline.getBounds());