var db = require('../db');
// var bodyParser = require('body-parser');


module.exports = {
  messages: {
    get: function (cb) {
      const queryStr = 'SELECT * FROM messages';
      db.query(queryStr, function (err, rows) {
        console.log('rows', rows);
        
        cb(err, rows);
      });
    }, // a function which produces all the messages
    post: function (sql,params, cb) { 
      db.query(sql, params, function (err, row) {
        cb(err, row);
        
      });
      // a function which can be used to insert a message into the database
    },

    users: {
      // Ditto as above.
      get: function () {},
      post: function () {}
    }
  }
};
