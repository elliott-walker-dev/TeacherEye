var pg = require('pg');
var db = require('../../config/db.js');


module.exports = {	addNewClass : addNewClass,
					removeClass: removeClass,
					getAllClasses: getAllClasses,

					addStudent : addStudent,
					getAllStudents : getAllStudents,


					retrievePermissionList: retrievePermissionList,
					changePermissionSelect: changePermissionSelect,
					addToPermisionList : addToPermisionList,
					removeFromPermisionList: removeFromPermisionList,

					getSelectedPermission: getSelectedPermission}

function retrievePermissionList(req,res){
	//return all of the records in the students table
	console.log(req.body);
	var query = 'SELECT * FROM permission_list WHERE permission_list.class = ($1) AND permission_list.permission = ($2)'
	var classkey = req.body.classkey;
	var list = req.body.list;

	console.log(query);
	const client = new pg.Client(db);
	client.on('drain', client.end.bind(client));
	client.connect(function(err){
		if(!err){
			client.query(query,[classkey,list],function(err, result){
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
}

function changePermissionSelect(req,res){
	//return all of the records in the students table
	var list = req.body.list;
	var classkey = req.body.classkey;
	var query = "insert into current_permission(class,permission) values(($1),($2)) on conflict(class) do update set permission = ($2);"

	const client = new pg.Client(db);
	client.on('drain', client.end.bind(client));
	client.connect(function(err){
		if(!err){
			client.query(query,[classkey,list],function(err, result){
				if(!err){
					console.log("upsert success");
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


function addNewClass(req,res){
	const client = new pg.Client(db);
	client.on('drain', client.end.bind(client));
	client.connect(function(err){
		if(!err){
			var key = generateRandomKey();
			var classname = req.body.classname;
			console.log("adding new class!", key, classname)
			client.query('INSERT INTO classes(key, name) values ($1,$2);',[key,classname],function(err, result){
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


function removeClass(req,res){
	var classname = req.body.classname;
	var classKey = req.body.classkey;

	console.log("removing class: ",classname, classKey);
	const client = new pg.Client(db);
	client.on('drain', client.end.bind(client));
	client.connect(function(err){
		if(!err){
			client.query('DELETE FROM classes WHERE classes.key = ($1) AND classes.name = ($2);',[classKey,classname],function(err, result){
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

function getAllClasses(req,res){
	const client = new pg.Client(db);
	client.on('drain', client.end.bind(client));
	client.connect(function(err){
		if(!err){
			client.query('SELECT * FROM classes',function(err, result){
				if(!err){
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
}

function addStudent(req,res){
	console.log("adding new class: " + newBlacklistDomain);
	const client = new pg.Client(db);
	client.on('drain', client.end.bind(client));
	client.connect(function(err){
		if(!err){
			var studentName = req.body.name;
			var classkey = req.body.classkey;
			client.query('INSERT INTO students(name) values ($1) RETURNING id;',[studentName],function(err, result){
				if(!err){
					console.log('row inserted with id: ' + result.rows[0].id);

					client.query('INSERT INTO STUDENTS_IN_CLASSES(student,class) values ($1,$2);',[result.rows[0].id,classkey],function(err, result){
						if(!err){
							console.log(result.rows);
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
		else{
			res.send({success:false,error:err});
		}
	});
}

function getAllStudents(req,res){
	//return all of the records in the students table
	const client = new pg.Client(db);
	client.on('drain', client.end.bind(client));
	client.connect(function(err){
		if(!err){
			client.query('SELECT * FROM students',function(err, result){
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
}

function addToPermisionList(req,res){
	var newBlacklistDomain = req.body.domain;
	var classKey = req.body.classkey;
	var list = req.body.list;


	console.log("adding new permission_list domain: " + newBlacklistDomain);
	const client = new pg.Client(db);
	client.on('drain', client.end.bind(client));
	client.connect(function(err){
		if(!err){
			client.query('INSERT INTO permission_list(domain,class, permission) values ($1,$2,$3);',[newBlacklistDomain, classKey, list],function(err, result){
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

function removeFromPermisionList(req,res){
	var domain = req.body.domain;
	var classkey = req.body.classkey;
	var list = req.body.list;

	console.log("removing permission_list domain: " + domain);
	const client = new pg.Client(db);
	client.on('drain', client.end.bind(client));
	client.connect(function(err){
		if(!err){
			client.query('DELETE FROM permission_list WHERE permission_list.domain = ($1) AND permission_list.class = ($2) AND permission_list.permission = ($3);',[domain,classkey, list],function(err, result){
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

function getSelectedPermission(req,res){
	var classkey = req.body.classkey;
	console.log("get selected permission" + classkey);
	const client = new pg.Client(db);
	client.on('drain', client.end.bind(client));
	client.connect(function(err){
		if(!err){
			client.query("SELECT pl.permission, pl.domain FROM current_permission AS cp, permission_list AS pl WHERE cp.class = ($1) AND pl.class = ($1) AND cp.permission = pl.permission",[classkey],function(err,result){
				if(!err){
					console.log(result.rows);
					res.send({success:true,data:result.rows});
				}
			})
		}
		else{
			res.send({success:false,error:err});
		}
	});
}

function generateRandomKey() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}