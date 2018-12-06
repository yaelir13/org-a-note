var app = angular.module("orgANoteApp", ["ngRoute"]);

app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "app/home/home.html"
        // }).when("/signup", {
        //     templateUrl: "app/signup/signup.html",
        //     controller: "signupCtrl"
        }).when("/features", {
            templateUrl: "app/features/features.html"
        }).when("/scores", {
            templateUrl: "app/scores/scoresLibrary.html",
            controller: "scoresLibraryCtrl"
        }).when("/new", {
            templateUrl: "app/scores/newScore.html",
            controller: "newScoreCtrl"
        }).when("/score/:id", {

        })
})