var express = require('express');
var router = express.Router();
var Swords = require('../db/swords');

router.get('/', function(req, res) {
	Swords.find({}, function(err, swords) {
		if(err) {
			res.send(err);
		}
		res.status(200).json(swords);
	});
});

router.post('/', function(req, res) { 
	Swords.insert(req.body, function(err, swords) {
		if(err) {
			res.send(err);
		}
		res.status(201).json(swords);
	});
});

router.get('/:id', function(req, res) {
	Swords.findOne({_id: req.params.id}, function(err, sword) {
		if(err) {
			res.send(err);
		}
		res.status(200).json(sword);
	});
});

router.put('/:id', function(req, res) {
	Swords.findAndModify({_id: req.params.id}, req.body, function(err, sword) {
		if(err) {
			throw err;
		}
		res.json(req.body);
	});
});


router.delete('/:id', function(req, res) {
	Swords.delete({_id: req.params.id}, function(err, sword) {
		if(err) {
			throw err;
		}
		res.json(req.body);
	});
});



module.exports = router;












