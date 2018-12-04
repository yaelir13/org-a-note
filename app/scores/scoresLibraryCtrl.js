app.controller("scoresLibraryCtrl", function ($scope, $log, userLibrary) {

    userLibrary.getActiveUserLibrary().then(function (scoresLibrary) {
        $scope.scoresLibrary = scoresLibrary;
        $log.log($scope.scoresLibrary);
    }, function (error) {
        $log.log(error);
    })

})