var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var router = express.Router();
var mongoOp = require("./models/mongo");

var PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended" : false}));

router.get("/", function(req, res) {     
	res.json({"error" : false, "message" : "Hello API"})
});

router.route("/users")
	.get(function(req, res) {
		var response = {};
		mongoOp.find({}, function(err, data) {
			if(err) {
				response = {"error" : true, "message" : "Error fetching data"}
			} else {
				response = {"error" : false, "message" : data}
			}
			res.json(response);
		})
	})
	.post(function(req, res) {
		var db = new mongoOp();
		var response = {};

		db.user_email = req.body.email;
		db.user_password = require('crypto')
						   .createHash('sha1')
						   .update(req.body.password)
						   .digest('base64');
		db.save(function(err) {

			if(err) {
				response = {"error" : true, "message" : "Error adding data"};
			} else {
				response = {"error" : false, "message" : "Added user"}
			}
			res.json(response);
		})
	})

// router.route("/users/:id")
// 	.get(function(req, res) {
// 		var response = {};
// 		mongoOp.findById(req.params.id, function(err, data) {
// 			if(err) {
// 				response = {"error" : true, "message" : "Error fetching user"};
// 			} else {
// 				response = {"error" : false, "message" : data};
// 			}
// 			res.json(response);
// 		})
// 	})
// 	.put(function(req, res) {
// 		var response = {};
// 		mongoOp.findById(req.params.id, function(err, data) {
// 			if(err) {
// 				response = {"error" : true, "message" : "Error fetching user"}
// 			} else {
// 				if(req.body.user_email !== undefined) {
// 					data.user_email = req.body.user_email;
// 				}
// 				if(req.body.user_password !== undefined) {
// 					data.user_password = req.body.user_password;
// 				}

// 				data.save(function(err) {
// 					if(err) {
// 						response = {"error" : true, "message" : "Error updating user"}
// 					} else {
// 						response = {"error" : false, "message" : "Data is updated for user " + req.params.id}
// 					}
// 					res.json(response);
// 				})
// 			}
// 		})
// 	})
// 	.delete(function(req, res) {
// 		var response = {};
// 		mongoOp.findById(req.params.id, function(err, data) {
// 			if(err) {
// 				response = {"error" : true, "message" : "Error fetching user"}
// 			} else {
// 				mongoOp.remove({_id : req.params.id}, function(err) {
// 					if(err) {
// 						response = {"error" : true, "message" : "Error deleting user"}
// 					} else {
// 						response = {"error" : false, "message" : "Deleted user " + req.params.id}
// 					}
// 					res.json(response);
// 				})
// 			}	
// 		})
// 	})

app.use('/', router);

app.listen(PORT);
console.log("Listening on PORT: " + PORT);

