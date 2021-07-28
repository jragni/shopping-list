"use strict"

/** Simple demo Express app. */
const {items} = require('./fakeDb');
const express = require("express");
const itemsRoutes = require('./itemsRoutes')
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/** routes for shopping list */
app.use('/items', itemsRoutes);


/** Error handler: logs stacktrace and returns JSON error message. */
app.use(function (err, req, res, next) {
  const status = err.status || 500;
  const message = err.message;
  if (process.env.NODE_ENV !== "test") console.error(status, err.stack);
  return res.status(status).json({ error: { message, status } });
});



module.exports = app;
