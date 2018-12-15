var app = angular.module("orgANoteApp", ['ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "app/home/home.html"
        }).when("/annotate/:id", {
            templateUrl: "app/annotate/annotate.html",
            controller: "canvasCtrl"
        }).when("/features", {
            templateUrl: "app/features/features.html",
            controller: "featuresCtrl"
        }).when("/scores", {
            templateUrl: "app/scores/scoresLibrary.html",
            controller: "scoresLibraryCtrl"
        }).when("/resources", {
            templateUrl: "app/resources/resources.html",
            controller: "resourcesCtrl"
        }).when("/calendar", {
            templateUrl: "app/calendar/calendar.html",
            controller: "calendarCtrl"
        }).when("/new", {
            templateUrl: "app/scores/newScore.html",
            controller: "newScoreCtrl"
        }).when("/score/:id", {

        })
})