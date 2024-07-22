const express = require('express')
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).send("Access Denied");
    }
  
    jwt.verify(token, process.env.SECRET_KEY, (err, admin) => {
      if (err) { 
        return res.status(403).send("Forbidden");
      }
      req.admin = admin; // Attach admin data to req
      next();
    });
  };
  
  module.exports = authenticateToken;
  