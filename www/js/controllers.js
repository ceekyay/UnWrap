angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $cordovaCamera, $rootScope) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal


  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/memModal.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeMemModal = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.memModal = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function () {
    console.log('Doing login', $scope.loginData);

  $ionicModal.fromTemplateUrl('templates/memModal.html', {
    scope: $scope
  }).then(function (odal) {
    $scope.memModal = modal;
  })

  $scope.memModalShow = function() {
    $scope.memModal.show()
  }

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
  $timeout(function () {
    $scope.closeMemModal();
  }, 1000);
  };

  //document.addEventListener("deviceready", function () {


})

  .controller('MemoryListCtrl', function ($scope) {

  })

  .controller('HomeMapCtrl', function ($scope, $state, $cordovaGeolocation, $cordovaCamera) {

    $scope.memoryTitle;


  var options = {timeout: 10000, enableHighAccuracy: true};
 
  $cordovaGeolocation.getCurrentPosition(options).then(function(position){
 
    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    var peteHome = new google.maps.LatLng(41.6503617, -91.5446042);
    var shorts = new google.maps.LatLng(41.6407263,-91.5761868);
    var maclean = new google.maps.LatLng(41.6607173,-91.5387305);

    

 
    var mapOptions = {
      center: maclean,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      streetViewControl: false,
      mapTypeControl: true
    };
 
    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

    $scope.reloadMap = function () {
      console.log("running testMap func");
      google.maps.event.trigger(map, 'resize');
      $cordovaGeolocation.getCurrentPosition(options).then(function(position) {
              google.maps.event.trigger(map, 'resize');
          console.log("position: " + position);
          //Here, need to reset map at the position it was when user left that page;
      })
    }

    $scope.$on('$ionicView.enter', function() {
      console.log("refreshing map");
      $scope.reloadMap();

    })

    $scope.memoryList = [['Petes House', 41.649861, -91.5460077, "This is the location of peters house.  The info that normally would go in here is what the user leaves behind, like text or photos.  Let's pretend that there is something more interesting here"], 
                        ['Shorts', 41.6407263,-91.5761868, "Same issues as above - no data to actually fill yet."], ['MacLean Hall', 41.6607173,-91.5387305, "Same issues as above - no data to actually fill yet. "]];


//Single point - have code that puts them in from list, wasn't working
google.maps.event.addListenerOnce($scope.map, 'idle', function(){
 
 //hard coding markers in for milestone one - dummy data essentially.  Will loop through $scope.memoryList in next release
 // marker placement and infowindows/corresponding listener will be automated with loops. Done this before but ran out of time
  var marker = new google.maps.Marker({
      map: $scope.map,
      animation: google.maps.Animation.DROP,
      position: peteHome
  });
    var marker1 = new google.maps.Marker({
      map: $scope.map,
      animation: google.maps.Animation.DROP,
      position: shorts
  }); 
    var marker2 = new google.maps.Marker({
      map: $scope.map,
      animation: google.maps.Animation.DROP,
      position: maclean
  });       
 
 //also Hard Coded in the lamest way
  var infoWindow = new google.maps.InfoWindow({
      content: "Pete's Home"
  });
    var infoWindow1 = new google.maps.InfoWindow({
      content: "Short's Burgers\n"
  });
    var infoWindow2 = new google.maps.InfoWindow({
      content: "MacLean Hall"
  });
 
  google.maps.event.addListener(marker, 'click', function () {
      infoWindow.open($scope.map, marker);
      //$('#myModal').modal('show')
  });
    google.maps.event.addListener(marker1, 'click', function () {
     infoWindow1.open($scope.map, marker1);
      //$('#myModal').modal('show')
  });
    google.maps.event.addListener(marker2, 'click', function () {
      infoWindow2.open($scope.map, marker2);
      //$('#myModal').modal('show')
  });

 
});


       
  }, function(error){
    console.log("Could not get location");
  });

  $scope.createMemory = function() {
    console.log("create point pressed");
    $scope.memModal.show();
  }
  $scope.openMemModal = function() {
    $scope.modal.show();
  }

    $scope.takePhoto = function () {
    var options = {
      quality: 50,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,

      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };

    $cordovaCamera.getPicture(options).then(function (imageData) {
      $scope.imgURI = "data:image/jpeg;base64," + imageData;
      console.log($scope.imgURI);
    }, function (err) {
      console.log("error occured");
      // An error occured. Show a message to the user
    });
  }

    $scope.openPhoto = function () {
    var options = {
      quality: 50,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,

      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };

    $cordovaCamera.getPicture(options).then(function (imageData) {
      $scope.imgURI = "data:image/jpeg;base64," + imageData;
      console.log($scope.imgURI);
    }, function (err) {
      console.log("error occured");
      // An error occured. Show a message to the user
    });
  }
})




.controller('PlaylistCtrl', function($scope, $stateParams) {
})

/*.controller('memoryModalCtrl', function($scope) {
  

})/*

/*.controller('LoginCtrl', function($scope, $state, $firebaseAuth) {
  var auth = $firebaseAuth();  })*/





