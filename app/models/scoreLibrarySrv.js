app.factory("userLibrary", function ($q, $http, $log, user) {

    var scoresLibrary = {};
    var wasEverLoaded = [0];

    // while (i != 0) {
    //     wasEverLoaded[i] = [false];
    //     i += 1;
    // }

    // wasEverLoaded[1] = false;

    function Score(musicScore) {
        this.id = musicScore.id;
        this.title = musicScore.title;
        this.composer = musicScore.composer;
        this.preview = musicScore.score_img_path;
        this.year = musicScore.year;
        this.numPages = musicScore.numPages;
        this.userId = musicScore.userId;
    }

    function IMSLP(musicScore) {
        this.id = musicScore.id;
        this.type = musicScore.type;
        this.parent = musicScore.parent;
        this.intvals[
            this.composer,
            this.worktitle,
            this.icanto,
            this.pageid] = [
                musicScore.composer,
                musicScore.worktitle,
                musicScore.icanto,
                musicScore.pageid];

        this.permalink = musicScore.permalink;
    }


    function getActiveUserLibrary() {

        var async = $q.defer();
        var userId;
        if (user.getActiveUser())
            userId = user.getActiveUser().id;;

        // This is a hack since we don't really have a persistant server.
        // So that all scores are received only once.
        if (wasEverLoaded[userId]) {
            async.resolve(scoresLibrary[userId]);
        } else {
            scoresLibrary[userId] = [];

            var scoresPath = "https://my-json-server.typicode.com/yaelir13/org-a-note/musicScore?userId=" + userId;
            $http.get(scoresPath).then(function (response) {
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

    var scoresPath = [];
    var IMSLPdatabase = [];
    var IMSLPdatabasePage = [];
    var scoreArr = [];

    function getIMSLPLibrary() {

        var async = $q.defer();

        // This is a hack since we don't really have a persistant server.
        // So that all scores are received only once.
        // for (var i = 0; i < 141000; i++) {
            // scoresPath[i] = "https://imslp.org/imslpscripts/API.ISCR.php?account=worklist/disclaimer=accepted/sort=id/type=2/start=" + i + "/";
            scoresPath[0] = "https://imslp.org/imslpscripts/API.ISCR.php?account=worklist/disclaimer=accepted/sort=id/type=2/start=0/";
            $http.get(scoresPath[0]).then(function (response) {
                for (var i = 0; i < 1000; i++) {
                    $log.log(response.data);
                    var score = new IMSLP(response.data[i]);
                    // var filePath = "https://imslp.org//wiki//" + response.data[i].id;
                    IMSLPdatabasePage.push(score);
                }
                async.resolve(IMSLPdatabasePage);

            }, function (error) {
                async.reject(error);
            });

            // IMSLPdatabase.push(IMSLPdatabasePage);
            // return IMSLPdatabase;
        // }

        return async.promise;
    }

    function createScore(title, composer, score_img_path, year, numPages) {
        var async = $q.defer();
        if (user.getActiveUser())
            userId = user.getActiveUser().id;;

        var newScore = new Score({
            id: -1, title: title, composer: composer,
            score_img_path: score_img_path, year: year, numPages: numPages,
            userId: userId
        });

        // if working with real server:
        //$http.post("https://my-json-server.typicode.com/nirch/recipe-book-v3/recipes", newRecipe).then.....

        scoresLibrary[userId].push(newScore);
        async.resolve(newScore);

        return async.promise;
    }

    return {
        getActiveUserLibrary: getActiveUserLibrary,
        createScore: createScore,
        getIMSLPLibrary: getIMSLPLibrary
    }

})
