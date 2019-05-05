var mysql = require('mysql');
var $conf = require('../config/conf');

var $sql = require('./userSqlMapping');

var pool = mysql.createPool($conf.mysql);

var jsonWrite = function(res,ret){
    if(typeof ret === 'undefined'){
        res.json({
            code:'1',
            msg:'Fail'
        });
    }else{
        res.json(ret);
    }
};

module.exports = {
    add: function (req, res, next) {
		pool.getConnection(function(err, connection) {
			// 获取前台页面传过来的参数
			var param = req.query || req.params;
			// 建立连接，向表中插入值
			// 'INSERT INTO user(id, name, age) VALUES(0,?,?)',
			connection.query($sql.insert, [param.name, param.age], function(err, result) {
				if(result) {
					result = {
						code: 200,
						msg:'增加成功'
					};    
				}
				// 以json形式，把操作结果返回给前台页面
				jsonWrite(res, result);
				// 释放连接 
				connection.release();
			});
		});
	},
	delete: function (req, res, next) {
		// delete by Id
		pool.getConnection(function(err, connection) {
			console.log(req.query.id);
			var id = +req.query.id;
			connection.query($sql.delete, id, function(err, result) {
				if(result.affectedRows > 0) {
					jsonWrite(res, result);
					result = {
						code: 200,
						msg:'删除成功'
					};
				} else {
					result = void 0;
				}
				jsonWrite(res, result);
				connection.release();
			});
		});
	},
	updateUser: function (req, res, next) {
		var param = req.body;
		console.log(param);
		if(param.name == null || param.age == null) {
			jsonWrite(res, undefined);
			return;
		}
		pool.getConnection(function(err, connection) {
			connection.query($sql.update, [param.name, param.age, param.id], function(err, result) {
				// 使用页面进行跳转提示
				// if(result.affectedRows) {
				// 	res.render('suc',{
				// 		title:'成功页',
				// 		result: result
				// 	}); 					// 第二个参数可以直接在jade中使用
				// } else {
				// 	res.render('fail',  {
				// 		result: result
				// 	});
				// }
				jsonWrite(res, result);
				connection.release();
			});
		});
	},
	queryById: function (req, res, next) {
		var id = +req.query.id; 					// 为了拼凑正确的sql语句，这里要转下整数
		pool.getConnection(function(err, connection) {
			connection.query($sql.queryById, id, function(err, result) {
				jsonWrite(res, result);
				connection.release();
			});
		});
	},
	queryAll: function (req, res, next) { // res : user/queryall
		pool.getConnection(function(err, connection) {
			connection.query($sql.queryAll, function(err, result) {
				//console.log(result);
				var result2 = JSON.stringify(result);
				//console.log(result2);
				// result2 格式：
				//[{"id":1,"name":"eric","age":23},{"id":2,"name":"lucy","age":34},{"id":3,"name":"tony","age":13}]
				
				var i; 
				jsonData = {};
				xname = []
				yage = [] 

				// 想要转换成格式：
				// xname:Array(3) yage:Array(3) 
				// [1,2,3]  ["eric","lucy","tony"] [23,34,13]
				
				for(i=0;i<result.length;i++){

					xname.push(result[i].name);
					yage.push(result[i].age);
		
				}
				
				//console.log('1x'+xname);
				//console.log('1y'+yage);
		
				jsonData['xname']=xname;
				jsonData['yage'] = yage;
		
					//result=JSON.stringify(rows);//转换成JSON String格式
				//指定创建目录及文件名称，__dirname为执行当前js文件的目录
				
				var fs = require('fs');
				var path = require('path');
				//var file = path.join(__dirname, 'public/img/hello.json'); 
				var file = 'public/json/hello2.json';
				var string = JSON.stringify(jsonData);
				//写入文件
				fs.writeFile(file, string, function(err) {
					if (err) {
						return console.log(err);
					}
					console.log('文件创建成功，地址：' + file);
				})




				res.render('list',{
					title:'列表页',
					result:result,
					jsonData: jsonData
				});
				connection.release();
			});
		});
	}
};