app.controller("scoresLibraryCtrl", function ($scope, $log, userLibrary, canvasSrv) {

    userLibrary.getActiveUserLibrary().then(function (scoresLibrary) {
        $scope.scoresLibrary = scoresLibrary;
    }, function (error) {
        $log.log(error);
    })
    // canvasSrv.loadImage(imgUrl).then(function (canvas) {
    //     $canvasContent=canvas;
    // })
})