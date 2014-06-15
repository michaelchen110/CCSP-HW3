var fs = require('fs');

exports.list = function (req, res) {
	var data = fs.readFileSync('data.json', encoding='utf8');
	res.json(data);
};

exports.create = function (req, res) {
	var newItem = {'text':req.body.item, 'isDone': '0'};
	var data = fs.readFileSync('data.json', encoding='utf8');
	if (data.length === 0) {
		data = [];
	} 
	else {
		data = JSON.parse(data);
	}	
	data.push(newItem);
	fs.writeFileSync('data.json', JSON.stringify(data), encoding='utf8');
	res.json("");
};

exports.update = function (req, res) {
	var id = req.params.id,
		data = JSON.parse(fs.readFileSync('data.json', encoding='utf8'));

	data[id].isDone = "1";
	fs.writeFileSync('data.json', JSON.stringify(data), encoding='utf8');
	res.json('');
};

exports.reposition = function (req, res) {
	var id = req.params.id,
		new_position = req.params.new_position,
		tmp;

	var data = JSON.parse(fs.readFileSync('data.json', encoding='utf8'));
	tmp = data[id];
	data.splice(id, 1);
	data.splice(new_position, 0, tmp);

	fs.writeFileSync('data.json', JSON.stringify(data), encoding='utf8');
	res.json('');
};

exports.delete = function (req, res) {
	var id = req.params.id,
		data = JSON.parse(fs.readFileSync('data.json', encoding='utf8'));

	if (data.length <= 1) {
		fs.writeFileSync('data.json', "", encoding='utf8');
	}
	else {
		data.splice(id, 1);
		fs.writeFileSync('data.json', JSON.stringify(data), encoding='utf8');
	}
	res.json('');
};