var pg = require('pg');
var db = require('../../config/db.js');
module.exports.fetchCustomer = function(req,res){
	
}
module.exports.validateEmail = function(req,res){
	var domain = scrubEmailForDomain(req.body.email);
	var email = req.body.email;
	console.log(domain,email);

	findOnBlacklist(domain,function(found,err){
		if(!found && !err){
			findIfUnique(email,function(unique,err){
				if(unique && !err){
					res.send({success:true,unique:true});
				}
				else if(!unique && !err){
					res.send({success:true,unique:false})
				}
				else{
					res.send({success:false,error:err});
				}
			});
		}
		else{
			res.send({success:false,error:err});
		}
	});
}
module.exports.addCustomer = function(req,res){
  	const data = req.body;
  	const client = new pg.Client(db);
  	client.on('drain', client.end.bind(client));
	client.connect(function(err){
		if(!err){
			client.query('INSERT INTO buyers(firstname,lastname,email) values ($1,$2,$3)',
				[data.firstName,data.lastName,data.email],
				function(err, result){
				if(!err){
					console.log("Success Adding Buyer")
					console.log("-----")
					console.log(result);
					console.log("-----")
					res.send({success:true});
				}
				else{
					res.send({success:false,error:err});
				}
			});
		}
		else{
			res.send({success:false,error:err});
		}
	});
}

function findOnBlacklist(domain,callback){
	const client = new pg.Client(db);
	client.on('drain', client.end.bind(client));
	client.connect(function(err){
		if(!err){
			client.query('SELECT * FROM blacklist WHERE domain=($1)',[domain],function(err, result){
				if(!err){
					if(result.rows.length <= 0){
						//empty
						console.log("not found on blacklist, domain is valid");
						callback(false);
					}
					else{
						callback(true);
					}
				}
				else{
					callback(null,err);
				}
			});
		}
		else{
			callback(null,err);
		}
	});
}
function findIfUnique(email,callback){
	const client = new pg.Client(db);
	client.on('drain', client.end.bind(client));
	client.connect(function(err){
		if(!err){
			client.query('SELECT * FROM buyers WHERE email=($1)',[email],function(err, result){
				if(!err){
					if(result.rows.length <= 0){
						//empty
						console.log("email has not been used before, is unique");
						callback(true);//is unique!
					}
					else{
						console.log("not unique")
						callback(false);
					}
					
				}
				else{
					console.log(err);
					callback(null,err);
				}
			});
		}
		else{
			callback(null,err);
		}
	});
}


function scrubEmailForDomain(email){
	var temp = email.split('@');
    var domain = temp[temp.length - 1];

    return domain.toLowerCase();
}