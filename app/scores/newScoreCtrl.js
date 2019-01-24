app.controller("newScoreCtrl", function ($scope, userLibrary, $location, user, uploadService) {

    // Checking if the user is currently logged in,
    // if not redirecting to the home page
    if (!user.isLoggedIn()) {
        $location.path("/");
        return;
    }

    $scope.createScore = function () {
        if (!$scope.filepreview) {
            alert("You must upload a sheet music file to add a new score");
        }
        else if (!$scope.title) {
            alert("You must name the musical piece in order add it");
        }
        else if (!$scope.composer) {
            alert("You must name the composer of the musical piece in order add it");
        }
        else {
            userLibrary.createScore($scope.title, $scope.composer,
                $scope.filepreview, $scope.movement, $scope.numPages).then(function () {
                    $scope.title = "";
                    $scope.composer = "";
                    $scope.filepreview = "";
                    $scope.movement = "";
                    $scope.numPages = "";
                    $('body').removeClass('modal-open');
                    $('.modal-backdrop').remove();
                    $('.modal').remove();
                    $('[data-dismiss="newModal"]').on('click', function () {
                        
                    });
                    $location.path("/scores");
                }, function (err) {
                    console.log(err);
                })
        }
    }


    $('#newModal').on('shown.bs.modal', function () {
        $(document).off('focusin.modal');
    });

    yes_js_login = function (event) {

        return false;
    }

    $scope.$watch('file', function (newfile, oldfile) {
        if (angular.equals(newfile, oldfile)) {
            return;
        }

        uploadService.upload(newfile).then(function (res) {
            // DO SOMETHING WITH THE RESULT!
            // oldfile=newfile;
            console.log("result", res);
        })
    });
})