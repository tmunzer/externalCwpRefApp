var cwp = angular.module("cwp", ["ngRoute", 'ui.bootstrap']);

cwp.controller("loginCtrl", function($scope){
    $scope.master = {
        username : "",
        password : ""
    };

    function reset(){
        $scope.login = angular.copy($scope.master);
    }

    reset();
});
cwp.controller("newCtrl", function($scope){
    $scope.master = {
        email: "",
        phone: ""
    };
    function reset(){
        $scope.new = angular.copy($scope.master);
    }

    reset();
});

identity.controller('ModalCtrl', function ($scope, $uibModal) {

    $scope.animationsEnabled = true;
    $scope.$on('apiError', function (event, apiError) {
        $scope.apiErrorStatus = apiError.status;
        $scope.apiErrorMessage = apiError.message;
        $scope.apiErrorCode = apiError.code;
        var modalTemplateUrl = 'views/modalErrorContent.html';
        displayModel(modalTemplateUrl);

    });
    $scope.$on('apiWarning', function (event, apiWarning) {
        $scope.apiErrorStatus = apiWarning.status;
        $scope.apiErrorMessage = apiWarning.message;
        $scope.apiErrorCode = apiWarning.code;
        var modalTemplateUrl = 'views/modalWarningContent.html';
        displayModel(modalTemplateUrl);

    });
    $scope.$on('newSingle', function (event, account) {
        $scope.loginName = account.loginName;
        $scope.password = account.password;
        $scope.ssid = account.ssid;
        $scope.startTime = account.startTime;
        $scope.endTime = account.endTime;
        $scope.authType = account.authType;
        var modalTemplateUrl = 'views/modalSingleContent.html';
        displayModel(modalTemplateUrl);

    });
    $scope.open = function (template, size) {
        var modalTemplateUrl = "";
        switch (template) {
            case 'about':
                modalTemplateUrl = 'modalAboutContent.html';
                break;
            case 'export':
                modalTemplateUrl = 'views/modalExportContent.html';
                break;
            case 'exportBulk':
                modalTemplateUrl = 'views/modalBulkContent.html';
                break;
        }
        displayModel(modalTemplateUrl, size);

    };
    function displayModel(modalTemplateUrl, size) {
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: modalTemplateUrl,
            controller: 'ModalInstanceCtrl',
            scope: $scope,
            size: size
        });
    }

});

// Please note that $uibModalInstance represents a modal window (instance) dependency.
// It is not the same as the $uibModal service used above.

identity.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance) {

    $scope.close = function () {
        $uibModalInstance.close('close');

    };
});
