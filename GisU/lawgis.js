var mysql = require('mysql'); 
var $conf = require('../config/conf'); 
 
var $sql = require('./lawSqlMapping'); 
 
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
	queryAll: function (req, res, next) { // res : user/queryall 
		pool.getConnection(function(err, connection) { 
			connection.query($sql.queryAll, function(err, result) { 
                console.log(result); 
                //[ 1state 9value 
                //    {"state":"Alabama","violent":"25551","murder":"404","rape":"2028","robbery":"4217","harm":"18902","property":"144160","burglary":"31477","lancery":"99842","vehicle":"12841"}, 
                //    {"state":"Alaska","violent":"6133","murder":"62","rape":"863","robbery":"951","harm":"4257","property":"26204","burglary":"4171","lancery":"17775","vehicle":"4258"}, 
 
				var i;  
                jsonData = {};   
                lawyears = []; 
                zdb=[]; 
				// 想要转换成格式： 
                // [7 values +1state] 
                // {"scatter":[ 
                //          [25551,404,2028,4217,18902,144160,31477,"alabama"], 
                //          [1,2,3,4,5,6,7,"b"], 
                //         ] 
                //  } 
                //[ '25551','404','2028','4217','18902','144160','31477','Alabama' ] 
                 
                var i = result.length; 
                console.log(i); 
                for(i=0;i<result.length;i++){ 
                    zdb.push(result[i].state); 
                    zdb.push(result[i].y1991); 
                    zdb.push(result[i].y1992); 
                    zdb.push(result[i].y1993); 
                    zdb.push(result[i].y1994); 
                    zdb.push(result[i].y1995); 
                    zdb.push(result[i].y1996); 
                    zdb.push(result[i].y1997); 
                    zdb.push(result[i].y1998); 
                    zdb.push(result[i].y1999); 
                    zdb.push(result[i].y2000); 
                    zdb.push(result[i].y2001); 
                    zdb.push(result[i].y2002); 
                    zdb.push(result[i].y2003); 
                    zdb.push(result[i].y2004); 
                    zdb.push(result[i].y2005); 
                    zdb.push(result[i].y2006); 
                    zdb.push(result[i].y2007); 
                    zdb.push(result[i].y2008); 
                    zdb.push(result[i].y2009); 
                    zdb.push(result[i].y2010); 
                    zdb.push(result[i].y2011); 
                    zdb.push(result[i].y2012); 
                    zdb.push(result[i].y2013); 
                    zdb.push(result[i].y2014); 
                    zdb.push(result[i].y2015); 
                    zdb.push(result[i].y2016); 
                    zdb.push(result[i].y2017); 
                    zdb.push(result[i].y2018); 
 
                    zdb.push(result[i].Firearms); 
                    zdb.push(result[i].Dealer); 
                    zdb.push(result[i].Buyer); 
                    zdb.push(result[i].Prohibitions); 
                    zdb.push(result[i].Background_Check); 
                    zdb.push(result[i].Ammunition); 
                    zdb.push(result[i].Possession); 
                    zdb.push(result[i].Concealed_Carry); 
                    zdb.push(result[i].Assault_Weapons); 
                    zdb.push(result[i].Child_Access); 
                    zdb.push(result[i].Trafficking); 
                    zdb.push(result[i].Domestic_Violence); 
                    zdb.push(result[i].Stand_Your_Ground); 
                    zdb.push(result[i].Preemption); 
                    zdb.push(result[i].Immunity); 
                     
                    lawyears.push(zdb); 
                    zdb = []; 
                } 
                jsonData['lawyears']=lawyears; 
				var fs = require('fs'); 
				var file = 'public/json/lawyears.json'; 
				var string = JSON.stringify(jsonData); 
				//写入文件 
				fs.writeFile(file, string, function(err) { 
					if (err) { 
						return console.log(err); 
					} 
					console.log('文件创建成功，地址：' + file); 
				}) 
 
				res.render('Gun',{ 
					title:'gun2', 
					//jsonData: jsonData 
				}); 
				connection.release(); 
			}); 
		}); 
    } 
     
     
 
};