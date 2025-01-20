import React, { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";

const LocationModal = ({ isOpen, onClose, latitude, longitude }) => {
    const mapContainerRef = useRef(null);
    const mapRef = useRef(null);
    // console.log(latitude, longitude);

    useEffect(() => {
        if (isOpen && mapContainerRef.current) {
            // Initialize the map if not already created
            if (!mapRef.current) {
                mapRef.current = new maplibregl.Map({
                    container: mapContainerRef.current,
                    style: "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json", // MapLibre style URL
                    center: [longitude, latitude],
                    zoom: 12,
                });

                // Add a marker for the delivery location
                new maplibregl.Marker()
                    .setLngLat([longitude, latitude])
                    .addTo(mapRef.current);
            } else {
                // Update map position on modal open
                mapRef.current.setCenter([longitude, latitude]);
            }
        }
    }, [isOpen, latitude, longitude]);

    useEffect(() => {
        // Cleanup the map on unmount
        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, []);

    return (
        <div
            className={`modal ${isOpen ? "open" : ""}`}
            style={{
                display: isOpen ? "block" : "none",
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                backgroundColor: "white",
                zIndex: 1000,
                padding: "20px",
                borderRadius: "10px",
                width: "90%", // Adjusts to smaller screens
                maxWidth: "500px", // Ensures it doesn't exceed 500px on larger screens
                height: "auto", // Adjust height based on content
            }}
        >
            <h2>Delivery Location</h2>
            <div
                ref={mapContainerRef}
                style={{ width: "100%", height: "300px", borderRadius: "8px" }}
            />
            <button
                onClick={onClose}
                style={{
                    marginTop: "10px",
                    backgroundColor: "#007BFF",
                    color: "white",
                    padding: "10px",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                }}
            >
                Close
            </button>
        </div>
    );
};

export default LocationModal;
