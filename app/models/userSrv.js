
app.factory("user", function($q, $http, $log, $timeout, $filter) {

    var activeUser = null;
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
        $log.log("in constructor", User);
    }

    function login(username, pwd) {
        var async = $q.defer();

        var loginURL = "http://my-json-server.typicode.com/yaelir13/org-a-note/users?email=" +
            username + "&pwd=" + pwd;
        $http.get(loginURL).then(function(response) {
            $log.log("after get in login", response, response.data.length);
            if (response.data.length > 0) {
                // success login
                activeUser = new User(response.data[0]);
                $log.log("suucess login", response, response.data.length, activeUser);
                async.resolve(activeUser);
            } else {
                // invalid email or password
                async.reject("invalid email or password")
            }
        }, function(error) {
            async.reject(error);
        });

        return async.promise;
    }

    function isLoggedIn() {
        return activeUser ? true : false;
    }

    function logout() {
        activeUser = null;
    }

    function getActiveUser() {
        return activeUser;
    }

    function Create(user) {
        var deferred = $q.defer();

        // simulate api call with $timeout
        $timeout(function () {
            GetByUsername(user.username)
                .then(function (duplicateUser) {
                    if (duplicateUser !== null) {
                        deferred.resolve({ success: false, message: 'Username "' + user.username + '" is already taken' });
                    } else {
                        var users = getUsers();

                        // assign id
                        var lastUser = users[users.length - 1] || { id: 0 };
                        user.id = lastUser.id + 1;

                        // save to local storage
                        users.push(user);
                        setUsers(users);

                        deferred.resolve({ success: true });
                    }
                });
        }, 1000);

        return deferred.promise;
    }

    function GetByUsername(username) {
        var deferred = $q.defer();
        var filtered = $filter('filter')(getUsers(), { username: username });
        var user = filtered.length ? filtered[0] : null;
        deferred.resolve(user);
        return deferred.promise;
    }

    function getUsers() {
        if(!localStorage.users){
            localStorage.users = JSON.stringify([]);
        }

        return JSON.parse(localStorage.users);
    }

    function setUsers(users) {
        localStorage.users = JSON.stringify(users);
    }

    return {
        login: login,
        isLoggedIn: isLoggedIn,
        logout: logout,
        getActiveUser: getActiveUser,
        Create: Create
    }
})