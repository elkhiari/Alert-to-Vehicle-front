import React, { useState, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';

mapboxgl.accessToken = "pk.eyJ1IjoiaG91c3NhbWRvbG1pIiwiYSI6ImNsaGV1dGZxdTBnMjUzYnA0NzkycDY4bzcifQ.KwMv9Fo_a9ehGwBmSJb_YQ";

function Map() {
  const [map, setMap] = useState(null);
  const [coordinates, setCoordinates] = useState({
    start: [-96, 37.8],
    end: [-95, 37.8]
  });
  const mapContainer = useRef(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-6.8675897,32.8778452],
      zoom: 12
    });

    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl
    });

    const directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      unit: 'metric',
      profile: 'mapbox/driving',
      controls: { inputs: true }, // keep inputs visible
      instructions: false // hide route instructions
    });

    map.addControl(geocoder);
    map.addControl(directions, 'top-left');

    map.on("load", function () {
      setMap(map);
      map.resize();
    });

    return () => map.remove();
  }, []);

  const handleSearch = (e) => {
    const lngLat = e.target.value.split(",");
    if (lngLat.length === 4) {
      const start = [parseFloat(lngLat[0]), parseFloat(lngLat[1])];
      const end = [parseFloat(lngLat[2]), parseFloat(lngLat[3])];
      setCoordinates({ start, end });
  
      if (map) {
        const directions = new MapboxDirections({
          accessToken: mapboxgl.accessToken,
          unit: 'metric',
          profile: 'mapbox/driving',
          controls: { inputs: false },
          waypoints: [
            { coordinates: start },
            { coordinates: end }
          ]
        });
  
        directions.on('route', function() {
          const geojson = directions.getRoute();
          if (geojson) {
            map.getSource('route').setData(geojson);
          }
        });
  
        directions.on('clear', function() {
          map.getSource('route').setData({
            type: 'FeatureCollection',
            features: []
          });
        });
  
        map.addControl(directions, 'top-left');
        directions.setOrigin(start);
        directions.setDestination(end);
        map.flyTo({ center: [(start[0] + end[0]) / 2, (start[1] + end[1]) / 2], zoom: 10 });
      }
    }
  };

  return (
    <>
      <div>
        <input
          type="text"
          value={`${coordinates.start[0]},${coordinates.start[1]},${coordinates.end[0]},${coordinates.end[1]}`}
          onChange={handleSearch}
        />
      </div>
      <div ref={mapContainer} style={{ width: "100%", height: "400px" }}></div>
    </>
  );
}

export default Map;