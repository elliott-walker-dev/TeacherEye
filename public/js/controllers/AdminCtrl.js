angular.module('AdminCtrl', []).controller('AdminController', function($scope,Admin) {

    $scope.showPermissions = true;
    vm = $scope;
    vm.flag = false;
    $scope.blacklistItems = [1,2,3,4,5,6,7,8,9];
    $scope.whitelistItems = ["a","b","c","d","e","f"];
    $scope.studentList = ["a","b","c","d","e","f"];
    $scope.showBlacklist = true;
    $scope.showWhiteList = true;
    $scope.showBlackList = true;
    $scope.domainsList = [];

    $scope.listItems = [1,2,3,4,5,6,7,8,9];

	$scope.init = function(){
        populateBlacklist();
        populateWhitelist();
        populateClassroom();
	}

    $scope.addNewlistItem = function(){
        vm.flag = !vm.flag;
    }
    $scope.toggleWhiteList = function(){
        $scope.showWhiteList = !$scope.showWhiteList;
    }
    $scope.toggleBlackList = function(){
        $scope.showBlackList = !$scope.showBlackList;
    }

    $scope.addNewDomainName = function(){
    	if($scope.newDomain){
    		var temp = $scope.newDomain.split('@');//just in case
    		var domain = temp[temp.length - 1];//last one, always

            if(Admin.checkDomainFormat(domain)){
                Admin.addDomain(domain).then(function(res){
                    if(res){
                        populateBlacklist();
                        $scope.newDomain = "";
                    }
                }); 
            }

    	}
    	else{
            console.log(new Error());
    	}
    }

    $scope.removeThisDomain = function(domainObj){
    	if(domainObj){
    		Admin.removeDomain(domainObj).then(function(res){
                if(res){
                    populateBlacklist();
                }
            });
    	}
        else{
            console.log(new Error());
        }
    }


    $scope.onItemAdd = function(){
        $scope.blac
    }

    $scope.$watch('blacklistItems',function(){
        
    });

    function populateBlacklist(){
        Admin.getPermissionListDomains().then(function(res){
            $scope.blacklistItems = res;
        });
    }
    function populateWhitelist(){
        Admin.getPermissionListDomains().then(function(res){
            $scope.whitelistItems = res;
        });
    }
    function populateClassroom(){

    }
});