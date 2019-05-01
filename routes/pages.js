var express = require('express');
var router = express.Router();

var mysql = require('mysql');
//配置模块
var settings = require('../config/conf.js');
var scattergis = require('../GisU/scattergis');

// router.get("/login",function(req,res){
//     res.render("login");
// });

router.get('/About',function(req,res){
    res.render('About',{
        title:'Add Articles'
    });
});
//Agency  Showcase

// router.get('/scatter', function(req, res, next) {
//     scattergis.queryAll(req, res, next);
// });
router.get('/Index',function(req,res){
    res.render('',{
        title:'Add Articles'
    });
});
router.get("/Agency",function(req,res){ 
    res.render('Agency');
});
router.get("/crime",function(req,res){ 
    res.render('crime');
});
router.get("/overview",function(req,res){ 
    res.render('overview');
});
router.get('/home',function(req,res){
    res.render('/');
});
router.get('/CriminalConductGenre',function(req,res){
    res.render("CriminalConductGenre");
});

router.get('/charts',function(req,res){
    res.render("charts");
});
router.get("/US_violentCrime",function(req,res){ 
    res.render('US_violentCrime');
});
router.get("/spots_GDP_crime",function(req,res){ 
    res.render('spots_GDP_crime');
});
router.get('/overview',function(req,res){
    res.render("overview");
});
router.get('/OurTeam',function(req,res){
    res.render("OurTeam");
});
router.get('/analysis',function(req,res){
    res.render("analysis");
});
router.get('/usanew',function(req,res){
    res.render("usanew");
});
router.get('/usanew2',function(req,res){
    res.render("usanew2");
});
router.get('/molan',function(req,res){
    res.render("molan");
});
router.get('/ae',function(req,res){
    res.render("ae");
});
router.get('/youtube',function(req,res){
    res.render("youtube");
});
router.get('/SDcities',function(req,res){
    res.render("SDcities");
});
router.get('/Gun',function(req,res){
    res.render("Gun");
});
router.get('/Heat',function(req,res){
    res.render("heat");
});

module.exports = router;


