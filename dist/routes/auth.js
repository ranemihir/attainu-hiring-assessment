"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var jwt = _interopRequireWildcard(require("jsonwebtoken"));

var _user = _interopRequireDefault(require("./../model/user"));

var _express = _interopRequireDefault(require("express"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var router = _express["default"].Router();

var TOKEN_KEY = process.env.TOKEN_KEY;

function authenticate(_x, _x2) {
  return _authenticate.apply(this, arguments);
}

function _authenticate() {
  _authenticate = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$body, username, password, encryptedPassword, token, role, findUser, user;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _req$body = req.body, username = _req$body.username, password = _req$body.password;
            _context.next = 4;
            return _bcryptjs["default"].hash(password, 10);

          case 4:
            encryptedPassword = _context.sent;
            token = jwt.sign({
              username: username,
              encryptedPassword: encryptedPassword
            }, TOKEN_KEY, {
              expiresIn: '2h'
            });
            role = 'STUDENT';

            if (req.path.endsWith('/admin')) {
              role = 'ADMIN';
            }

            _context.next = 10;
            return _user["default"].findOne({
              username: username
            }).exec();

          case 10:
            findUser = _context.sent;

            if (!findUser) {
              _context.next = 18;
              break;
            }

            if (!(findUser.encryptedPassword != encryptedPassword)) {
              _context.next = 14;
              break;
            }

            return _context.abrupt("return", res.status(403).send("Incorrect password provided for username: ".concat(username)));

          case 14:
            _context.next = 16;
            return _user["default"].findOneAndUpdate({
              username: username.toLowerCase()
            }, {
              token: token
            }, {
              "new": true
            });

          case 16:
            _context.next = 23;
            break;

          case 18:
            _context.next = 20;
            return _user["default"].create({
              username: username.toLowerCase(),
              encryptedPassword: encryptedPassword,
              token: token,
              role: role
            });

          case 20:
            user = _context.sent;
            _context.next = 23;
            return user.save(function (err) {
              if (err) {
                console.error(err);
              }
            });

          case 23:
            res.send({
              token: token
            });
            _context.next = 30;
            break;

          case 26:
            _context.prev = 26;
            _context.t0 = _context["catch"](0);
            console.error(_context.t0);
            res.status(500).send('Internal Server Error');

          case 30:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 26]]);
  }));
  return _authenticate.apply(this, arguments);
}

router.post('/admin', authenticate);
router.post('/student', authenticate);
var _default = router;
exports["default"] = _default;