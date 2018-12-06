app.factory("userLibrary", function ($q, $http, $log, user) {

    var scoresLibrary = {};
    var wasEverLoaded = {};
    wasEverLoaded[1] = false;

    function Score(musicScore) {
        this.id = musicScore.id;
        this.title = musicScore.title;
        this.composer = musicScore.composer;
        this.preview = musicScore.score_img_path;
        this.year = musicScore.year;
        this.numPages = musicScore.numPages;
        this.userId = musicScore.userId;
    }

    function getActiveUserLibrary() {

        var async = $q.defer();
        var userId = user.getActiveUser().id;;

        // This is a hack since we don't really have a persistant server.
        // So that all scores are received only once.
        if (wasEverLoaded[userId]) {
            async.resolve(scoresLibrary[userId]);
        } else {
            scoresLibrary[userId] = [];

            var scoresPath = "http://my-json-server.typicode.com/yaelir13/org-a-note/musicScore?userId=" + userId;
            $http.get(scoresPath).then(function (response) {
                $log.log(response);
                for (var i = 0; i < response.data.length; i++) {
                    var score = new Score(response.data[i]);
                    scoresLibrary[userId].push(score);
                }
                wasEverLoaded[userId] = true; //hard-coded, change later
                async.resolve(scoresLibrary[userId]);

            }, function (error) {
                async.reject(error);
            });
        }

        return async.promise;
    }

    function createScore(title, composer, score_img_path, year, numPages) {
        var async = $q.defer();

        var userId = user.getActiveUser().id;

        var newScore = new Score({
            id: -1, title: title, composer: composer,
            score_img_path: score_img_path, year: year, numPages: numPages,
            userId: userId
        });

        // if working with real server:
        //$http.post("http://my-json-server.typicode.com/nirch/recipe-book-v3/recipes", newRecipe).then.....

        scoresLibrary[userId].push(newScore);
        async.resolve(newScore);

        return async.promise;
    }

    return {
        getActiveUserLibrary: getActiveUserLibrary,
        createScore: createScore
    }

})