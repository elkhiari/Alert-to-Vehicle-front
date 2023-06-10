import React, { useState, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = "pk.eyJ1IjoiaG91c3NhbWRvbG1pIiwiYSI6ImNsaGV1dGZxdTBnMjUzYnA0NzkycDY4bzcifQ.KwMv9Fo_a9ehGwBmSJb_YQ";

function Map({setCor}) {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [coordinates, setCoordinates] = useState({
    lat: 0,
    lng: 0
  });
  const mapContainer = useRef(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-6.905920682519593,32.89245633787769],
      zoom: 12
    });

    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
    });

    map.addControl(geocoder);

    map.on("load", function () {
      setMap(map);
      map.resize();
    });

    return () => map.remove();
  }, []);

  const handleMapClick = (e) => {
    setCoordinates({
      lng: e.lngLat.lng,
      lat: e.lngLat.lat
    });
    setCor({
      lng: e.lngLat.lng,
      lat: e.lngLat.lat
    })
    if (map && !marker) {
      const newMarker = new mapboxgl.Marker().setLngLat([e.lngLat.lng, e.lngLat.lat]).addTo(map);
      setMarker(newMarker);
    } else if (marker) {
      marker.remove();
      setMarker(null);
    }
  };

  useEffect(() => {
    if (map) {
      map.on("click", handleMapClick);
    }
    return () => {
      if (map) {
        map.off("click", handleMapClick);
      }
    };
  }, [map, marker]);

  const handleSearch = (e) => {
    e.preventDefault();
    const lngLat = e.target.value.split(",");
    if (lngLat.length === 2) {
      const lng = parseFloat(lngLat[0]);
      const lat = parseFloat(lngLat[1]);
      setCoordinates({ lng, lat });

      if (map) {
        if (marker) {
          marker.remove();
          setMarker(null);
        }
        const newMarker = new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);
        setMarker(newMarker);
        map.flyTo({ center: [lng, lat], zoom: 14 });
      }
    }
  };

  return (
    <>
      <div
        ref={mapContainer}
        style={{ width: "100%", height: "400px" }}
        
      ></div>
    </>
  );
}
export default Map;