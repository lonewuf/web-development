var express = require('express'),
    mongoose = require('mongoose'),
    router = express.Router();

    
//Calling middleware
var middlewareObj = require('../middleware')

//Calling Model
var Hotel = require('../models/hotels');

//Hotels Routes//
router.get('/', function(req, res){
	Hotel.find({}, function(err, foundHotels){
		if(err){throw(err)}
		else {
			res.render('hotels/index', {hotels: foundHotels});
		}
	});
});
router.get('/add', middlewareObj.isLoggedIn, function(req, res){
	res.render('hotels/add');
});
router.post('/', middlewareObj.isLoggedIn, function(req, res){
    
    var name = req.body.name;
    var image = req.body.image;
    var detail = req.body.detail;
    var description = req.body.description;
    
    var newHotel = {name: name, image: image, detail: detail, description: description};
    
	Hotel.create(newHotel, function(err, newHotel){
		if(err){throw(err)}
		else {
		   
		   newHotel.author.id = req.user.id;
		   newHotel.author.username = req.user.username;
		   newHotel.save();
			res.redirect('/hotels');
		}
	});
});
router.get('/:id',  function(req, res){
    
    
	Hotel.findById(req.params.id).populate('comments').exec(function(err, foundHotel){
		if(err){throw(err)}
		else {
			res.render('hotels/show', {hotel: foundHotel});
		}
	});
});
router.get('/:id/edit', middlewareObj.checkHotelOwnership, function(req, res){

	Hotel.findById(req.params.id, function(err, foundHotel){
		if(err){throw(err)}
		else {
			res.render('hotels/edit', {hotel: foundHotel});
		}
	});
});
router.put('/:id', middlewareObj.checkHotelOwnership, function(req, res){
   
   var name = req.body.name;
   var image = req.body.image;
   var detail = req.body.detail;
   var description = req.body.description;
   
   var updatedHotel = {name: name, image: image, detail: detail, description: description};
   
	Hotel.findByIdAndUpdate(req.params.id, updatedHotel, function(err, updatedHotel){
		if(err){throw(err)}
		else {
			res.redirect('/hotels/' + req.params.id);
		}
	});
});
router.delete('/:id', middlewareObj.checkHotelOwnership, function(req, res){
	Hotel.findByIdAndRemove(req.params.id, function(err){
		if(err){throw(err)}
		res.redirect('/hotels');
	});
});

module.exports = router;