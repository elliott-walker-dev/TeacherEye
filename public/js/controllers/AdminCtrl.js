angular.module('AdminCtrl', []).controller('AdminController', function($scope,Admin) {

    $scope.showPermissions = true;
    vm = $scope;
    vm.flag = false;
    
    $scope.studentList = [{name:"Elliott Walker", currentSite:"Facebook.com", lastVisited: ["Facebook.com","espn.com","weather.com"],connected:true},
                          {name:"Tyler Grochot", currentSite:"MaxPreps.com", lastVisited: ["MaxPreps.com","www.stjames.edu","wikipedia.com"],connected:true},
                          {name:"Sam Krantz", currentSite:"www.theringer.com", lastVisited: ["www.theringer.com","www.reddit.com","Facebook.com"],connected:false}];
    $scope.showBlacklist = true;
    $scope.showWhiteList = true;
    $scope.showBlackList = true;
    $scope.domainsList = [];


    $scope.test = function(){
        Admin.test($scope.selectedClass.key).then(function(res) {
            if(res){
                console.log(res);
                //
            }
        })
    };

    $scope.selectBlacklist = function(){
        $scope.permissions = {
            label: "Blacklist",
            about: "These sites will be blocked",
            action: 'blacklist'
        }
        populateBlacklist();
        changePermissionSelect('blacklist');
    }
    $scope.selectWhitelist = function(){
        $scope.permissions = {
            label: "Whitelist",
            about: "All sites blocked but these",
            action: 'whitelist'
        }
        populateWhitelist();
        changePermissionSelect('whitelist');
    }

    $scope.listItems = [1,2,3,4,5,6,7,8,9];

	$scope.refresh = function(){
        populateClasses();
        setTimeout($scope.selectBlacklist,1000);
	}

    $scope.addNewlistItem = function(){
        vm.flag = !vm.flag;
    }
    $scope.classToggle = function(){
        $scope.isAddingClass = !$scope.isAddingClass;
    }
    $scope.cancelClassAdd = function(){
        $scope.classToggle();
        $scope.newClassName = null;
    }
    $scope.addNewClass = function(){
        Admin.addNewClass($scope.newClassName).then(function(res) {
            if(res){
                populateClasses();
            }
        })
        $scope.cancelClassAdd();
    }
    $scope.removeClass = function(classObj){
        Admin.removeClass(classObj.name, classObj.key).then(function(res) {
            if(res){
                $scope.refresh();
            }
        })
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

    $scope.onItemAdd = function(action){
        Admin.addDomain(action, $scope.newDomainName, $scope.selectedClass.key, $scope.permissions.action).then(function(res){
            console.log(res);
            $scope.newDomainName = null;
            $scope.flag = false;
            if(action === 'blacklist'){
                populateBlacklist();
            }
            if(action === 'whitelist'){
                populateWhitelist();
            }
            
        }); 
    }
    $scope.removeDomain = function(action, domainName){
        Admin.removeDomain(action, domainName, $scope.selectedClass.key, $scope.permissions.action).then(function(res){
            console.log(res);
        })
    }
    $scope.onSelectClass = function(selectedClass){
        $scope.selectedClass = selectedClass;
        populateBlacklist();
        populateWhitelist();
        //then fill the appropriate data
    }

    function populateClasses(ignoreSelectedClassReset){
        Admin.getAllClasses().then(function(res){
            $scope.classList = res;
            if(!ignoreSelectedClassReset){
                $scope.selectedClass = $scope.classList[0];
            }
            
            populateBlacklist();
            populateWhitelist();
        });
    }

    function populateBlacklist(){
        
        Admin.getPermissionListDomains('blacklist', $scope.selectedClass.key).then(function(res){
            $scope.permissionListItems = res.map((val)=>val.domain);
        });
    }
    function populateWhitelist(){
        Admin.getPermissionListDomains('whitelist',$scope.selectedClass.key).then(function(res){
            $scope.permissionListItems = res.map((val)=>val.domain);
        });
    }
    function changePermissionSelect(list){
        Admin.changePermissionSelect(list,$scope.selectedClass.key).then(function(res){
            console.log(res);
        })
    }
});