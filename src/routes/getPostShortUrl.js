const express = require("express");
const router = express.Router();
const result = require('../models/db');

router
    .route('/api/shorturl')
    
    .post(function(req, res) {
        req.url = req.body.url;
        let regex = /^https?\:\/{2}/g;
    
        if(regex.test(req.url)){
        (async()=>{
            return result.postURL(req.url);
        })().then(result => {
            if(result.originalURL){
            res.status(201).render('result', {originalURL:result.originalURL, shortURL:result.shortURL});
            }else{
            res.status(400).render('error', {error: result})
            }
        }).catch(err =>{
            res.status(400).render('error', {error: err})
        })
        }else{
        res.status(400).render('error', {error: 'Bad Request'});
        }
        })

    .get(function(req, res) {
        req.url = req.query.url;
        let regex = /^https?\:\/{2}/g;
    
        if(regex.test(req.url)){
        (async()=>{
            return result.getURL(req.url);
        })().then(result => {
            if(result!== null){
            res.status(200).render('result.ejs', {originalURL:result.originalURL, shortURL:result.shortURL});
            }else{
            res.status(400).render('error', {error: 'OOPS!! Shortened code not Found'});
            }
        }).catch(err =>{
            res.status(400).render('error', {error: err})
        })
        }else{
        res.status(400).render('error', {error: 'Bad Request'});
        }
        })

        module.exports = router;