// app/routes.js
var Customer = require('./controllers/Customer_ServerSide');
var Admin = require('./controllers/Admin_ServerSide');


module.exports = function(app) {

	app.get('/api/getCustomerData',Customer.fetchCustomer);
    app.post('/api/validateEmail',Customer.validateEmail);
    app.put('/api/addCustomer',Customer.addCustomer);



    app.get('/api/retrieveBuyers',Admin.showAllBuyers);
    app.get('/api/retrievePermissionList', Admin.retrievePermissionList);
    app.put('/api/addDomain',Admin.addToBlacklist);
    app.delete('/api/removeDomain',Admin.removeFromBlacklist);

};