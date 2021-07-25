'use strict';

require('./config');

require('./db');

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _auth = require('./routes/auth');

var _auth2 = _interopRequireDefault(_auth);

var _posts = require('./routes/posts');

var _posts2 = _interopRequireDefault(_posts);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var PORT = process.env.PORT || 8000;

app.use(_express2.default.json());
app.use(_express2.default.urlencoded({
	extended: true
}));
app.use((0, _cors2.default)());

app.use('/login', _auth2.default);
app.use('/posts', _posts2.default);

app.listen(PORT, function () {
	return 'Server running at http://localhost:' + PORT;
});