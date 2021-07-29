"use strict"
/** Routes for resource Items */
const express = require("express");

let {items} = require('./fakeDb');
const router = new express.Router();


/** get list of items */
router.get('/', function (req, res, next){
	return res.json({response:items})
});

/** get specific item */
router.get('/:name', function (req, res, next){
	for (let item of items) {
		if (item["name"] === req.params.name) {
			return res.json({response:item});
		}
	}
});

/** add item to list  */
router.post('/', function(req, res, next) {
	items.push(req.body) // add an item from body
	return res.json({response:
						{added:req.body}})
			  .status(201);
});

/** delete item from list  */
router.delete('/:name', function(req, res, next) {
	items = items.filter((elem) => elem["name"] !== req.params.name);
	// items = items.slice(0, idx).concat(items.slice(idx+1));
	return res.json({response:
		{message:"Item deleted!"}});
});

/** patch item  */
router.patch('/:name', function(req, res, next) {
	items = items.map(elem => elem["name"] !== req.params.name ? elem : req.body)
	// for (let idx in items) {
	// 	if (items[idx]["name"] === req.params.name) {
	// 		items[idx] = req.body;
	// 		
	// 	}
	// }
	return res.json({response:
		{updated:req.body}});
});


module.exports = router;