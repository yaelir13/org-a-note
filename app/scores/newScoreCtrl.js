app.controller("newScoreCtrl", function($scope, userLibrary, $location, user) {
    
    // Checking if the user is currently logged in,
    // if not redirecting to the home page
    if (!user.isLoggedIn()) {
        $location.path("/");
        return;
    }

    $scope.createScore = function () {
        userLibrary.createScore($scope.title, $scope.composer,
            $scope.score_img_path, $scope.year, $scope.numPages).then(function () {
            $location.path("/scores")
        }, function (err) {
            console.log(err);
        })
    }
})