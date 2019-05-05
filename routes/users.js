var express = require('express');
var router = express.Router();
var userGis = require('../GisU/userGis');

/*var usagis = require('../GisU/usagis');
var usagis2016 = require('../GisU/usagis2016');
var usagis2015 = require('../GisU/usagis2015');
var piegis = require('../GisU/piegis');
var piegis2016 = require('../GisU/piegis2016');
var piegis2015 = require('../GisU/piegis2015');
var scattergis = require('../GisU/scattergis');
var bargis = require('../GisU/bargis');*/

var usr = require('../config/conf2');

/* GET users listening. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//Add 
router.get('/addUser', function(req, res, next) {
	userGis.add(req,res,next);
});
router.get('/addUserMiddle', function(req, res, next) {
	res.render('addUser',{
		title:'添加用户页'
	});
});
router.get('/Index', function(req, res, next) {
	res.render('Index');
});
//查看全部用户
router.get('/queryAll', function(req, res, next) {
  userGis.queryAll(req,res,next);
});
//查询指定用户
router.get('/query', function(req, res, next) {
	userGis.queryById(req, res, next);
});
//删除用户 
router.get('/deleteUser', function(req, res, next) {
	userGis.delete(req, res, next);
});
//更新用户信息
router.post('/updateUser', function(req, res, next) {
	userGis.updateUser(req, res, next);
});

/*router.get('/bar', function(req, res, next) {
	bargis.queryAll(req, res, next);
});
router.get('/usa', function(req, res, next) {
	usagis.queryAll(req, res, next);
});
router.get('/usa2016', function(req, res, next) {
	usagis2016.queryAll(req, res, next);
});
router.get('/usa2015', function(req, res, next) {
	usagis2015.queryAll(req, res, next);
});
router.get('/pie', function(req, res, next) {
	piegis.queryAll(req, res, next);
});
router.get('/pie2016', function(req, res, next) {
	piegis2016.queryAll(req, res, next);
});
router.get('/pie2015', function(req, res, next) {
	piegis2015.queryAll(req, res, next);
});
router.get('/scatter', function(req, res, next) {
    console.log("chishishi");
    scattergis.queryAll(req, res, next);
});*/


module.exports = router;

// var express = require('express');
// var router = express.Router();
//var settings = require('../config/conf2.js');

/* GET home page. */
router.get('/', function(req, res) {
    if(req.cookies.islogin){
        req.session.islogin=req.cookies.islogin;
    }
if(req.session.islogin){
    res.locals.islogin=req.session.islogin;
}
  res.render('index', { title: 'HOME',test:res.locals.islogin});
});




//注册
router.route('/reg')
    .get(function(req,res){
        res.render('reg',{title:'注册'});
    })
    .post(function(req,res) {
        client =  usr.connect();

        usr.insertFun(client,req.body.username ,req.body.password2, function (err) {
            if(err) throw err;
            if(req.body.password2===req.body.password3){
                res.redirect('/');
            }else
                {
                    res.redirect('/users/login');
                }
        });
            //   res.send('注册成功喵喵喵');
       
    });

router.route('/login')
    .get(function(req, res) {
        if(req.session.islogin){
            res.locals.islogin=req.session.islogin;
        }

        if(req.cookies.islogin){
            req.session.islogin=req.cookies.islogin;
        }
        res.render('login', { title: '用户登录' ,test:res.locals.islogin});
    })
    .post(function(req, res) {
        client=usr.connect();
        result=null;
        usr.selectFun(client,req.body.username, function (result) {
            if(result[0]===undefined){
                res.send('没有该用户');
                res.redirect('/users/login');
                //alert('my');
            }else{
                if(result[0].password===req.body.password){
                    req.session.islogin=req.body.username;
                    res.locals.islogin=req.session.islogin;
                    res.cookie('islogin',res.locals.islogin,{maxAge:60000});
                    res.redirect('/');
                }else
                {
                    res.redirect('/users/login');
                    //alert('密码错误');
                }
               }
        });
    });

  

module.exports = router;