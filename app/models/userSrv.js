
app.factory("user", function ($q, $http, $log, $timeout, $filter, $rootScope) {

    // var activeUser = null;
    // new User( {
    //     "id": 1,
    //     "fname": "Nir",
    //     "lname": "Channes",
    //     "email": "nir@nir.com",
    //     "pwd": "123"
    // });

    function User(plainUser) {
        this.id = plainUser.id;
        this.fname = plainUser.fname;
        this.lname = plainUser.lname;
        this.username = plainUser.username;
        this.pwd = plainUser.pwd;
    }

    function login(username, pwd) {
        var async = $q.defer();

        var loginURL = "http://my-json-server.typicode.com/yaelir13/org-a-note/users?email=" +
            username + "&pwd=" + pwd;
        $http.get(loginURL).then(function (response) {
            if (response.data.length > 0) {
                // success login
                activeUser = new User(response.data[0]);
                $rootScope.activeUser = activeUser;
                async.resolve(activeUser);
            } else {
                // invalid email or password
                async.reject("invalid email or password")
            }
        }, function (error) {
            async.reject(error);
        });

        return async.promise;
    }

    function isLoggedIn() {
        return $rootScope.activeUser ? true : false;
    }

    function logout() {
        $rootScope.activeUser = null;
    }

    function getActiveUser() {
        return $rootScope.activeUser;
    }

    var usersArr = [];
    var lastArrItem = {};

    function getAllUsers() {
        var async = $q.defer();
        var usersUrl = "http://my-json-server.typicode.com/yaelir13/org-a-note/users";

        $http.get(usersUrl).then(function (response) {
           usersArr = response.data;
            async.resolve(usersArr);
        }, function (error) {
            async.reject(error);
        });

        return async.promise;
    }

    getAllUsers().then(function (response) {
        usersArr = response;
        // return usersArr;
    }, function (error) {
        // failed to get users
        $log.error(error);
    })

    function getNextId() {
        lastArrItem = usersArr[usersArr.length - 1];
        lastUserId = lastArrItem.id;
        return lastUserId;
    }
    

function createUser(fname, lname, username, pwd) {
    var async = $q.defer();

    var newUserId = getNextId() + 1;
    var newUser = new User({
        id: newUserId, fname: fname, lname: lname,
        username: username, pwd: pwd
    });

    usersArr.push(newUser);
    async.resolve(newUser);

    return async.promise;
}

return {
    login: login,
    isLoggedIn: isLoggedIn,
    logout: logout,
    getActiveUser: getActiveUser,
    getNextId: getNextId,
    getAllUsers: getAllUsers,
    createUser: createUser
}
})