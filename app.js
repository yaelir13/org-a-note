var app = angular.module("orgANote", ["ngRoute"]);

app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl: "app/home/home.html"
    }).when("/login", {
        templateUrl: "app/login/login.html",
        controller: "loginCtrl"

    }).when("/signup", {

    }).when("/scores", {
        templateUrl: "app/scores/scoresLibrary.html",
        controller: "scoresLibraryCtrl"
    }).when("/new" , {
        templateUrl: "app/scores/newScore.html",
        controller: "newScoreCtrl"
    }).when("/score/:id" , {

    })
})