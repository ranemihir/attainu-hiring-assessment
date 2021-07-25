"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _post = _interopRequireDefault(require("./../model/post"));

var _express = _interopRequireDefault(require("express"));

var jwt = _interopRequireWildcard(require("jsonwebtoken"));

var _user = _interopRequireDefault(require("./../model/user"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var router = _express["default"].Router();

var POST_MAX_LENGTH = process.env.POST_MAX_LENGTH;
var TOKEN_KEY = process.env.TOKEN_KEY;
router.use( /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var token, _jwt$verify, username, user;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            token = req.body.token || req.query.token || req.headers['x-access-token'];

            if (token) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", res.status(403).send('Token is not present'));

          case 3:
            _context.prev = 3;
            _jwt$verify = jwt.verify(token, TOKEN_KEY), username = _jwt$verify.username;
            _context.next = 7;
            return _user["default"].findOne({
              username: username
            }).exec();

          case 7:
            user = _context.sent;
            req.user = user;
            _context.next = 14;
            break;

          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](3);
            return _context.abrupt("return", res.status(401).send("Invalid token: ".concat(token)));

          case 14:
            return _context.abrupt("return", next());

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[3, 11]]);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}());
router.post('/0/create', /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var data, post;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!(req.user.role != 'ADMIN')) {
              _context2.next = 2;
              break;
            }

            return _context2.abrupt("return", res.status(403).send('User does not have the permissions to create'));

          case 2:
            data = req.body.data;

            if (data) {
              _context2.next = 5;
              break;
            }

            return _context2.abrupt("return", res.status(403).send('Post data property cannot be empty'));

          case 5:
            if (!(data.length > POST_MAX_LENGTH)) {
              _context2.next = 7;
              break;
            }

            return _context2.abrupt("return", res.status(403).send("Post length exceeds the max length of ".concat(POST_MAX_LENGTH)));

          case 7:
            _context2.prev = 7;
            _context2.next = 10;
            return _post["default"].create({
              data: data
            });

          case 10:
            post = _context2.sent;
            _context2.next = 13;
            return post.save(function (err) {
              if (err) {
                console.error(err);
              }
            });

          case 13:
            return _context2.abrupt("return", res.send(post));

          case 16:
            _context2.prev = 16;
            _context2.t0 = _context2["catch"](7);
            console.error(_context2.t0);
            res.status(500).send('Internal Server Error');

          case 20:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[7, 16]]);
  }));

  return function (_x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}());
router.get('/:id', /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var id, post;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            id = req.params.id;

            if (!(!id || id == null || id == '')) {
              _context3.next = 3;
              break;
            }

            return _context3.abrupt("return", res.status(403).send('No id provided for the post'));

          case 3:
            _context3.prev = 3;
            _context3.next = 6;
            return _post["default"].findById(id).exec();

          case 6:
            post = _context3.sent;

            if (post) {
              _context3.next = 9;
              break;
            }

            return _context3.abrupt("return", res.status(403).send("Invalid post Id: ".concat(id)));

          case 9:
            return _context3.abrupt("return", res.send(post));

          case 12:
            _context3.prev = 12;
            _context3.t0 = _context3["catch"](3);
            console.error(_context3.t0);
            return _context3.abrupt("return", res.status(403).send("Invalid Post id: ".concat(id, " provided")));

          case 16:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[3, 12]]);
  }));

  return function (_x6, _x7) {
    return _ref3.apply(this, arguments);
  };
}());
router.post('/:id/update', /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var _id, data, post;

    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            if (!(req.user.role != 'ADMIN')) {
              _context4.next = 2;
              break;
            }

            return _context4.abrupt("return", res.status(403).send('User does not have the permissions to update'));

          case 2:
            _id = req.params.id;
            data = req.body.data;

            if (data.length > POST_MAX_LENGTH) {
              res.status(403).send("Post length exceeds the max length of ".concat(POST_MAX_LENGTH));
            }

            _context4.prev = 5;
            _context4.next = 8;
            return _post["default"].findOneAndUpdate({
              _id: _id
            }, {
              data: data
            }, {
              "new": true
            });

          case 8:
            post = _context4.sent;
            return _context4.abrupt("return", res.send(post));

          case 12:
            _context4.prev = 12;
            _context4.t0 = _context4["catch"](5);
            console.error(_context4.t0);
            res.status(500).send('Internal Server Error');

          case 16:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[5, 12]]);
  }));

  return function (_x8, _x9) {
    return _ref4.apply(this, arguments);
  };
}());
router.post('/:id/delete', /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var _id;

    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            if (!(req.user.role != 'ADMIN')) {
              _context5.next = 2;
              break;
            }

            return _context5.abrupt("return", res.status(403).send('User does not have the permissions to update'));

          case 2:
            _id = req.params.id;
            _context5.prev = 3;
            _context5.next = 6;
            return _post["default"].deleteOne({
              _id: _id
            });

          case 6:
            return _context5.abrupt("return", res.send("Post with id: ".concat(_id, " deleted successfully")));

          case 9:
            _context5.prev = 9;
            _context5.t0 = _context5["catch"](3);
            console.error(_context5.t0);
            res.status(500).send('Internal Server Error');

          case 13:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[3, 9]]);
  }));

  return function (_x10, _x11) {
    return _ref5.apply(this, arguments);
  };
}());
var _default = router;
exports["default"] = _default;