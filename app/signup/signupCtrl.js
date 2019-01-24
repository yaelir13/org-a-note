app.controller("signupCtrl", function ($scope, user, $location, $log, $rootScope) {

    $scope.createUser = function () {
        if ($scope.form.$valid) {
            user.createUser($scope.name, $scope.email,
                $scope.username, $scope.password).then(function (user) {
                    $rootScope.activeUser = user.name;
                    $rootScope.isLoggedIn = true;
                    $(".modal-backdrop").remove();
                    $location.path('/features');
                }, function (err) {
                    console.log(err);
                })
        }
    }
    $('#registerModal1').on('shown.bs.modal', function () {
        $(document).off('focusin.modal');
    });
});