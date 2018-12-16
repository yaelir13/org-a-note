app.factory("userLibrary", function ($q, $http, $log, user) {

    var scoresLibrary = {};
    var wasEverLoaded = [0];

    function Score(musicScore) {
        this.id = musicScore.id;
        this.title = musicScore.title;
        this.composer = musicScore.composer;
        this.preview = musicScore.score_img_path;
        this.Movement = musicScore.Movement;
        this.numPages = musicScore.numPages;
        this.userId = musicScore.userId;
    }

    function IMSLP(musicScore) {
        this.id = musicScore.id;
        this.Intvals = Object.values(musicScore.intvals);
        this.permlink = musicScore.permlink;
        this.linkPDF = "https://imslp.org//wiki//" + musicScore.id;
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



    var scoresPath = '';
    var IMSLPdatabasePage = [];


    function getIMSLPLibrary() {

        var async = $q.defer();
        debugger;
        // This is a hack since we don't really have a persistant server.
        // So that all scores are received only once.
        // for (var i = 0; i < 141000; i++) {
        // scoresPath[i] = "https://imslp.org/imslpscripts/API.ISCR.php?account=worklist/disclaimer=accepted/sort=id/type=2/start=" + i + "/";
        scoresPath = "https://imslp.org/imslpscripts/API.ISCR.php?account=worklist/disclaimer=accepted/sort=id/type=2/start=5/";
        var CORSscoresPath = "https://cors-anywhere.herokuapp.com/" + scoresPath;
        $http.get(CORSscoresPath).then(function (response) {
            // // $http.get("IMSLP.json").then(function (response) {
            for (var i = 0; i < 1000; i++) {
                var score = new IMSLP(response.data[i]);
                IMSLPdatabasePage.push(score);
            }
            async.resolve(IMSLPdatabasePage);

        }, function (error) {
            async.reject(error);
        });

        return async.promise;
    }


    var ScoreId = "";
    function getNextScoreId(userId) {
        var async = $q.defer();
        getActiveUserLibrary().then(function (scoresLibrary) {
            // for (key in scoresLibrary)
            //     ScoreId = scoresLibrary[userId][scoresLibrary[userId].length - 1].id;
            var lastArrItem = scoresLibrary[scoresLibrary.length - 1];
            ScoreId = parseInt(lastArrItem.id)+1;
            async.resolve(ScoreId);
        })
        return async.promise;
    }

    function createScore(title, composer, score_img_path, Movement, numPages) {
        var async = $q.defer();
        if (user.getActiveUser())
            userId = user.getActiveUser().id;
            getNextScoreId(userId).then(function (newScoreId) {
            var newScore = new Score({
                id: newScoreId, title: title, composer: composer,
                score_img_path: score_img_path, Movement: Movement, numPages: numPages,
                userId: userId
            });

            // if working with real server:
            //$http.post("https://my-json-server.typicode.com/nirch/recipe-book-v3/recipes", newRecipe).then.....

            scoresLibrary[userId].push(newScore);
            $log.log(scoresLibrary[userId]);

            async.resolve(newScore);
        });

        return async.promise;
    }

    return {
        getActiveUserLibrary: getActiveUserLibrary,
        createScore: createScore,
        getIMSLPLibrary: getIMSLPLibrary,
        getNextScoreId: getNextScoreId
    }

})
