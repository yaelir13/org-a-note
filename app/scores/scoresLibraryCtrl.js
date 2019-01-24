app.controller("scoresLibraryCtrl", function ($scope, $rootScope, $log, userLibrary) {
    $scope.scoresLibrary = [];
    userLibrary.getActiveUserLibrary().then(function (scoresLibrary) {
        $scope.scoresLibrary = scoresLibrary;
        $rootScope.scoresLibrary = scoresLibrary;

    }, function (error) {
        $log.log(error);
    })

    // functions to ascertian if file is png or pdf
    $scope.isImagePDF = function (ext) {
        if (ext) {
            return ext == "pdf" 
        }
    }
    $scope.isImage = function (ext) {
        if (ext) {
            return ext == "png" || ext == "jpg"  || ext == "jpeg" ;
        }
    }

})