var models = require('../models');
// console.log('models', models.messages.post);
// var bodyParser = require('body-parser');

//controller

module.exports = {
  messages: {
    get: function (req, res) {
      models.messages.get(function (err, rows) {
        console.log('rows', rows);
        if (!err) {
          res.json(rows);
        }
      });
    },
    post: function (req, res) {
      var username = req.body.username; 
      var text = req.body.text;
      var roomname = req.body.roomname;
      var date = new Date();
      var params = [username, text, roomname, date];
      var sql = 'INSERT INTO messages (username, text, roomname, date) VALUES (?, ?, ?, ?)';
      models.messages.post(sql, params, function (err, row) {
        if (!err) {
          res.end();
        }
      });


    }
  },

  users: {
    get: function (req, res) {},
    post: function (req, res) {}
  }
};
