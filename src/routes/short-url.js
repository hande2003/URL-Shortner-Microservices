const express = require("express");
const router = express.Router();
const result = require('../models/db');

router
    .route("/api/shorturl/:shortURL")
    .get(function(req, res) {
        req.code = parseInt(req.params.shortURL);
        (async()=>{
            return result.getURL(req.code);
        })().then(result => {
            if(result !== null){
                res.status(302).redirect(result.originalURL);
            }
            else{
                res.status(400).render('error', {error: 'Given Code is not associated with any URL'});
            }
        }).catch(err =>{
            res.status(400).render('error', {error: err})
        })
        })
  
  module.exports = router;