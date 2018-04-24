angular.module('AdminService', []).factory('Admin', ['$http', function($http) {

    return {
        addDomain : function(domainName) {
            var dataObj = {domain:domainName}
            return $http.put('/api/addDomain',dataObj)
            .then(function(response){
                if(response.data.success){
                    return true;
                }
                else{
                    console.log(response.error);
                    return false;
                }
            });
        },

        removeDomain: function(domainObj){
            //did this a slightly different way to allow clean passage of delete method with body
            return $http({
                url: '/api/removeDomain',
                method: 'DELETE',
                data:domainObj,
                headers: {
                    "Content-Type": "application/json;charset=utf-8"
                }
            }).then(function(response) {
                if(response.data.success){
                    return true;
                }
                else{
                    console.log(response.error);
                    return false;
                }
            });
        },

        getAllBuyers : function() {
            return $http.get('/api/retrieveBuyers')
            .then(function(response){
                if(response.data.success){
                    return response.data.data;
                }
                else{
                    return response.data.error
                }
            });
        },
        getPermissionListDomains : function(){
            return $http.get('/api/retrievePermissionList')
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