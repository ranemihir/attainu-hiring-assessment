"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("./config");

require("./db");

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _auth = _interopRequireDefault(require("./routes/auth"));

var _posts = _interopRequireDefault(require("./routes/posts"));

var app = (0, _express["default"])();
var PORT = process.env.PORT || 8000;
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: true
}));
app.use((0, _cors["default"])());
app.use('/login', _auth["default"]);
app.use('/posts', _posts["default"]);
app.listen(PORT, function () {
  return console.log("Server running at http://localhost:".concat(PORT));
});