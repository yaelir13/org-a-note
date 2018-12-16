app.controller("resourcesCtrl", function ($scope, $log, userLibrary) {
    $scope.x= false;
    userLibrary.getIMSLPLibrary().then(function (IMSLPdatabase) {
        $scope.IMSLPdatabase = IMSLPdatabase;
        setTimeout(function() {
            $scope.x= true;
            $scope.$apply();
                    
          }, 1000);
    })

   
})