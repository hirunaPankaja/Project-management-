import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import 'leaflet-draw';

function Map() {
  useEffect(() => {
    // Check if map is already initialized
    if (L.DomUtil.get('map') !== null) {
      L.DomUtil.get('map')._leaflet_id = null;
    }

    const sriLankaBounds = [
      [5.87, 79.65],
      [9.83, 81.95],
    ];

    const map = L.map('map', {
      maxBounds: sriLankaBounds,
      maxBoundsViscosity: 1.0,
      minZoom: 7,
      maxZoom: 16,
    }).setView([7.8731, 80.7718], 7);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    map.on('drag', function () {
      map.panInsideBounds(sriLankaBounds, { animate: false });
    });

    const drawnItems = new L.FeatureGroup();
    map.addLayer(drawnItems);

    const drawControl = new L.Control.Draw({
      edit: {
        featureGroup: drawnItems,
      },
    });
    map.addControl(drawControl);

    map.on(L.Draw.Event.CREATED, function (event) {
      const layer = event.layer;
      drawnItems.addLayer(layer);

      const shape = layer.toGeoJSON();
      const shapeForDb = JSON.stringify(shape);
      console.log('Coordinates of the drawn shape:', shapeForDb);

      alert('Shape coordinates have been logged to the console.');
    });

    window.addMarker = function () {
      const lat = parseFloat(document.getElementById('latitude').value);
      const lng = parseFloat(document.getElementById('longitude').value);
      const details = document.getElementById('details').value;

      if (isNaN(lat) || isNaN(lng) || lat < 5.87 || lat > 9.83 || lng < 79.65 || lng > 81.95) {
        alert('Please enter valid latitude and longitude values within Sri Lanka.');
        return;
      }

      const marker = L.marker([lat, lng]).addTo(map).bindPopup(`Marker at [${lat}, ${lng}]`).openPopup();

      map.setView([lat, lng], 13);

      marker.details = details;
      marker.on('click', function (e) {
        displayMarkerDetails(e.target);
      });
    };

    function displayMarkerDetails(marker) {
      const detailsPanel = document.getElementById('marker-details');
      const shareLink = document.getElementById('share-link');

      detailsPanel.innerHTML = `
        <p>Latitude: ${marker.getLatLng().lat}</p>
        <p>Longitude: ${marker.getLatLng().lng}</p>
        <p>Details: ${marker.details}</p>
      `;

      shareLink.href = `https://www.openstreetmap.org/?mlat=${marker.getLatLng().lat}&mlon=${marker.getLatLng().lng}#map=18/${marker.getLatLng().lat}/${marker.getLatLng().lng}`;
      shareLink.style.display = 'block';

      document.getElementById('side-panel').style.display = 'block';
    }

  }, []); // Ensure effect runs only once

  return (
    <div>
      <h3>Draw on the Map or Enter Coordinates in Sri Lanka</h3>
      <div id="form">
        <label htmlFor="latitude">Latitude:</label>
        <input type="text" id="latitude" name="latitude" />
        <label htmlFor="longitude">Longitude:</label>
        <input type="text" id="longitude" name="longitude" />
        <label htmlFor="details">Details:</label>
        <textarea id="details" name="details"></textarea>
        <button onClick={() => window.addMarker()}>Add Marker</button>
      </div>
      <div id="map" style={{ height: '600px', width: '70%', float: 'left' }}></div>
      <div id="side-panel" style={{ width: '30%', height: '600px', float: 'left', padding: '20px', display: 'none', boxSizing: 'border-box' }}>
        <h2>Marker Details</h2>
        <div id="marker-details"></div>
        <a id="share-link" href="#" target="_blank" style={{ display: 'none' }}>View on OpenStreetMap</a>
      </div>
    </div>
  );
}

export default Map;
