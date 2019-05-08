var mysql = require('mysql'); 
var $conf = require('../config/conf'); 
 
var $sql = require('./echartsSqlMapping'); 
 
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
                scatter = []; 
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
                    zdb.push(result[i].crime2017); 
                    zdb.push(result[i].crime2016); 
                    zdb.push(result[i].crime2015); 
                    zdb.push(result[i].population2015); 
                    zdb.push(result[i].gdp2015); 
                    zdb.push(result[i].gdp2016); 
                    zdb.push(result[i].gdp2017); 
                    zdb.push(result[i].gap); 
                    zdb.push(result[i].murder); 
                    zdb.push(result[i].rape); 
                    zdb.push(result[i].robbery); 
                    zdb.push(result[i].aggravated); 
                    zdb.push(result[i].burglary); 
                    zdb.push(result[i].larceny); 
                    zdb.push(result[i].vehicle); 
                    scatter.push(zdb); 
                    zdb = []; 
                } 
                jsonData['scatter']=scatter; 
				var fs = require('fs'); 
				var file = 'public/json/echarts.json'; 
				var string = JSON.stringify(jsonData); 
				//写入文件 
				fs.writeFile(file, string, function(err) { 
					if (err) { 
						return console.log(err); 
					} 
					console.log('文件创建成功，地址：' + file); 
				}) 
 
				res.render('echarts',{ 
					title:'echarts', 
					//jsonData: jsonData 
				}); 
				connection.release(); 
			}); 
		}); 
	} 
};