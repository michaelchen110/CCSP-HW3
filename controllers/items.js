var fs = require('fs');

exports.list = function (req, res) {
  var data = fs.readFileSync('data.json', encoding='utf8');
  res.json(data);
};

exports.create = function (req, res) {
  fs.writeFileSync('data.json', JSON.stringify(req.body), encoding='utf8');
  res.json("");
};

exports.update = function (req, res) {
  var data = fs.readFileSync('data.json', encoding='utf8');
  console.log(req.params.id);
};

exports.reposition = function (req, res) {

};

exports.delete = function (req, res) {

};
