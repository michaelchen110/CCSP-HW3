exports.list = function (req, res) {
  	// console.log("Req:" + req.query.name);
    res.json([{
    	text: 'Example TODOLIST',
    	isDone: false
  	}]);
};

exports.create = function (req, res) {
  var newTodo = req.body;
  newTodo.id = 1;// 2, 3, .....
  
  res.json(newTodo);
  console.log(req.body.name);
};

exports.update = function (req, res) {

};

exports.reposition = function (req, res) {

};

exports.delete = function (req, res) {

};
