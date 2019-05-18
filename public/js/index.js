$(document).ready(function() {
  // JS for Dashboard page ================================================
  var socket = io.connect("http://localhost:3000");

  socket.on("users connected", function(data) {
    $("#usersConnected").html("Users connected: " + data);
  });

  socket.emit("getUsers");

  socket.on("displayUsers", function(users) {
    for (var i = 0; i < users.user.length; i++) {
      var html = "<li>" + users.user[i] + "</li>";
      $("#users").append(html);
    }
  });
});

var map;
var service;
var infowindow;
var type;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 12
  });
  infoWindow = new google.maps.InfoWindow();

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        infoWindow.setPosition(pos);
        infoWindow.setContent("Location found.");
        infoWindow.open(map);
        map.setCenter(pos);
      },
      function() {
        handleLocationError(true, infoWindow, map.getCenter());
      }
    );
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
  console.log(map.center);

  var request = {
    location: map.center,
    radius: "1",
    type: [type]
  };

  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);
}

function callback(results, status) {
  console.log(status);
  console.log(google.maps.places.PlacesServiceStatus);
  // eslint-disable-next-line eqeqeq
  if (status == google.maps.places.PlacesServieStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      var place = results[i];
      console.log(place);
      createMarker(results[i]);
    }
  }
}

function createMarker(place) {
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, "click", function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}

function setSearchValue(value) {
  type = value;
  console.log(type);
}
