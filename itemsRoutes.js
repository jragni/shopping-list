"use strict"
/** Routes for resource Items */
const express = require("express");

const {items} = require('./fakeDb');
const router = new express.Router();


/** get list of items */
router.get('/', function (req, res, next){
	return res.json({responsze:items})
});

/** add item to list  */
router.post('/', function(req, res, next) {
	items.push(req.body.item) // add an item from body
	return res.json({response:
						{message:"Item added!"}})
			  .status(201);
});


module.exports = router;