app.controller("signupCtrl", function(user, $location, $log) {
   
    var vm = this;

    vm.register = register;

    function register() {
        vm.dataLoading = true;
        user.Create(vm.user)
            .then(function (response) {
                $log.log(vm.user)
                if (response.success) {
                    $log.Success('Registration successful', true);
                    $location.path('/login');
                } else {
                    $log.Error(response.message);
                    vm.dataLoading = false;
                }
            });
    }

});