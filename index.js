var express=require('express');

var app=express();
var bodyParser=require('body-parser');

app.use(bodyParser.json());

// data from mongodb database
var mongojs=require('mongojs');
var db=mongojs('contactlist',['contactlist']);


app.use(express.static(__dirname + '/public'));

app.get('/contactlist',function(req,res){
	console.log('i recieved aget request');

	//data from database
	db.contactlist.find(function(err,docs){
		console.log(docs);
		res.json(docs);
	});

	// var person1={
	// 	name : "Ritu",
	// 	email : "ritu31195@gmail.com",
	// 	number : "8602218669"
	// };


	// var person2={
	// 	name : "Ritik",
	// 	email : "ritik31195@gmail.com",
	// 	number : "8602218669"
	// };


	// var person3={
	// 	name : "Ranveer",
	// 	email : "ranveer31195@gmail.com",
	// 	number : "8602218669"
	// };

	// var contactlist=[person1,person2,person3];
	// res.json(contactlist);
});

app.post('/contactlist',function(req,res){
	console.log('i recieved a post request from controller');
	console.log(req.body);
	db.contactlist.insert(req.body,function(err,doc){
		res.json(doc);
	});
});


app.delete('/contactlist/:id',function(req,res){
	var id=req.params.id;
	console.log(id);
	db.contactlist.remove({_id: mongojs.ObjectId(id)},function(err,doc){
		res.json(doc);
	});
});

app.get('/contactlist/:id', function(req,res){
	var id=req.params.id;
	console.log(id);
	db.contactlist.findOne({_id:mongojs.ObjectId(id)},function(err,doc){
		res.json(doc);
	});
});

app.put('/contactlist/:id',function(req,res){
	var id=req.params.id;
	console.log(id);
	db.contactlist.findAndModify({query: {_id : mongojs.ObjectId(id)},
		update:{$set: {name : req.body.name ,email :req.body.email,number :req.body.number}},
		new : true}, function(err,doc){
		res.json(doc);
	});

});

app.listen(3000);
console.log('listening on port 3000');