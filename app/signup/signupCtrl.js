app.controller("signupCtrl", function ($scope, user, $location, $log, $rootScope) {

    $scope.createUser = function () {
        user.createUser($scope.fname, $scope.lname,
            $scope.username, $scope.pwd).then(function (user) {
                $rootScope.activeUser = user.fname;
                $rootScope.isLoggedIn = true;
                $(".modal-backdrop").remove();
                $location.path('/features');
            }, function (err) {
                console.log(err);
            })
    }
});