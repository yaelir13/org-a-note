app.controller("resourcesCtrl", function ($scope, $log, userLibrary) {
    userLibrary.getIMSLPLibrary().then(function (IMSLPdatabase) {
        $scope.IMSLPdatabase = IMSLPdatabase;
    })
})