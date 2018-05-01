angular.module('AdminService', []).factory('Admin', ['$http', function($http) {

    return {


        test: function(classkey){
            return $http.post('/api/getSelectedPermission',{classkey: classkey})
            .then(function(response){
                if(response.data.success){
                    return response.data;
                }
                else{
                    return response.data.error
                }
            });
        },

        addDomain : function(list,domainName,classkey,list) {
            var dataObj = {domain:domainName, classkey: classkey, list: list}

            return $http.put('/api/addToPermisionList',dataObj)
            .then(function(response){
                console.log(response);
                if(response.data.success){
                    return true;
                }
                else{
                    console.log(response.error);
                    return false;
                }
            });
        },

        addNewClass: function(classname){
            return $http.post('/api/addNewClass',{classname: classname})
            .then(function(response){
                if(response.data.success){
                    return response.data.success;
                }
                else{
                    return response.data.error
                }
            });
        },

        removeClass: function(classname,classkey){
            var dataObj = {classname:classname, classkey: classkey}
            return $http.put('/api/removeClass',dataObj)
            .then(function(response){
                if(response.data.success){
                    return response.data.success;
                }
                else{
                    return response.data.error
                }
            });
        },

        getAllClasses: function(){
            return $http.get('/api/getAllClasses')
            .then(function(response){
                if(response.data.success){
                    return response.data.data;
                }
                else{
                    return response.data.error
                }
            });
        },

        removeDomain: function(list, domainName, classkey,list){
            var dataObj = {domain:domainName, classkey: classkey,list:list}

            return $http.put('/api/removeFromPermisionList',dataObj)
            .then(function(response){
                if(response.data.success){
                    return response.data.data;
                }
                else{
                    return response.data.error
                }
            });
        },

        getPermissionListDomains : function(list,classkey){
            return $http.post('/api/retrievePermissionList',{list: list, classkey: classkey})
            .then(function(response){
                if(response.data.success){
                    return response.data.data;
                }
                else{
                    return response.data.error
                }
            });
        },

        changePermissionSelect : function(list, classkey){
            return $http.post('/api/changePermissionSelect',{list: list, classkey: classkey})
            .then(function(response){
                if(response.data.success){
                    return response.data.data;
                }
                else{
                    return response.data.error
                }
            });
        },

        checkDomainFormat : function(domain) {
            //is the email in the correct format in the first place?
            var regexTest = /\S+\.\S+/i;
            return regexTest.test(domain);
        }   
    };

}]);