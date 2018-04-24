var pg = require('pg');
var db = require('../../config/db.js');

module.exports.showAllBuyers = function(req,res){
	//return all of the records in the buyers table
	const client = new pg.Client(db);
	client.on('drain', client.end.bind(client));
	client.connect(function(err){
		if(!err){
			client.query('SELECT * FROM buyers',function(err, result){
				if(!err){
					console.log(result.rows);
					res.send({success:true,data:result.rows});
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

	//another way through a client pool (?) that I couldnt get to stop timing out. 
	//im thinking honestly an internet speed thing, but.... would need to look into it more
	// pg.connect(db, function(err, client, done) {
	//   if(err) {
	//     return console.error('error fetching client from pool', err);
	//   }
	//   client.query('SELECT * FROM buyers', function(err, result) {
	//     //call `done()` to release the client back to the pool
	//     done();

	//     if(err) {
	//       return console.error('error running query', err);
	//     }
	//     console.log(result.rows);
	//     res.send(result.rows);
	//     //output: 1
	//   });
	// });


}
module.exports.retrievePermissionList = function(req,res){
	//return all of the records in the blacklist table
	const client = new pg.Client(db);
	client.on('drain', client.end.bind(client));
	client.connect(function(err){
		if(!err){
			client.query('SELECT * FROM blacklist',function(err, result){
				if(!err){
					console.log(result.rows);
					res.send({success:true,data:result.rows})
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
module.exports.addToBlacklist = function(req,res){
	newBlacklistDomain = req.body.domain;

	console.log("adding new blacklist domain: " + newBlacklistDomain);
	const client = new pg.Client(db);
	client.on('drain', client.end.bind(client));
	client.connect(function(err){
		if(!err){
			client.query('INSERT INTO blacklist(domain) values ($1);',[newBlacklistDomain],function(err, result){
				if(!err){
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

module.exports.removeFromBlacklist = function(req,res){
	var domainID = req.body.id;
	var domainName = req.body.domain;
	// console.log(domainID,domainName);
	const client = new pg.Client(db);
	client.on('drain', client.end.bind(client));
	client.connect(function(err){
		if(!err){
			client.query('DELETE FROM blacklist WHERE id = ($1) AND domain = ($2)',[domainID,domainName],function(err, result){
				if(!err){
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
