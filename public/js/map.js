const lat = listingData.geometry.coordinates[1]; // latitude
const lon = listingData.geometry.coordinates[0]; // longitude

const map = L.map("map").setView([lat, lon], 13);

// Carto tiles
L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
  attribution:
    '&copy; <a href="https://carto.com/">CARTO</a> contributors &copy; <a href="https://openstreetmap.org">OpenStreetMap</a>',
  subdomains: "abcd",
  maxZoom: 20,
}).addTo(map);

// Marker
L.marker([lat, lon])
  .addTo(map)
  .bindPopup(`<h5>${listingData.title}</h5><p>${listingData.location}</p>`)
  .openPopup();
