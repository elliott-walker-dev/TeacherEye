// app/routes.js
var Customer = require('./controllers/Customer_ServerSide');
var Admin = require('./controllers/Admin_ServerSide');


module.exports = function(app) {

	// app.get('/api/getCustomerData',Customer.fetchCustomer);
 //    app.post('/api/validateEmail',Customer.validateEmail);
 //    app.put('/api/addCustomer',Customer.addCustomer);

 		app.put('/api/removeClass', Admin.removeClass);
 		app.post('/api/addNewClass',Admin.addNewClass);
    	app.get('/api/getAllClasses',Admin.getAllClasses);
		app.post('/api/retrievePermissionList', Admin.retrievePermissionList);
		app.post('/api/changePermissionSelect', Admin.changePermissionSelect);
    	app.put('/api/addToPermisionList',Admin.addToPermisionList);
    	app.put('/api/removeFromPermisionList',Admin.removeFromPermisionList);

    	//api routes from client
    	app.post('/api/getSelectedPermission', Admin.getSelectedPermission);

 //    app.delete('/api/removeDomain',Admin.removeFromBlacklist);

};