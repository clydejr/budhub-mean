


angular.module('app', [])

.controller('AppCtrl', function($scope, $http) {
	$scope.startMap = function() {
		$scope.loading = true;
	GMaps.geolocate({
  success: function(position) {
  		$scope.loading = false;
    	$scope.$apply();
    	console.log('test');
    	map = new GMaps({
		div: '#map',
		lat: position.coords.latitude,
		lng: position.coords.longitude,
		zoom: 18,
		disableDefaultUI: true
	});

  myLat = position.coords.latitude;
  myLng = position.coords.longitude;

  map.addMarker({
  lat: position.coords.latitude,
  lng: position.coords.longitude,
  animation: google.maps.Animation.DROP,
  click: function(e) {
  }
});

  $http.get('/posts').then( function(data) {

    for(var i = 0; i < data.data.length; i++) {
    map.addMarker({
  lat: data.data[i].lat,
  lng: data.data[i].lng,
  price: data.data[i].price,
  phone: data.data[i].phone,
  animation: google.maps.Animation.DROP,
  click: function(e) {
    swal({
                                        title: "",
                                        text: "$ " + e.price.toString(),
                                        showCancelButton: true,
                                        confirmButtonColor: "#DD6B55",
                                        confirmButtonText: 'call ' + e.phone,
                                        closeOnConfirm: false
                                    },
                                     function() {
                                        window.location.href = "tel://" + e.phone;
                                    });
  }
});  
    }
  })





  },
  error: function(error) {
    alert('Geolocation failed: '+error.message);
  },
  not_supported: function() {
    alert("Your browser does not support geolocation");
  },
  always: function() {
  }
});

$scope.createPost = function(data) {
  data.lat = myLat;
  data.lng = myLng;
  console.log(data);
  $http.post('/api/create', data).then( function(data) {
    if(data){
      alert('post made');
    }else{
      alert("error creating your post");
    }

  })
}
	
}
})