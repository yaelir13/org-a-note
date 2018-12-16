app.controller("featuresCtrl", function ($scope, $log, $location, user, $rootScope) {

    $scope.isUserLoggedIn = function() {
        return user.isLoggedIn();
    }
    
    $rootScope.activeUser = user.getActiveUser();

    yes_js_login = function(event) {
        if ( $scope.isUserLoggedIn()) {
            // success login
            $location.path("/scores");
        }
        else {
        alert("You have to be logged in to start enjoying Org-a-Note !");
        return false;}
    }
})