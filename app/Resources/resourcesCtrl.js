app.controller("resourcesCtrl", function ($scope, $log, $routeParams, userLibrary) {
    userLibrary.getIMSLPLibrary().then(function (IMSLPdatabase) {
        $log.log(IMSLPdatabase);
        $scope.IMSLPdatabase = IMSLPdatabase;
    })
})