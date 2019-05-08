var user = { 
	// insert:'INSERT INTO user(name, age) VALUES(? , ?)', 
	// update:'UPDATE user SET name = ?, age = ? WHERE id = ?', 
	// delete: 'DELETE FROM user WHERE id=?', 
	// queryById: 'SELECT * FROM user WHERE id=?', 
	queryAll: 'SELECT * FROM lawyears,laws2016 where lawyears.state = laws2016.State', 
	 
    //queryAll: 'SELECT * FROM laws2016' 
}; 
 
module.exports = user;