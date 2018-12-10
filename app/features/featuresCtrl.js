app.controller("featuresCtrl", function ($scope, $log, $rootScope, user) {

    $scope.isUserLoggedIn = function() {
        return user.isLoggedIn();
    }
    
    $scope.activeUser = user.getActiveUser();

})