var position = null

// MAPBOX DISPLAY
function showRestsOnMap() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiYWRhbWNoZW4zIiwiYSI6ImNsMGZyNWRtZzB2angzanBjcHVkNTQ2YncifQ.fTdfEXaQ70WoIFLZ2QaRmQ';

    const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/mapbox/streets-v11', // style URL
        center: [-123.1153423036375, 49.28330056110343], // starting position
        zoom: 14 // starting zoom
    });

    // Navigation and User center button
    map.addControl(new mapboxgl.NavigationControl());
    var geolocate = new mapboxgl.GeolocateControl({
                positionOptions: {
                    enableHighAccuracy: true,
                    showUserLocation: true,
                },
                // When active the map will receive updates to the device's location as it changes.
                trackUserLocation: true,
                // Draw an arrow next to the location dot to indicate which direction the device is heading.
                showUserHeading: true,
            });

    map.addControl(geolocate);
    geolocate.on('geolocate', function (e) {
        var lon = e.coords.longitude;
        var lat = e.coords.latitude
        position = [lon, lat];
        console.log(position);
        return position
    });

    map.on('load', () => {
        const features = []
        db.collection("Restaurants").get().then(allRests => {
            allRests.forEach(doc => {
                coordinates = doc.data().coordinates;
                url = doc.data().url;
                rest_name = doc.data().name;
                cur_capacity = doc.data().current_population;
                total_capacity = doc.data().capacity;

                features.push({
                    'type': 'Feature',
                    'properties': {
                        'description': `<strong>Current Capacity: ${cur_capacity}/${total_capacity}</strong><p><a href="${url}" target="_blank" title="Opens in a new window">${rest_name}</a> 
                        Some description here</p><a href="../restaurants/restaurant_details.html" title="Opens in a new window">See Details</a>`,
                        'icon': 'restaurant-15'
                    },
                    'geometry': {
                        'type': 'Point',
                        'coordinates': coordinates
                    }
                })
            })

            map.addSource('places', {
                // This GeoJSON contains features that include an "icon"
                // property. The value of the "icon" property corresponds
                // to an image in the Mapbox Streets style's sprite.
                'type': 'geojson',
                'data': {
                    'type': 'FeatureCollection',
                    'features': features,
                }
            })

            // Add a layer showing the places.
            map.addLayer({
                'id': 'places',
                'type': 'symbol',
                'source': 'places',
                'layout': {
                    'icon-image': '{icon}',
                    'icon-allow-overlap': true
                }
            });

            // Draw circular search radius on the map
            map.addLayer({
                id: 'search-radius',
                source: {
                    type: 'geojson',
                    data: { "type": "FeatureCollection", "features": [] }
                },
                type: 'fill',
                paint: {
                    'fill-color': '#FDFDF1',
                    'fill-opacity': 0.4
                }
            });

            // When a click event occurs on a feature in the places layer, open a popup at the
            // location of the feature, with description HTML from its properties.
            map.on('click', 'places', (e) => {
                // Copy coordinates array.
                const coordinates = e.features[0].geometry.coordinates.slice();
                const description = e.features[0].properties.description;

                // Ensure that if the map is zoomed out such that multiple
                // copies of the feature are visible, the popup appears
                // over the copy being pointed to.
                while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                }

                new mapboxgl.Popup()
                    .setLngLat(coordinates)
                    .setHTML(description)
                    .addTo(map);
            });

            // Change the cursor to a pointer when the mouse is over the places layer.
            map.on('mouseenter', 'places', () => {
                map.getCanvas().style.cursor = 'pointer';
            });

            // Change it back to a pointer when it leaves.
            map.on('mouseleave', 'places', () => {
                map.getCanvas().style.cursor = '';
            });


            //Click to add circle -> show circle after user click 'locate' button 
            // map.on('click', function (e) {
            //     // showPosition(e)
            //     var eventLngLat = [e.lngLat.lng, e.lngLat.lat];
            //     console.log(eventLngLat)
            //     var searchRadius = makeRadius(eventLngLat, 500);
            //     map.getSource('search-radius').setData(searchRadius);
            // });

            map.on('click', function (e) {
                var eventLngLat = [e.lngLat.lng, e.lngLat.lat];
                // console.log(eventLngLat)
                var searchRadius = makeRadius(eventLngLat, 500);
                map.getSource('search-radius').setData(searchRadius);
            });

        })
    });
}
showRestsOnMap()


// USER LOCATION
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}
var userlat;
var userlong;

function getPosition(position) {
    userlat = position.coords.latitude;
    userlong = position.coords.longitude;
    coordinates_array = [userlong, userlat]
    // console.log(coordinates_array)
    return coordinates_array
}


//makeRadius function
function makeRadius(lngLatArray, radiusInMeters) {
    var point = turf.point(lngLatArray)
    var buffered = turf.buffer(point, radiusInMeters, { units: 'meters' });
    return buffered;
}
