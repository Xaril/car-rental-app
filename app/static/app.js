/*/
/* This file contains all the logic required in the web application.
/*         _______
/*        //  ||\ \
/*  _____//___||_\ \___
/*  )  _          _    \
/*  |_/ \________/ \___|
/* ___\_/________\_/______
/*
/* Author: Fredrik Omstedt
/* Date: 2018-12-04
/*/
var MAPBOX_TOKEN = 'pk.eyJ1IjoieGFyaWwiLCJhIjoiY2pwYTEyaGdiMDAxbzNzbWx5enAwdm9rOSJ9.7eZF_wXP5rnEMZRG_JmkYw';
var DEFAULT_ORIGIN = 'Slottsvägen 3, 183 52 Täby, Sweden';

//Main function
$(document).ready(function() {
    loadMap();
});

//Loads the map with destination control
function loadMap() {
    mapboxgl.accessToken = MAPBOX_TOKEN;
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v10',
        center: [18.091624, 59.427363], //Home of the car
        zoom: 12
    });
    // Add zoom and rotation controls to the map.
    map.addControl(new mapboxgl.NavigationControl());

    //Add direction handling
    var directionsObject = new MapboxDirections({
        accessToken: mapboxgl.accessToken,
        unit: 'metric',
        controls: {
            instructions: false,
            profileSwitcher: false
        }
    });
    map.addControl(directionsObject, 'top-left');

    //Set the starting point to be the home of the car
    directionsObject.setOrigin(DEFAULT_ORIGIN);

    //Each new distance should result in the app calculating the price
    directionsObject.on('destination', function() {
        findDistance(directionsObject);
    });
    directionsObject.on('origin', function() {
        findDistance(directionsObject);
    });
}

//Finds the distance of the route between the origin and destination
function findDistance(directionsObject) {
    var distance = 0;
    var origin = directionsObject.getOrigin().geometry.coordinates;
    var destination = directionsObject.getDestination().geometry.coordinates;

    //Request the route data from MapBox
    $.ajax({
        url: 'https://api.mapbox.com/directions/v5/mapbox/driving/' +  origin[0] +
             ',' + origin[1] + ';' + destination[0] + ',' + destination[1] + '.json?access_token=' + MAPBOX_TOKEN
    }).done(function(data) {
        distance = data.routes[0].distance;
        showPrice(distance);
    });
}

//Calculate the cost of a trip to the destination and back to the origin.
function showPrice(distance) {
    var swedishMile = 10000;
    var cost = 18.5;
    $('#pre').text("You have to pay");
    $('#cost').text(Math.round(((2 * distance) / swedishMile) * cost) + "kr");
    $('#post').text("for this trip");
}
