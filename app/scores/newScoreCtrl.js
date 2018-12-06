app.controller("newScoreCtrl", function ($scope, userLibrary, $location, user, uploadService) {

    // Checking if the user is currently logged in,
    // if not redirecting to the home page
    if (!user.isLoggedIn()) {
        $location.path("/");
        return;
    }

    $scope.createScore = function () {
        userLibrary.createScore($scope.title, $scope.composer,
            $scope.filepreview, $scope.year, $scope.numPages).then(function () {
                $location.path("/scores")
            }, function (err) {
                console.log(err);
            })
    }

    $scope.$watch('file', function (newfile, oldfile) {
        if (angular.equals(newfile, oldfile)) {
            return;
        }

        uploadService.upload(newfile).then(function (res) {
            // DO SOMETHING WITH THE RESULT!
            console.log("result", res);
        })
    });
})