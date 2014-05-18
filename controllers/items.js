var fs = require('fs');

exports.list = function (req, res) {
  var data = fs.readFileSync('data.json', encoding='utf8');
  // console.log(data);
  res.json(data);
};

exports.create = function (req, res) {
  // var obj = req.param('TODO').join(',');
  // console.log(obj);
  
  // var data = JSON.stringify(req.param('TODO'));
  // console.log(data);
  fs.writeFileSync('data.json', JSON.stringify(req.param('TODO')), encoding='utf8');
};

exports.update = function (req, res) {

};

exports.reposition = function (req, res) {

};

exports.delete = function (req, res) {

};
